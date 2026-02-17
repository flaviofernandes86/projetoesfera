#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INDEX_PATH = path.join(ROOT, "index.html");
const LOCALES_DIR = path.join(ROOT, "assets", "locales");
const TARGETS = ["pt", "en", "es"];

function readJson(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  const sorted = Object.fromEntries(
    Object.keys(data)
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .map((k) => [k, data[k]])
  );
  fs.writeFileSync(filePath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
}

function normalizeText(v) {
  return v.replace(/\s+/g, " ").trim();
}

function shouldKeep(v) {
  if (!v) return false;
  if (v.length < 2) return false;
  if (/^[\d\s.,:;+\-/%()]+$/.test(v)) return false;
  if (/^(PT|EN|ES)(\s+(PT|EN|ES))*$/i.test(v)) return false;
  return true;
}

function extractTexts(html) {
  let cleaned = html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  const found = new Set();

  const textRe = />\s*([^<]+?)\s*</g;
  let m;
  while ((m = textRe.exec(cleaned))) {
    const value = normalizeText(m[1]);
    if (shouldKeep(value)) found.add(value);
  }

  const attrRe = /\b(?:title|placeholder|aria-label|alt|content)="([^"]+)"/g;
  while ((m = attrRe.exec(cleaned))) {
    const value = normalizeText(m[1]);
    if (shouldKeep(value)) found.add(value);
  }

  return Array.from(found).sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function sync() {
  const html = fs.readFileSync(INDEX_PATH, "utf8");
  const keys = extractTexts(html);
  const locales = {};
  const added = { pt: 0, en: 0, es: 0 };

  for (const lang of TARGETS) {
    const filePath = path.join(LOCALES_DIR, lang, "common.json");
    locales[lang] = readJson(filePath);
  }

  for (const key of keys) {
    if (!(key in locales.pt)) {
      locales.pt[key] = key;
      added.pt += 1;
    }
    if (!(key in locales.en)) {
      locales.en[key] = "";
      added.en += 1;
    }
    if (!(key in locales.es)) {
      locales.es[key] = "";
      added.es += 1;
    }
  }

  for (const lang of TARGETS) {
    const filePath = path.join(LOCALES_DIR, lang, "common.json");
    writeJson(filePath, locales[lang]);
  }

  console.log(`Chaves detectadas no index: ${keys.length}`);
  console.log(`Novas chaves -> pt: ${added.pt}, en: ${added.en}, es: ${added.es}`);
  console.log("EN/ES com valor vazio precisam de tradução manual.");
}

sync();
