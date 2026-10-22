const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const video = $("#hero-video");
const syncCommand = $("#sync-command code");
const tcDisplay = $("#tc-display");

const fps = 24000 / 1001;
const nominalFps = 24;

function pad(value) {
  return String(value).padStart(2, "0");
}

function timecodeFromSeconds(seconds) {
  const safeSeconds = Math.max(0, seconds || 0);
  const totalFrames = Math.floor(safeSeconds * fps);
  const frames = totalFrames % nominalFps;
  const totalSeconds = Math.floor(totalFrames / nominalFps);
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(frames)}`;
}

const syncCommands = [
  {
    start: 0,
    end: 0.5,
    command: '{"id":"file.openDemoProject","params":{}}'
  },
  {
    start: 0.5,
    end: 6.4,
    command: '{"id":"tts.create","params":{"text":"Welcome to CinemaGrid. The first video editor built for AI agents and creators.","voice":"basic-female","seconds":0.5,"track":"Audio 3"}}'
  },
  {
    start: 0.5,
    end: 4.7,
    command: '{"id":"graphics.newText","params":{"text":"CINEMAGRID","time":127008000000,"seconds":4.2,"position":[960,480],"size":110}}'
  },
  {
    start: 5.2,
    end: 9.0,
    command: '{"id":"graphics.newText","params":{"text":"EXACT TICK-BASED TIME","time":1320883200000,"seconds":3.8,"position":[960,490],"size":72}}'
  },
  {
    start: 9.8,
    end: 15.2,
    command: '{"id":"tts.create","params":{"text":"Engineered in pure Rust with zero-panic reliability and clean-room codecs.","voice":"basic-male","seconds":9.8,"track":"Audio 3"}}'
  },
  {
    start: 9.8,
    end: 13.4,
    command: '{"id":"graphics.newText","params":{"text":"RULE 0: NEVER CRASH","time":2489356800000,"seconds":3.6,"position":[960,490],"size":76}}'
  },
  {
    start: 13.8,
    end: 17.8,
    command: '{"id":"graphics.newText","params":{"text":"NATIVE MCP & AUTOMATION","time":3505420800000,"seconds":4.0,"position":[960,490],"size":70}}'
  },
  {
    start: 18.5,
    end: 21.2,
    command: '{"id":"graphics.newText","params":{"text":"TEXT-BASED EDITING","time":4699296000000,"seconds":2.7,"position":[960,490],"size":70}}'
  },
  {
    start: 21.5,
    end: 25.9,
    command: '{"id":"tts.create","params":{"text":"Open source, blazing fast, and ready for the future of video.","voice":"basic-female","seconds":21.5,"track":"Audio 3"}}'
  },
  {
    start: 21.5,
    end: 26.3,
    command: '{"id":"graphics.newText","params":{"text":"CINEMAGRID","time":5461344000000,"seconds":4.8,"position":[960,480],"size":100}}'
  }
];

function updateVideoTelemetry() {
  if (!video || !tcDisplay || !syncCommand) return;
  const currentTime = video.currentTime || 0;
  tcDisplay.textContent = timecodeFromSeconds(currentTime);

  const active = syncCommands
    .filter((entry) => currentTime >= entry.start && currentTime < entry.end)
    .sort((a, b) => b.start - a.start)[0];

  syncCommand.textContent = active
    ? active.command
    : '{"id":"export.finished","params":{"path":"cinemagrid_showcase.mp4"}}';
}

if (video) {
  video.addEventListener("timeupdate", updateVideoTelemetry);
  video.addEventListener("loadedmetadata", updateVideoTelemetry);
  updateVideoTelemetry();
}

const scenarios = {
  tts: {
    prompt: '"Generate a voiceover saying \'CinemaGrid is built for AI agents\' and place it at second 1 on audio track A3."',
    code: `{
  "id": "tts.create",
  "params": {
    "text": "CinemaGrid is built for AI agents",
    "voice": "basic-female",
    "seconds": 1.0,
    "track": "Audio 3",
    "dir": "narrations"
  }
}`,
    result: `{
  "ok": true,
  "result": {
    "clip": 49,
    "track": "A3",
    "start": 254016000000,
    "duration": 497109312000,
    "sampleRate": 24000
  }
}`,
    targets: ["#clip-tts-demo"],
    playhead: "22%",
    timecode: "00:00:01:00 / 00:00:26:18",
    selection: "Clip 49 [AI Narration]",
    ticks: "254,016,000,000 Tick"
  },
  textcut: {
    prompt: '"Transcribe the interview, find every filler word, and remove those words from the timeline without leaving gaps."',
    code: `{
  "id": "transcript.extract",
  "params": {
    "from": 1,
    "to": 1,
    "items": [5]
  }
}`,
    result: `{
  "ok": true,
  "result": {
    "removed": ["um"],
    "sequenceDurationDelta": -72072000000,
    "ripple": true
  }
}`,
    targets: [".clip-video"],
    playhead: "35%",
    timecode: "00:00:09:05 / 00:00:26:18",
    selection: "Transcript Words 1–1",
    ticks: "2,394,375,984,000 Tick"
  },
  graphics: {
    prompt: '"Create a bold title card that says CINEMAGRID, center it, and give it the brand cyan color."',
    code: `{
  "id": "graphics.newText",
  "params": {
    "text": "CINEMAGRID",
    "time": 127008000000,
    "seconds": 4.2,
    "position": [960, 480],
    "size": 110
  }
}`,
    result: `{
  "ok": true,
  "result": {
    "clip": 55,
    "layer": 0,
    "fill": "#00F2FE",
    "align": "center"
  }
}`,
    targets: ["#clip-title-demo"],
    playhead: "12%",
    timecode: "00:00:00:12 / 00:00:26:18",
    selection: "Clip 55 [CINEMAGRID]",
    ticks: "127,008,000,000 Tick"
  },
  grade: {
    prompt: '"Apply a cinematic Lumetri look to all selected video clips and duck the music under the narration."',
    code: `{
  "id": "effects.apply",
  "params": {
    "clips": [29, 32, 35, 38, 41, 44],
    "effect": "Lumetri Color"
  }
}`,
    result: `{
  "ok": true,
  "result": {
    "applied": 6,
    "look": "Cinematic Cool",
    "musicDuckDb": -6.0
  }
}`,
    targets: [".clip-video", ".clip-audio-score"],
    playhead: "52%",
    timecode: "00:00:13:09 / 00:00:26:18",
    selection: "6 Video Clips [Lumetri]",
    ticks: "3,400,861,464,000 Tick"
  }
};

const tabs = $$(".sim-tab");
const userPrompt = $("#sim-user-prompt");
const jsonCode = $("#sim-json-code code");
const resultCode = $("#sim-result-code code");
const runButton = $("#btn-run-sim");
const playhead = $("#sim-playhead");
const simTimecode = $("#sim-timecode");
const insSelection = $("#ins-selection");
const insTicks = $("#ins-ticks");

function setScenario(name) {
  const scenario = scenarios[name];
  if (!scenario) return;

  if (userPrompt) userPrompt.textContent = scenario.prompt;
  if (jsonCode) jsonCode.textContent = scenario.code;
  if (resultCode) resultCode.textContent = scenario.result;
  if (playhead) playhead.style.left = scenario.playhead;
  if (simTimecode) simTimecode.textContent = scenario.timecode;
  if (insSelection) insSelection.textContent = scenario.selection;
  if (insTicks) insTicks.textContent = scenario.ticks;
}

function flashTargets(targets) {
  targets.forEach((selector) => {
    $$(selector).forEach((node) => {
      node.classList.remove("flash", "is-active");
      void node.offsetWidth;
      node.classList.add("flash", "is-active");
      window.setTimeout(() => node.classList.remove("flash"), 950);
    });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    setScenario(tab.dataset.scenario);
  });
});

if (runButton) {
  runButton.addEventListener("click", () => {
    const activeTab = $(".sim-tab.active");
    const scenario = scenarios[activeTab?.dataset.scenario || "tts"];
    if (!scenario) return;
    setScenario(activeTab.dataset.scenario);
    flashTargets(scenario.targets);
  });
}

setScenario("tts");

/* ---------------------------------------------------------------------------
 * Interactive controls: MCP bridge copy, showcase play, quickstart tabs, toast
 * ------------------------------------------------------------------------- */

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true, () => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (_) {
    ok = false;
  }
  ta.remove();
  return ok;
}

// Header: "Run MCP Bridge" — copy the bridge command, then jump to quickstart
const mcpBridgeBtn = $("#btn-mcp-bridge");
if (mcpBridgeBtn) {
  mcpBridgeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const cmd = mcpBridgeBtn.dataset.copy || "./target/release/cinemagrid --control 9876";
    copyText(cmd).then((ok) => {
      showToast(ok
        ? "Bridge command copied — paste it in your terminal"
        : "Could not copy — the command is in the Quickstart below");
    });
    const quickstart = $("#quickstart");
    if (quickstart) quickstart.scrollIntoView({ behavior: "smooth" });
  });
}

// Hero: "Watch Showcase Edit" — scroll to the cinema player and press play
const watchBtn = $("#btn-watch-showcase");
if (watchBtn && video) {
  watchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const showcase = $("#showcase");
    if (showcase) showcase.scrollIntoView({ behavior: "smooth", block: "center" });
    video.play().catch(() => {
      /* browser blocked autoplay-with-sound; controls are visible so the user can press play */
    });
  });
}

// Brand logo: smooth scroll to top
const brandLink = $(".brand");
if (brandLink) {
  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Quickstart snippet tabs (Bash / CLI · Claude Code MCP · Python Script)
const termTabs = $$(".term-tab");
const snippetEls = {
  bash: $("#snippet-bash"),
  mcp: $("#snippet-mcp"),
  python: $("#snippet-python"),
};
if (termTabs.length) {
  termTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      termTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.dataset.snippet;
      Object.entries(snippetEls).forEach(([name, el]) => {
        if (el) el.hidden = name !== key;
      });
    });
  });
}
