/* ===================================================
   SONG HY RED — Script
   Envelope open + Countdown + Scroll reveal + Music
   =================================================== */

// ── Populate Content from CONFIG ──
document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG === 'undefined') return;

  // Metadata
  document.getElementById("page-title").textContent = CONFIG.documentTitle;
  document.getElementById("meta-desc").content = CONFIG.metaDescription;

  // Envelope & old elements removed, mapping new ones:
  
  // Hero
  const heroGroom = document.getElementById("hero-groom-name");
  if (heroGroom) heroGroom.textContent = CONFIG.groom.name.toUpperCase();
  
  const heroBride = document.getElementById("hero-bride-name");
  if (heroBride) heroBride.textContent = CONFIG.bride.name.toUpperCase();

  // Family - Groom
  const groomFather = document.getElementById("family-groom-father");
  if (groomFather) groomFather.textContent = CONFIG.groom.father;
  
  const groomMother = document.getElementById("family-groom-mother");
  if (groomMother) groomMother.textContent = CONFIG.groom.mother;
  
  const groomAddress = document.getElementById("family-groom-address");
  if (groomAddress) groomAddress.textContent = CONFIG.groom.address;

  // Family - Bride
  const brideFather = document.getElementById("family-bride-father");
  if (brideFather) brideFather.textContent = CONFIG.bride.father;
  
  const brideMother = document.getElementById("family-bride-mother");
  if (brideMother) brideMother.textContent = CONFIG.bride.mother;
  
  const brideAddress = document.getElementById("family-bride-address");
  if (brideAddress) brideAddress.textContent = CONFIG.bride.address;

  // Announce
  const announceNames = document.getElementById("announce-names");
  if (announceNames) announceNames.textContent = `${CONFIG.groom.name.toUpperCase()} & ${CONFIG.bride.name.toUpperCase()}`;
  
  const cursiveNames = document.getElementById("cursive-names");
  if (cursiveNames) cursiveNames.textContent = `${CONFIG.groom.name} & ${CONFIG.bride.name}`;

  // Events
  const eventList = document.getElementById("event-list");
  if (eventList) {
    CONFIG.events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <span class="event-card__icon">${event.icon}</span>
        <p class="event-card__title">${event.title}</p>
        <p class="event-card__detail">${event.time}</p>
        <p class="event-card__detail">${event.address}</p>
      `;
      eventList.appendChild(card);
    });
  }
});

// ── Loading Logic ──
const loadingScreen = document.getElementById("loading");
const musicBtn = document.getElementById("musicBtn");

window.addEventListener("load", () => {
  // Wait a small amount of time to ensure smooth transition
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add("hidden");
    }

    // Unlock body scroll
    document.body.classList.add("opened");

    // Show music button
    if (musicBtn) {
      setTimeout(() => musicBtn.classList.add("visible"), 600);
    }

    // After transition, trigger scroll reveals
    setTimeout(() => {
      initScrollReveal();
    }, 400);
  }, 500); // 500ms delay for aesthetics
});

// ── Countdown Timer ──
let weddingDate = new Date("2026-12-20T10:00:00+07:00").getTime();
if (typeof CONFIG !== 'undefined' && CONFIG.countdownTarget) {
  weddingDate = new Date(CONFIG.countdownTarget).getTime();
}

function updateCountdown() {
  const now = Date.now();
  const diff = weddingDate - now;
  const ids = ["d", "h", "m", "s"];

  if (diff <= 0) {
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = "00";
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const map = { d: days, h: hours, m: minutes, s: seconds };
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = String(map[id]).padStart(2, "0");
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── Scroll Reveal ──
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ── Music Button (placeholder) ──
let isPlaying = false;

if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    musicBtn.textContent = isPlaying ? "♫" : "♪";
    musicBtn.classList.toggle("spinning", isPlaying);

    // If you add an audio file, uncomment below:
    // const audio = document.getElementById('bgMusic');
    // if (isPlaying) { audio.play(); } else { audio.pause(); }
  });
}
