let player = {
  level: 1,
  xp: 100,
  maxXp: 1000,
};

const xpFill = document.querySelector(".xp-fill");
const levelText = document.querySelector(".level span:first-child");
const xpText = document.querySelector(".level span:last-child");

function updatePlayer() {
  levelText.textContent = `LEVEL ${player.level}`;

  xpText.textContent = `${player.xp} / ${player.maxXp} XP`;

  const percentage = (player.xp / player.maxXp) * 100;

  xpFill.style.width = `${percentage}%`;
}

function updateXP() {
  if (xpFill) {
    xpFill.style.width = `${xp}%`;
  }

  if (xpText) {
    xpText.textContent = `${xp} / ${maxXP} XP`;
  }

  if (levelText) {
    levelText.textContent = `LEVEL ${level}`;
  }
}

function addXP(amount) {
  player.xp += amount;

  // Kalau XP mencapai 1000
  if (player.xp >= player.maxXp) {
    player.xp -= player.maxXp;

    player.level++;

    showLevelUp();
  }

  updatePlayer();
}

function showLevelUp() {
  const levelUp = document.getElementById("level-up");
  const levelText = document.getElementById("level-up-text");

  levelText.textContent = `LEVEL ${player.level}`;

  levelUp.classList.add("show");

  setTimeout(() => {
    levelUp.classList.remove("show");
  }, 2500);
}

const questButton = document.getElementById("quest-btn");

if (questButton) {
  questButton.addEventListener("click", () => {
    addXP(10);

    questButton.textContent = "QUEST COMPLETED";

    questButton.disabled = true;
  });
}

function animateStats() {
  const bars = document.querySelectorAll(".stat-bar div");

  bars.forEach((bar) => {
    const width = bar.style.width;

    bar.style.width = "0%";

    setTimeout(() => {
      bar.style.width = width;
    }, 300);
  });
}

function animateQuest() {
  const questBar = document.querySelector(".quest-progress div");

  if (!questBar) return;

  const width = questBar.style.width || "75%";

  questBar.style.width = "0%";

  setTimeout(() => {
    questBar.style.width = width;
  }, 500);
}

const items = document.querySelectorAll(".item");

const descriptions = {
  "VS CODE": "Code editor untuk membuat project.",
  LINUX: "Operating system untuk development.",
  HTML: "Bahasa untuk membuat struktur website.",
  CSS: "Bahasa untuk membuat tampilan website.",
  JS: "Bahasa untuk membuat website interaktif.",
  CODING: "Skill utama seorang developer.",
};

items.forEach((item) => {
  item.addEventListener("click", () => {
    const icon = item.querySelector("span").textContent;
    const name = item.querySelector("small").textContent;

    const popup = document.getElementById("item-popup");

    document.getElementById("popup-icon").textContent = icon;

    document.getElementById("popup-name").textContent = name;

    document.getElementById("popup-description").textContent =
      descriptions[name] || "Unknown item.";

    popup.classList.add("show");

    setTimeout(() => {
      popup.classList.remove("show");
    }, 2500);
  });
});

function serverOnline() {
  const status = document.querySelector(".server-status");

  status.innerHTML = `
    <span class="status-dot"></span>
    SERVER ONLINE
  `;
}

window.addEventListener("load", () => {
  updatePlayer();

  animateStats();

  animateQuest();

  serverOnline();
});

const questButton = document.getElementById("complete-quest");

questButton.addEventListener("click", () => {
  addXP(100);

  questButton.textContent = "QUEST COMPLETED ✓";

  questButton.disabled = true;

  setTimeout(() => {
    questButton.textContent = "QUEST COMPLETED";
  }, 1000);
});
