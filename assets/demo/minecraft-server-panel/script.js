const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const restartButton = document.getElementById("restart-btn");

const onlineBadge = document.querySelector(".online-badge");
const serverStatus = document.querySelector(".server-status strong");
const statusDot = document.querySelector(".status-dot");

const consoleBox = document.querySelector(".console");

let serverOnline = true;

const playerCount = document.getElementById("player-count");
const playersOnlineCount = document.getElementById("players-online-count");
const tpsValue = document.getElementById("tps-value");
const ramValue = document.getElementById("ram-value");
const uptimeValue = document.getElementById("uptime-value");

let uptimeSeconds = 12 * 60 * 60 + 34 * 60;

function updateServerStats() {
  if (!serverOnline) {
    playerCount.textContent = "0 / 20";
    playersOnlineCount.textContent = "0 Players";
    tpsValue.textContent = "0.0";
    ramValue.textContent = "0 GB";

    return;
  }

  playerCount.textContent = "8 / 20";
  playersOnlineCount.textContent = "8 Players";
  tpsValue.textContent = "20.0";
  ramValue.textContent = "3.2 GB";
}

function updateUptime() {
  if (!serverOnline) {
    return;
  }

  uptimeSeconds++;

  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);

  uptimeValue.textContent = `${hours}h ${minutes}m`;
}

updateServerStats();

setInterval(updateUptime, 1000);

function addConsoleLog(message) {
  const now = new Date();

  const time = now.toLocaleTimeString("id-ID", {
    hour12: false,
  });

  const log = document.createElement("p");

  log.innerHTML = `
    <span>[${time}]</span>
    ${message}
  `;

  consoleBox.appendChild(log);
  consoleBox.scrollTop = consoleBox.scrollHeight;
}

function updateServerStatus(status) {
  serverOnline = status;

  if (serverOnline) {
    onlineBadge.textContent = "● ONLINE";
    onlineBadge.style.color = "#55c93f";

    serverStatus.textContent = "SERVER ONLINE";

    statusDot.style.background = "#55c93f";
    statusDot.style.boxShadow = "0 0 10px #55c93f";
  } else {
    onlineBadge.textContent = "● OFFLINE";
    onlineBadge.style.color = "#e05252";

    serverStatus.textContent = "SERVER OFFLINE";

    statusDot.style.background = "#e05252";
    statusDot.style.boxShadow = "0 0 10px #e05252";
  }
}

startButton.addEventListener("click", () => {
  if (serverOnline) {
    addConsoleLog("Server is already running.");
    return;
  }

  addConsoleLog("Starting server...");

  startButton.disabled = true;

  setTimeout(() => {
    updateServerStatus(true);

    addConsoleLog("Server started successfully.");

    startButton.disabled = false;
  }, 1500);
});

stopButton.addEventListener("click", () => {
  if (!serverOnline) {
    addConsoleLog("Server is already offline.");
    return;
  }

  addConsoleLog("Stopping server...");

  stopButton.disabled = true;

  setTimeout(() => {
    updateServerStatus(false);

    addConsoleLog("Server stopped.");

    stopButton.disabled = false;
  }, 1500);
});

restartButton.addEventListener("click", () => {
  if (!serverOnline) {
    addConsoleLog("Cannot restart. Server is offline.");
    return;
  }

  addConsoleLog("Restarting server...");

  restartButton.disabled = true;

  updateServerStatus(false);

  setTimeout(() => {
    addConsoleLog("Loading world...");
  }, 800);

  setTimeout(() => {
    updateServerStatus(true);

    addConsoleLog("Server restarted successfully.");

    restartButton.disabled = false;
  }, 2000);
});

const navLinks = document.querySelectorAll(".nav-link");

const pageTitles = {
  dashboard: "Dashboard",
  players: "Players",
  console: "Console",
  worlds: "Worlds",
  statistics: "Statistics",
  settings: "Settings",
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");

    const page = link.dataset.page;

    console.log(`Opening page: ${pageTitles[page]}`);
  });
});
