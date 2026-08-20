// ===== MOBILE MENU =====

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

// ===== CLOSE MOBILE MENU =====

const navLinks = document.querySelectorAll("#nav-menu a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== TYPING EFFECT =====

const typingText = document.getElementById("typing-text");

const texts = [
  "WEB DEVELOPER IN TRAINING",
  "HTML & CSS LEARNER",
  "EXPLORING JAVASCRIPT",
  "BUILDING MY DIGITAL WORLD",
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const currentText = texts[textIndex];

  if (!deleting) {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

// ===== SCROLL REVEAL =====

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ===== ACTIVE NAVBAR =====

const sections = document.querySelectorAll("main section");
const navItems = document.querySelectorAll("#nav-menu a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");

        navItems.forEach((item) => {
          item.classList.remove("active");

          if (item.getAttribute("href") === `#${currentId}`) {
            item.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.5,
  },
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});
