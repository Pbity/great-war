/* SECRET HITLER: QR & SKLEP WPLYWOW — LOGIKA APLIKACJI */

const BOARD_POWERS = {
  "5-6": [
    "Brak mocy",
    "Brak mocy",
    "Podglad 3 gornych ustaw",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIESTWO FASZYSTOW"
  ],
  "7-8": [
    "Brak mocy",
    "Sprawdzenie lojalnosci",
    "Wybor specjalny Prezydenta",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIESTWO FASZYSTOW"
  ],
  "9-10": [
    "Sprawdzenie lojalnosci",
    "Sprawdzenie lojalnosci",
    "Wybor specjalny Prezydenta",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIESTWO FASZYSTOW"
  ]
};

const DEFAULT_STATIONS = [
  "Kuchnia — lodowka",
  "Przedpokoj — wieszak",
  "Lazienka — lustro",
  "Salon — regal z ksiazkami",
  "Balkon — drzwi",
  "Sypialnia — szafa",
  "Korytarz — wlacznik swiatla",
  "Jadalnia — kredens",
  "Biurko — lampka",
  "Wejscie — drzwi frontowe",
  "Kuchnia — ekspres do kawy",
  "Salon — parapet",
  "Przedpokoj — szafka na buty",
  "Spizarnia / schowek",
  "Korytarz — zegar scienny"
];

const SHOP_CATALOG = [
  {
    id: "trace_narrow",
    name: "Slad Faszysty: Zawezenie",
    category: "WYWIAD",
    desc: "Wskazuje 1 prawdziwa stacje odwiedzona przez Faszyste oraz 2 losowe stacje Liberalow (bez kolejnosci).",
    defaultCost: 3,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "trace_delayed",
    name: "Slad Faszysty: Opozniony",
    category: "WYWIAD",
    desc: "Ujawnia 1 dokladna stacje QR, na ktorej odbil sie Faszysta w POPRZEDNIEJ rundzie.",
    defaultCost: 3,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "trace_hot",
    name: "Slad Faszysty: Gorace Stacje",
    category: "WYWIAD",
    desc: "Pokazuje liste do 3 ostatnich stacji odwiedzonych przez Faszystow od poczatku gry (bez rund i kolejnosci).",
    defaultCost: 4,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "extra_vote",
    name: "Tajny +1 Glos",
    category: "GLOSOWANIE",
    desc: "Twoj najblizszy glos (JA lub NEIN) policzy sie podwojnie w tajnym podsumowaniu.",
    defaultCost: 2,
    defaultQty: 3,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "block_vote",
    name: "Blokada Glosu (Cenzura)",
    category: "GLOSOWANIE",
    desc: "Glos wybranego gracza nie zostanie policzony w najblizszym glosowaniu.",
    defaultCost: 3,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "player"
  },
  {
    id: "shield",
    name: "Tarcza Ochronna",
    category: "OBRONA",
    desc: "Chroni wybranego gracza (lub Ciebie) przed tajna eliminacja w tej rundzie.",
    defaultCost: 3,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "player_self"
  },
  {
    id: "sabotage",
    name: "Sabotaz Stacji",
    category: "DYWERSJA",
    desc: "Wylacza wybrana stacje QR do konca tej rundy — nikt nie zdobedzie tam punktu.",
    defaultCost: 1,
    defaultQty: 3,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "station"
  },
  {
    id: "wiretap",
    name: "Podsluch Stacji",
    category: "WYWIAD",
    desc: "Wybierasz stacje QR. Jesli ktos ja zeskanuje w tej lub nastepnej rundzie, otrzymasz jego imie.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "station"
  },
  {
    id: "activity_report",
    name: "Raport Aktywnosci",
    category: "WYWIAD",
    desc: "Pokazuje liste graczy, ktorzy w poprzedniej rundzie nie zeskanowali zadnego kodu QR.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "counter_intel",
    name: "Raport Kontrwywiadu",
    category: "WYWIAD",
    desc: "Pokazuje liste przedmiotow kupionych w Sklepie w poprzedniej rundzie (bez imion).",
    defaultCost: 1,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "compare_factions",
    name: "Porownanie Frakcji",
    category: "WYWIAD",
    desc: "Wskazujesz 2 graczy. Otrzymasz odpowiedz: TA SAMA FRAKCJA lub ROZNE FRAKCJE (raz na gre na gracza).",
    defaultCost: 4,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "two_players"
  },
  {
    id: "cut_debate",
    name: "Skrocenie Debaty",
    category: "PRESJA",
    desc: "Anonimowo ucina 2 minuty z aktualnego zegara dyskusji na Ekranie Glownym.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "false_trail",
    name: "Falszywy Trop",
    category: "MASKOWANIE",
    desc: "W tej rundzie Twoje skanowania i frakcja zwracaja falszywe dane w raportach wywiadu.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "fascist_kill",
    name: "Tajny Zamach (Faszysci)",
    category: "ELIMINACJA",
    desc: "Widoczne tylko dla zwyklych Faszystow. Zleca tajna eliminacje do bufora (wspolna pula).",
    defaultCost: 3,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: "player"
  }
];

function randomToken(len = 8) {
  const chars = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function createInitialShopConfig() {
  const cfg = {};
  SHOP_CATALOG.forEach(item => {
    cfg[item.id] = {
      enabled: item.defaultEnabled,
      cost: item.defaultCost,
      maxQty: item.defaultQty,
      remaining: item.defaultQty
    };
  });
  return cfg;
}

function createInitialStations() {
  return DEFAULT_STATIONS.map((loc, idx) => ({
    id: idx + 1,
    location: loc,
    token: randomToken(10),
    sabotagedRound: 0
  }));
}

let state = {
  roomCode: "",
  started: false,
  round: 1,
  phase: "CHORES", // CHORES | DISCUSSION
  timerSeconds: 120,
  timerRunning: false,
  settings: {
    boardSize: "7-8",
    choresDuration: 120,
    discussionDuration: 300,
    baseUrl: "",
    limitOnePurchasePerRound: true
  },
  liberalPolicies: 0,
  fascistPolicies: 0,
  electionTracker: 0,
  winner: null,
  votingOpen: false,
  votes: {}, // playerId -> 'JA' | 'NEIN'
  lastVoteSummary: null,
  players: [], // {id, name, role, alive, points, assignedStation, completedRound, purchasedRound, usedCompare, foundWeapon, extraVoteActive, falseTrailRound, logs:[]}
  stations: createInitialStations(),
  weaponStationId: null,
  weaponUsed: false,
  shopConfig: createInitialShopConfig(),
  scanHistory: [], // {round, playerId, stationId, isFascist, fake}
  purchaseHistory: [], // {round, itemName}
  wiretaps: [], // {ownerId, stationId, expiresRound}
  shields: {}, // targetId -> round
  blockedVotes: {}, // targetId -> true
  bufferedEliminations: [], // {sourceId, targetId, reason}
  publicLogs: []
};

// Tryb polaczenia: 'NONE' | 'DEMO' | 'PEER_HOST' | 'PEER_CLIENT' | 'LAN_HOST' | 'LAN_CLIENT'
let connMode = "NONE";
let myPlayerId = null;
let roleVisible = false;
let timerInterval = null;
let lanPollInterval = null;
let peerInstance = null;
let hostConnections = [];
let clientConn = null;
let qrScanner = null;
let lanAvailable = false;
let pendingScanToken = null;

/* ==================== AUDIO (WEB AUDIO API) ==================== */
function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(523.25, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(392.0, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  } catch (e) {
    // Brak wsparcia audio
  }
}

/* ==================== NAWIGACJA ==================== */
function switchView(viewName) {
  document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  const target = document.getElementById("view-" + viewName);
  if (target) target.classList.add("active");
  const btn = document.querySelector(`.tab-btn[data-view="${viewName}"]`);
  if (btn) btn.classList.add("active");

  if (viewName === "config") {
    renderConfigView();
  }
  if (viewName !== "phone") {
    stopQrScanner();
  }
  renderAll();
}

function switchPhonePane(pane) {
  document.querySelectorAll(".phone-pane").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".subtab-btn").forEach(b => b.classList.remove("active"));
  const el = document.getElementById("phone-pane-" + pane);
  if (el) el.classList.add("active");
  const btn = document.querySelector(`.subtab-btn[data-pane="${pane}"]`);
  if (btn) btn.classList.add("active");
  if (pane !== "task") stopQrScanner();
}

/* ==================== SYNCHRONIZACJA ==================== */
function broadcastState() {
  if (connMode === "PEER_HOST") {
    const payload = { type: "STATE", state };
    hostConnections.forEach(c => {
      if (c.open) c.send(payload);
    });
  } else if (connMode === "LAN_HOST") {
    fetch("/api/state", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    }).catch(() => {});
  }
  renderAll();
}

function sendActionToHost(action) {
  if (connMode === "DEMO" || connMode === "PEER_HOST" || connMode === "LAN_HOST") {
    handleHostAction(action);
  } else if (connMode === "PEER_CLIENT" && clientConn && clientConn.open) {
    clientConn.send({ type: "ACTION", action });
  } else if (connMode === "LAN_CLIENT") {
    fetch("/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(action)
    }).then(() => pollLanState()).catch(() => {});
  }
}

/* ==================== TRYB 1: DEMO LOKALNE ==================== */
function startLocalDemo() {
  connMode = "DEMO";
  state.roomCode = "TEST-LOKALNY";
  state.players = [
    "Marek", "Kasia", "Tomek", "Ania", "Piotr", "Zosia", "Michal"
  ].map((name, i) => createPlayerObj("p" + (i + 1), name));
  myPlayerId = state.players[0].id;
  startGameAndAssignRoles();
  document.getElementById("demo-switcher-panel").style.display = "block";
  document.getElementById("demo-scan-controls").style.display = "block";
  updateConnectionBadge("TRYB TESTOWY (7 GRACZY)");
  switchView("host");
}

function selectDemoPlayer(pid) {
  myPlayerId = pid;
  roleVisible = false;
  document.getElementById("secret-role-container").style.display = "none";
  document.getElementById("btn-toggle-role").textContent = "ODSLON TAJNA ROLE";
  loadPersonalNotes();
  renderAll();
}

/* ==================== TRYB 2: ONLINE (PEERJS) ==================== */
function hostOnlineRoom() {
  let code = document.getElementById("peer-room-input").value.trim().toUpperCase();
  if (!code) code = "SH-" + randomToken(4).toUpperCase();
  const peerId = "sh-qr-room-" + code.toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (typeof Peer === "undefined") {
    alert("Brak biblioteki PeerJS (sprawdz polaczenie z internetem).");
    return;
  }

  connMode = "PEER_HOST";
  state.roomCode = code;
  hostConnections = [];
  peerInstance = new Peer(peerId);

  peerInstance.on("open", () => {
    updateConnectionBadge("ONLINE HOST: " + code);
    document.getElementById("connection-info").innerHTML =
      `Pokoj uruchomiony. Kod pokoju dla graczy: <strong>${code}</strong>. Podaj ten kod znajomym lub wydrukuj kody QR.`;
    switchView("host");
  });

  peerInstance.on("connection", conn => {
    hostConnections.push(conn);
    conn.on("open", () => {
      conn.send({ type: "STATE", state });
    });
    conn.on("data", data => {
      if (data && data.type === "ACTION") {
        handleHostAction(data.action);
      }
    });
  });

  peerInstance.on("error", err => {
    alert("Blad PeerJS: " + err.type);
  });
}

function joinOnlineRoom() {
  const code = document.getElementById("peer-room-input").value.trim().toUpperCase();
  const name = document.getElementById("peer-player-name").value.trim();
  if (!code || !name) {
    alert("Wpisz kod pokoju oraz swoje imie.");
    return;
  }
  const peerId = "sh-qr-room-" + code.toLowerCase().replace(/[^a-z0-9-]/g, "");
  connMode = "PEER_CLIENT";

  const savedId = localStorage.getItem("sh_player_id_" + code) || ("pl-" + randomToken(6));
  myPlayerId = savedId;
  localStorage.setItem("sh_player_id_" + code, savedId);
  localStorage.setItem("sh_last_room", code);
  localStorage.setItem("sh_last_name", name);
  localStorage.setItem("sh_last_mode", "PEER");

  peerInstance = new Peer();
  peerInstance.on("open", () => {
    clientConn = peerInstance.connect(peerId);
    clientConn.on("open", () => {
      updateConnectionBadge("ONLINE GRACZ: " + name);
      sendActionToHost({ type: "JOIN", id: myPlayerId, name });
      if (pendingScanToken) {
        setTimeout(() => processScannedToken(pendingScanToken), 500);
      }
      switchView("phone");
    });
    clientConn.on("data", data => {
      if (data && data.type === "STATE") {
        state = data.state;
        renderAll();
      }
    });
  });
  peerInstance.on("error", err => {
    alert("Nie udalo sie polaczyc z pokojem: " + err.type);
  });
}

/* ==================== TRYB 3: SERWER LAN (PYTHON) ==================== */
function checkLanServer() {
  fetch("/api/ping")
    .then(r => r.json())
    .then(data => {
      if (data && data.ok) {
        lanAvailable = true;
        const box = document.getElementById("lan-status-box");
        box.innerHTML = `<strong>SERWER LAN AKTYWNY!</strong> Adres w sieci Wi-Fi: <code>${data.url || window.location.origin}</code>`;
        if (!state.settings.baseUrl) {
          state.settings.baseUrl = window.location.origin + "/";
        }
      }
    })
    .catch(() => {
      lanAvailable = false;
      const box = document.getElementById("lan-status-box");
      box.innerHTML = "Lokalny serwer Python nie zostal wykryty (uruchom <code>server.py</code>, aby korzystac z trybu offline Wi-Fi).";
    });
}

function hostLanRoom() {
  if (!lanAvailable) {
    alert("Uruchom najpierw plik server.py (lub start_lan.bat / start_lan.sh) na laptopie.");
    return;
  }
  connMode = "LAN_HOST";
  state.roomCode = "LAN-WIFI";
  updateConnectionBadge("LAN HOST (SERWER PYTHON)");
  broadcastState();
  if (lanPollInterval) clearInterval(lanPollInterval);
  lanPollInterval = setInterval(pollLanActionsForHost, 1200);
  switchView("host");
}

function joinLanRoom() {
  if (!lanAvailable) {
    alert("Brak polaczenia z lokalnym serwerem Python.");
    return;
  }
  const name = document.getElementById("lan-player-name").value.trim();
  if (!name) {
    alert("Wpisz swoje imie.");
    return;
  }
  connMode = "LAN_CLIENT";
  const savedId = localStorage.getItem("sh_lan_player_id") || ("pl-" + randomToken(6));
  myPlayerId = savedId;
  localStorage.setItem("sh_lan_player_id", savedId);
  localStorage.setItem("sh_last_name", name);
  localStorage.setItem("sh_last_mode", "LAN");

  updateConnectionBadge("LAN GRACZ: " + name);
  sendActionToHost({ type: "JOIN", id: myPlayerId, name });
  if (lanPollInterval) clearInterval(lanPollInterval);
  lanPollInterval = setInterval(pollLanState, 1200);
  pollLanState();
  if (pendingScanToken) {
    setTimeout(() => processScannedToken(pendingScanToken), 700);
  }
  switchView("phone");
}

function pollLanActionsForHost() {
  if (connMode !== "LAN_HOST") return;
  fetch("/api/actions")
    .then(r => r.json())
    .then(data => {
      if (data && Array.isArray(data.actions) && data.actions.length > 0) {
        data.actions.forEach(a => handleHostAction(a));
      }
    })
    .catch(() => {});
}

function pollLanState() {
  if (connMode !== "LAN_CLIENT") return;
  fetch("/api/state")
    .then(r => r.json())
    .then(data => {
      if (data && data.players) {
        state = data;
        renderAll();
      }
    })
    .catch(() => {});
}

function updateConnectionBadge(text) {
  document.getElementById("connection-badge").textContent = text;
}

/* ==================== LOGIKA GRY (HOST) ==================== */
function createPlayerObj(id, name) {
  return {
    id,
    name,
    role: "LIBERAL",
    alive: true,
    points: 0,
    assignedStation: 1,
    completedRound: 0,
    purchasedRound: 0,
    usedCompare: false,
    foundWeapon: false,
    extraVoteActive: false,
    falseTrailRound: 0,
    logs: []
  };
}

function addPublicLog(text) {
  const time = new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  state.publicLogs.unshift(`[${time} | R${state.round}] ${text}`);
}

function addPrivateLog(player, text) {
  const time = new Date().toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
  player.logs.unshift(`[${time} | R${state.round}] ${text}`);
}

function clearPublicLog() {
  state.publicLogs = [];
  broadcastState();
}

function addPlayerFromHost() {
  const inp = document.getElementById("host-add-player-input");
  const name = inp.value.trim();
  if (!name) return;
  state.players.push(createPlayerObj("pl-" + randomToken(5), name));
  inp.value = "";
  addPublicLog(`Dolaczyl gracz: ${name}.`);
  broadcastState();
}

function startGameAndAssignRoles() {
  if (state.players.length < 5) {
    alert("Do rozpoczecia gry potrzeba minimum 5 graczy.");
    return;
  }

  // Dopasowanie planszy do liczby graczy jesli trzeba
  const n = state.players.length;
  if (n <= 6) state.settings.boardSize = "5-6";
  else if (n <= 8) state.settings.boardSize = "7-8";
  else state.settings.boardSize = "9-10";

  let fascistsCount = 1;
  if (n >= 7 && n <= 8) fascistsCount = 2;
  if (n >= 9) fascistsCount = 3;

  const roles = ["HITLER"];
  for (let i = 0; i < fascistsCount; i++) roles.push("FASCIST");
  while (roles.length < n) roles.push("LIBERAL");

  // Tasowanie Fisher-Yates
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  state.started = true;
  state.round = 1;
  state.phase = "CHORES";
  state.timerSeconds = state.settings.choresDuration;
  state.timerRunning = false;
  state.liberalPolicies = 0;
  state.fascistPolicies = 0;
  state.electionTracker = 0;
  state.winner = null;
  state.votingOpen = false;
  state.votes = {};
  state.lastVoteSummary = null;
  state.scanHistory = [];
  state.purchaseHistory = [];
  state.wiretaps = [];
  state.shields = {};
  state.blockedVotes = {};
  state.bufferedEliminations = [];
  state.weaponStationId = Math.floor(Math.random() * state.stations.length) + 1;
  state.weaponUsed = false;

  // Reset puli sklepu do wartosci maxQty
  Object.keys(state.shopConfig).forEach(k => {
    state.shopConfig[k].remaining = state.shopConfig[k].maxQty;
  });

  state.stations.forEach(s => { s.sabotagedRound = 0; });

  state.players.forEach((p, idx) => {
    p.role = roles[idx];
    p.alive = true;
    p.points = 0;
    p.completedRound = 0;
    p.purchasedRound = 0;
    p.usedCompare = false;
    p.foundWeapon = false;
    p.extraVoteActive = false;
    p.falseTrailRound = 0;
    p.logs = [];
  });

  assignStationsForRound();
  addPublicLog(`Rozpoczeto nowa gre (${n} graczy, plansza ${state.settings.boardSize}). Role zostaly rozdane.`);
  broadcastState();
}

function assignStationsForRound() {
  state.players.forEach(p => {
    if (p.alive) {
      p.assignedStation = Math.floor(Math.random() * state.stations.length) + 1;
    }
  });
}

/* ==================== TIMER ==================== */
function timerStart() {
  if (state.timerRunning) return;
  state.timerRunning = true;
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (!state.timerRunning) return;
    if (state.timerSeconds > 0) {
      state.timerSeconds--;
      broadcastState();
    } else {
      playChime();
      if (state.phase === "CHORES") {
        state.phase = "DISCUSSION";
        state.timerSeconds = state.settings.discussionDuration;
        addPublicLog("Koniec fazy Prac Domowych. Rozpoczyna sie Dyskusja przy stole.");
        broadcastState();
      } else {
        state.timerRunning = false;
        addPublicLog("Czas dyskusji dobiegl konca. Czas na glosowanie.");
        broadcastState();
      }
    }
  }, 1000);
  broadcastState();
}

function timerPause() {
  state.timerRunning = false;
  broadcastState();
}

function timerSwitchPhase() {
  playChime();
  if (state.phase === "CHORES") {
    state.phase = "DISCUSSION";
    state.timerSeconds = state.settings.discussionDuration;
    addPublicLog("Przelaczono faze na: DYSKUSJA.");
  } else {
    state.phase = "CHORES";
    state.timerSeconds = state.settings.choresDuration;
    addPublicLog("Przelaczono faze na: PRACE DOMOWE.");
  }
  broadcastState();
}

function nextRound() {
  state.round++;
  state.phase = "CHORES";
  state.timerSeconds = state.settings.choresDuration;
  state.timerRunning = false;
  state.votingOpen = false;
  state.votes = {};
  state.shields = {};
  state.blockedVotes = {};
  state.wiretaps = state.wiretaps.filter(w => w.expiresRound >= state.round);
  assignStationsForRound();
  addPublicLog(`Rozpoczeto Runde ${state.round}. Przydzielono nowe stacje QR.`);
  broadcastState();
}

/* ==================== PLANSZA I GLOSOWANIE ==================== */
function togglePolicy(type, index) {
  if (type === "LIBERAL") {
    state.liberalPolicies = (state.liberalPolicies === index + 1) ? index : index + 1;
    if (state.liberalPolicies >= 5) {
      state.winner = "ZWYCIESTWO LIBERALOW (5 USTAW LIBERALNYCH)";
      addPublicLog(state.winner);
    }
  } else {
    state.fascistPolicies = (state.fascistPolicies === index + 1) ? index : index + 1;
    if (state.fascistPolicies >= 6) {
      state.winner = "ZWYCIESTWO FASZYSTOW (6 USTAW FASZYSTOWSKICH)";
      addPublicLog(state.winner);
    }
  }
  broadcastState();
}

function changeTracker(delta) {
  if (delta < 0) state.electionTracker = 0;
  else state.electionTracker = Math.min(3, state.electionTracker + 1);
  if (state.electionTracker === 3) {
    addPublicLog("Odrzucono 3 rzady z rzedu — uchwalana jest gorna ustawa z talii.");
  }
  broadcastState();
}

function openVoting() {
  state.votingOpen = true;
  state.votes = {};
  state.lastVoteSummary = null;
  addPublicLog("Otwarto glosowanie nad rzadem na telefonach graczy.");
  broadcastState();
}

function tallyVotes() {
  if (!state.votingOpen) return;
  let ja = 0;
  let nein = 0;
  let blockedCount = 0;

  state.players.forEach(p => {
    if (!p.alive) return;
    const v = state.votes[p.id];
    if (!v) return;
    if (state.blockedVotes[p.id]) {
      blockedCount++;
      return;
    }
    const weight = p.extraVoteActive ? 2 : 1;
    if (v === "JA") ja += weight;
    else nein += weight;
    p.extraVoteActive = false;
  });

  state.blockedVotes = {};
  state.votingOpen = false;
  const passed = ja > nein;
  const resText = `WYNIK GLOSOWANIA: JA ${ja} — NEIN ${nein}. Rzad ${passed ? "PRZYJETY" : "ODRZUCONY"}.`;
  state.lastVoteSummary = resText;
  addPublicLog(resText);
  broadcastState();
}

/* ==================== ELIMINACJE ==================== */
function manualExecute(playerId) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;
  if (!confirm(`Czy na pewno przeprowadzic EGZEKUCJE na graczu ${p.name}?`)) return;
  p.alive = false;
  addPublicLog(`EGZEKUCJA: Gracz ${p.name} zostal wyeliminowany z gry.`);
  if (p.role === "HITLER") {
    state.winner = `ZWYCIESTWO LIBERALOW — ${p.name} BYL HITLEREM!`;
    addPublicLog(state.winner);
  }
  broadcastState();
}

function manualRevive(playerId) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;
  p.alive = true;
  if (state.winner && state.winner.includes(p.name)) state.winner = null;
  addPublicLog(`PRZYWROCONO gracza ${p.name} do gry.`);
  broadcastState();
}

function resolveEliminations() {
  if (state.bufferedEliminations.length === 0) {
    addPublicLog("Rozliczenie bufora: brak tajnych eliminacji w tej rundzie.");
    broadcastState();
    return;
  }

  const queue = [...state.bufferedEliminations];
  state.bufferedEliminations = [];

  queue.forEach(el => {
    const target = state.players.find(p => p.id === el.targetId);
    if (!target || !target.alive) return;
    if (state.shields[target.id] === state.round) {
      addPublicLog(`TAJNY ZAMACH ZABLOKOWANY: Tarcza Ochronna uratowala jednego z graczy.`);
      addPrivateLog(target, "Twoja Tarcza Ochronna zablokowala zamach w tej rundzie.");
    } else {
      target.alive = false;
      addPublicLog(`TAJNA ELIMINACJA: Gracz ${target.name} zostal wyeliminowany.`);
      if (target.role === "HITLER") {
        state.winner = `ZWYCIESTWO LIBERALOW — ${target.name} BYL HITLEREM!`;
        addPublicLog(state.winner);
      }
    }
  });
  broadcastState();
}

/* ==================== OBSLUGA AKCJI OD GRACZY ==================== */
function handleHostAction(action) {
  if (!action || !action.type) return;

  if (action.type === "JOIN") {
    const existing = state.players.find(p => p.id === action.id);
    if (!existing) {
      state.players.push(createPlayerObj(action.id, action.name));
      addPublicLog(`Gracz ${action.name} dolaczyl do pokoju.`);
    } else {
      existing.name = action.name;
    }
    broadcastState();
    return;
  }

  const player = state.players.find(p => p.id === action.playerId);
  if (!player || !player.alive) return;

  if (action.type === "VOTE") {
    if (!state.votingOpen) return;
    state.votes[player.id] = action.vote;
    broadcastState();
    return;
  }

  if (action.type === "SCAN_QR") {
    if (state.phase !== "CHORES") {
      addPrivateLog(player, "Skanowanie odrzucone — trwa faza Dyskusji.");
      broadcastState();
      return;
    }
    const station = state.stations.find(s => s.token === action.token);
    if (!station) {
      addPrivateLog(player, "Nieprawidlowy kod QR.");
      broadcastState();
      return;
    }
    if (station.sabotagedRound === state.round) {
      addPrivateLog(player, `Stacja #${station.id} (${station.location}) jest ZASABOTOWANA w tej rundzie.`);
      broadcastState();
      return;
    }

    // Zapis historii skanowan (z uwzglednieniem Falszywego Tropu)
    const isActuallyFascist = (player.role === "FASCIST" || player.role === "HITLER");
    const hasFalseTrail = (player.falseTrailRound === state.round);
    state.scanHistory.push({
      round: state.round,
      playerId: player.id,
      stationId: station.id,
      isFascist: hasFalseTrail ? !isActuallyFascist : isActuallyFascist,
      fake: hasFalseTrail
    });

    // Sprawdzenie podsluchow na tej stacji
    state.wiretaps.forEach(w => {
      if (w.stationId === station.id && w.expiresRound >= state.round && w.ownerId !== player.id) {
        const owner = state.players.find(p => p.id === w.ownerId);
        if (owner) {
          const shownName = hasFalseTrail ? "NIEZNANY (FALSZYWY TROP)" : player.name;
          addPrivateLog(owner, `PODSLUCH STACJI #${station.id}: Zeskanowal ja gracz ${shownName}.`);
        }
      }
    });

    // Sprawdzenie ukrytej broni
    if (station.id === state.weaponStationId && !state.weaponUsed) {
      player.foundWeapon = true;
      addPrivateLog(player, `ZNALAZLES UKRYTA BRON na stacji #${station.id}! Mozesz jej uzyc w zakladce ZADANIE QR.`);
    }

    // Zaliczanie zadania
    if (station.id === player.assignedStation) {
      if (player.completedRound === state.round) {
        addPrivateLog(player, `Zadanie w rundzie ${state.round} zostalo juz wczesniej zaliczone.`);
      } else {
        player.completedRound = state.round;
        player.points += 1;
        addPrivateLog(player, `Zaliczone zadanie na stacji #${station.id} (${station.location}). Otrzymujesz +1 PKT Wplywu.`);
      }
    } else {
      addPrivateLog(player, `Zeskanowano stacje #${station.id} (${station.location}), ale Twoim celem byla stacja #${player.assignedStation}.`);
    }

    broadcastState();
    return;
  }

  if (action.type === "USE_WEAPON") {
    if (!player.foundWeapon || state.weaponUsed) return;
    state.weaponUsed = true;
    player.foundWeapon = false;
    state.bufferedEliminations.push({
      sourceId: player.id,
      targetId: action.targetId,
      reason: "UKRYTA BRON QR"
    });
    const t = state.players.find(p => p.id === action.targetId);
    addPrivateLog(player, `Zlecono tajna eliminacje gracza ${t ? t.name : "?"}. Zostanie rozliczona na Ekranie Glownym.`);
    broadcastState();
    return;
  }

  if (action.type === "BUY_ITEM") {
    processShopPurchase(player, action.itemId, action.target1, action.target2);
    broadcastState();
  }
}

/* ==================== LOGIKA SKLEPU (WSPOLNA PULA + 3 SLADY FASZYSTY) ==================== */
function processShopPurchase(player, itemId, target1, target2) {
  const item = SHOP_CATALOG.find(i => i.id === itemId);
  const cfg = state.shopConfig[itemId];
  if (!item || !cfg || !cfg.enabled) return;

  if (item.fascistOnly && player.role !== "FASCIST") {
    addPrivateLog(player, "Brak uprawnien do tego przedmiotu.");
    return;
  }
  if (cfg.remaining <= 0) {
    addPrivateLog(player, `Przedmiot "${item.name}" zostal juz wykupiony ze wspolnej puli.`);
    return;
  }
  if (player.points < cfg.cost) {
    addPrivateLog(player, `Za malo Punktow Wplywu na "${item.name}".`);
    return;
  }
  if (state.settings.limitOnePurchasePerRound && player.purchasedRound === state.round) {
    addPrivateLog(player, "Limit: mozesz kupic tylko 1 przedmiot w sklepie na runde.");
    return;
  }
  if (itemId === "compare_factions" && player.usedCompare) {
    addPrivateLog(player, "Porownanie Frakcji mozna wykorzystac tylko raz na cala gre.");
    return;
  }

  // Walidacja danych dla 3 wariantow Sladu Faszysty ZANIM pobierzemy punkty i pule
  if (itemId === "trace_narrow") {
    const fasScans = state.scanHistory.filter(s => s.isFascist && s.round >= state.round - 1);
    if (fasScans.length === 0) {
      addPrivateLog(player, "SLAD FASZYSTY (ZAWEZENIE): Brak swiezych sladow Faszystow z tej ani poprzedniej rundy. Punkty i pula NIE zostaly pobrane.");
      return;
    }
    const pickedFas = fasScans[fasScans.length - 1];
    const libStationIds = [...new Set(
      state.scanHistory.filter(s => !s.isFascist && s.stationId !== pickedFas.stationId).map(s => s.stationId)
    )];
    // Dopelnienie losowymi stacjami, jesli za malo skanow Liberalow
    while (libStationIds.length < 2) {
      const rnd = Math.floor(Math.random() * state.stations.length) + 1;
      if (rnd !== pickedFas.stationId && !libStationIds.includes(rnd)) libStationIds.push(rnd);
    }
    // Wybor 2 i tasowanie
    libStationIds.sort(() => Math.random() - 0.5);
    const trio = [pickedFas.stationId, libStationIds[0], libStationIds[1]].sort(() => Math.random() - 0.5);
    const names = trio.map(id => {
      const st = state.stations.find(x => x.id === id);
      return `#${id} (${st ? st.location : "?"})`;
    }).join(", ");
    addPrivateLog(player, `SLAD FASZYSTY (ZAWEZENIE): Faszysta odbil sie ostatnio w jednym z tych miejsc: ${names}.`);
  }
  else if (itemId === "trace_delayed") {
    if (state.round <= 1) {
      addPrivateLog(player, "SLAD FASZYSTY (OPOZNIONY): Dostepny od 2. rundy. Punkty i pula NIE zostaly pobrane.");
      return;
    }
    const prevFas = state.scanHistory.filter(s => s.isFascist && s.round === state.round - 1);
    if (prevFas.length === 0) {
      addPrivateLog(player, `SLAD FASZYSTY (OPOZNIONY): Zaden Faszysta nie zeskanowal kodu w rundzie ${state.round - 1}. Punkty i pula NIE zostaly pobrane.`);
      return;
    }
    const chosen = prevFas[Math.floor(Math.random() * prevFas.length)];
    const st = state.stations.find(x => x.id === chosen.stationId);
    addPrivateLog(player, `SLAD FASZYSTY (OPOZNIONY): W poprzedniej rundzie (R${state.round - 1}) Faszysta zeskanowal stacje #${chosen.stationId} (${st ? st.location : "?"}).`);
  }
  else if (itemId === "trace_hot") {
    const allFas = state.scanHistory.filter(s => s.isFascist);
    if (allFas.length === 0) {
      addPrivateLog(player, "SLAD FASZYSTY (GORACE STACJE): Brak jakichkolwiek skanowan Faszystow od poczatku gry. Punkty i pula NIE zostaly pobrane.");
      return;
    }
    const lastThree = allFas.slice(-3).map(s => s.stationId).sort(() => Math.random() - 0.5);
    const names = lastThree.map(id => {
      const st = state.stations.find(x => x.id === id);
      return `#${id} (${st ? st.location : "?"})`;
    }).join(", ");
    addPrivateLog(player, `SLAD FASZYSTY (GORACE STACJE): Ostatnie stacje odwiedzone przez Faszystow (losowa kolejnosc): ${names}.`);
  }
  else if (itemId === "extra_vote") {
    player.extraVoteActive = true;
    addPrivateLog(player, "Aktywowano TAJNY +1 GLOS na najblizsze glosowanie.");
  }
  else if (itemId === "block_vote") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.blockedVotes[t.id] = true;
    addPrivateLog(player, `Zablokowano glos gracza ${t.name} w najblizszym glosowaniu.`);
  }
  else if (itemId === "shield") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.shields[t.id] = state.round;
    addPrivateLog(player, `Nalozono TARCZE OCHRONNA na gracza ${t.name} w tej rundzie.`);
  }
  else if (itemId === "sabotage") {
    const st = state.stations.find(s => s.id === Number(target1));
    if (!st) return;
    st.sabotagedRound = state.round;
    addPrivateLog(player, `Zasabotowano stacje #${st.id} (${st.location}) do konca tej rundy.`);
  }
  else if (itemId === "wiretap") {
    const st = state.stations.find(s => s.id === Number(target1));
    if (!st) return;
    state.wiretaps.push({ ownerId: player.id, stationId: st.id, expiresRound: state.round + 1 });
    addPrivateLog(player, `Zalozono PODSLUCH na stacji #${st.id} (${st.location}) na rundy R${state.round}-R${state.round + 1}.`);
  }
  else if (itemId === "activity_report") {
    const prevR = Math.max(1, state.round - 1);
    const scannedIds = new Set(state.scanHistory.filter(s => s.round === prevR).map(s => s.playerId));
    const inactive = state.players.filter(p => p.alive && !scannedIds.has(p.id)).map(p => p.name);
    addPrivateLog(player, `RAPORT AKTYWNOSCI (R${prevR}): Nie zeskanowali zadnego kodu: ${inactive.length ? inactive.join(", ") : "Wszyscy byli aktywni"}.`);
  }
  else if (itemId === "counter_intel") {
    const prevR = Math.max(1, state.round - 1);
    const bought = state.purchaseHistory.filter(h => h.round === prevR).map(h => h.itemName);
    addPrivateLog(player, `RAPORT KONTRWYWIADU (R${prevR}): Zakupione przedmioty: ${bought.length ? bought.join(", ") : "Brak zakupow"}.`);
  }
  else if (itemId === "compare_factions") {
    const p1 = state.players.find(p => p.id === target1);
    const p2 = state.players.find(p => p.id === target2);
    if (!p1 || !p2 || p1.id === p2.id) {
      addPrivateLog(player, "Wybierz dwoch roznych graczy.");
      return;
    }
    const f1 = (p1.role === "LIBERAL") ? (p1.falseTrailRound === state.round ? "FAS" : "LIB") : (p1.falseTrailRound === state.round ? "LIB" : "FAS");
    const f2 = (p2.role === "LIBERAL") ? (p2.falseTrailRound === state.round ? "FAS" : "LIB") : (p2.falseTrailRound === state.round ? "LIB" : "FAS");
    player.usedCompare = true;
    addPrivateLog(player, `POROWNANIE FRAKCJI (${p1.name} vs ${p2.name}): ${f1 === f2 ? "TA SAMA FRAKCJA" : "ROZNE FRAKCJE"}.`);
  }
  else if (itemId === "cut_debate") {
    state.timerSeconds = Math.max(10, state.timerSeconds - 120);
    addPublicLog("Ktos anonimowo skrocil czas dyskusji o 2 minuty.");
    addPrivateLog(player, "Skrocono zegar dyskusji o 2 minuty.");
  }
  else if (itemId === "false_trail") {
    player.falseTrailRound = state.round;
    addPrivateLog(player, "Aktywowano FALSZYWY TROP na te runde.");
  }
  else if (itemId === "fascist_kill") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.bufferedEliminations.push({
      sourceId: player.id,
      targetId: t.id,
      reason: "TAJNY ZAMACH FASZYSTOW"
    });
    addPrivateLog(player, `Zlecono TAJNY ZAMACH na gracza ${t.name}. Wynik pojawi sie po rozliczeniu bufora.`);
  }

  // Pobranie kosztu i aktualizacja puli
  player.points -= cfg.cost;
  player.purchasedRound = state.round;
  cfg.remaining -= 1;
  state.purchaseHistory.push({ round: state.round, itemName: item.name });
}

/* ==================== KONFIGURATOR I RANDOMIZER SKLEPU ==================== */
function updateSettingsFromUI() {
  state.settings.boardSize = document.getElementById("cfg-board-size").value;
  state.settings.choresDuration = Math.max(15, Number(document.getElementById("cfg-chores-sec").value) || 120);
  state.settings.discussionDuration = Math.max(30, Number(document.getElementById("cfg-discussion-sec").value) || 300);
  state.settings.baseUrl = document.getElementById("cfg-base-url").value.trim();
  state.settings.limitOnePurchasePerRound = document.getElementById("cfg-limit-one-purchase").checked;
  broadcastState();
}

function updateStationLocation(id, value) {
  const st = state.stations.find(s => s.id === id);
  if (st) st.location = value;
  broadcastState();
}

function regenerateAllTokens() {
  if (!confirm("Wygenerowac nowe tajne tokeny dla wszystkich 15 stacji? Poprzednie wydruki przestana dzialac.")) return;
  state.stations.forEach(s => { s.token = randomToken(10); });
  renderQrPrintGrid();
  broadcastState();
}

function updateShopConfigField(itemId, field, value) {
  const cfg = state.shopConfig[itemId];
  if (!cfg) return;
  if (field === "enabled") cfg.enabled = Boolean(value);
  if (field === "cost") cfg.cost = Math.max(1, Math.min(10, Number(value) || 1));
  if (field === "maxQty") {
    const q = Math.max(0, Math.min(10, Number(value) || 0));
    cfg.maxQty = q;
    cfg.remaining = q;
  }
  broadcastState();
}

function resetShopDefaults() {
  state.shopConfig = createInitialShopConfig();
  renderConfigView();
  broadcastState();
}

function randomizeShopBalanced() {
  const size = state.settings.boardSize;
  const scale = size === "5-6" ? 0.75 : (size === "9-10" ? 1.35 : 1.0);

  // 1. Wylacz wszystko na start
  SHOP_CATALOG.forEach(i => {
    state.shopConfig[i.id].enabled = false;
    state.shopConfig[i.id].maxQty = 0;
    state.shopConfig[i.id].remaining = 0;
  });

  // 2. Zawsze wybierz 1 lub 2 warianty Sladu Faszysty (zeby nie bylo inflacji informacji)
  const traces = ["trace_narrow", "trace_delayed", "trace_hot"].sort(() => Math.random() - 0.5);
  const traceCount = size === "5-6" ? 1 : 2;
  for (let i = 0; i < traceCount; i++) {
    const id = traces[i];
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = id === "trace_hot" ? 1 : Math.max(1, Math.round(2 * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  }

  // 3. Zawsze wlacz podstawe glosowania i obrony
  const core = ["extra_vote", "shield", "sabotage"];
  core.forEach(id => {
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = Math.max(1, Math.round((base.defaultQty + (Math.random() > 0.5 ? 0 : -1)) * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  });

  // 4. Dobierz losowo 3-4 przedmioty dodatkowe z pozostalej puli
  const extras = ["block_vote", "wiretap", "activity_report", "counter_intel", "compare_factions", "cut_debate", "false_trail"]
    .sort(() => Math.random() - 0.5);
  const pickExtras = size === "5-6" ? 2 : (size === "9-10" ? 4 : 3);
  for (let i = 0; i < pickExtras; i++) {
    const id = extras[i];
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = id === "compare_factions" ? 1 : Math.max(1, Math.round(base.defaultQty * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  }

  // 5. Tajny Zamach Faszystow (wlaczony od 7+ graczy, 1 sztuka dla 7-8, 1-2 dla 9-10)
  if (size !== "5-6") {
    const killQty = (size === "9-10" && Math.random() > 0.4) ? 2 : 1;
    state.shopConfig["fascist_kill"] = { enabled: true, cost: 3, maxQty: killQty, remaining: killQty };
  }

  renderConfigView();
  broadcastState();
}

/* ==================== RENDEROWANIE WIDOKOW ==================== */
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function renderAll() {
  renderHostView();
  renderPhoneView();
}

function renderHostView() {
  const phaseEl = document.getElementById("timer-phase-label");
  if (state.phase === "CHORES") {
    phaseEl.textContent = "FAZA 1: PRACE DOMOWE (SKANOWANIE QR I SKLEP)";
    phaseEl.className = "timer-phase chores";
  } else {
    phaseEl.textContent = "FAZA 2: DYSKUSJA PRZY STOLE (ZADANIA QR ZABLOKOWANE)";
    phaseEl.className = "timer-phase discussion";
  }
  document.getElementById("timer-display").textContent = formatTime(state.timerSeconds);
  document.getElementById("host-board-label").textContent = state.settings.boardSize + " GRACZY";
  document.getElementById("host-round-num").textContent = state.round;
  document.getElementById("lib-count").textContent = state.liberalPolicies;
  document.getElementById("fas-count").textContent = state.fascistPolicies;
  document.getElementById("election-tracker").textContent = `${state.electionTracker} / 3`;
  document.getElementById("buffered-elim-badge").textContent = `BUFOR ELIMINACJI: ${state.bufferedEliminations.length}`;

  const vic = document.getElementById("victory-banner");
  if (state.winner) {
    vic.style.display = "block";
    vic.textContent = state.winner;
  } else {
    vic.style.display = "none";
  }

  // Tor liberalny
  const libTrack = document.getElementById("liberal-track");
  libTrack.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const slot = document.createElement("div");
    slot.className = "policy-slot" + (i < state.liberalPolicies ? " enacted-liberal" : "");
    slot.onclick = () => togglePolicy("LIBERAL", i);
    slot.innerHTML = `<div class="policy-slot-num">USTAWA ${i + 1}</div><div class="policy-slot-power">${i === 4 ? "ZWYCIESTWO" : "LIBERALNA"}</div>`;
    libTrack.appendChild(slot);
  }

  // Tor faszystowski
  const fasTrack = document.getElementById("fascist-track");
  fasTrack.innerHTML = "";
  const powers = BOARD_POWERS[state.settings.boardSize] || BOARD_POWERS["7-8"];
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.className = "policy-slot" + (i < state.fascistPolicies ? " enacted-fascist" : "");
    slot.onclick = () => togglePolicy("FASCIST", i);
    slot.innerHTML = `<div class="policy-slot-num">USTAWA ${i + 1}</div><div class="policy-slot-power">${powers[i]}</div>`;
    fasTrack.appendChild(slot);
  }

  // Wynik glosowania
  const voteBox = document.getElementById("vote-result-box");
  if (state.votingOpen) {
    const count = Object.keys(state.votes).length;
    const aliveCount = state.players.filter(p => p.alive).length;
    voteBox.style.display = "block";
    voteBox.textContent = `GLOSOWANIE OTWARTE: oddano ${count} z ${aliveCount} glosow.`;
  } else if (state.lastVoteSummary) {
    voteBox.style.display = "block";
    voteBox.textContent = state.lastVoteSummary;
  } else {
    voteBox.style.display = "none";
  }

  // Podsumowanie wspolnej puli sklepu
  const shopSum = document.getElementById("host-shop-summary");
  shopSum.innerHTML = "";
  SHOP_CATALOG.forEach(item => {
    const cfg = state.shopConfig[item.id];
    if (!cfg || !cfg.enabled || item.fascistOnly) return;
    const b = document.createElement("span");
    b.className = "badge" + (cfg.remaining === 0 ? " badge-fascist" : "");
    b.textContent = `${item.name}: ${cfg.remaining}/${cfg.maxQty}`;
    shopSum.appendChild(b);
  });

  // Lista graczy
  const plist = document.getElementById("host-players-list");
  plist.innerHTML = "";
  if (state.players.length === 0) {
    plist.innerHTML = `<p style="font-size:0.88rem; color:var(--ink-muted);">Brak graczy w pokoju. Dodaj recznie lub poczekaj na polaczenie telefonow.</p>`;
  } else {
    state.players.forEach(p => {
      const card = document.createElement("div");
      card.className = "player-card" + (p.alive ? "" : " dead");
      const votedTag = (state.votingOpen && state.votes[p.id]) ? `<span class="badge badge-liberal">ZAGLOSOWAL</span>` : "";
      const actionBtn = p.alive
        ? `<button class="btn btn-sm btn-fascist" onclick="manualExecute('${p.id}')">EGZEKUCJA</button>`
        : `<span class="stamp">WYELIMINOWANY</span> <button class="btn btn-sm btn-outline" onclick="manualRevive('${p.id}')">PRZYWROC</button>`;
      card.innerHTML = `
        <div>
          <strong class="player-name">${p.name}</strong> ${votedTag}
        </div>
        <div style="display:flex; gap:6px; align-items:center;">
          ${actionBtn}
        </div>
      `;
      plist.appendChild(card);
    });
  }

  // Dziennik publiczny
  const plog = document.getElementById("host-public-log");
  plog.innerHTML = state.publicLogs.length
    ? state.publicLogs.map(l => `<div class="log-entry">${l}</div>`).join("")
    : `<div class="log-entry" style="color:var(--ink-muted);">Brak wpisow.</div>`;
}

function renderConfigView() {
  document.getElementById("cfg-board-size").value = state.settings.boardSize;
  document.getElementById("cfg-chores-sec").value = state.settings.choresDuration;
  document.getElementById("cfg-discussion-sec").value = state.settings.discussionDuration;
  document.getElementById("cfg-base-url").value = state.settings.baseUrl;
  document.getElementById("cfg-limit-one-purchase").checked = state.settings.limitOnePurchasePerRound;

  // Edytor 15 stacji
  const sed = document.getElementById("stations-editor-list");
  sed.innerHTML = state.stations.map(s => `
    <div style="display:flex; gap:8px; align-items:center; margin-bottom:6px;">
      <strong style="min-width:34px;">#${s.id}</strong>
      <input type="text" value="${s.location.replace(/"/g, '&quot;')}" onchange="updateStationLocation(${s.id}, this.value)" />
    </div>
  `).join("");

  // Tabela sklepu
  const tbody = document.getElementById("shop-config-tbody");
  tbody.innerHTML = SHOP_CATALOG.map(item => {
    const cfg = state.shopConfig[item.id];
    return `
      <tr>
        <td style="text-align:center;">
          <input type="checkbox" ${cfg.enabled ? "checked" : ""} onchange="updateShopConfigField('${item.id}', 'enabled', this.checked)" />
        </td>
        <td>
          <strong>${item.name}</strong>
          ${item.fascistOnly ? '<br><span class="badge badge-fascist">TYLKO FASZYSCI</span>' : ''}
        </td>
        <td><span class="badge">${item.category}</span> ${item.desc}</td>
        <td><input type="number" min="1" max="10" value="${cfg.cost}" onchange="updateShopConfigField('${item.id}', 'cost', this.value)" /></td>
        <td><input type="number" min="0" max="10" value="${cfg.maxQty}" onchange="updateShopConfigField('${item.id}', 'maxQty', this.value)" /></td>
      </tr>
    `;
  }).join("");

  renderQrPrintGrid();
}

function getBaseQrUrl() {
  if (state.settings.baseUrl) {
    return state.settings.baseUrl.replace(/\/$/, "");
  }
  if (window.location.protocol === "http:" || window.location.protocol === "https:") {
    return window.location.origin + window.location.pathname;
  }
  return "";
}

function renderQrPrintGrid() {
  const grid = document.getElementById("qr-print-grid");
  grid.innerHTML = "";
  const baseUrl = getBaseQrUrl();

  state.stations.forEach(s => {
    const card = document.createElement("div");
    card.className = "qr-card";
    const qrPayload = baseUrl
      ? `${baseUrl}?scan=${encodeURIComponent(s.token)}`
      : `SHQR:${s.token}`;

    card.innerHTML = `
      <div class="qr-card-num">STACJA #${s.id}</div>
      <div class="qr-card-loc">${s.location}</div>
      <div class="qr-img-wrap" id="qr-canvas-${s.id}"></div>
    `;
    grid.appendChild(card);

    if (typeof QRCode !== "undefined") {
      new QRCode(document.getElementById(`qr-canvas-${s.id}`), {
        text: qrPayload,
        width: 140,
        height: 140,
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      document.getElementById(`qr-canvas-${s.id}`).textContent = qrPayload;
    }
  });
}

function renderPhoneView() {
  // Przelacznik demo
  if (connMode === "DEMO") {
    const sel = document.getElementById("demo-player-select");
    const prev = sel.value;
    sel.innerHTML = state.players.map(p => `<option value="${p.id}">${p.name} (${p.alive ? "ZYWY" : "MARTWY"} | ${p.points} PKT)</option>`).join("");
    if (myPlayerId) sel.value = myPlayerId;
    else if (prev) sel.value = prev;

    const anySel = document.getElementById("demo-any-station-select");
    if (anySel.options.length === 0) {
      anySel.innerHTML = state.stations.map(s => `<option value="${s.id}">#${s.id} — ${s.location}</option>`).join("");
    }
  }

  const player = state.players.find(p => p.id === myPlayerId);
  if (!player) {
    document.getElementById("phone-player-header").textContent = "BRAK POLACZONEGO GRACZA";
    return;
  }

  document.getElementById("phone-player-header").textContent = "GRACZ: " + player.name.toUpperCase();
  document.getElementById("phone-points").textContent = player.points;
  document.getElementById("phone-phase-text").textContent = state.phase === "CHORES" ? "PRACE DOMOWE" : "DYSKUSJA";
  document.getElementById("phone-round-text").textContent = state.round;
  document.getElementById("phone-alive-text").textContent = player.alive ? "ZYWY" : "WYELIMINOWANY";

  // Tajna rola
  const roleBox = document.getElementById("secret-role-container");
  if (roleVisible) {
    roleBox.style.display = "block";
    let css = "liberal";
    let title = "LIBERAL";
    let extra = "Uchwal 5 ustaw liberalnych lub wyeliminuj Hitlera.";
    if (player.role === "FASCIST") {
      css = "fascist";
      title = "FASZYSTA";
      const others = state.players.filter(p => p.id !== player.id && (p.role === "FASCIST" || p.role === "HITLER"))
        .map(p => `${p.name} (${p.role === "HITLER" ? "HITLER" : "FASZYSTA"})`).join(", ");
      extra = `Twoi wspolnicy: ${others || "brak"}.`;
    } else if (player.role === "HITLER") {
      css = "hitler";
      title = "HITLER";
      if (state.settings.boardSize === "5-6") {
        const fas = state.players.find(p => p.role === "FASCIST");
        extra = `Plansza 5-6: Twoj Faszysta to ${fas ? fas.name : "?"}.`;
      } else {
        extra = "Plansza 7-10: Nie znasz swoich Faszystow. Zdobywaj zaufanie.";
      }
    }
    roleBox.innerHTML = `<div class="role-box ${css}"><h3>${title}</h3><p style="margin-top:6px; font-size:0.9rem;">${extra}</p></div>`;
  } else {
    roleBox.style.display = "none";
  }

  // Glosowanie
  const voteStatus = document.getElementById("phone-vote-status");
  const btnJa = document.getElementById("btn-vote-ja");
  const btnNein = document.getElementById("btn-vote-nein");
  if (!player.alive) {
    voteStatus.textContent = "Zostales wyeliminowany — nie bierzesz udzialu w glosowaniu.";
    btnJa.disabled = true;
    btnNein.disabled = true;
  } else if (state.votingOpen) {
    const myVote = state.votes[player.id];
    voteStatus.textContent = myVote
      ? `Twoj oddany glos: ${myVote} (mozesz zmienic do zamkniecia).`
      : "Glosowanie otwarte! Wybierz JA lub NEIN.";
    btnJa.disabled = false;
    btnNein.disabled = false;
  } else {
    voteStatus.textContent = "Glosowanie jest obecnie zamkniete.";
    btnJa.disabled = true;
    btnNein.disabled = true;
  }

  // Zadanie QR
  const st = state.stations.find(s => s.id === player.assignedStation);
  const taskBox = document.getElementById("phone-task-box");
  if (!player.alive) {
    taskBox.textContent = "Jestes wyeliminowany — zadania QR sa nieaktywne.";
  } else if (player.completedRound === state.round) {
    taskBox.innerHTML = `<strong>ZADANIE ZALICZONE!</strong> Zeskanowales stacje #${player.assignedStation} w tej rundzie (+1 PKT).`;
  } else {
    taskBox.innerHTML = `<strong>TWOJ CEL W RUNDZIE ${state.round}:</strong><br>STACJA #${player.assignedStation} — ${st ? st.location : "?"}<br><span style="font-size:0.82rem;">Zeskanuj kod QR w fazie Prac Domowych, aby zdobyc +1 PKT Wplywu.</span>`;
  }

  // Ukryta bron
  const wPanel = document.getElementById("hidden-weapon-panel");
  if (player.foundWeapon && !state.weaponUsed && player.alive) {
    wPanel.style.display = "block";
    const wSel = document.getElementById("weapon-target-select");
    wSel.innerHTML = state.players.filter(p => p.alive && p.id !== player.id)
      .map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  } else {
    wPanel.style.display = "none";
  }

  // Sklep
  renderPhoneShop(player);

  // Raporty prywatne
  const privLogs = document.getElementById("phone-private-logs");
  privLogs.innerHTML = player.logs.length
    ? player.logs.map(l => `<div class="log-entry">${l}</div>`).join("")
    : `<div class="log-entry" style="color:var(--ink-muted);">Brak raportow.</div>`;
}

function renderPhoneShop(player) {
  const notice = document.getElementById("phone-shop-notice");
  const list = document.getElementById("phone-shop-list");
  list.innerHTML = "";

  if (!player.alive) {
    notice.textContent = "Sklep jest niedostepny dla wyeliminowanych graczy.";
    return;
  }
  const locked = state.settings.limitOnePurchasePerRound && player.purchasedRound === state.round;
  notice.textContent = locked
    ? "Wykorzystales juz limit 1 zakupu w tej rundzie."
    : "Wspolna pula na cala gre — kto pierwszy, ten lepszy.";

  const aliveOthers = state.players.filter(p => p.alive && p.id !== player.id);
  const aliveAll = state.players.filter(p => p.alive);

  SHOP_CATALOG.forEach(item => {
    const cfg = state.shopConfig[item.id];
    if (!cfg || !cfg.enabled) return;
    if (item.fascistOnly && player.role !== "FASCIST") return;

    const div = document.createElement("div");
    div.className = "shop-item" + (item.fascistOnly ? " fascist-only" : "");

    let targetInputs = "";
    if (item.needsTarget === "player") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${aliveOthers.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}</select>`;
    } else if (item.needsTarget === "player_self") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${aliveAll.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}</select>`;
    } else if (item.needsTarget === "station") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${state.stations.map(s => `<option value="${s.id}">#${s.id} — ${s.location}</option>`).join("")}</select>`;
    } else if (item.needsTarget === "two_players") {
      const opts = aliveOthers.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
      targetInputs = `
        <div style="display:flex; gap:6px; margin-bottom:8px;">
          <select id="shop-t1-${item.id}">${opts}</select>
          <select id="shop-t2-${item.id}">${opts}</select>
        </div>
      `;
    }

    const canBuy = !locked && cfg.remaining > 0 && player.points >= cfg.cost && !(item.id === "compare_factions" && player.usedCompare);
    const btnText = cfg.remaining <= 0 ? "WYKUPIONE" : `KUP ZA ${cfg.cost} PKT`;

    div.innerHTML = `
      <div class="shop-item-head">
        <strong>${item.name}</strong>
        <span class="badge ${cfg.remaining === 0 ? "badge-fascist" : "badge-gold"}">PULA: ${cfg.remaining}/${cfg.maxQty}</span>
      </div>
      <div class="shop-item-desc">${item.desc}</div>
      ${targetInputs}
      <button class="btn btn-sm ${item.fascistOnly ? "btn-fascist" : ""}" style="width:100%;" ${canBuy ? "" : "disabled"} onclick="buyShopItem('${item.id}')">${btnText}</button>
    `;
    list.appendChild(div);
  });
}

/* ==================== AKCJE NA TELEFONIE ==================== */
function toggleSecretRole() {
  roleVisible = !roleVisible;
  document.getElementById("btn-toggle-role").textContent = roleVisible ? "UKRYJ TAJNA ROLE" : "ODSLON TAJNA ROLE";
  renderPhoneView();
}

function castVote(choice) {
  if (!myPlayerId) return;
  sendActionToHost({ type: "VOTE", playerId: myPlayerId, vote: choice });
}

function buyShopItem(itemId) {
  if (!myPlayerId) return;
  const t1El = document.getElementById("shop-t1-" + itemId);
  const t2El = document.getElementById("shop-t2-" + itemId);
  sendActionToHost({
    type: "BUY_ITEM",
    playerId: myPlayerId,
    itemId,
    target1: t1El ? t1El.value : null,
    target2: t2El ? t2El.value : null
  });
  switchPhonePane("notes");
}

function useHiddenWeapon() {
  const sel = document.getElementById("weapon-target-select");
  if (!sel || !sel.value || !myPlayerId) return;
  sendActionToHost({ type: "USE_WEAPON", playerId: myPlayerId, targetId: sel.value });
}

/* ==================== SKANER QR I PARSOWANIE LINKOW (PODEJSCIE 3) ==================== */
function extractTokenFromScan(rawText) {
  if (!rawText) return null;
  if (rawText.startsWith("SHQR:")) return rawText.slice(5).trim();
  try {
    const u = new URL(rawText);
    const t = u.searchParams.get("scan");
    if (t) return t.trim();
  } catch (e) {}
  return rawText.trim();
}

function processScannedToken(rawText) {
  const token = extractTokenFromScan(rawText);
  if (!token || !myPlayerId) return;
  sendActionToHost({ type: "SCAN_QR", playerId: myPlayerId, token });
  document.getElementById("qr-scan-feedback").innerHTML = `<div class="info-box">Przeslano skan kodu QR. Sprawdz zakladke RAPORTY lub komunikat powyzej.</div>`;
  pendingScanToken = null;
}

function startQrScanner() {
  const readerEl = document.getElementById("qr-reader");
  readerEl.style.display = "block";
  if (typeof Html5Qrcode === "undefined") {
    document.getElementById("qr-scan-feedback").textContent = "Brak biblioteki skanera — uzyj natywnego aparatu telefonu (link ?scan=TOKEN).";
    return;
  }
  if (qrScanner) return;
  qrScanner = new Html5Qrcode("qr-reader");
  qrScanner.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: { width: 220, height: 220 } },
    decodedText => {
      stopQrScanner();
      processScannedToken(decodedText);
    },
    () => {}
  ).catch(err => {
    document.getElementById("qr-scan-feedback").innerHTML =
      `<div class="alert-box">Przegladarka zablokowala dostep do kamery (wymagane HTTPS). Zamiast tego zeskanuj kod QR <strong>natywnym aparatem telefonu</strong>.</div>`;
    stopQrScanner();
  });
}

function stopQrScanner() {
  if (qrScanner) {
    qrScanner.stop().then(() => {
      qrScanner.clear();
      qrScanner = null;
      document.getElementById("qr-reader").style.display = "none";
    }).catch(() => {
      qrScanner = null;
      document.getElementById("qr-reader").style.display = "none";
    });
  } else {
    const el = document.getElementById("qr-reader");
    if (el) el.style.display = "none";
  }
}

function simulateAssignedScan() {
  const p = state.players.find(x => x.id === myPlayerId);
  if (!p) return;
  const st = state.stations.find(s => s.id === p.assignedStation);
  if (st) processScannedToken(st.token);
}

function simulateSelectedScan() {
  const id = Number(document.getElementById("demo-any-station-select").value);
  const st = state.stations.find(s => s.id === id);
  if (st) processScannedToken(st.token);
}

/* ==================== NOTATNIK ==================== */
function savePersonalNotes() {
  if (!myPlayerId) return;
  localStorage.setItem("sh_notes_" + myPlayerId, document.getElementById("phone-personal-notes").value);
}

function loadPersonalNotes() {
  if (!myPlayerId) return;
  document.getElementById("phone-personal-notes").value = localStorage.getItem("sh_notes_" + myPlayerId) || "";
}

/* ==================== START I OBSLUGA ?scan=TOKEN Z APARATU ==================== */
window.addEventListener("DOMContentLoaded", () => {
  checkLanServer();
  renderConfigView();
  renderAll();

  const params = new URLSearchParams(window.location.search);
  const scanParam = params.get("scan");
  if (scanParam) {
    pendingScanToken = scanParam;
    const banner = document.getElementById("auto-scan-banner");
    banner.style.display = "block";
    banner.innerHTML = `<strong>WYKRYTO KOD QR Z APARATU!</strong> Laczenie z sesja gracza, aby zaliczyc stacje...`;

    const lastMode = localStorage.getItem("sh_last_mode");
    const lastName = localStorage.getItem("sh_last_name");
    const lastRoom = localStorage.getItem("sh_last_room");

    if (lastMode === "LAN" && lastName) {
      document.getElementById("lan-player-name").value = lastName;
      setTimeout(() => joinLanRoom(), 600);
    } else if (lastMode === "PEER" && lastName && lastRoom) {
      document.getElementById("peer-room-input").value = lastRoom;
      document.getElementById("peer-player-name").value = lastName;
      setTimeout(() => joinOnlineRoom(), 600);
    } else {
      banner.innerHTML = `<strong>WYKRYTO KOD QR Z APARATU!</strong> Dolacz teraz do pokoju (Online lub LAN), a skan zostanie zaliczony automatycznie.`;
    }
    // Wyczysc parametr z paska adresu, zeby odswiezenie nie skanowalo ponownie
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
