(function () {
  const SUPPORTED = ["pt", "en", "es", "zh-CN"];
  const STORAGE_KEY = "esfera_lang";

  function normalizeLang(raw) {
    if (!raw) return "pt";
    const v = raw.toLowerCase();
    if (v.startsWith("en")) return "en";
    if (v.startsWith("es")) return "es";
    if (v.startsWith("zh")) return "zh-CN";
    return "pt";
  }

  function getInitialLang() {
    const url = new URL(window.location.href);
    const fromQuery = normalizeLang(url.searchParams.get("lang"));
    if (SUPPORTED.includes(fromQuery) && url.searchParams.get("lang")) return fromQuery;

    const fromStorage = normalizeLang(window.localStorage.getItem(STORAGE_KEY));
    if (SUPPORTED.includes(fromStorage) && window.localStorage.getItem(STORAGE_KEY)) return fromStorage;

    return normalizeLang(navigator.language || "pt");
  }

  async function loadLocale(lang) {
    const path = `assets/locales/${lang}/common.json`;
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) return {};
      return await res.json();
    } catch {
      return {};
    }
  }

  function setLangUi(lang) {
    const htmlLang = lang === "pt" ? "pt-BR" : lang;
    document.documentElement.setAttribute("lang", htmlLang);

    const url = new URL(window.location.href);
    document.querySelectorAll(".lang-switch .lang").forEach((a) => {
      const code = (a.textContent || "").trim().toLowerCase();
      const normalizedCode = normalizeLang(code);
      if (SUPPORTED.includes(normalizedCode)) {
        const next = new URL(url.toString());
        next.searchParams.set("lang", normalizedCode);
        a.setAttribute("href", `${next.pathname}${next.search}`);
      }
      a.classList.toggle("active", normalizedCode === lang);
    });
  }

  function hasTranslationForLang(key, lang) {
    if (lang === "pt") return true;
    if (!window.i18next || !key) return false;
    return window.i18next.exists(key, { lng: lang });
  }

  function hasTranslatableChars(text) {
    return /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(text);
  }

  function normalizeTranslationKey(text) {
    return (text || "").replace(/\s+/g, " ").trim();
  }

  function replaceTrimmedText(original, replacement) {
    const trimmed = original.trim();
    const start = original.indexOf(trimmed);
    const end = start + trimmed.length;
    return `${original.slice(0, start)}${replacement}${original.slice(end)}`;
  }

  function translateNodeText(node, t, lang) {
    const original = node.nodeValue;
    if (!original) return;
    const trimmed = original.trim();
    if (!trimmed) return;
    const key = normalizeTranslationKey(trimmed);
    if (!key) return;

    const parent = node.parentElement;
    if (parent && parent.closest(".lang-switch")) return;

    if (!hasTranslatableChars(key)) return;

    // Never hide source text when translation is missing.
    // This keeps local preview (file://) readable and avoids text blinking/disappearing.
    if (!hasTranslationForLang(key, lang)) return;

    const translated = t(key);
    if (!translated || translated === key) return;
    node.nodeValue = replaceTrimmedText(original, translated);
  }

  function translateAttrs(t) {
    const attrs = ["title", "placeholder", "aria-label", "alt", "content"];
    const selectors = ["[title]", "[placeholder]", "[aria-label]", "img[alt]", "meta[content]"];
    const nodes = document.querySelectorAll(selectors.join(","));
    nodes.forEach((el) => {
      attrs.forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value) return;
        const key = normalizeTranslationKey(value);
        if (!key) return;
        const translated = t(key);
        if (translated && translated !== key) {
          el.setAttribute(attr, translated);
        }
      });
    });
  }

  function translateDom(t, lang) {
    document.title = t(normalizeTranslationKey(document.title));

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (["SCRIPT", "STYLE", "NOSCRIPT", "IFRAME", "CODE", "PRE"].includes(tag)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    let current;
    while ((current = walker.nextNode())) nodes.push(current);
    nodes.forEach((node) => translateNodeText(node, t, lang));

    translateAttrs(t);
  }

  async function init() {
    if (!window.i18next) return;

    const lang = getInitialLang();
    const [pt, en, es, zhCN] = await Promise.all([
      loadLocale("pt"),
      loadLocale("en"),
      loadLocale("es"),
      loadLocale("zh-CN"),
    ]);

    await window.i18next.init({
      lng: lang,
      fallbackLng: "pt",
      resources: {
        pt: { translation: pt },
        en: { translation: en },
        es: { translation: es },
        "zh-CN": { translation: zhCN },
      },
      keySeparator: false,
      nsSeparator: false,
      interpolation: { escapeValue: false },
      returnEmptyString: false,
    });

    const t = (key) => window.i18next.t(normalizeTranslationKey(key), { defaultValue: normalizeTranslationKey(key) });
    translateDom(t, lang);
    setLangUi(lang);

    document.querySelectorAll(".lang-switch .lang").forEach((a) => {
      a.addEventListener("click", (ev) => {
        ev.preventDefault();
        const next = normalizeLang((a.textContent || "").trim());
        window.localStorage.setItem(STORAGE_KEY, next);
        const url = new URL(window.location.href);
        url.searchParams.set("lang", next);
        window.location.href = url.toString();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
