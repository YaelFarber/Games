document.addEventListener("DOMContentLoaded", initLeaderboard);

function initLeaderboard() {
  const users = loadUsers();
  const topPlayers = getTopPlayers(users, 3);
  renderLeaderboard(topPlayers);
}

/* ---------- Data ---------- */

function loadUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function getTopPlayers(users, limit) {
  return users
    .filter(isValidPlayer)
    .sort(comparePlayers)
    .slice(0, limit);
}

function isValidPlayer(user) {
  return typeof user.totalScore === "number";
}

function comparePlayers(a, b) {
  if (b.totalScore !== a.totalScore) {
    return b.totalScore - a.totalScore;
  }
  return (b.lastPlayedAt || 0) - (a.lastPlayedAt || 0);
}

/* ---------- Render ---------- */

function renderLeaderboard(players) {
  const listEl = document.getElementById("leaderboard-list");
  const emptyEl = document.getElementById("leaderboard-empty");

  listEl.innerHTML = "";

  if (players.length === 0) {
    emptyEl.classList.remove("hidden");
    listEl.classList.add("hidden");
    return;
  }

  emptyEl.classList.add("hidden");
  listEl.classList.remove("hidden");

  for (let i = 0; i < 3; i++) {
    const player = players[i] || {
      username: "—",
      totalScore: "—",
      lastGamePlayed: "-",
    };

    listEl.appendChild(createPlayerRow(player, i, !players[i]));
  }
}


function showEmptyState(listEl, emptyEl) {
  emptyEl.classList.remove("hidden");
  listEl.classList.add("hidden");
}

function hideEmptyState(listEl, emptyEl) {
  emptyEl.classList.add("hidden");
  listEl.classList.remove("hidden");
}

/* ---------- Components ---------- */

function createPlayerRow(player, index, isPlaceholder = false) {
  const row = document.createElement("div");
  row.className = "leaderboard-row" + (isPlaceholder ? " placeholder" : "");

  row.append(createMedal(index), createPlayerInfo(player));
  return row;
}


function createMedal(index) {
  const medals = ["🥇", "🥈", "🥉"];
  const medal = document.createElement("div");
  medal.className = "medal";
  medal.textContent = medals[index] || "";
  return medal;
}

function createPlayerInfo(player) {
  const wrapper = document.createElement("div");

  const main = document.createElement("div");
  main.className = "player-main";

  const name = document.createElement("div");
  name.className = "player-name";
  name.textContent = player.username;

  const score = document.createElement("div");
  score.className = "player-score";
  score.textContent = player.totalScore;

  main.append(name, score);

  const sub = document.createElement("div");
  sub.className = "player-sub";
  sub.textContent = `Last game played: ${player.lastGamePlayed || "-"}`;

  wrapper.append(main, sub);
  return wrapper;
}
