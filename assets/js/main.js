// Cinematic motion and 3D sphere

document.getElementById("year").textContent = new Date().getFullYear();

const siteHeader = document.querySelector(".site-header");
const heroSection = document.querySelector(".hero");

function syncHeaderWithHero() {
  if (!siteHeader || !heroSection) return;
  const threshold = Math.max(80, heroSection.offsetHeight - siteHeader.offsetHeight - 40);
  siteHeader.classList.toggle("is-hero", window.scrollY < threshold);
}

syncHeaderWithHero();
window.addEventListener("scroll", syncHeaderWithHero, { passive: true });
window.addEventListener("resize", syncHeaderWithHero);

// Smooth anchor scrolling
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

// Parallax accents
const agro = document.querySelector(".agroglifo-ring");
const watermark = document.querySelector(".watermark");
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  if (agro) agro.style.transform = `translateY(${y * 0.05}px)`;
  if (watermark) watermark.style.transform = `translateY(${y * 0.03}px)`;
});

// Starfield subtle animation
const stars = document.getElementById("stars");
let starOffset = 0;
function animateStars() {
  starOffset = (starOffset + 0.02) % 100;
  stars.style.backgroundPosition = `${starOffset}px ${starOffset * 0.6}px`;
  requestAnimationFrame(animateStars);
}
animateStars();

// Lightweight image carousel
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const prevButton = carousel.querySelector(".carousel-btn.prev");
  const nextButton = carousel.querySelector(".carousel-btn.next");
  if (!slides.length) return;

  let index = 0;
  let timer = null;

  const showSlide = (newIndex) => {
    slides[index].classList.remove("active");
    index = (newIndex + slides.length) % slides.length;
    slides[index].classList.add("active");
  };

  const restartAuto = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => showSlide(index + 1), 4500);
  };

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showSlide(index - 1);
      restartAuto();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(index + 1);
      restartAuto();
    });
  }
  restartAuto();
});

// Randomize support logos on each page load
document.querySelectorAll("[data-randomize-logos]").forEach((grid) => {
  const logos = Array.from(grid.querySelectorAll(":scope > .partner-logo"));
  if (logos.length < 2) return;

  for (let i = logos.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [logos[i], logos[j]] = [logos[j], logos[i]];
  }

  logos.forEach((logo) => grid.appendChild(logo));
});

// Modal handling
const overlay = document.getElementById("modal-overlay");
const content = document.getElementById("modal-content");

function openModal(templateId) {
  const template = document.getElementById(templateId);
  if (!template) return;
  content.innerHTML = template.innerHTML;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  content.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".team-card").forEach((card) => {
  const id = card.getAttribute("data-modal-target");
  card.addEventListener("click", () => openModal(id));
  const button = card.querySelector(".card-link");
  if (button) {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openModal(id);
    });
  }
});

if (overlay) {
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target.classList.contains("modal-close")) {
      closeModal();
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("open")) {
    closeModal();
  }
});

// GSAP sequences
if (window.gsap) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  gsap.from(".hero-copy > *", {
    opacity: 0,
    y: 28,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
  });

  gsap.from("#sphere-canvas", {
    opacity: 0,
    scale: 0.9,
    duration: 1.4,
    ease: "power3.out",
  });

  if (!prefersReducedMotion) {
    gsap.to("#sphere-canvas", {
      y: -18,
      duration: 3.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });

    gsap.to("#sphere-canvas", {
      x: 14,
      duration: 4.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });

    gsap.to("#sphere-canvas", {
      scale: 1.07,
      duration: 3.4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });

    gsap.to("#sphere-canvas", {
      opacity: 0.74,
      duration: 3.2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 1.4,
    });
  }
}

if (window.ScrollReveal) {
  const sr = ScrollReveal({
    distance: "30px",
    duration: 900,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    interval: 120,
  });
  sr.reveal(".section-header, .card, .team-card, .cta, .timeline-item", { origin: "bottom" });
}

// Three.js metallic sphere with procedural PBR maps
(function initSphere() {
  const canvas = document.getElementById("sphere-canvas");
  if (!canvas || !window.THREE) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 4.2);

  const resize = () => {
    const size = Math.min(canvas.parentElement.clientWidth, 440);
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
  keyLight.position.set(3, 2, 4);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x8fd9ff, 0.6);
  fillLight.position.set(-4, -2, 2);
  scene.add(fillLight);

  const rimLight = new THREE.PointLight(0x5c6b85, 0.8, 10);
  rimLight.position.set(-2, 3, -2);
  scene.add(rimLight);

  const geometry = new THREE.SphereGeometry(1.4, 128, 128);

  const loader = new THREE.TextureLoader();
  const baseColor = loader.load("assets/img/sphere_basecolor.png");
  const roughness = loader.load("assets/img/sphere_roughness.png");
  const metalness = loader.load("assets/img/sphere_metalness.png");
  const normal = loader.load("assets/img/sphere_normal.png");

  baseColor.colorSpace = THREE.SRGBColorSpace;
  roughness.colorSpace = THREE.NoColorSpace;
  metalness.colorSpace = THREE.NoColorSpace;
  normal.colorSpace = THREE.NoColorSpace;

  [baseColor, roughness, metalness, normal].forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
  });

  const material = new THREE.MeshPhysicalMaterial({
    map: baseColor,
    roughnessMap: roughness,
    metalnessMap: metalness,
    normalMap: normal,
    metalness: 1.0,
    roughness: 0.22,
    clearcoat: 0.4,
    clearcoatRoughness: 0.2,
    reflectivity: 0.95,
  });

  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  function animate() {
    sphere.rotation.y += 0.003;
    sphere.rotation.x += 0.0012;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();
