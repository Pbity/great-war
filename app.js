/* SECRET HITLER // STACJE QR — LOGIKA APLIKACJI (V7) */

const BOARD_POWERS = {
  "5-6": [
    "Brak mocy",
    "Brak mocy",
    "Podgląd 3 górnych ustaw",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIĘSTWO FASZYSTÓW"
  ],
  "7-8": [
    "Brak mocy",
    "Sprawdzenie lojalności",
    "Wybór specjalny Prezydenta",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIĘSTWO FASZYSTÓW"
  ],
  "9-10": [
    "Sprawdzenie lojalności",
    "Sprawdzenie lojalności",
    "Wybór specjalny Prezydenta",
    "Egzekucja",
    "Egzekucja + Veto",
    "ZWYCIĘSTWO FASZYSTÓW"
  ]
};

const DEFAULT_STATIONS = [
  "Kuchnia — lodówka",
  "Przedpokój — wieszak",
  "Łazienka — lustro",
  "Salon — regał z książkami",
  "Balkon — drzwi",
  "Sypialnia — szafa",
  "Korytarz — włącznik światła",
  "Jadalnia — kredens",
  "Biurko — lampka",
  "Wejście — drzwi frontowe",
  "Kuchnia — ekspres do kawy",
  "Salon — parapet",
  "Przedpokój — szafka na buty",
  "Spiżarnia / schowek",
  "Korytarz — zegar ścienny"
];

const SHOP_CATALOG = [
  {
    id: "trace_narrow",
    name: "Ślad Faszysty: Zawężenie",
    category: "WYWIAD",
    desc: "Wskazuje 1 prawdziwą stację odwiedzoną przez Faszystę oraz 2 losowe stacje Liberałów (bez kolejności).",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "trace_delayed",
    name: "Ślad Faszysty: Opóźniony",
    category: "WYWIAD",
    desc: "Ujawnia 1 dokładną stację QR, na której odbił się Faszysta w POPRZEDNIEJ rundzie.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "trace_hot",
    name: "Ślad Faszysty: Gorące Stacje",
    category: "WYWIAD",
    desc: "Pokazuje listę do 3 ostatnich stacji odwiedzonych przez Faszystów od początku gry (bez rund i kolejności).",
    defaultCost: 3,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "extra_vote",
    name: "Tajny +1 Głos",
    category: "GŁOSOWANIE",
    desc: "Twój najbliższy głos (JA lub NEIN) policzy się podwójnie w tajnym podsumowaniu.",
    defaultCost: 2,
    defaultQty: 3,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "block_vote",
    name: "Blokada Głosu (Cenzura)",
    category: "GŁOSOWANIE",
    desc: "Głos wybranego gracza nie zostanie policzony w najbliższym głosowaniu.",
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
    desc: "Chroni wybranego gracza (lub Ciebie) przed tajną eliminacją w tej rundzie.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "player_self"
  },
  {
    id: "sabotage",
    name: "Sabotaż Stacji",
    category: "DYWERSJA",
    desc: "Wyłącza wybraną stację QR do końca tej rundy — nikt nie zdobędzie tam punktu.",
    defaultCost: 1,
    defaultQty: 3,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "station"
  },
  {
    id: "wiretap",
    name: "Podsłuch Stacji",
    category: "WYWIAD",
    desc: "Wybierasz stację QR. Jeśli ktoś ją zeskanuje w tej lub następnej rundzie, otrzymasz jego imię.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "station"
  },
  {
    id: "activity_report",
    name: "Raport Aktywności",
    category: "WYWIAD",
    desc: "Pokazuje listę graczy, którzy w poprzedniej rundzie nie zeskanowali żadnego kodu QR.",
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
    desc: "Pokazuje listę przedmiotów kupionych w Sklepie oraz liczbę wykonanych przelewów w poprzedniej rundzie (bez imion).",
    defaultCost: 1,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "compare_factions",
    name: "Porównanie Frakcji",
    category: "WYWIAD",
    desc: "Wskazujesz 2 graczy. Otrzymasz odpowiedź: TA SAMA FRAKCJA lub RÓŻNE FRAKCJE (raz na grę na gracza).",
    defaultCost: 4,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: "two_players"
  },
  {
    id: "cut_debate",
    name: "Skrócenie Debaty",
    category: "PRESJA",
    desc: "Anonimowo ucina 2 minuty z aktualnego zegara dyskusji na Ekranie Głównym.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  {
    id: "false_trail",
    name: "Fałszywy Trop",
    category: "MASKOWANIE",
    desc: "W tej rundzie Twoje skanowania i frakcja zwracają fałszywe dane w raportach wywiadu.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: false,
    needsTarget: null
  },
  /* PRZEDMIOTY WYŁĄCZNIE DLA FASZYSTÓW */
  {
    id: "fascist_kill",
    name: "Tajny Zamach",
    category: "FASZYŚCI",
    desc: "Zleca tajną eliminację wybranego gracza do bufora (wspólna pula Faszystów).",
    defaultCost: 4,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: "player"
  },
  {
    id: "fascist_wipe_traces",
    name: "Zatarcie Śladów",
    category: "FASZYŚCI",
    desc: "Usuwa ostatni ślad skanowania Faszystów z historii, utrudniając działanie Śladu Faszysty.",
    defaultCost: 2,
    defaultQty: 2,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: null
  },
  {
    id: "fascist_disinfo",
    name: "Dezinformacja Wywiadu",
    category: "FASZYŚCI",
    desc: "W tej rundzie raporty Śladu Faszysty kupione przez Liberałów podadzą fałszywe stacje Liberałów.",
    defaultCost: 2,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: null
  },
  {
    id: "fascist_flip_vote",
    name: "Przekupienie Wyborcy",
    category: "FASZYŚCI",
    desc: "Po cichu odwraca głos wybranego gracza w najbliższym głosowaniu (JA <-> NEIN).",
    defaultCost: 3,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: "player"
  },
  {
    id: "fascist_contact_hitler",
    name: "Kontakt z Hitlerem",
    category: "FASZYŚCI",
    desc: "Na planszach 7-10 wysyła Hitlerowi Twoje imię jako potwierdzonego wspólnika.",
    defaultCost: 4,
    defaultQty: 1,
    defaultEnabled: true,
    fascistOnly: true,
    needsTarget: null
  }
];

function randomToken(len = 10) {
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

function loadSavedStations() {
  try {
    const raw = localStorage.getItem("sh_saved_stations_v3");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.map((s, idx) => ({
          id: idx + 1,
          location: String(s.location || ("Stacja #" + (idx + 1))),
          token: s.token || randomToken(10),
          sabotagedRound: 0
        }));
      }
    }
  } catch (e) {}
  return DEFAULT_STATIONS.map((loc, idx) => ({
    id: idx + 1,
    location: loc,
    token: randomToken(10),
    sabotagedRound: 0
  }));
}

function persistStations() {
  try {
    localStorage.setItem("sh_saved_stations_v3", JSON.stringify(
      state.stations.map(s => ({ id: s.id, location: s.location, token: s.token }))
    ));
  } catch (e) {}
}

let state = {
  roomCode: "",
  started: false,
  round: 1,
  phase: "CHORES",
  timerSeconds: 120,
  timerRunning: false,
  settings: {
    boardSize: "7-8",
    choresDuration: 120,
    discussionDuration: 300,
    baseUrl: "https://pbity.github.io/great-war/",
    transfersEnabled: true,
    limitOnePurchasePerRound: true,
    fascistFreeChoiceEnabled: true,
    hiddenWeaponEnabled: true,
    announceWeaponDestroy: false,
    ghostSupportEnabled: true,
    deadBetsEnabled: true,
    elimDelayMin: 30,
    elimDelayMax: 60,
    startingPointEnabled: false,
    liberalCatchupEnabled: false,
    hideDescForLiberals: false,
    hideDescForFascists: false
  },
  liberalPolicies: 0,
  fascistPolicies: 0,
  electionTracker: 0,
  winner: null,
  votingOpen: false,
  votes: {},
  lastVoteSummary: null,
  players: [],
  stations: loadSavedStations(),
  weaponStationId: null,
  weaponClaimed: false,
  weaponUsed: false,
  deadBets: {},
  
  shopConfig: createInitialShopConfig(),
  scanHistory: [],
  purchaseHistory: [],
  transferHistory: [],
  wiretaps: [],
  shields: {},
  blockedVotes: {},
  flippedVotes: {},
  disinfoRound: 0,
  bufferedEliminations: [],
  publicLogs: []
};

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
let sharedAudioCtx = null;
let lastKnownAliveMap = {};
let bufferWatcherInterval = null;

function getAudioContext() {
  if (!sharedAudioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) sharedAudioCtx = new AC();
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

function playChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
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
  } catch (e) {}
}

function playDeathSound() {
  try {
    if (navigator.vibrate) {
      navigator.vibrate([450, 150, 450, 150, 800]);
    }
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Dramatyczny niski sygnal eliminacji (3 uderzenia)
    [220, 185, 130].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      const start = now + idx * 0.28;
      osc.frequency.setValueAtTime(freq, start);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.82, start + 0.25);
      gain.gain.setValueAtTime(0.26, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.26);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.27);
    });
  } catch (e) {}
}

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

function broadcastState(skipRenderAll = false) {
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
  if (!skipRenderAll) renderAll();
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
    "Marek", "Kasia", "Tomek", "Ania", "Piotr", "Zosia", "Michał"
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
  document.getElementById("btn-toggle-role").textContent = "ODSŁOŃ TAJNĄ ROLĘ";
  loadPersonalNotes();
  renderAll();
}

/* ==================== TRYB 2: ONLINE (PEERJS) ==================== */
function hostOnlineRoom() {
  let code = document.getElementById("peer-room-input").value.trim().toUpperCase();
  if (!code) code = "SH-" + randomToken(4).toUpperCase();
  const peerId = "sh-qr-room-" + code.toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (typeof Peer === "undefined") {
    alert("Brak biblioteki PeerJS (sprawdź połączenie z internetem).");
    return;
  }

  connMode = "PEER_HOST";
  state.roomCode = code;
  hostConnections = [];
  peerInstance = new Peer(peerId);

  peerInstance.on("open", () => {
    updateConnectionBadge("ONLINE HOST: " + code);
    document.getElementById("connection-info").innerHTML =
      `Pokój uruchomiony. Kod pokoju dla graczy: <strong>${code}</strong>.`;
    renderHostJoinQr();
    switchView("host");
  });

  peerInstance.on("connection", conn => {
    hostConnections.push(conn);
    conn.on("open", () => conn.send({ type: "STATE", state }));
    conn.on("data", data => {
      if (data && data.type === "ACTION") handleHostAction(data.action);
    });
  });

  peerInstance.on("error", err => alert("Błąd PeerJS: " + err.type));
}

function joinOnlineRoom() {
  const code = document.getElementById("peer-room-input").value.trim().toUpperCase();
  const name = document.getElementById("peer-player-name").value.trim();
  if (!code || !name) {
    alert("Wpisz kod pokoju oraz swoje imię.");
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
      if (pendingScanToken) setTimeout(() => processScannedToken(pendingScanToken), 500);
      switchView("phone");
    });
    clientConn.on("data", data => {
      if (data && data.type === "STATE") {
        state = data.state;
        renderAll();
      }
    });
  });
  peerInstance.on("error", err => alert("Nie udało się połączyć z pokojem: " + err.type));
}

/* ==================== TRYB 3: SERWER LAN (PYTHON) ==================== */
function checkLanServer() {
  fetch("/api/ping")
    .then(r => r.json())
    .then(data => {
      if (data && data.ok) {
        lanAvailable = true;
        const box = document.getElementById("lan-status-box");
        box.innerHTML = `<strong>SERWER LAN AKTYWNY</strong> — adres: <code>${data.url || window.location.origin}</code>`;
        if (!state.settings.baseUrl) state.settings.baseUrl = window.location.origin + "/";
      }
    })
    .catch(() => {
      lanAvailable = false;
      const box = document.getElementById("lan-status-box");
      box.innerHTML = "Lokalny serwer Python nieaktywny (uruchom <code>server.py</code>).";
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
  renderHostJoinQr();
  broadcastState();
  if (lanPollInterval) clearInterval(lanPollInterval);
  lanPollInterval = setInterval(pollLanActionsForHost, 1200);
  switchView("host");
}

function joinLanRoom() {
  if (!lanAvailable) {
    alert("Brak połączenia z lokalnym serwerem Python.");
    return;
  }
  const name = document.getElementById("lan-player-name").value.trim();
  if (!name) {
    alert("Wpisz swoje imię.");
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
  if (pendingScanToken) setTimeout(() => processScannedToken(pendingScanToken), 700);
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

function getJoinRoomUrl() {
  const base = getBaseQrUrl() || "https://pbity.github.io/great-war/";
  const cleanBase = base.endsWith("/") ? base : (base + "/");
  if (connMode === "LAN_HOST") {
    return window.location.origin + window.location.pathname + "?lan=1";
  }
  return `${cleanBase}?room=${encodeURIComponent(state.roomCode)}`;
}

function renderHostJoinQr() {
  const panel = document.getElementById("host-join-qr-panel");
  const canvasWrap = document.getElementById("host-join-qr-canvas");
  const codeBadge = document.getElementById("host-room-code-badge");
  const urlText = document.getElementById("host-join-url-text");
  if (!panel || !canvasWrap) return;

  if (connMode === "PEER_HOST" || connMode === "LAN_HOST") {
    const joinUrl = getJoinRoomUrl();
    panel.style.display = "block";
    codeBadge.textContent = connMode === "LAN_HOST" ? "LAN WI-FI" : ("KOD: " + state.roomCode);
    urlText.textContent = joinUrl;
    canvasWrap.innerHTML = "";
    if (typeof QRCode !== "undefined") {
      new QRCode(canvasWrap, {
        text: joinUrl,
        width: 150,
        height: 150,
        correctLevel: QRCode.CorrectLevel.M
      });
    } else {
      canvasWrap.textContent = joinUrl;
    }
  } else {
    panel.style.display = "none";
  }
}

function copyJoinUrl() {
  const url = getJoinRoomUrl();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => alert("Skopiowano link do pokoju: " + url));
  } else {
    prompt("Skopiuj link do pokoju:", url);
  }
}

function confirmQuickJoin() {
  const name = document.getElementById("quick-join-name").value.trim();
  if (!name) {
    alert("Wpisz swoje imię.");
    return;
  }
  const badgeText = document.getElementById("quick-join-room-badge").textContent;
  if (badgeText === "LAN WI-FI") {
    document.getElementById("lan-player-name").value = name;
    document.getElementById("quick-join-panel").style.display = "none";
    joinLanRoom();
  } else {
    const roomCode = badgeText.replace("KOD: ", "").trim();
    document.getElementById("peer-room-input").value = roomCode;
    document.getElementById("peer-player-name").value = name;
    document.getElementById("quick-join-panel").style.display = "none";
    joinOnlineRoom();
  }
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
    lastScannedStationId: null,
    purchasedRound: 0,
    sentTransferRound: 0,
    receivedTransferRound: 0,
    ghostScans: 0,
    ghostPoints: 0,
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
  addPublicLog(`Dołączył gracz: ${name}.`);
  broadcastState();
}

function startGameAndAssignRoles() {
  if (state.players.length < 5) {
    alert("Do rozpoczęcia gry potrzeba minimum 5 graczy.");
    return;
  }

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
  state.transferHistory = [];
  state.wiretaps = [];
  state.shields = {};
  state.blockedVotes = {};
  state.flippedVotes = {};
  state.disinfoRound = 0;
  state.bufferedEliminations = [];

  const stCount = state.stations.length;
  state.weaponStationId = state.settings.hiddenWeaponEnabled ? (Math.floor(Math.random() * stCount) + 1) : null;
  state.weaponClaimed = false;
  state.weaponUsed = false;
  state.deadBets = {};
  lastKnownAliveMap = {};



  Object.keys(state.shopConfig).forEach(k => {
    state.shopConfig[k].remaining = state.shopConfig[k].maxQty;
  });

  state.stations.forEach(s => { s.sabotagedRound = 0; });

  state.players.forEach((p, idx) => {
    p.role = roles[idx];
    p.alive = true;
    p.points = state.settings.startingPointEnabled ? 1 : 0;
    p.completedRound = 0;
    p.lastScannedStationId = null;
    p.purchasedRound = 0;
    p.sentTransferRound = 0;
    p.receivedTransferRound = 0;
    p.ghostScans = 0;
    p.ghostPoints = 0;
    p.usedCompare = false;
    p.foundWeapon = false;
    p.extraVoteActive = false;
    p.falseTrailRound = 0;
    p.logs = [];
  });

  assignStationsForRound();
  addPublicLog(`Rozpoczęto nową grę (${n} graczy, plansza ${state.settings.boardSize}, ${stCount} stacji QR).`);
  broadcastState();
}

function assignStationsForRound() {
  const stCount = state.stations.length;
  state.players.forEach(p => {
    if (p.alive || state.settings.ghostSupportEnabled) {
      p.assignedStation = Math.floor(Math.random() * stCount) + 1;
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
        addPublicLog("Koniec fazy Prac Domowych. Rozpoczyna się Dyskusja przy stole.");
        broadcastState();
      } else {
        state.timerRunning = false;
        addPublicLog("Czas dyskusji dobiegł końca. Czas na głosowanie.");
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
    addPublicLog("Przełączono fazę na: DYSKUSJA.");
  } else {
    state.phase = "CHORES";
    state.timerSeconds = state.settings.choresDuration;
    addPublicLog("Przełączono fazę na: PRACE DOMOWE.");
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
  state.flippedVotes = {};
  state.wiretaps = state.wiretaps.filter(w => w.expiresRound >= state.round);
  assignStationsForRound();
  addPublicLog(`Rozpoczęto Rundę ${state.round}. Przydzielono nowe stacje QR.`);
  broadcastState();
}

/* ==================== PLANSZA I GŁOSOWANIE ==================== */
function togglePolicy(type, index) {
  if (type === "LIBERAL") {
    state.liberalPolicies = (state.liberalPolicies === index + 1) ? index : index + 1;
    if (state.liberalPolicies >= 5) {
      state.winner = "ZWYCIĘSTWO LIBERAŁÓW (5 USTAW LIBERALNYCH)";
      addPublicLog(state.winner);
    }
  } else {
    const prevFas = state.fascistPolicies;
    state.fascistPolicies = (state.fascistPolicies === index + 1) ? index : index + 1;
    if (state.settings.liberalCatchupEnabled && state.fascistPolicies > prevFas) {
      state.players.forEach(p => {
        if (p.alive && p.role === "LIBERAL") {
          p.points += 1;
          addPrivateLog(p, "WYRÓWNANIE DLA LIBERAŁÓW: Uchwalono ustawę faszystowską. Otrzymujesz +1 PKT Wpływu.");
        }
      });
      addPublicLog("Uchwalono ustawę faszystowską — aktywowano wyrównanie (+1 PKT dla żywych Liberałów).");
    }
    if (state.fascistPolicies >= 6) {
      state.winner = "ZWYCIĘSTWO FASZYSTÓW (6 USTAW FASZYSTOWSKICH)";
      addPublicLog(state.winner);
    }
  }
  broadcastState();
}

function changeTracker(delta) {
  if (delta < 0) state.electionTracker = 0;
  else state.electionTracker = Math.min(3, state.electionTracker + 1);
  if (state.electionTracker === 3) {
    addPublicLog("Odrzucono 3 rządy z rzędu — uchwalana jest górna ustawa z talii.");
  }
  broadcastState();
}

function openVoting() {
  state.votingOpen = true;
  state.votes = {};
  state.lastVoteSummary = null;
  addPublicLog("Otwarto głosowanie nad rządem na telefonach graczy.");
  broadcastState();
}

function tallyVotes() {
  if (!state.votingOpen) return;
  let ja = 0;
  let nein = 0;

  state.players.forEach(p => {
    if (!p.alive) return;
    let v = state.votes[p.id];
    if (!v) return;
    if (state.blockedVotes[p.id]) return;
    if (state.flippedVotes[p.id]) {
      v = (v === "JA") ? "NEIN" : "JA";
    }
    const weight = p.extraVoteActive ? 2 : 1;
    if (v === "JA") ja += weight;
    else nein += weight;
    p.extraVoteActive = false;
  });

  state.blockedVotes = {};
  state.flippedVotes = {};
  state.votingOpen = false;
  const passed = ja > nein;
  const resText = `WYNIK GŁOSOWANIA: JA ${ja} — NEIN ${nein}. Rząd ${passed ? "PRZYJĘTY" : "ODRZUCONY"}.`;
  state.lastVoteSummary = resText;
  addPublicLog(resText);
  broadcastState();
}

/* ==================== ELIMINACJE ==================== */
function manualExecute(playerId) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;
  if (!confirm(`Czy na pewno przeprowadzić EGZEKUCJĘ na graczu ${p.name}?`)) return;
  p.alive = false;
  addPublicLog(`EGZEKUCJA: Gracz ${p.name} został wyeliminowany z gry.`);
  if (p.role === "HITLER") {
    state.winner = `ZWYCIĘSTWO LIBERAŁÓW — ${p.name} BYŁ HITLEREM!`;
    addPublicLog(state.winner);
  }
  broadcastState();
}

function manualRevive(playerId) {
  const p = state.players.find(x => x.id === playerId);
  if (!p) return;
  p.alive = true;
  if (state.winner && state.winner.includes(p.name)) state.winner = null;
  addPublicLog(`PRZYWRÓCONO gracza ${p.name} do gry.`);
  broadcastState();
}

function queueBufferedElimination(sourceId, targetId, reason) {
  const minD = Math.max(5, Number(state.settings.elimDelayMin) || 30);
  const maxD = Math.max(minD, Number(state.settings.elimDelayMax) || 60);
  const delaySec = Math.floor(Math.random() * (maxD - minD + 1)) + minD;
  state.bufferedEliminations.push({
    sourceId,
    targetId,
    reason,
    resolveAt: Date.now() + delaySec * 1000
  });
}

function executeEliminationItem(el) {
  const target = state.players.find(p => p.id === el.targetId);
  if (!target || !target.alive) return false;
  if (state.shields[target.id] === state.round) {
    addPublicLog("TAJNY ZAMACH ZABLOKOWANY: Tarcza Ochronna uratowała jednego z graczy.");
    addPrivateLog(target, "Twoja Tarcza Ochronna zablokowała zamach w tej rundzie.");
    return true;
  } else {
    target.alive = false;
    playDeathSound();
    addPublicLog(`TAJNA ELIMINACJA: Gracz ${target.name} został wyeliminowany.`);
    addPrivateLog(target, "ZOSTAŁEŚ WYELIMINOWANY! Nie możesz się odzywać ani brać udziału w obradach.");
    if (target.role === "HITLER") {
      state.winner = `ZWYCIĘSTWO LIBERAŁÓW — ${target.name} BYŁ HITLEREM!`;
      addPublicLog(state.winner);
    }
    return true;
  }
}

function checkBufferedEliminationsTick() {
  if (connMode !== "DEMO" && connMode !== "PEER_HOST" && connMode !== "LAN_HOST") return;
  if (state.bufferedEliminations.length === 0) return;
  const now = Date.now();
  const ready = state.bufferedEliminations.filter(el => !el.resolveAt || now >= el.resolveAt);
  if (ready.length === 0) return;
  state.bufferedEliminations = state.bufferedEliminations.filter(el => el.resolveAt && now < el.resolveAt);
  ready.forEach(el => executeEliminationItem(el));
  broadcastState();
}

function resolveEliminations() {
  if (state.bufferedEliminations.length === 0) {
    addPublicLog("Rozliczenie bufora: brak oczekujących eliminacji.");
    broadcastState();
    return;
  }
  const queue = [...state.bufferedEliminations];
  state.bufferedEliminations = [];
  queue.forEach(el => executeEliminationItem(el));
  broadcastState();
}

/* ==================== OBSŁUGA AKCJI OD GRACZY ==================== */
function handleHostAction(action) {
  if (!action || !action.type) return;

  if (action.type === "JOIN") {
    const existing = state.players.find(p => p.id === action.id);
    if (!existing) {
      state.players.push(createPlayerObj(action.id, action.name));
      addPublicLog(`Gracz ${action.name} dołączył do pokoju.`);
    } else {
      existing.name = action.name;
    }
    broadcastState();
    return;
  }

  const player = state.players.find(p => p.id === action.playerId);
  if (!player) return;

  // Akcje dostępne dla WYELIMINOWANYCH graczy (Opcja 1 i Opcja 4)
  if (!player.alive) {
    if (action.type === "SUBMIT_BET" && state.settings.deadBetsEnabled) {
      state.deadBets[player.id] = {
        hitlerId: action.hitlerId || null,
        fascistIds: Array.isArray(action.fascistIds) ? action.fascistIds : []
      };
      addPrivateLog(player, "Zapisano Twój zakład na role graczy.");
      broadcastState();
      return;
    }
    if (action.type === "GHOST_SEND_POINT" && state.settings.ghostSupportEnabled) {
      if (player.ghostPoints < 1) return;
      const target = state.players.find(p => p.id === action.targetId && p.alive);
      if (!target) return;
      player.ghostPoints -= 1;
      target.points += 1;
      addPrivateLog(player, `WSPARCIE ZZA GROBU: Przekazano 1 PKT Wpływu graczowi ${target.name}.`);
      addPrivateLog(target, "WSPARCIE ZZA GROBU: Otrzymałeś 1 PKT Wpływu od wyeliminowanego gracza.");
      broadcastState();
      return;
    }
    if (action.type === "SCAN_QR" && state.settings.ghostSupportEnabled) {
      if (state.phase !== "CHORES") {
        addPrivateLog(player, "Skanowanie zza grobu możliwe jest tylko w fazie Prac Domowych.");
        broadcastState();
        return;
      }
      const station = state.stations.find(s => s.token === action.token);
      if (!station) {
        addPrivateLog(player, "Nieprawidłowy kod QR.");
        broadcastState();
        return;
      }
      // Skany martwych NIE trafiają do scanHistory ani podsłuchów
      if (station.id === player.assignedStation) {
        if (player.completedRound === state.round) {
          addPrivateLog(player, `Stacja zza grobu w rundzie ${state.round} została już zaliczona.`);
        } else {
          player.completedRound = state.round;
          player.ghostScans += 1;
          if (player.ghostScans >= 2) {
            player.ghostScans -= 2;
            player.ghostPoints += 1;
            addPrivateLog(player, `WSPARCIE ZZA GROBU: Zaliczone 2 stacje! Zyskujesz +1 PKT do przekazania żywemu graczowi.`);
          } else {
            addPrivateLog(player, `WSPARCIE ZZA GROBU: Zaliczono stację #${station.id} (postęp: ${player.ghostScans}/2 do punktu wsparcia).`);
          }
        }
      } else {
        addPrivateLog(player, `Zeskanowano stację #${station.id}, ale Twoim celem zza grobu była stacja #${player.assignedStation}.`);
      }
      broadcastState();
    }
    return;
  }

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
      addPrivateLog(player, "Nieprawidłowy kod QR.");
      broadcastState();
      return;
    }
    if (station.sabotagedRound === state.round) {
      addPrivateLog(player, `Stacja #${station.id} jest ZASABOTOWANA w tej rundzie.`);
      broadcastState();
      return;
    }

    const isActuallyFascist = (player.role === "FASCIST" || player.role === "HITLER");
    const hasFalseTrail = (player.falseTrailRound === state.round);
    state.scanHistory.push({
      round: state.round,
      playerId: player.id,
      stationId: station.id,
      isFascist: hasFalseTrail ? !isActuallyFascist : isActuallyFascist,
      fake: hasFalseTrail
    });

    state.wiretaps.forEach(w => {
      if (w.stationId === station.id && w.expiresRound >= state.round && w.ownerId !== player.id) {
        const owner = state.players.find(p => p.id === w.ownerId);
        if (owner) {
          const shownName = hasFalseTrail ? "NIEZNANY (FAŁSZYWY TROP)" : player.name;
          addPrivateLog(owner, `PODSŁUCH STACJI #${station.id}: Zeskanował ją gracz ${shownName}.`);
        }
      }
    });

    if (state.settings.hiddenWeaponEnabled && station.id === state.weaponStationId && !state.weaponClaimed && !state.weaponUsed) {
      state.weaponClaimed = true;
      player.foundWeapon = true;
      addPrivateLog(player, `ZNALAZŁEŚ UKRYTĄ BROŃ na stacji #${station.id}. Zniknęła ze stacji — możesz jej użyć lub zniszczyć ją w zakładce ZADANIE QR.`);
    }

    // Mechanika Faszystów: swobodny wybór stacji + premia +1 PKT za powtórzenie tego samego kodu
    if (state.settings.fascistFreeChoiceEnabled && player.role === "FASCIST") {
      if (player.completedRound === state.round) {
        addPrivateLog(player, `W rundzie ${state.round} zdobyłeś już punkty za skanowanie QR (limit 1 punktowany skan na rundę).`);
      } else {
        player.completedRound = state.round;
        if (player.lastScannedStationId === station.id) {
          player.points += 2;
          player.lastScannedStationId = null; // reset po zdobyciu premii, aby uniknąć nieskończonego farmienia
          addPrivateLog(player, `POWTÓRZENIE STACJI #${station.id}: Zeskanowano ten sam kod po raz drugi! Otrzymujesz +2 PKT Wpływu (1 bazowy + 1 premii).`);
        } else {
          player.points += 1;
          player.lastScannedStationId = station.id;
          addPrivateLog(player, `Wybrano i zeskanowano stację #${station.id}. Otrzymujesz +1 PKT Wpływu. Ponowne zeskanowanie #${station.id} w kolejnej rundzie da +2 PKT.`);
        }
      }
      broadcastState();
      return;
    }

    if (station.id === player.assignedStation) {
      if (player.completedRound === state.round) {
        addPrivateLog(player, `Zadanie w rundzie ${state.round} zostało już wcześniej zaliczone.`);
      } else {
        player.completedRound = state.round;
        player.points += 1;
        addPrivateLog(player, `Zaliczono stację #${station.id}. Otrzymujesz +1 PKT Wpływu.`);
      }
    } else {
      addPrivateLog(player, `Zeskanowano stację #${station.id}, ale Twoim celem była stacja #${player.assignedStation}.`);
    }

    broadcastState();
    return;
  }

  if (action.type === "USE_WEAPON") {
    if (!player.foundWeapon || state.weaponUsed) return;
    if (state.phase !== "CHORES") {
      addPrivateLog(player, "Nie można używać broni podczas obrad (Dyskusji) — możliwe jest tylko przelewanie żetonów.");
      broadcastState();
      return;
    }
    state.weaponUsed = true;
    player.foundWeapon = false;
    queueBufferedElimination(player.id, action.targetId, "UKRYTA BROŃ QR");
    const t = state.players.find(p => p.id === action.targetId);
    addPrivateLog(player, `Zlecono tajną eliminację gracza ${t ? t.name : "?"}. Bufor odlicza się automatycznie.`);
    broadcastState();
    return;
  }

  if (action.type === "DESTROY_WEAPON") {
    if (!player.foundWeapon || state.weaponUsed) return;
    if (state.phase !== "CHORES") {
      addPrivateLog(player, "Zniszczenie broni możliwe jest tylko w fazie Prac Domowych.");
      broadcastState();
      return;
    }
    state.weaponUsed = true;
    player.foundWeapon = false;
    addPrivateLog(player, "ZNISZCZONO BROŃ: Ukryta broń została trwale usunięta z gry.");
    if (state.settings.announceWeaponDestroy) {
      addPublicLog("KOMUNIKAT: Ktoś odnalazł i trwale ZNISZCZYŁ ukrytą broń QR.");
    }
    broadcastState();
    return;
  }

  if (action.type === "TRANSFER_POINT") {
    processPointTransfer(player, action.targetId);
    broadcastState();
    return;
  }

  if (action.type === "BUY_ITEM") {
    processShopPurchase(player, action.itemId, action.target1, action.target2);
    broadcastState();
  }
}

/* ==================== LOGIKA SKLEPU ==================== */
function formatStationForPlayer(stationId, player) {
  const st = state.stations.find(x => x.id === stationId);
  const isFas = (player.role === "FASCIST" || player.role === "HITLER");
  const hide = isFas ? state.settings.hideDescForFascists : state.settings.hideDescForLiberals;
  if (hide) return `#${stationId}`;
  return `#${stationId} (${st ? st.location : "?"})`;
}

function processPointTransfer(sender, targetId) {
  if (!state.settings.transfersEnabled) {
    addPrivateLog(sender, "Przelewy punktów są wyłączone w ustawieniach gry.");
    return;
  }
  if (state.round < 2) {
    addPrivateLog(sender, "Przelewy punktów są zablokowane w 1. rundzie (odblokują się w 2. rundzie).");
    return;
  }
  if (sender.points < 1) {
    addPrivateLog(sender, "Brak wystarczających Punktów Wpływu do przelewu.");
    return;
  }
  if (sender.sentTransferRound === state.round) {
    addPrivateLog(sender, "Limit: możesz wysłać maksymalnie 1 PKT na rundę.");
    return;
  }
  const target = state.players.find(p => p.id === targetId && p.alive && p.id !== sender.id);
  if (!target) {
    addPrivateLog(sender, "Nieprawidłowy odbiorca przelewu.");
    return;
  }
  if (target.receivedTransferRound === state.round) {
    addPrivateLog(sender, `Gracz ${target.name} otrzymał już maksymalny limit (1 PKT) z przelewów w tej rundzie.`);
    return;
  }

  sender.points -= 1;
  target.points += 1;
  sender.sentTransferRound = state.round;
  target.receivedTransferRound = state.round;
  state.transferHistory.push({ round: state.round });

  addPrivateLog(sender, `TAJNY PRZELEW: Wysłano 1 PKT Wpływu do gracza ${target.name}.`);
  addPrivateLog(target, `TAJNY PRZELEW: Otrzymałeś 1 PKT Wpływu od gracza ${sender.name}.`);
}

function processShopPurchase(player, itemId, target1, target2) {
  if (state.phase !== "CHORES") {
    addPrivateLog(player, "Sklep jest zamknięty podczas obrad (Dyskusji). W trakcie obrad możliwe jest tylko przelewanie żetonów.");
    return;
  }
  const item = SHOP_CATALOG.find(i => i.id === itemId);
  const cfg = state.shopConfig[itemId];
  if (!item || !cfg || !cfg.enabled) return;

  if (item.fascistOnly && player.role !== "FASCIST") {
    addPrivateLog(player, "Brak uprawnień do tego przedmiotu.");
    return;
  }
  if (cfg.remaining <= 0) {
    addPrivateLog(player, `Przedmiot "${item.name}" został już wykupiony ze wspólnej puli.`);
    return;
  }
  if (player.points < cfg.cost) {
    addPrivateLog(player, `Za mało Punktów Wpływu na "${item.name}".`);
    return;
  }
  if (state.settings.limitOnePurchasePerRound && player.purchasedRound === state.round) {
    addPrivateLog(player, "Limit: możesz kupić tylko 1 przedmiot w sklepie na rundę.");
    return;
  }
  if (itemId === "compare_factions" && player.usedCompare) {
    addPrivateLog(player, "Porównanie Frakcji można wykorzystać tylko raz na całą grę.");
    return;
  }

  const disinfoActive = (state.disinfoRound === state.round && player.role === "LIBERAL");

  if (itemId === "trace_narrow") {
    const sourceScans = disinfoActive
      ? state.scanHistory.filter(s => !s.isFascist && s.round >= state.round - 1)
      : state.scanHistory.filter(s => s.isFascist && s.round >= state.round - 1);
    if (sourceScans.length === 0) {
      addPrivateLog(player, "ŚLAD FASZYSTY (ZAWĘŻENIE): Brak świeżych śladów z tej ani poprzedniej rundy. Punkty i pula NIE zostały pobrane.");
      return;
    }
    const picked = sourceScans[sourceScans.length - 1];
    const otherIds = [...new Set(
      state.scanHistory.filter(s => s.stationId !== picked.stationId).map(s => s.stationId)
    )];
    while (otherIds.length < 2 && otherIds.length < state.stations.length - 1) {
      const rnd = Math.floor(Math.random() * state.stations.length) + 1;
      if (rnd !== picked.stationId && !otherIds.includes(rnd)) otherIds.push(rnd);
    }
    otherIds.sort(() => Math.random() - 0.5);
    const trio = [picked.stationId, ...otherIds.slice(0, 2)].sort(() => Math.random() - 0.5);
    const names = trio.map(id => formatStationForPlayer(id, player)).join(", ");
    addPrivateLog(player, `ŚLAD FASZYSTY (ZAWĘŻENIE): Faszysta odbił się ostatnio w jednym z tych miejsc: ${names}.`);
  }
  else if (itemId === "trace_delayed") {
    if (state.round <= 1) {
      addPrivateLog(player, "ŚLAD FASZYSTY (OPÓŹNIONY): Dostępny od 2. rundy. Punkty i pula NIE zostały pobrane.");
      return;
    }
    const prevList = disinfoActive
      ? state.scanHistory.filter(s => !s.isFascist && s.round === state.round - 1)
      : state.scanHistory.filter(s => s.isFascist && s.round === state.round - 1);
    if (prevList.length === 0) {
      addPrivateLog(player, `ŚLAD FASZYSTY (OPÓŹNIONY): Brak danych z rundy ${state.round - 1}. Punkty i pula NIE zostały pobrane.`);
      return;
    }
    const chosen = prevList[Math.floor(Math.random() * prevList.length)];
    addPrivateLog(player, `ŚLAD FASZYSTY (OPÓŹNIONY): W poprzedniej rundzie (R${state.round - 1}) Faszysta zeskanował stację ${formatStationForPlayer(chosen.stationId, player)}.`);
  }
  else if (itemId === "trace_hot") {
    const allList = disinfoActive
      ? state.scanHistory.filter(s => !s.isFascist)
      : state.scanHistory.filter(s => s.isFascist);
    if (allList.length === 0) {
      addPrivateLog(player, "ŚLAD FASZYSTY (GORĄCE STACJE): Brak skanowań od początku gry. Punkty i pula NIE zostały pobrane.");
      return;
    }
    const lastThree = allList.slice(-3).map(s => s.stationId).sort(() => Math.random() - 0.5);
    const names = lastThree.map(id => formatStationForPlayer(id, player)).join(", ");
    addPrivateLog(player, `ŚLAD FASZYSTY (GORĄCE STACJE): Ostatnie stacje odwiedzone przez Faszystów (losowa kolejność): ${names}.`);
  }
  else if (itemId === "extra_vote") {
    player.extraVoteActive = true;
    addPrivateLog(player, "Aktywowano TAJNY +1 GŁOS na najbliższe głosowanie.");
  }
  else if (itemId === "block_vote") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.blockedVotes[t.id] = true;
    addPrivateLog(player, `Zablokowano głos gracza ${t.name} w najbliższym głosowaniu.`);
  }
  else if (itemId === "shield") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.shields[t.id] = state.round;
    addPrivateLog(player, `Nałożono TARCZĘ OCHRONNĄ na gracza ${t.name} w tej rundzie.`);
  }
  else if (itemId === "sabotage") {
    const st = state.stations.find(s => s.id === Number(target1));
    if (!st) return;
    st.sabotagedRound = state.round;
    addPrivateLog(player, `Zasabotowano stację ${formatStationForPlayer(st.id, player)} do końca tej rundy.`);
  }
  else if (itemId === "wiretap") {
    const st = state.stations.find(s => s.id === Number(target1));
    if (!st) return;
    state.wiretaps.push({ ownerId: player.id, stationId: st.id, expiresRound: state.round + 1 });
    addPrivateLog(player, `Założono PODSŁUCH na stacji ${formatStationForPlayer(st.id, player)} na rundy R${state.round}-R${state.round + 1}.`);
  }
  else if (itemId === "activity_report") {
    const prevR = Math.max(1, state.round - 1);
    const scannedIds = new Set(state.scanHistory.filter(s => s.round === prevR).map(s => s.playerId));
    const inactive = state.players.filter(p => p.alive && !scannedIds.has(p.id)).map(p => p.name);
    addPrivateLog(player, `RAPORT AKTYWNOŚCI (R${prevR}): Nie zeskanowali żadnego kodu: ${inactive.length ? inactive.join(", ") : "Wszyscy byli aktywni"}.`);
  }
  else if (itemId === "counter_intel") {
    const prevR = Math.max(1, state.round - 1);
    const bought = state.purchaseHistory.filter(h => h.round === prevR).map(h => h.itemName);
    const transfersCount = state.transferHistory.filter(t => t.round === prevR).length;
    addPrivateLog(player, `RAPORT KONTRWYWIADU (R${prevR}): Zakupione przedmioty: ${bought.length ? bought.join(", ") : "Brak zakupów"}. Wykonane przelewy punktów: ${transfersCount}.`);
  }
  else if (itemId === "compare_factions") {
    const p1 = state.players.find(p => p.id === target1);
    const p2 = state.players.find(p => p.id === target2);
    if (!p1 || !p2 || p1.id === p2.id) {
      addPrivateLog(player, "Wybierz dwóch różnych graczy.");
      return;
    }
    const f1 = (p1.role === "LIBERAL") ? (p1.falseTrailRound === state.round ? "FAS" : "LIB") : (p1.falseTrailRound === state.round ? "LIB" : "FAS");
    const f2 = (p2.role === "LIBERAL") ? (p2.falseTrailRound === state.round ? "FAS" : "LIB") : (p2.falseTrailRound === state.round ? "LIB" : "FAS");
    player.usedCompare = true;
    addPrivateLog(player, `PORÓWNANIE FRAKCJI (${p1.name} vs ${p2.name}): ${f1 === f2 ? "TA SAMA FRAKCJA" : "RÓŻNE FRAKCJE"}.`);
  }
  else if (itemId === "cut_debate") {
    state.timerSeconds = Math.max(10, state.timerSeconds - 120);
    addPublicLog("Ktoś anonimowo skrócił czas dyskusji o 2 minuty.");
    addPrivateLog(player, "Skrócono zegar dyskusji o 2 minuty.");
  }
  else if (itemId === "false_trail") {
    player.falseTrailRound = state.round;
    addPrivateLog(player, "Aktywowano FAŁSZYWY TROP na tę rundę.");
  }
  /* AKCJE FASZYSTÓW */
  else if (itemId === "fascist_kill") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    queueBufferedElimination(player.id, t.id, "TAJNY ZAMACH");
    addPrivateLog(player, `Zlecono TAJNY ZAMACH na gracza ${t.name}. Bufor odlicza się automatycznie.`);
  }
  else if (itemId === "fascist_wipe_traces") {
    let removed = false;
    for (let i = state.scanHistory.length - 1; i >= 0; i--) {
      if (state.scanHistory[i].isFascist) {
        state.scanHistory.splice(i, 1);
        removed = true;
        break;
      }
    }
    if (!removed) {
      addPrivateLog(player, "ZATARCIE ŚLADÓW: Brak śladów Faszystów do usunięcia. Punkty i pula NIE zostały pobrane.");
      return;
    }
    addPrivateLog(player, "ZATARCIE ŚLADÓW: Ostatni ślad skanowania Faszystów został usunięty z historii.");
  }
  else if (itemId === "fascist_disinfo") {
    state.disinfoRound = state.round;
    addPrivateLog(player, "DEZINFORMACJA WYWIADU: Raporty Śladu Faszysty kupione przez Liberałów w tej rundzie zostaną sfałszowane.");
  }
  else if (itemId === "fascist_flip_vote") {
    const t = state.players.find(p => p.id === target1);
    if (!t) return;
    state.flippedVotes[t.id] = true;
    addPrivateLog(player, `PRZEKUPIENIE WYBORCY: Głos gracza ${t.name} zostanie po cichu odwrócony w najbliższym głosowaniu.`);
  }
  else if (itemId === "fascist_contact_hitler") {
    const hitler = state.players.find(p => p.role === "HITLER" && p.alive);
    if (!hitler) {
      addPrivateLog(player, "Brak żywego Hitlera w grze.");
      return;
    }
    addPrivateLog(hitler, `TAJNA DEPESZA OD WSPÓLNIKA: Gracz ${player.name} jest Twoim Faszystą.`);
    addPrivateLog(player, `KONTAKT Z HITLEREM: Wysłano Twoje imię do Hitlera (${hitler.name}).`);
  }

  player.points -= cfg.cost;
  player.purchasedRound = state.round;
  cfg.remaining -= 1;
  state.purchaseHistory.push({ round: state.round, itemName: item.name });
}

/* ==================== KONFIGURATOR, EDYCJA STACJI I RANDOMIZER ==================== */
function updateSettingsFromUI() {
  state.settings.boardSize = document.getElementById("cfg-board-size").value;
  state.settings.choresDuration = Math.max(15, Number(document.getElementById("cfg-chores-sec").value) || 120);
  state.settings.discussionDuration = Math.max(30, Number(document.getElementById("cfg-discussion-sec").value) || 300);
  state.settings.baseUrl = document.getElementById("cfg-base-url").value.trim();
  state.settings.transfersEnabled = document.getElementById("cfg-transfers-enabled").checked;
  state.settings.limitOnePurchasePerRound = document.getElementById("cfg-limit-one-purchase").checked;
  state.settings.fascistFreeChoiceEnabled = document.getElementById("cfg-fascist-free-choice").checked;
  state.settings.elimDelayMin = Math.max(5, Number(document.getElementById("cfg-elim-min").value) || 30);
  state.settings.elimDelayMax = Math.max(state.settings.elimDelayMin, Number(document.getElementById("cfg-elim-max").value) || 60);
  state.settings.hiddenWeaponEnabled = document.getElementById("cfg-hidden-weapon").checked;
  state.settings.announceWeaponDestroy = document.getElementById("cfg-announce-destroy").checked;
  state.settings.ghostSupportEnabled = document.getElementById("cfg-ghost-support").checked;
  state.settings.deadBetsEnabled = document.getElementById("cfg-dead-bets").checked;
  state.settings.startingPointEnabled = document.getElementById("cfg-starting-point").checked;
  state.settings.liberalCatchupEnabled = document.getElementById("cfg-liberal-catchup").checked;
  state.settings.hideDescForLiberals = document.getElementById("cfg-hide-desc-liberals").checked;
  state.settings.hideDescForFascists = document.getElementById("cfg-hide-desc-fascists").checked;
  broadcastState();
}

function changeStationCount(newCountRaw) {
  const count = Math.max(3, Math.min(30, parseInt(newCountRaw, 10) || 15));
  document.getElementById("cfg-station-count").value = count;
  while (state.stations.length < count) {
    const nextId = state.stations.length + 1;
    state.stations.push({
      id: nextId,
      location: DEFAULT_STATIONS[nextId - 1] || ("Lokalizacja #" + nextId),
      token: randomToken(10),
      sabotagedRound: 0
    });
  }
  if (state.stations.length > count) {
    state.stations = state.stations.slice(0, count);
  }
  persistStations();
  renderStationsEditor();
  renderQrPrintGrid();
  broadcastState();
}

function updateStationLocation(id, value) {
  const st = state.stations.find(s => s.id === id);
  if (!st) return;
  st.location = value;
  persistStations();
  // Natychmiastowa aktualizacja etykiety na karcie QR bez przeładowywania inputa
  const labelEl = document.getElementById("qr-loc-label-" + id);
  if (labelEl) labelEl.textContent = value;
  broadcastState(true);
}

function regenerateAllTokens() {
  if (!confirm("Wygenerować nowe tajne tokeny dla wszystkich stacji? Poprzednie wydruki przestaną działać.")) return;
  state.stations.forEach(s => { s.token = randomToken(10); });
  persistStations();
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

  SHOP_CATALOG.forEach(i => {
    state.shopConfig[i.id].enabled = false;
    state.shopConfig[i.id].maxQty = 0;
    state.shopConfig[i.id].remaining = 0;
  });

  // 1-2 warianty Sladu Faszysty
  const traces = ["trace_narrow", "trace_delayed", "trace_hot"].sort(() => Math.random() - 0.5);
  const traceCount = size === "5-6" ? 1 : 2;
  for (let i = 0; i < traceCount; i++) {
    const id = traces[i];
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = id === "trace_hot" ? 1 : Math.max(1, Math.round(2 * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  }

  // Podstawa glosowania i obrony
  ["extra_vote", "shield", "sabotage"].forEach(id => {
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = Math.max(1, Math.round((base.defaultQty + (Math.random() > 0.5 ? 0 : -1)) * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  });

  // Dodatkowe przedmioty ogolne
  const extras = ["block_vote", "wiretap", "activity_report", "counter_intel", "compare_factions", "cut_debate", "false_trail"]
    .sort(() => Math.random() - 0.5);
  const pickExtras = size === "5-6" ? 2 : (size === "9-10" ? 4 : 3);
  for (let i = 0; i < pickExtras; i++) {
    const id = extras[i];
    const base = SHOP_CATALOG.find(x => x.id === id);
    const qty = id === "compare_factions" ? 1 : Math.max(1, Math.round(base.defaultQty * scale));
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: qty, remaining: qty };
  }

  // Przedmioty dla Faszystow (zbalansowane)
  const fasPool = ["fascist_wipe_traces", "fascist_disinfo", "fascist_flip_vote"];
  if (size !== "5-6") fasPool.push("fascist_contact_hitler");
  fasPool.sort(() => Math.random() - 0.5);
  const fasPick = size === "5-6" ? 1 : 2;
  for (let i = 0; i < fasPick; i++) {
    const id = fasPool[i];
    const base = SHOP_CATALOG.find(x => x.id === id);
    state.shopConfig[id] = { enabled: true, cost: base.defaultCost, maxQty: 1, remaining: 1 };
  }
  if (size !== "5-6") {
    state.shopConfig["fascist_kill"] = { enabled: true, cost: 4, maxQty: 1, remaining: 1 };
  }

  renderConfigView();
  broadcastState();
}

/* ==================== RENDEROWANIE WIDOKÓW ==================== */
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
    phaseEl.textContent = "FAZA 1 // PRACE DOMOWE (SKANOWANIE QR I SKLEP)";
    phaseEl.className = "timer-phase chores";
  } else {
    phaseEl.textContent = "FAZA 2 // DYSKUSJA PRZY STOLE (ZADANIA QR ZABLOKOWANE)";
    phaseEl.className = "timer-phase discussion";
  }
  document.getElementById("timer-display").textContent = formatTime(state.timerSeconds);
  document.getElementById("host-board-label").textContent = state.settings.boardSize + " GRACZY";
  document.getElementById("host-round-num").textContent = state.round;
  document.getElementById("lib-count").textContent = state.liberalPolicies;
  document.getElementById("fas-count").textContent = state.fascistPolicies;
  document.getElementById("election-tracker").textContent = `${state.electionTracker} / 3`;
  document.getElementById("buffered-elim-badge").textContent = state.bufferedEliminations.length > 0 ? `BUFOR: ${state.bufferedEliminations.length} (AUTO-ODLICZANIE)` : "BUFOR: 0";

  const vic = document.getElementById("victory-banner");
  const betsPanel = document.getElementById("host-bets-panel");
  if (state.winner) {
    vic.style.display = "block";
    vic.textContent = state.winner;
    renderHostBetsSummary(betsPanel);
  } else {
    vic.style.display = "none";
    if (betsPanel) betsPanel.style.display = "none";
  }

  const libTrack = document.getElementById("liberal-track");
  libTrack.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const slot = document.createElement("div");
    slot.className = "policy-slot" + (i < state.liberalPolicies ? " enacted-liberal" : "");
    slot.onclick = () => togglePolicy("LIBERAL", i);
    slot.innerHTML = `<div class="policy-slot-num">${i < state.liberalPolicies ? "UCHWALONO" : ("POLE " + (i + 1))}</div><div class="policy-slot-power">${i === 4 ? "ZWYCIĘSTWO" : "LIBERALNA"}</div>`;
    libTrack.appendChild(slot);
  }

  const fasTrack = document.getElementById("fascist-track");
  fasTrack.innerHTML = "";
  const powers = BOARD_POWERS[state.settings.boardSize] || BOARD_POWERS["7-8"];
  for (let i = 0; i < 6; i++) {
    const slot = document.createElement("div");
    slot.className = "policy-slot" + (i < state.fascistPolicies ? " enacted-fascist" : "");
    slot.onclick = () => togglePolicy("FASCIST", i);
    slot.innerHTML = `<div class="policy-slot-num">${i < state.fascistPolicies ? "UCHWALONO" : ("POLE " + (i + 1))}</div><div class="policy-slot-power">${powers[i]}</div>`;
    fasTrack.appendChild(slot);
  }

  const voteBox = document.getElementById("vote-result-box");
  if (state.votingOpen) {
    const count = Object.keys(state.votes).length;
    const aliveCount = state.players.filter(p => p.alive).length;
    voteBox.style.display = "block";
    voteBox.textContent = `GŁOSOWANIE OTWARTE: oddano ${count} z ${aliveCount} głosów.`;
  } else if (state.lastVoteSummary) {
    voteBox.style.display = "block";
    voteBox.textContent = state.lastVoteSummary;
  } else {
    voteBox.style.display = "none";
  }

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

  const plist = document.getElementById("host-players-list");
  plist.innerHTML = "";
  if (state.players.length === 0) {
    plist.innerHTML = `<p style="color:var(--ink-muted);">Brak graczy w pokoju.</p>`;
  } else {
    state.players.forEach(p => {
      const card = document.createElement("div");
      card.className = "player-card" + (p.alive ? "" : " dead");
      const votedTag = (state.votingOpen && state.votes[p.id]) ? `<span class="badge badge-liberal">ZAGŁOSOWAŁ</span>` : "";
      const actionBtn = p.alive
        ? `<button class="btn btn-sm btn-fascist" onclick="manualExecute('${p.id}')">EGZEKUCJA</button>`
        : `<span class="stamp">WYELIMINOWANY</span> <button class="btn btn-sm btn-outline" onclick="manualRevive('${p.id}')">PRZYWRÓĆ</button>`;
      card.innerHTML = `
        <div><strong class="player-name">${p.name}</strong> ${votedTag}</div>
        <div style="display:flex; gap:6px; align-items:center;">${actionBtn}</div>
      `;
      plist.appendChild(card);
    });
  }

  const plog = document.getElementById("host-public-log");
  plog.innerHTML = state.publicLogs.length
    ? state.publicLogs.map(l => `<div class="log-entry">${l}</div>`).join("")
    : `<div class="log-entry" style="color:var(--ink-muted);">Brak wpisów.</div>`;
}

function renderStationsEditor() {
  const sed = document.getElementById("stations-editor-list");
  sed.innerHTML = "";
  state.stations.forEach(s => {
    const row = document.createElement("div");
    row.style.cssText = "display:flex; gap:8px; align-items:center; margin-bottom:6px;";
    const num = document.createElement("strong");
    num.style.minWidth = "34px";
    num.textContent = "#" + s.id;
    const inp = document.createElement("input");
    inp.type = "text";
    inp.value = s.location;
    inp.addEventListener("input", e => updateStationLocation(s.id, e.target.value));
    row.appendChild(num);
    row.appendChild(inp);
    sed.appendChild(row);
  });
}

function renderConfigView() {
  document.getElementById("cfg-board-size").value = state.settings.boardSize;
  document.getElementById("cfg-chores-sec").value = state.settings.choresDuration;
  document.getElementById("cfg-discussion-sec").value = state.settings.discussionDuration;
  document.getElementById("cfg-base-url").value = state.settings.baseUrl;
  document.getElementById("cfg-transfers-enabled").checked = state.settings.transfersEnabled;
  document.getElementById("cfg-limit-one-purchase").checked = state.settings.limitOnePurchasePerRound;
  document.getElementById("cfg-fascist-free-choice").checked = state.settings.fascistFreeChoiceEnabled;
  document.getElementById("cfg-elim-min").value = state.settings.elimDelayMin;
  document.getElementById("cfg-elim-max").value = state.settings.elimDelayMax;
  document.getElementById("cfg-hidden-weapon").checked = state.settings.hiddenWeaponEnabled;
  document.getElementById("cfg-announce-destroy").checked = state.settings.announceWeaponDestroy;
  document.getElementById("cfg-ghost-support").checked = state.settings.ghostSupportEnabled;
  document.getElementById("cfg-dead-bets").checked = state.settings.deadBetsEnabled;
  document.getElementById("cfg-starting-point").checked = state.settings.startingPointEnabled;
  document.getElementById("cfg-liberal-catchup").checked = state.settings.liberalCatchupEnabled;
  document.getElementById("cfg-hide-desc-liberals").checked = state.settings.hideDescForLiberals;
  document.getElementById("cfg-hide-desc-fascists").checked = state.settings.hideDescForFascists;
  document.getElementById("cfg-station-count").value = state.stations.length;

  renderStationsEditor();

  const tbody = document.getElementById("shop-config-tbody");
  tbody.innerHTML = SHOP_CATALOG.map(item => {
    const cfg = state.shopConfig[item.id];
    return `
      <tr class="${item.fascistOnly ? "fascist-row" : ""}">
        <td style="text-align:center;">
          <input type="checkbox" ${cfg.enabled ? "checked" : ""} onchange="updateShopConfigField('${item.id}', 'enabled', this.checked)" />
        </td>
        <td>
          <strong>${item.name}</strong>
          ${item.fascistOnly ? '<br><span class="badge badge-fascist" style="margin-top:3px;">TYLKO FASZYŚCI</span>' : ''}
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
  document.getElementById("qr-count-label").textContent = state.stations.length;
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
      <div class="qr-card-loc" id="qr-loc-label-${s.id}"></div>
      <div class="qr-img-wrap" id="qr-canvas-${s.id}"></div>
    `;
    grid.appendChild(card);
    document.getElementById("qr-loc-label-" + s.id).textContent = s.location;

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

function renderHostBetsSummary(betsPanel) {
  if (!betsPanel || !state.settings.deadBetsEnabled) {
    if (betsPanel) betsPanel.style.display = "none";
    return;
  }
  const betEntries = Object.entries(state.deadBets || {});
  if (betEntries.length === 0) {
    betsPanel.style.display = "none";
    return;
  }
  betsPanel.style.display = "block";
  const actualHitler = state.players.find(p => p.role === "HITLER");
  const actualFascists = state.players.filter(p => p.role === "FASCIST").map(p => p.id);
  const resDiv = document.getElementById("host-bets-results");
  resDiv.innerHTML = betEntries.map(([pid, bet]) => {
    const bettor = state.players.find(p => p.id === pid);
    const hitlerOk = actualHitler && bet.hitlerId === actualHitler.id;
    const hitlerPick = state.players.find(p => p.id === bet.hitlerId);
    const matchedFas = (bet.fascistIds || []).filter(fid => actualFascists.includes(fid)).length;
    const wrongFas = (bet.fascistIds || []).filter(fid => !actualFascists.includes(fid)).length;
    return `
      <div class="log-entry">
        <strong>${bettor ? bettor.name : "?"}</strong> —
        Typ na Hitlera: <strong>${hitlerPick ? hitlerPick.name : "brak"}</strong> (${hitlerOk ? "TRAFIONY" : "PUDŁO"}) |
        Trafieni Faszyści: <strong>${matchedFas}/${actualFascists.length}</strong> (błędne typy: ${wrongFas})
      </div>
    `;
  }).join("");
}

function renderPhoneView() {
  if (connMode === "DEMO") {
    const sel = document.getElementById("demo-player-select");
    const prev = sel.value;
    sel.innerHTML = state.players.map(p => `<option value="${p.id}">${p.name} (${p.alive ? "ŻYWY" : "MARTWY"} | ${p.points} PKT)</option>`).join("");
    if (myPlayerId) sel.value = myPlayerId;
    else if (prev) sel.value = prev;

    const anySel = document.getElementById("demo-any-station-select");
    anySel.innerHTML = state.stations.map(s => `<option value="${s.id}">#${s.id} — ${s.location}</option>`).join("");
  }

  const player = state.players.find(p => p.id === myPlayerId);
  const aliveBadge = document.getElementById("phone-alive-badge");
  if (!player) {
    document.getElementById("phone-player-header").textContent = "BRAK SESJI";
    document.getElementById("phone-points").textContent = "0";
    document.getElementById("phone-phase-text").textContent = "OCZEKIWANIE";
    return;
  }

  document.getElementById("phone-player-header").textContent = player.name.toUpperCase();
  document.getElementById("phone-points").textContent = player.points;
  document.getElementById("phone-phase-text").textContent = state.started
    ? (state.phase === "CHORES" ? "PRACE DOMOWE" : "DYSKUSJA")
    : "OCZEKIWANIE";
  document.getElementById("phone-round-text").textContent = state.round;
  // Detekcja śmierci gracza -> sygnał dźwiękowy na jego telefonie
  if (lastKnownAliveMap[player.id] === true && player.alive === false) {
    playDeathSound();
  }
  lastKnownAliveMap[player.id] = player.alive;

  aliveBadge.textContent = player.alive ? "ŻYWY" : "WYELIMINOWANY";
  aliveBadge.className = "badge " + (player.alive ? "badge-liberal" : "badge-fascist");

  // Ekran śmierci (Opcja 1 + Opcja 4, bez Opcji 2)
  const deadScreen = document.getElementById("dead-player-screen");
  if (!player.alive) {
    deadScreen.style.display = "block";
    const guideEl = document.getElementById("dead-guide-text");
    const ghostBox = document.getElementById("ghost-transfer-box");
    if (state.settings.ghostSupportEnabled) {
      guideEl.innerHTML = `<strong>CO TERAZ ROBIĆ (WSPARCIE ZZA GROBU):</strong><br>1. Podczas obrad (Dyskusji) odejdź od stołu i zachowaj ciszę.<br>2. W fazie <strong>Prac Domowych</strong> możesz nadal skanować przydzielone Ci kody QR w zakładce <strong>ZADANIE QR</strong>.<br>3. Za każde <strong>2 zaliczone stacje</strong> zdobywasz 1 PKT wsparcia dla wybranego żywego gracza (postęp: <strong>${player.ghostScans || 0}/2</strong>).`;
      if ((player.ghostPoints || 0) > 0) {
        ghostBox.style.display = "block";
        document.getElementById("ghost-points-count").textContent = player.ghostPoints;
        const gSel = document.getElementById("ghost-target-select");
        const prevG = gSel.value;
        gSel.innerHTML = state.players.filter(p => p.alive).map(p => `<option value="${p.id}">${p.name}</option>`).join("");
        if (prevG) gSel.value = prevG;
      } else {
        ghostBox.style.display = "none";
      }
    } else {
      guideEl.innerHTML = "<strong>CO TERAZ ROBIĆ:</strong><br>Obserwuj rozgrywkę w ciszy. Jeśli włączono Zakłady poniżej, możesz wytypować role pozostałych graczy.";
      ghostBox.style.display = "none";
    }

    const betsPanel = document.getElementById("dead-bets-panel");
    if (state.settings.deadBetsEnabled) {
      betsPanel.style.display = "block";
      const hSel = document.getElementById("bet-hitler-select");
      const savedBet = (state.deadBets && state.deadBets[player.id]) ? state.deadBets[player.id] : null;
      const prevH = hSel.value || (savedBet ? savedBet.hitlerId : "");
      hSel.innerHTML = `<option value="">-- wybierz --</option>` +
        state.players.filter(p => p.id !== player.id).map(p => `<option value="${p.id}">${p.name}</option>`).join("");
      if (prevH) hSel.value = prevH;

      const fGrid = document.getElementById("bet-fascists-grid");
      const checkedIds = new Set(
        Array.from(fGrid.querySelectorAll("input:checked")).map(i => i.value)
      );
      if (checkedIds.size === 0 && savedBet && Array.isArray(savedBet.fascistIds)) {
        savedBet.fascistIds.forEach(id => checkedIds.add(id));
      }
      if (fGrid.children.length !== state.players.length - 1) {
        fGrid.innerHTML = state.players.filter(p => p.id !== player.id).map(p => `
          <label class="bet-check">
            <input type="checkbox" value="${p.id}" ${checkedIds.has(p.id) ? "checked" : ""} />
            <span>${p.name}</span>
          </label>
        `).join("");
      }
      document.getElementById("bet-saved-status").textContent = savedBet
        ? "Twój zakład jest zapisany (możesz go zmienić do końca gry)."
        : "";
    } else {
      betsPanel.style.display = "none";
    }
  } else {
    deadScreen.style.display = "none";
  }

  const roleBox = document.getElementById("secret-role-container");
  if (roleVisible) {
    roleBox.style.display = "block";
    let css = "liberal";
    let title = "LIBERAŁ";
    let extra = "Uchwal 5 ustaw liberalnych lub wyeliminuj Hitlera.";
    if (player.role === "FASCIST") {
      css = "fascist";
      title = "FASZYSTA";
      const others = state.players.filter(p => p.id !== player.id && (p.role === "FASCIST" || p.role === "HITLER"))
        .map(p => `${p.name} (${p.role === "HITLER" ? "HITLER" : "FASZYSTA"})`).join(", ");
      extra = `Twoi wspólnicy: ${others || "brak"}.`;
    } else if (player.role === "HITLER") {
      css = "hitler";
      title = "HITLER";
      if (state.settings.boardSize === "5-6") {
        const fas = state.players.find(p => p.role === "FASCIST");
        extra = `Plansza 5-6: Twój Faszysta to ${fas ? fas.name : "?"}.`;
      } else {
        extra = "Plansza 7-10: Nie znasz swoich Faszystów. Zdobywaj zaufanie.";
      }
    }
    roleBox.innerHTML = `<div class="role-box ${css}"><h3>${title}</h3><p style="margin-top:8px; font-size:0.84rem;">${extra}</p></div>`;
  } else {
    roleBox.style.display = "none";
  }

  const voteStatus = document.getElementById("phone-vote-status");
  const btnJa = document.getElementById("btn-vote-ja");
  const btnNein = document.getElementById("btn-vote-nein");
  if (!player.alive) {
    voteStatus.textContent = "Zostałeś wyeliminowany — nie bierzesz udziału w głosowaniu.";
    btnJa.disabled = true;
    btnNein.disabled = true;
  } else if (state.votingOpen) {
    const myVote = state.votes[player.id];
    voteStatus.textContent = myVote
      ? `Twój oddany głos: ${myVote} (możesz zmienić do zamknięcia).`
      : "Głosowanie otwarte. Wybierz JA lub NEIN.";
    btnJa.disabled = false;
    btnNein.disabled = false;
  } else {
    voteStatus.textContent = "Głosowanie jest obecnie zamknięte.";
    btnJa.disabled = true;
    btnNein.disabled = true;
  }

  const taskBox = document.getElementById("phone-task-box");
  const assignedLabel = formatStationForPlayer(player.assignedStation, player);
  if (!player.alive) {
    if (state.settings.ghostSupportEnabled) {
      if (player.completedRound === state.round) {
        taskBox.innerHTML = `<strong>ZADANIE ZZA GROBU ZALICZONE</strong><br>Postęp do punktu wsparcia: <strong>${player.ghostScans || 0}/2</strong> (dostępne punkty: <strong>${player.ghostPoints || 0}</strong>).`;
      } else {
        taskBox.innerHTML = `<strong>CEL ZZA GROBU (RUNDA ${state.round}):</strong><br>STACJA ${assignedLabel}<br><span style="font-size:0.75rem;">Zeskanuj podczas Prac Domowych (postęp: ${player.ghostScans || 0}/2 do +1 PKT wsparcia).</span>`;
      }
    } else {
      taskBox.textContent = "Jesteś wyeliminowany — zadania QR są nieaktywne.";
    }
  } else if (player.completedRound === state.round) {
    taskBox.innerHTML = `<strong>ZADANIE ZALICZONE</strong><br>Stacja ${assignedLabel} została zaliczona w tej rundzie.`;
  } else if (player.role === "FASCIST" && state.settings.fascistFreeChoiceEnabled) {
    taskBox.innerHTML = `<strong>PRZYDZIAŁ ALIBI (RUNDA ${state.round}):</strong><br>STACJA ${assignedLabel}<br><span style="font-size:0.75rem;">Jako Faszysta możesz ją zignorować i wybrać dowolny inny kod QR.</span>`;
  } else {
    taskBox.innerHTML = `<strong>CEL NA RUNDĘ ${state.round}:</strong><br>STACJA ${assignedLabel}`;
  }

  // Panel swobodnego wyboru stacji dla zwykłych Faszystów
  const fasBox = document.getElementById("phone-fascist-station-box");
  if (player.alive && player.role === "FASCIST" && state.settings.fascistFreeChoiceEnabled) {
    fasBox.style.display = "block";
    if (player.lastScannedStationId) {
      const prevLabel = formatStationForPlayer(player.lastScannedStationId, player);
      fasBox.innerHTML = `<strong>SWOBODNY WYBÓR FASZYSTY:</strong><br>Możesz zeskanować <strong>dowolną</strong> stację QR (+1 PKT).<br><strong>PREMIA +2 PKT:</strong> Ponowne zeskanowanie stacji <strong>${prevLabel}</strong> w tej rundzie da dodatkowy punkt (po czym licznik się wyzeruje).`;
    } else {
      fasBox.innerHTML = `<strong>SWOBODNY WYBÓR FASZYSTY:</strong><br>Nie musisz iść do wylosowanej stacji — możesz zeskanować <strong>dowolny</strong> kod QR w domu (+1 PKT). Jeśli wrócisz do tego samego kodu w kolejnej rundzie, zdobędziesz <strong>+2 PKT</strong>.`;
    }
  } else {
    fasBox.style.display = "none";
  }

  const wPanel = document.getElementById("hidden-weapon-panel");
  if (player.foundWeapon && !state.weaponUsed && player.alive) {
    wPanel.style.display = "block";
    const wSel = document.getElementById("weapon-target-select");
    const prevW = wSel.value;
    wSel.innerHTML = state.players.filter(p => p.alive && p.id !== player.id)
      .map(p => `<option value="${p.id}">${p.name}</option>`).join("");
    if (prevW) wSel.value = prevW;
    const inDebate = (state.phase !== "CHORES");
    document.getElementById("btn-use-weapon").disabled = inDebate;
    document.getElementById("btn-destroy-weapon").disabled = inDebate;
  } else {
    wPanel.style.display = "none";
  }

  renderPhoneShop(player);

  const privLogs = document.getElementById("phone-private-logs");
  privLogs.innerHTML = player.logs.length
    ? player.logs.map(l => `<div class="log-entry">${l}</div>`).join("")
    : `<div class="log-entry" style="color:var(--ink-muted);">Brak raportów.</div>`;
}

function renderPhoneShop(player) {
  const notice = document.getElementById("phone-shop-notice");
  const list = document.getElementById("phone-shop-list");
  const transferPanel = document.getElementById("phone-transfer-panel");
  list.innerHTML = "";

  if (!player.alive) {
    transferPanel.style.display = "none";
    notice.textContent = "Sklep jest niedostępny dla wyeliminowanych graczy.";
    return;
  }

  // Obsługa panelu przelewów (Opcja 1)
  if (state.settings.transfersEnabled) {
    transferPanel.style.display = "block";
    const tStatus = document.getElementById("phone-transfer-status");
    const tSel = document.getElementById("transfer-target-select");
    const tBtn = document.getElementById("btn-send-transfer");
    const others = state.players.filter(p => p.alive && p.id !== player.id);
    tSel.innerHTML = others.map(p => `<option value="${p.id}">${p.name}</option>`).join("");

    if (state.round < 2) {
      tStatus.textContent = "Przelewy odblokują się od 2. rundy (ochrona balansu).";
      tBtn.disabled = true;
    } else if (player.sentTransferRound === state.round) {
      tStatus.textContent = "Wysłałeś już 1 PKT w tej rundzie (limit 1 wysłany / 1 odebrany na rundę).";
      tBtn.disabled = true;
    } else if (player.points < 1) {
      tStatus.textContent = "Potrzebujesz co najmniej 1 PKT Wpływu, aby wykonać przelew.";
      tBtn.disabled = true;
    } else if (others.length === 0) {
      tStatus.textContent = "Brak innych żywych graczy.";
      tBtn.disabled = true;
    } else {
      tStatus.textContent = "Limit: max 1 wysłany i 1 odebrany PKT na rundę. Przelew jest tajny (zliczany w Kontrwywiadzie).";
      tBtn.disabled = false;
    }
  } else {
    transferPanel.style.display = "none";
  }
  const inDebate = (state.phase !== "CHORES");
  const limitLocked = state.settings.limitOnePurchasePerRound && player.purchasedRound === state.round;
  const locked = inDebate || limitLocked;
  if (inDebate) {
    notice.textContent = "TRWAJĄ OBRADY (DYSKUSJA): Zakupy w Sklepie są zablokowane — dozwolone jest wyłącznie przelewanie żetonów powyżej.";
  } else if (limitLocked) {
    notice.textContent = "Wykorzystano limit 1 zakupu w tej rundzie.";
  } else {
    notice.textContent = "Wspólna pula na całą grę — liczy się kolejność zakupu.";
  }

  const aliveOthers = state.players.filter(p => p.alive && p.id !== player.id);
  const aliveAll = state.players.filter(p => p.alive);

  SHOP_CATALOG.forEach(item => {
    const cfg = state.shopConfig[item.id];
    if (!cfg || !cfg.enabled) return;
    if (item.fascistOnly && player.role !== "FASCIST") return;
    if (item.id === "fascist_contact_hitler" && state.settings.boardSize === "5-6") return;

    const div = document.createElement("div");
    div.className = "shop-item" + (item.fascistOnly ? " fascist-only" : "");

    let targetInputs = "";
    if (item.needsTarget === "player") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${aliveOthers.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}</select>`;
    } else if (item.needsTarget === "player_self") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${aliveAll.map(p => `<option value="${p.id}">${p.name}</option>`).join("")}</select>`;
    } else if (item.needsTarget === "station") {
      targetInputs = `<select id="shop-t1-${item.id}" style="margin-bottom:8px;">${state.stations.map(s => `<option value="${s.id}">${formatStationForPlayer(s.id, player)}</option>`).join("")}</select>`;
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
        <span class="shop-item-title">${item.name}</span>
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
  document.getElementById("btn-toggle-role").textContent = roleVisible ? "UKRYJ TAJNĄ ROLĘ" : "ODSŁOŃ TAJNĄ ROLĘ";
  renderPhoneView();
}

function castVote(choice) {
  if (!myPlayerId) return;
  sendActionToHost({ type: "VOTE", playerId: myPlayerId, vote: choice });
}

function sendPointTransfer() {
  if (!myPlayerId) return;
  const sel = document.getElementById("transfer-target-select");
  if (!sel || !sel.value) return;
  sendActionToHost({
    type: "TRANSFER_POINT",
    playerId: myPlayerId,
    targetId: sel.value
  });
  switchPhonePane("notes");
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

function destroyHiddenWeapon() {
  if (!myPlayerId) return;
  if (!confirm("Czy na pewno trwale ZNISZCZYĆ ukrytą broń? Nikt nie będzie mógł z niej skorzystać.")) return;
  sendActionToHost({ type: "DESTROY_WEAPON", playerId: myPlayerId });
}

function sendGhostPoint() {
  const sel = document.getElementById("ghost-target-select");
  if (!sel || !sel.value || !myPlayerId) return;
  sendActionToHost({ type: "GHOST_SEND_POINT", playerId: myPlayerId, targetId: sel.value });
}

function submitDeadBet() {
  if (!myPlayerId) return;
  const hitlerId = document.getElementById("bet-hitler-select").value;
  const fascistIds = Array.from(document.querySelectorAll("#bet-fascists-grid input:checked")).map(i => i.value);
  sendActionToHost({ type: "SUBMIT_BET", playerId: myPlayerId, hitlerId, fascistIds });
}

/* ==================== SKANER QR ==================== */
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
  document.getElementById("qr-scan-feedback").innerHTML = `<div class="info-box">Przesłano skan kodu QR. Sprawdź zakładkę GŁOS / NOTES.</div>`;
  pendingScanToken = null;
}

function startQrScanner() {
  const readerEl = document.getElementById("qr-reader");
  readerEl.style.display = "block";
  if (typeof Html5Qrcode === "undefined") {
    document.getElementById("qr-scan-feedback").textContent = "Brak biblioteki skanera — użyj natywnego aparatu telefonu.";
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
  ).catch(() => {
    document.getElementById("qr-scan-feedback").innerHTML =
      `<div class="alert-box">Przeglądarka zablokowała dostęp do kamery (wymagane HTTPS). Zeskanuj kod QR <strong>natywnym aparatem telefonu</strong>.</div>`;
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

function savePersonalNotes() {
  if (!myPlayerId) return;
  localStorage.setItem("sh_notes_" + myPlayerId, document.getElementById("phone-personal-notes").value);
}

function loadPersonalNotes() {
  if (!myPlayerId) return;
  document.getElementById("phone-personal-notes").value = localStorage.getItem("sh_notes_" + myPlayerId) || "";
}

window.addEventListener("DOMContentLoaded", () => {
  // Odblokowanie dzwieku przy pierwszym kliknieciu/dotknieciu (wymog przegladarek mobilnych)
  ["click", "touchstart"].forEach(evt => {
    window.addEventListener(evt, () => getAudioContext(), { once: true });
  });
  if (!bufferWatcherInterval) {
    bufferWatcherInterval = setInterval(checkBufferedEliminationsTick, 1000);
  }
  checkLanServer();
  renderConfigView();
  renderAll();

  const params = new URLSearchParams(window.location.search);
  const roomParam = params.get("room");
  const lanParam = params.get("lan");
  if (roomParam) {
    const cleanRoom = roomParam.trim().toUpperCase();
    document.getElementById("peer-room-input").value = cleanRoom;
    document.getElementById("quick-join-room-badge").textContent = "KOD: " + cleanRoom;
    document.getElementById("quick-join-panel").style.display = "block";
    const savedName = localStorage.getItem("sh_last_name");
    if (savedName) document.getElementById("quick-join-name").value = savedName;
    setTimeout(() => document.getElementById("quick-join-name").focus(), 100);
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (lanParam) {
    document.getElementById("quick-join-room-badge").textContent = "LAN WI-FI";
    document.getElementById("quick-join-panel").style.display = "block";
    const savedName = localStorage.getItem("sh_last_name");
    if (savedName) document.getElementById("quick-join-name").value = savedName;
    setTimeout(() => document.getElementById("quick-join-name").focus(), 100);
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  const scanParam = params.get("scan");
  if (scanParam) {
    pendingScanToken = scanParam;
    const banner = document.getElementById("auto-scan-banner");
    banner.style.display = "block";
    banner.innerHTML = `<strong>WYKRYTO KOD QR Z APARATU</strong> — łączenie z sesją gracza...`;

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
      banner.innerHTML = `<strong>WYKRYTO KOD QR Z APARATU</strong> — dołącz do pokoju, a skan zostanie zaliczony automatycznie.`;
    }
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
