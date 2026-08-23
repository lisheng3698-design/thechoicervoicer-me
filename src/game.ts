import "./style.css";
import { detectPitch, rootMeanSquare } from "./audio-analysis";
import { scorePerformance, type PerformanceProfile, type PerformanceScore } from "./scoring";
import { trackSiteEvent } from "./site";

interface VoiceCue {
  id: string;
  quote: string;
  quoteZh?: string;
  sourceTitle: string;
  sourceTitleZh?: string;
  character: string;
  characterZh?: string;
  scene: string;
  sceneZh?: string;
  rights: string;
  rightsZh?: string;
  sourceUrl: string;
  country: string;
  countryZh?: string;
  voiceGender: "male" | "female" | "androgynous";
  voiceAge: "child" | "teen" | "young-adult" | "adult" | "elder";
  mediaKind: "spoken-dialogue";
  generator: string;
  direction: string;
  directionZh?: string;
  audioUrl: string;
  audioUrlZh?: string;
  category: string;
  categoryZh?: string;
  durationMs: number;
  durationMsZh?: number;
  reference: PerformanceProfile;
  referenceZh?: PerformanceProfile;
}

interface VoicePack {
  id: string;
  title: string;
  titleZh?: string;
  description: string;
  assetNotice: string;
  roundsPerShow: number;
  cues: VoiceCue[];
}

type GamePhase = "loading" | "menu" | "setup" | "permission" | "soundcheck" | "cue" | "recording" | "review" | "score" | "complete" | "error";
type GameType = "solo" | "group";
type TimingSpeed = "relaxed" | "classic" | "fast";

interface Player {
  name: string;
}

interface RoundResult {
  playerIndex: number;
  cueIndex: number;
  analysis: PerformanceScore;
  votes: number;
}

interface JudgeVerdict {
  name: string;
  approved: boolean;
  reaction: string;
}

const pick = <T extends Element>(selector: string, parent: ParentNode = document) => {
  const element = parent.querySelector<T>(selector);
  if (!element) throw new Error(`Missing required element: ${selector}`);
  return element;
};

const wait = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");

const ui = isChinese ? {
  packMissing: "未配置语音包。",
  packFailed: (code: number) => `语音包加载失败（${code}）。`,
  packEmpty: "这个语音包没有内容。",
  packLoadHelp: "演示语音包加载失败，请刷新页面后重试。",
  mainMenuStatus: "主菜单",
  mainMenuKicker: "现场直播",
  mainMenuTitle: "选择游玩方式。",
  mainMenuDescription: "先选择单人练习或本地多人轮流。标准模式会播放一段台词原声、录制模仿，并交给五位电脑评委投票。",
  soloTitle: "单人",
  soloMeta: "1 名玩家",
  soloDescription: "完成四个台词片段，随时重试，并挑战自己的最高分。",
  groupTitle: "多人",
  groupMeta: "2–4 名玩家",
  groupDescription: "围绕一台设备轮流表演，同一句台词完成后再进入下一轮。",
  standardReady: "标准模式 · 可玩",
  otherModesNote: "标准模式每局随机抽取四段台词，支持单人练习和最多四人本地轮流。",
  choosePlayersStatus: "设置本场游戏",
  cueCount: (count: number) => `${count} 个本站台词片段`,
  setupKicker: "标准游戏秀",
  setupTitle: "布置演播室。",
  setupDescription: "确认台词片段包、玩家阵容和节奏灯速度。所有玩家都会依次挑战同一句台词。",
  setupMode: "游戏模式",
  setupModeValue: "标准游戏秀",
  setupPack: "台词片段包",
  setupPackValue: (library: number, rounds: number) => `Scene Reel · ${library} 段内容库 · 每场 ${rounds} 段`,
  timingLegend: "录音节奏灯",
  timingRelaxed: "舒缓",
  timingClassic: "经典",
  timingFast: "快速",
  timingHelp: "三次提示灯后，第四盏无声亮起时开始录音。",
  localPlayers: "本地玩家",
  playerOption: (count: number) => count === 1 ? "1 名玩家 — 单人" : `${count} 名玩家`,
  playerName: (number: number) => `玩家 ${number} 名称`,
  defaultPlayer: (number: number) => `玩家 ${number}`,
  continueMic: "继续进行麦克风检测",
  backMainMenu: "← 返回主菜单",
  setupNote: "标准模式包含听原声、录音、回放、评委评分和最终排行榜的完整流程。",
  readySoundcheck: "准备进行麦克风检测",
  sessionSummary: (players: number, rounds: number) => `${players} 名玩家 · ${rounds} 轮`,
  localAudio: "音频仅在本机处理",
  micTitle: "先测试一下麦克风。",
  micDescription: "浏览器将请求麦克风权限。音频只保留在当前设备，并会在结束游戏或关闭页面后丢弃。",
  startMic: "● 开始麦克风检测",
  micNote: "佩戴耳机可获得更准确的评分。无需账号，不上传，也不保存到服务器。",
  changePlayers: "← 更换玩家",
  openingMic: "正在打开麦克风…",
  micUnsupported: "麦克风功能需要现代浏览器，并且页面必须使用 HTTPS 或 localhost。",
  micBlocked: "麦克风权限已被阻止。请在浏览器的网站设置中允许访问，然后重新加载页面。",
  micMissing: "没有检测到麦克风。请连接麦克风后重新加载页面。",
  micUnavailable: "无法启动麦克风。",
  soundcheckStatus: "麦克风已开启，请发出声音",
  soundcheck: "麦克风检测",
  soundcheckTitle: "说话、哼唱或笑一声。",
  soundcheckDescription: "观察电平条是否变化。尽量让音量进入绿色区域，但不要大喊。",
  levelLabel: "实时麦克风电平",
  micGood: "麦克风正常 — 开始游戏",
  restartMic: "重新启动麦克风",
  cueStatus: "台词片段：先听，然后表演",
  roundLabel: (round: number, total: number, player: string) => `第 ${round} / ${total} 轮 · ${player}`,
  takeMic: (player: string) => `${player}，请拿起麦克风`,
  cueDescription: "先听角色原声，再模仿台词的节奏、音量变化和音高走势。",
  sceneSource: "片段来源",
  countryLabel: "作品国家",
  characterLabel: "角色",
  voiceLabel: "原创音色",
  sceneLabel: "场景",
  rightsLabel: "授权状态",
  listenCue: "▶ 播放原声片段",
  recordTake: "录制我的台词",
  cueHelp: "请先听一次角色原声；开始录音前可以重复播放。",
  playing: "正在播放…",
  replayCue: "↻ 再听一次",
  cuePlayError: "原声片段无法播放。请检查静音模式和媒体音量，然后重新加载页面。",
  micEnded: "麦克风会话已经结束，请重新进行检测。",
  getReady: "准备",
  yourTurn: (player: string) => `${player} · 轮到你了`,
  recordingBegins: "倒计时结束后开始录音。",
  go: "开始",
  recordingLocal: "正在本机录音",
  matchCue: "表演这句台词，录音会自动停止。",
  takeCaptured: "录音完成，仍仅保留在本机",
  playback: "录音回放",
  reviewTitle: "先听听自己的录音，再交给评委。",
  originalCue: "角色原声",
  yourTake: "你的录音",
  audioFallback: "当前浏览器无法播放这段本地录音。",
  revealScore: "公布评分",
  retake: "重新录制",
  retryScored: "重试本句",
  localUrlNote: "这个临时回放地址只存在于当前标签页。",
  panelSpoken: "评委已经投票",
  judgeVote: (player: string) => `${player} · 评委投票`,
  fiveJudges: "五位电脑评委",
  judge: (number: number) => `评委 ${number}`,
  judgeNames: ["节拍", "音形", "爆发", "细节", "惊喜"],
  judgeYesLines: ["合拍", "神似", "带感", "扎实", "惊艳"],
  judgeNoLines: ["跑拍", "走调", "平淡", "模糊", "出戏"],
  panelWordLabel: "评委一词总评",
  panelWords: ["重来", "生硬", "跑偏", "接近", "神似", "惊艳", "封神"],
  yes: "通过",
  no: "未通过",
  judgeScore: (votes: number) => `评委评分：5 票中获得 ${votes} 票`,
  absolute: "绝对匹配 6/5",
  voteLabel: "/5 票",
  timing: "节奏",
  energy: "能量",
  pitch: "音高走势",
  breakdownLabel: "本地相似度分析",
  scoringNote: "浏览器评分模型会比较节奏、能量轮廓和音高走势，再把本地相似度结果转换为五位评委的投票。",
  finalBoard: "最终排行榜",
  seeFinal: "查看最终排行榜",
  continue: "继续",
  nextCue: "下一句台词",
  passTo: (player: string) => `交给 ${player}`,
  showComplete: "游戏结束",
  performancesScored: (count: number) => `已完成 ${count} 次评分`,
  judgeVotes: "评委票数",
  winner: (player: string) => `${player} 赢得本场游戏。`,
  soloComplete: "游戏结束，评委们也撑过来了。",
  votes: "票",
  match: "匹配度",
  playAgain: "原阵容再玩一次",
  changeLineup: "更换玩家",
  endMicSession: "结束麦克风会话",
  attention: "需要处理一个问题",
  quickFix: "快速修复",
  couldNotContinue: "游戏无法继续。",
  trySoundcheck: "重新检测麦克风",
  reloadGame: "重新加载游戏",
  micOff: "麦克风已关闭，请选择新阵容",
  fullscreenUnavailable: "当前环境不支持全屏",
  canvasUnavailable: "当前浏览器无法使用游戏画布。",
  packNotLoaded: "语音包尚未加载。",
  referenceFailed: "原声片段播放失败。",
  judgeLines: [
    "这次模仿很大胆，只是评委没认出来。",
    "有一位勇敢的评委支持了这个选择。",
    "两位评委听出来了，另外三位还需要说服。",
    "评委意见分裂，但多数票通过。",
    "四票通过，评委听到了相似之处。",
    "全票通过，五位评委全部认可。",
    "绝对匹配，计分板都装不下了。",
  ],
} : {
  packMissing: "No voice pack was configured.",
  packFailed: (code: number) => `Voice pack failed to load (${code}).`,
  packEmpty: "This voice pack is empty.",
  packLoadHelp: "The starter pack could not load. Refresh the page and try again.",
  mainMenuStatus: "Main menu",
  mainMenuKicker: "Live from the browser",
  mainMenuTitle: "Choose your show.",
  mainMenuDescription: "Start with solo practice or a shared local game. Standard mode plays a character line, records your performance, and sends it to five computer judges.",
  soloTitle: "Solo",
  soloMeta: "1 player",
  soloDescription: "Perform all four dialogue scenes, retry any line, and chase your own best panel result.",
  groupTitle: "Group",
  groupMeta: "2–4 players",
  groupDescription: "Pass one device around the room; everyone performs the same line before moving on.",
  standardReady: "Standard mode · playable",
  otherModesNote: "Standard mode draws four scenes per show and supports solo practice or up to four local players.",
  choosePlayersStatus: "Set up this show",
  cueCount: (count: number) => `${count} locally hosted scenes`,
  setupKicker: "Standard game show",
  setupTitle: "Set the stage.",
  setupDescription: "Confirm the scene pack, player lineup, and timing-light speed. Every player performs the same line before the next round.",
  setupMode: "Game mode",
  setupModeValue: "Standard game show",
  setupPack: "Scene pack",
  setupPackValue: (library: number, rounds: number) => `Scene Reel · ${library}-scene library · ${rounds} per show`,
  timingLegend: "Recording timing lights",
  timingRelaxed: "Relaxed",
  timingClassic: "Classic",
  timingFast: "Fast",
  timingHelp: "Begin when the silent fourth light turns on after three cue lights.",
  localPlayers: "Local players",
  playerOption: (count: number) => count === 1 ? "1 player — solo" : `${count} players`,
  playerName: (number: number) => `Player ${number} name`,
  defaultPlayer: (number: number) => `Player ${number}`,
  continueMic: "Continue to microphone check",
  backMainMenu: "← Back to main menu",
  setupNote: "Standard mode includes the complete listen, record, replay, judge-score, and final leaderboard flow.",
  readySoundcheck: "Ready for soundcheck",
  sessionSummary: (players: number, rounds: number) => `${players} player${players === 1 ? "" : "s"} · ${rounds} rounds`,
  localAudio: "Local-only audio",
  micTitle: "First, let’s hear your mic.",
  micDescription: "Your browser will ask for microphone access. Audio stays on this device and is discarded when you close or end the session.",
  startMic: "● Start microphone check",
  micNote: "Use headphones for cleaner scoring. No account, upload, or server recording.",
  changePlayers: "← Change players",
  openingMic: "Opening microphone…",
  micUnsupported: "Microphone access needs a modern browser on HTTPS or localhost.",
  micBlocked: "Microphone access is blocked. Allow it in your browser’s site settings, then reload this page.",
  micMissing: "No microphone was found. Connect one, then reload this page.",
  micUnavailable: "The microphone could not start.",
  soundcheckStatus: "Mic is live — make some noise",
  soundcheck: "Soundcheck",
  soundcheckTitle: "Talk, hum, or laugh.",
  soundcheckDescription: "Watch the meter move. Aim for the green zone without shouting.",
  levelLabel: "Live microphone level",
  micGood: "Mic sounds good — play",
  restartMic: "Restart mic",
  cueStatus: "Dialogue scene: listen, then perform",
  roundLabel: (round: number, total: number, player: string) => `Round ${round} of ${total} · ${player}`,
  takeMic: (player: string) => `${player}, take the mic`,
  cueDescription: "Hear the character first, then match the line’s rhythm, loudness shape, and pitch movement.",
  sceneSource: "Scene source",
  countryLabel: "Work country",
  characterLabel: "Character",
  voiceLabel: "Original voice",
  sceneLabel: "Scene",
  rightsLabel: "Rights",
  listenCue: "▶ Play original performance",
  recordTake: "Record my line",
  cueHelp: "Hear the character once; replay is allowed before recording.",
  playing: "Playing…",
  replayCue: "↻ Replay original",
  cuePlayError: "The spoken reference could not play. Check silent mode and reload.",
  micEnded: "The microphone session ended. Start soundcheck again.",
  getReady: "Get ready",
  yourTurn: (player: string) => `${player} · your turn`,
  recordingBegins: "Recording begins after the countdown.",
  go: "GO",
  recordingLocal: "Recording locally",
  matchCue: "Perform the line — recording stops automatically.",
  takeCaptured: "Take captured — still local",
  playback: "Playback",
  reviewTitle: "Hear your take before judging.",
  originalCue: "Original performance",
  yourTake: "Your take",
  audioFallback: "Your browser cannot play this local recording.",
  revealScore: "Reveal my score",
  retake: "Retake",
  retryScored: "Retry this line",
  localUrlNote: "This temporary playback URL exists only in this tab.",
  panelSpoken: "The panel has spoken",
  judgeVote: (player: string) => `${player} · judge vote`,
  fiveJudges: "Five computer judges",
  judge: (number: number) => `Judge ${number}`,
  judgeNames: ["Beat", "Shape", "Spark", "Detail", "Wildcard"],
  judgeYesLines: ["Locked", "Faithful", "Alive", "Crisp", "Inspired"],
  judgeNoLines: ["Offbeat", "Drifting", "Flat", "Muddy", "Unconvincing"],
  panelWordLabel: "Panel in one word",
  panelWords: ["Reset", "Stiff", "Drifting", "Close", "Faithful", "Stunning", "Perfect"],
  yes: "YES",
  no: "NO",
  judgeScore: (votes: number) => `Judge score ${votes} out of 5`,
  absolute: "absolute 6/5",
  voteLabel: "/5 votes",
  timing: "timing",
  energy: "energy",
  pitch: "pitch shape",
  breakdownLabel: "Local analysis breakdown",
  scoringNote: "The browser scoring model compares timing, energy contour, and pitch movement, then maps the local similarity result to five judge votes.",
  finalBoard: "Final board",
  seeFinal: "See final board",
  continue: "Continue",
  nextCue: "Next line",
  passTo: (player: string) => `Pass to ${player}`,
  showComplete: "Show complete",
  performancesScored: (count: number) => `${count} performances scored`,
  judgeVotes: "judge votes",
  winner: (player: string) => `${player} wins the show.`,
  soloComplete: "Show complete. The panel survived.",
  votes: "votes",
  match: "match",
  playAgain: "Play same lineup again",
  changeLineup: "Change players",
  endMicSession: "End mic session",
  attention: "Something needs attention",
  quickFix: "Quick fix",
  couldNotContinue: "We couldn’t continue.",
  trySoundcheck: "Try soundcheck again",
  reloadGame: "Reload game",
  micOff: "Mic is off — choose a new lineup",
  fullscreenUnavailable: "Fullscreen is not available here",
  canvasUnavailable: "Canvas is unavailable in this browser.",
  packNotLoaded: "Voice pack is not loaded.",
  referenceFailed: "Reference audio failed to play.",
  judgeLines: [
    "A fearless remix of a cue we once knew.",
    "One brave judge backed that choice.",
    "Two judges caught it. Three need convincing.",
    "A split panel, but the majority says yes.",
    "Four approvals. The panel heard the resemblance.",
    "A clean sweep. Every judge is in.",
    "Absolute match. Even the scoreboard ran out of room.",
  ],
};

const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;",
})[character] ?? character);

class VoiceShowGame {
  private readonly root: HTMLElement;
  private readonly panel: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly canvasContext: CanvasRenderingContext2D;
  private readonly status: HTMLElement;
  private readonly roundLabel: HTMLElement;
  private readonly fullscreenButton: HTMLButtonElement;
  private readonly endMicButton: HTMLButtonElement;
  private pack?: VoicePack;
  private sessionCues: VoiceCue[] = [];
  private cueIndex = 0;
  private turnIndex = 0;
  private activePlayerIndex = 0;
  private gameType: GameType = "solo";
  private timingSpeed: TimingSpeed = "classic";
  private players: Player[] = [{ name: ui.defaultPlayer(1) }];
  private phase: GamePhase = "loading";
  private stream?: MediaStream;
  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  private waveform = new Float32Array(2048);
  private animationFrame = 0;
  private recordingUrl?: string;
  private lastAttempt?: PerformanceProfile;
  private results: RoundResult[] = [];

  constructor(root: HTMLElement) {
    this.root = root;
    this.panel = pick<HTMLElement>("[data-game-panel]", root);
    this.canvas = pick<HTMLCanvasElement>("canvas", root);
    const context = this.canvas.getContext("2d");
    if (!context) throw new Error(ui.canvasUnavailable);
    this.canvasContext = context;
    this.status = pick<HTMLElement>("[data-game-status]", root);
    this.roundLabel = pick<HTMLElement>("[data-round-label]", root);
    this.fullscreenButton = pick<HTMLButtonElement>("[data-fullscreen-game]", root);
    this.endMicButton = pick<HTMLButtonElement>("[data-end-mic]", root);

    this.fullscreenButton.addEventListener("click", () => void this.toggleFullscreen());
    this.endMicButton.addEventListener("click", () => this.endMicrophoneSession());
    window.addEventListener("pagehide", () => this.releaseResources());
    window.addEventListener("resize", () => this.resizeCanvas());
    this.resizeCanvas();
    this.draw();
  }

  async initialize() {
    try {
      const packUrl = this.root.dataset.packUrl;
      if (!packUrl) throw new Error(ui.packMissing);
      const response = await fetch(packUrl);
      if (!response.ok) throw new Error(ui.packFailed(response.status));
      this.pack = (await response.json()) as VoicePack;
      if (!this.pack.cues.length) throw new Error(ui.packEmpty);
      this.renderMainMenu();
    } catch (error) {
      this.renderError(ui.packLoadHelp, error);
    }
  }

  private setPhase(phase: GamePhase, message: string) {
    this.phase = phase;
    this.status.textContent = message;
    this.root.dataset.phase = phase;
  }

  private renderMainMenu() {
    this.setPhase("menu", ui.mainMenuStatus);
    this.roundLabel.textContent = ui.cueCount(this.pack?.cues.length ?? 0);
    this.panel.innerHTML = `
      <div class="main-menu">
        <div class="main-menu__intro">
          <p class="eyebrow">${ui.mainMenuKicker}</p>
          <h2>${ui.mainMenuTitle}</h2>
          <p>${ui.mainMenuDescription}</p>
          <span class="mode-status"><i aria-hidden="true"></i>${ui.standardReady}</span>
        </div>
        <div class="mode-choice-grid" aria-label="${ui.mainMenuTitle}">
          <button class="mode-choice mode-choice--solo" type="button" data-game-type="solo">
            <span class="mode-choice__icon" aria-hidden="true">●</span>
            <strong>${ui.soloTitle}</strong>
            <span>${ui.soloMeta}</span>
            <small>${ui.soloDescription}</small>
          </button>
          <button class="mode-choice mode-choice--group" type="button" data-game-type="group">
            <span class="mode-choice__icon" aria-hidden="true">● ● ●</span>
            <strong>${ui.groupTitle}</strong>
            <span>${ui.groupMeta}</span>
            <small>${ui.groupDescription}</small>
          </button>
        </div>
        <p class="microcopy main-menu__note">${ui.otherModesNote}</p>
      </div>`;
    this.panel.querySelectorAll<HTMLButtonElement>("[data-game-type]").forEach((button) => {
      button.addEventListener("click", () => {
        this.gameType = button.dataset.gameType === "group" ? "group" : "solo";
        this.players = this.gameType === "group"
          ? [{ name: ui.defaultPlayer(1) }, { name: ui.defaultPlayer(2) }]
          : [{ name: ui.defaultPlayer(1) }];
        trackSiteEvent("game_type_selected", { type: this.gameType });
        this.renderSetup();
      });
    });
  }

  private renderSetup() {
    this.setPhase("setup", ui.choosePlayersStatus);
    this.roundLabel.textContent = ui.cueCount(this.pack?.cues.length ?? 0);
    const minimumPlayers = this.gameType === "group" ? 2 : 1;
    const playerOptions = this.gameType === "group" ? [2, 3, 4] : [1];
    this.panel.innerHTML = `
      <form class="show-setup" data-show-setup>
        <div class="setup-heading">
          <div><p class="eyebrow">${ui.setupKicker}</p><h2>${ui.setupTitle}</h2></div>
          <p>${ui.setupDescription}</p>
        </div>
        <div class="setup-summary" aria-label="${ui.setupTitle}">
          <div><span>${ui.setupMode}</span><strong>${ui.setupModeValue}</strong></div>
          <div><span>${ui.setupPack}</span><strong>${ui.setupPackValue(this.pack?.cues.length ?? 0, this.showCueCount())}</strong></div>
        </div>
        <div class="setup-grid">
          <div>
            <label class="field-label" for="player-count">${ui.localPlayers}</label>
            <select class="game-select" id="player-count" data-player-count ${this.gameType === "solo" ? "disabled" : ""}>
              ${playerOptions.map((number) => `<option value="${number}" ${number === minimumPlayers ? "selected" : ""}>${ui.playerOption(number)}</option>`).join("")}
            </select>
            <div class="player-name-grid" data-player-names>
              ${[1, 2, 3, 4].map((number) => `
                <label data-player-field="${number}" ${number > minimumPlayers ? "hidden" : ""}>
                  <span>${ui.playerName(number)}</span>
                  <input type="text" maxlength="24" value="${ui.defaultPlayer(number)}" data-player-name="${number}" autocomplete="off" />
                </label>`).join("")}
            </div>
          </div>
          <fieldset class="timing-options">
            <legend>${ui.timingLegend}</legend>
            ${([
              ["relaxed", ui.timingRelaxed],
              ["classic", ui.timingClassic],
              ["fast", ui.timingFast],
            ] as Array<[TimingSpeed, string]>).map(([value, label]) => `
              <label><input type="radio" name="timing-speed" value="${value}" ${value === this.timingSpeed ? "checked" : ""} data-timing-choice /><span>${label}</span></label>`).join("")}
            <p>${ui.timingHelp}</p>
          </fieldset>
        </div>
        <div class="setup-actions">
          <button class="button button--primary button--large" type="submit">${ui.continueMic}</button>
          <button class="text-button" type="button" data-back-main>${ui.backMainMenu}</button>
        </div>
        <p class="microcopy">${ui.setupNote}</p>
      </form>`;

    const count = pick<HTMLSelectElement>("[data-player-count]", this.panel);
    const updatePlayerFields = () => {
      const selected = Number(count.value);
      this.panel.querySelectorAll<HTMLElement>("[data-player-field]").forEach((field, index) => {
        field.hidden = index >= selected;
      });
    };
    count.addEventListener("change", updatePlayerFields);
    pick<HTMLButtonElement>("[data-back-main]", this.panel).addEventListener("click", () => this.renderMainMenu());
    pick<HTMLFormElement>("[data-show-setup]", this.panel).addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = Number(count.value);
      const timingChoice = this.panel.querySelector<HTMLInputElement>("[data-timing-choice]:checked");
      this.timingSpeed = (timingChoice?.value as TimingSpeed | undefined) ?? "classic";
      this.players = Array.from({ length: selected }, (_, index) => {
        const input = pick<HTMLInputElement>(`[data-player-name="${index + 1}"]`, this.panel);
        return { name: input.value.trim() || ui.defaultPlayer(index + 1) };
      });
      this.resetShow();
      this.renderPermission();
    });
  }

  private renderPermission() {
    this.setPhase("permission", ui.readySoundcheck);
    this.roundLabel.textContent = ui.sessionSummary(this.players.length, this.showCueCount());
    this.panel.innerHTML = `
      <div class="game-copy game-copy--center">
        <p class="eyebrow">${ui.localAudio}</p>
        <h2>${ui.micTitle}</h2>
        <p>${ui.micDescription}</p>
        <button class="button button--primary button--large" type="button" data-enable-mic>
          ${ui.startMic}
        </button>
        <p class="microcopy">${ui.micNote}</p>
        <button class="text-button" type="button" data-back-to-setup>${ui.changePlayers}</button>
      </div>`;
    pick<HTMLButtonElement>("[data-enable-mic]", this.panel).addEventListener("click", () => void this.requestMicrophone());
    pick<HTMLButtonElement>("[data-back-to-setup]", this.panel).addEventListener("click", () => this.renderSetup());
  }

  private async requestMicrophone() {
    const button = pick<HTMLButtonElement>("[data-enable-mic]", this.panel);
    button.disabled = true;
    button.textContent = ui.openingMic;
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(ui.micUnsupported);
      }
      this.audioContext = new AudioContext();
      await this.audioContext.resume();
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false,
      });
      const source = this.audioContext.createMediaStreamSource(this.stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      this.analyser.smoothingTimeConstant = 0.74;
      this.waveform = new Float32Array(this.analyser.fftSize);
      source.connect(this.analyser);
      this.endMicButton.hidden = false;
      trackSiteEvent("microphone_granted");
      this.renderSoundcheck();
    } catch (error) {
      trackSiteEvent("microphone_error", { reason: error instanceof DOMException ? error.name : "unavailable" });
      const message = error instanceof DOMException && error.name === "NotAllowedError"
        ? ui.micBlocked
        : error instanceof DOMException && error.name === "NotFoundError"
          ? ui.micMissing
          : error instanceof Error ? error.message : ui.micUnavailable;
      this.renderError(message, error, true);
    }
  }

  private renderSoundcheck() {
    this.setPhase("soundcheck", ui.soundcheckStatus);
    this.panel.innerHTML = `
      <div class="game-copy">
        <p class="eyebrow">${ui.soundcheck}</p>
        <h2>${ui.soundcheckTitle}</h2>
        <p>${ui.soundcheckDescription}</p>
        <div class="level-meter" role="meter" aria-label="${ui.levelLabel}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <span data-level-fill></span>
        </div>
        <div class="button-row">
          <button class="button button--primary" type="button" data-begin-game>${ui.micGood}</button>
          <button class="button button--quiet" type="button" data-retry-mic>${ui.restartMic}</button>
        </div>
      </div>`;
    pick<HTMLButtonElement>("[data-begin-game]", this.panel).addEventListener("click", () => {
      trackSiteEvent("game_started", { pack: this.pack?.id });
      this.renderCue();
    });
    pick<HTMLButtonElement>("[data-retry-mic]", this.panel).addEventListener("click", () => {
      this.releaseResources();
      this.renderPermission();
    });
    this.updateMeter();
  }

  private updateMeter() {
    if (this.phase !== "soundcheck" || !this.analyser) return;
    this.analyser.getFloatTimeDomainData(this.waveform);
    const level = Math.min(100, Math.round(rootMeanSquare(this.waveform) * 360));
    const meter = this.panel.querySelector<HTMLElement>("[role='meter']");
    const fill = this.panel.querySelector<HTMLElement>("[data-level-fill]");
    if (meter && fill) {
      meter.setAttribute("aria-valuenow", String(level));
      fill.style.width = `${level}%`;
    }
    window.requestAnimationFrame(() => this.updateMeter());
  }

  private get currentCue() {
    if (!this.pack) throw new Error(ui.packNotLoaded);
    return (this.sessionCues.length ? this.sessionCues : this.pack.cues)[this.cueIndex];
  }

  private showCueCount() {
    if (!this.pack) return 0;
    return this.sessionCues.length || Math.min(this.pack.roundsPerShow || this.pack.cues.length, this.pack.cues.length);
  }

  private localized(primary: string, chinese?: string) {
    return isChinese && chinese ? chinese : primary;
  }

  private cueQuote(cue = this.currentCue) {
    return this.localized(cue.quote, cue.quoteZh);
  }

  private cueCategory(cue = this.currentCue) {
    return this.localized(cue.category, cue.categoryZh);
  }

  private cueSourceTitle(cue = this.currentCue) {
    return this.localized(cue.sourceTitle, cue.sourceTitleZh);
  }

  private cueCharacter(cue = this.currentCue) {
    return this.localized(cue.character, cue.characterZh);
  }

  private cueCountry(cue = this.currentCue) {
    return this.localized(cue.country, cue.countryZh);
  }

  private cueVoice(cue = this.currentCue) {
    const genders = isChinese
      ? { male: "男声", female: "女声", androgynous: "中性声" }
      : { male: "Male", female: "Female", androgynous: "Androgynous" };
    const ages = isChinese
      ? { child: "儿童", teen: "少年", "young-adult": "青年", adult: "成年", elder: "老年" }
      : { child: "Child", teen: "Teen", "young-adult": "Young adult", adult: "Adult", elder: "Elder" };
    return `${ages[cue.voiceAge]} · ${genders[cue.voiceGender]}`;
  }

  private cueScene(cue = this.currentCue) {
    return this.localized(cue.scene, cue.sceneZh);
  }

  private cueRights(cue = this.currentCue) {
    return this.localized(cue.rights, cue.rightsZh);
  }

  private cueDirection(cue = this.currentCue) {
    return this.localized(cue.direction, cue.directionZh);
  }

  private cueAudioUrl(cue = this.currentCue) {
    return isChinese && cue.audioUrlZh ? cue.audioUrlZh : cue.audioUrl;
  }

  private cueDurationMs(cue = this.currentCue) {
    return isChinese && cue.durationMsZh ? cue.durationMsZh : cue.durationMs;
  }

  private cueReference(cue = this.currentCue) {
    return isChinese && cue.referenceZh ? cue.referenceZh : cue.reference;
  }

  private get currentPlayer() {
    return this.players[this.activePlayerIndex];
  }

  private renderCue() {
    const cue = this.currentCue;
    this.setPhase("cue", ui.cueStatus);
    this.roundLabel.textContent = ui.roundLabel(this.cueIndex + 1, this.showCueCount(), this.currentPlayer.name);
    this.panel.innerHTML = `
      <div class="cue-card">
        <p class="turn-banner">${ui.takeMic(escapeHtml(this.currentPlayer.name))}</p>
        <div class="cue-attribution" aria-label="${ui.sceneSource}">
          <div><span>${ui.sceneSource}</span><strong><a href="${escapeHtml(cue.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(this.cueSourceTitle(cue))}</a></strong></div>
          <div><span>${ui.countryLabel}</span><strong>${escapeHtml(this.cueCountry(cue))}</strong></div>
          <div><span>${ui.characterLabel}</span><strong>${escapeHtml(this.cueCharacter(cue))}</strong></div>
          <div><span>${ui.voiceLabel}</span><strong>${escapeHtml(this.cueVoice(cue))}</strong></div>
          <div><span>${ui.sceneLabel}</span><strong>${escapeHtml(this.cueScene(cue))}</strong></div>
        </div>
        <p class="cue-rights"><span>${ui.rightsLabel}</span>${escapeHtml(this.cueRights(cue))}</p>
        <p class="eyebrow">${escapeHtml(this.cueCategory(cue))}</p>
        <h2 class="cue-quote">&quot;${escapeHtml(this.cueQuote(cue))}&quot;</h2>
        <p class="cue-direction">${escapeHtml(this.cueDirection(cue))}</p>
        <p>${ui.cueDescription}</p>
        <div class="button-row">
          <button class="button button--primary" type="button" data-listen-cue>${ui.listenCue}</button>
          <button class="button button--accent" type="button" data-record-take disabled>${ui.recordTake}</button>
        </div>
        <p class="microcopy" data-cue-help>${ui.cueHelp}</p>
      </div>`;
    const listen = pick<HTMLButtonElement>("[data-listen-cue]", this.panel);
    const record = pick<HTMLButtonElement>("[data-record-take]", this.panel);
    listen.addEventListener("click", () => void this.playCue(listen, record));
    record.addEventListener("click", () => void this.recordTake());
  }

  private async playCue(listenButton: HTMLButtonElement, recordButton: HTMLButtonElement) {
    listenButton.disabled = true;
    listenButton.textContent = ui.playing;
    const audio = new Audio(this.cueAudioUrl());
    try {
      await audio.play();
      trackSiteEvent("cue_played", { cue: this.currentCue.id });
      await new Promise<void>((resolve, reject) => {
        audio.addEventListener("ended", () => resolve(), { once: true });
        audio.addEventListener("error", () => reject(new Error(ui.referenceFailed)), { once: true });
      });
      recordButton.disabled = false;
      recordButton.focus();
    } catch (error) {
      this.renderError(ui.cuePlayError, error, true);
      return;
    }
    listenButton.disabled = false;
    listenButton.textContent = ui.replayCue;
  }

  private async recordTake() {
    if (!this.stream || !this.analyser || !this.audioContext) {
      this.renderError(ui.micEnded, undefined, true);
      return;
    }

    const cue = this.currentCue;
    this.setPhase("recording", ui.getReady);
    this.panel.innerHTML = `
      <div class="recording-card">
        <p class="eyebrow">${ui.yourTurn(escapeHtml(this.currentPlayer.name))}</p>
        <div class="timing-light-board" aria-label="${ui.timingLegend}">
          <div class="timing-lights" aria-hidden="true">
            ${[1, 2, 3, 4].map((light) => `<span data-timing-light="${light}"></span>`).join("")}
          </div>
          <strong class="timing-light-label" aria-live="assertive" data-countdown>3</strong>
        </div>
        <h2>&quot;${escapeHtml(this.cueQuote(cue))}&quot;</h2>
        <p data-recording-note>${ui.recordingBegins}</p>
        <div class="recording-progress" aria-hidden="true"><span data-recording-progress></span></div>
      </div>`;
    const countdown = pick<HTMLElement>("[data-countdown]", this.panel);
    const lights = Array.from(this.panel.querySelectorAll<HTMLElement>("[data-timing-light]"));
    const beatMs = this.timingBeatMs();
    for (const [index, value] of [3, 2, 1].entries()) {
      countdown.textContent = String(value);
      lights[index]?.classList.add("is-active");
      this.playTimingBeep(520 + index * 90);
      await wait(beatMs);
    }
    countdown.textContent = ui.go;
    lights[3]?.classList.add("is-active", "is-go");
    this.status.textContent = ui.recordingLocal;
    pick<HTMLElement>("[data-recording-note]", this.panel).textContent = ui.matchCue;
    const progress = pick<HTMLElement>("[data-recording-progress]", this.panel);
    const recordingDuration = this.cueDurationMs(cue);
    progress.style.animationDuration = `${recordingDuration}ms`;
    progress.classList.add("is-running");

    const mimeType = ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((type) => MediaRecorder.isTypeSupported(type));
    const recorder = mimeType ? new MediaRecorder(this.stream, { mimeType }) : new MediaRecorder(this.stream);
    const chunks: Blob[] = [];
    const energy: number[] = [];
    const pitchHz: number[] = [];
    recorder.addEventListener("dataavailable", (event) => {
      if (event.data.size) chunks.push(event.data);
    });

    const startedAt = performance.now();
    const sampling = window.setInterval(() => {
      if (!this.analyser || !this.audioContext) return;
      this.analyser.getFloatTimeDomainData(this.waveform);
      energy.push(rootMeanSquare(this.waveform));
      pitchHz.push(detectPitch(this.waveform, this.audioContext.sampleRate));
    }, 80);
    recorder.start(100);
    trackSiteEvent("recording_started", { cue: cue.id });
    await wait(recordingDuration);
    const stopped = new Promise<void>((resolve) => recorder.addEventListener("stop", () => resolve(), { once: true }));
    recorder.stop();
    await stopped;
    window.clearInterval(sampling);

    const blob = new Blob(chunks, { type: recorder.mimeType || mimeType || "audio/webm" });
    if (this.recordingUrl) URL.revokeObjectURL(this.recordingUrl);
    this.recordingUrl = URL.createObjectURL(blob);
    this.lastAttempt = { durationMs: performance.now() - startedAt, energy, pitchHz };
    this.renderReview();
  }

  private timingBeatMs() {
    return this.timingSpeed === "relaxed" ? 720 : this.timingSpeed === "fast" ? 320 : 500;
  }

  private playTimingBeep(frequency: number) {
    if (!this.audioContext) return;
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.0001, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.075, this.audioContext.currentTime + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.audioContext.currentTime + 0.09);
    oscillator.connect(gain).connect(this.audioContext.destination);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.1);
  }

  private renderReview() {
    this.setPhase("review", ui.takeCaptured);
    this.panel.innerHTML = `
      <div class="game-copy review-stage">
        <p class="eyebrow">${ui.playback}</p>
        <h2>${ui.reviewTitle}</h2>
        <div class="take-compare">
          <div class="take-compare__card take-compare__card--reference">
            <span class="take-compare__label">${ui.originalCue}</span>
            <strong>&quot;${escapeHtml(this.cueQuote(this.currentCue))}&quot; · ${escapeHtml(this.cueCharacter(this.currentCue))}</strong>
            <audio controls preload="metadata" src="${this.cueAudioUrl()}">${ui.audioFallback}</audio>
          </div>
          <div class="take-compare__card take-compare__card--local">
            <span class="take-compare__label">${ui.yourTake}</span>
            <strong>${escapeHtml(this.currentPlayer.name)}</strong>
            <audio controls preload="metadata" src="${this.recordingUrl ?? ""}">${ui.audioFallback}</audio>
          </div>
        </div>
        <div class="button-row">
          <button class="button button--primary" type="button" data-score-take>${ui.revealScore}</button>
          <button class="button button--quiet" type="button" data-retake>${ui.retake}</button>
        </div>
        <p class="microcopy">${ui.localUrlNote}</p>
      </div>`;
    pick<HTMLButtonElement>("[data-score-take]", this.panel).addEventListener("click", () => this.revealScore());
    pick<HTMLButtonElement>("[data-retake]", this.panel).addEventListener("click", () => void this.recordTake());
  }

  private revealScore() {
    if (!this.lastAttempt) return;
    const result = scorePerformance(this.cueReference(), this.lastAttempt);
    const averageEnergy = this.lastAttempt.energy.reduce((sum, value) => sum + value, 0) / Math.max(1, this.lastAttempt.energy.length);
    if (averageEnergy < 0.008) {
      result.total = Math.min(result.total, 12);
      result.breakdown.energy = 0;
      result.breakdown.pitch = 0;
    }
    const panel = this.judgeVerdicts(result);
    const votes = result.total >= 99 ? 6 : panel.filter((verdict) => verdict.approved).length;
    this.results.push({
      playerIndex: this.activePlayerIndex,
      cueIndex: this.cueIndex,
      analysis: result,
      votes,
    });
    this.setPhase("score", ui.panelSpoken);
    this.panel.innerHTML = `
      <div class="score-reveal">
        <p class="eyebrow">${ui.judgeVote(escapeHtml(this.currentPlayer.name))}</p>
        <div class="judge-panel" aria-label="${ui.fiveJudges}">
          ${panel.map((verdict, index) => `
            <div class="judge-card ${verdict.approved || votes === 6 ? "judge-card--yes" : "judge-card--no"}" aria-label="${ui.judge(index + 1)}: ${verdict.approved || votes === 6 ? ui.yes : ui.no}">
              <span aria-hidden="true">${verdict.approved || votes === 6 ? "✓" : "×"}</span>
              <b>${verdict.name}</b>
              <small>${verdict.approved || votes === 6 ? ui.yes : ui.no}</small>
              <em>${verdict.reaction}</em>
            </div>`).join("")}
        </div>
        <div class="score-orbit" aria-label="${ui.judgeScore(votes)}">
          <strong data-score-number data-score-target="${votes}">0</strong><span>${votes === 6 ? ui.absolute : ui.voteLabel}</span>
        </div>
        <p class="panel-word"><span>${ui.panelWordLabel}</span><strong>${ui.panelWords[Math.max(0, Math.min(6, votes))]}</strong></p>
        <h2>${this.judgeLine(votes)}</h2>
        <div class="score-breakdown" aria-label="${ui.breakdownLabel}">
          <span><b>${result.breakdown.duration}</b> ${ui.timing}</span>
          <span><b>${result.breakdown.energy}</b> ${ui.energy}</span>
          <span><b>${result.breakdown.pitch}</b> ${ui.pitch}</span>
        </div>
        <p class="microcopy">${ui.scoringNote}</p>
        <div class="button-row score-actions">
          <button class="button button--primary" type="button" data-next-round>${this.nextButtonLabel()}</button>
          <button class="button button--quiet" type="button" data-retry-scored>${ui.retryScored}</button>
        </div>
      </div>`;
    trackSiteEvent("round_scored", { cue: this.currentCue.id, player: this.activePlayerIndex + 1, votes, scoreBand: Math.floor(result.total / 10) * 10 });
    this.animateScore(votes);
    pick<HTMLButtonElement>("[data-next-round]", this.panel).addEventListener("click", () => this.nextRound());
    pick<HTMLButtonElement>("[data-retry-scored]", this.panel).addEventListener("click", () => this.retryScoredRound());
  }

  private judgeVerdicts(result: PerformanceScore): JudgeVerdict[] {
    const profiles = [
      { weights: [0.56, 0.24, 0.2], threshold: 50 },
      { weights: [0.16, 0.2, 0.64], threshold: 52 },
      { weights: [0.15, 0.66, 0.19], threshold: 50 },
      { weights: [0.3, 0.3, 0.4], threshold: 58 },
      { weights: [0.2, 0.35, 0.45], threshold: 46 },
    ];
    const cueSeed = Array.from(this.currentCue.id).reduce((sum, character) => sum + character.charCodeAt(0), 0);
    return profiles.map((profile, index) => {
      const [durationWeight, energyWeight, pitchWeight] = profile.weights;
      const personalityNudge = ((cueSeed + index * 7) % 9) - 4;
      const perspective = result.breakdown.duration * durationWeight
        + result.breakdown.energy * energyWeight
        + result.breakdown.pitch * pitchWeight
        + personalityNudge;
      const approved = result.total >= 99 || perspective >= profile.threshold;
      return {
        name: ui.judgeNames[index],
        approved,
        reaction: approved ? ui.judgeYesLines[index] : ui.judgeNoLines[index],
      };
    });
  }

  private retryScoredRound() {
    this.results = this.results.filter((result) => !(result.playerIndex === this.activePlayerIndex && result.cueIndex === this.cueIndex));
    this.lastAttempt = undefined;
    trackSiteEvent("scored_round_retried", { cue: this.currentCue.id, player: this.activePlayerIndex + 1 });
    this.renderCue();
  }

  private judgeLine(votes: number) {
    return ui.judgeLines[Math.max(0, Math.min(6, votes))];
  }

  private nextButtonLabel() {
    if (!this.pack) return ui.continue;
    const isLastTurn = this.turnIndex + 1 >= this.showCueCount() * this.players.length;
    if (isLastTurn) return ui.seeFinal;
    const nextPlayer = this.players[(this.activePlayerIndex + 1) % this.players.length];
    return this.activePlayerIndex + 1 < this.players.length
      ? ui.passTo(escapeHtml(nextPlayer.name))
      : ui.nextCue;
  }

  private animateScore(target: number) {
    const output = this.panel.querySelector<HTMLElement>("[data-score-number]");
    if (!output) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      output.textContent = String(target);
      return;
    }
    const startedAt = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / 800);
      output.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  }

  private nextRound() {
    if (!this.pack) return;
    this.turnIndex += 1;
    if (this.turnIndex >= this.showCueCount() * this.players.length) {
      this.renderComplete();
    } else {
      this.activePlayerIndex = this.turnIndex % this.players.length;
      this.cueIndex = Math.floor(this.turnIndex / this.players.length);
      this.renderCue();
    }
  }

  private renderComplete() {
    const standings = this.players.map((player, playerIndex) => {
      const playerResults = this.results.filter((result) => result.playerIndex === playerIndex);
      const votes = playerResults.reduce((sum, result) => sum + result.votes, 0);
      const average = Math.round(playerResults.reduce((sum, result) => sum + result.analysis.total, 0) / Math.max(1, playerResults.length));
      return { player, votes, average };
    }).sort((a, b) => b.votes - a.votes || b.average - a.average);
    const leader = standings[0];
    this.setPhase("complete", ui.showComplete);
    this.roundLabel.textContent = ui.performancesScored(this.results.length);
    this.panel.innerHTML = `
      <div class="score-reveal">
        <p class="eyebrow">${ui.finalBoard}</p>
        <div class="score-orbit score-orbit--final"><strong>${leader?.votes ?? 0}</strong><span>${ui.judgeVotes}</span></div>
        <h2>${standings.length > 1 ? ui.winner(escapeHtml(leader.player.name)) : ui.soloComplete}</h2>
        <ol class="round-list leaderboard">${standings.map((standing, index) => `<li><span><b>#${index + 1}</b> ${escapeHtml(standing.player.name)}</span><span><b>${standing.votes}</b> ${ui.votes} · ${standing.average}% ${ui.match}</span></li>`).join("")}</ol>
        <div class="button-row">
          <button class="button button--primary" type="button" data-play-again>${ui.playAgain}</button>
          <button class="button button--accent" type="button" data-new-lineup>${ui.changeLineup}</button>
          <button class="button button--quiet" type="button" data-finish-session>${ui.endMicSession}</button>
        </div>
      </div>`;
    trackSiteEvent("game_completed", { performances: this.results.length, players: this.players.length, winnerVotes: leader?.votes ?? 0 });
    pick<HTMLButtonElement>("[data-play-again]", this.panel).addEventListener("click", () => {
      this.resetShow();
      this.renderCue();
    });
    pick<HTMLButtonElement>("[data-new-lineup]", this.panel).addEventListener("click", () => {
      this.releaseResources();
      this.renderSetup();
    });
    pick<HTMLButtonElement>("[data-finish-session]", this.panel).addEventListener("click", () => this.endMicrophoneSession());
  }

  private resetShow() {
    if (this.pack) {
      const shuffled = [...this.pack.cues];
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
      }
      this.sessionCues = shuffled.slice(0, Math.min(this.pack.roundsPerShow || shuffled.length, shuffled.length));
    }
    this.turnIndex = 0;
    this.cueIndex = 0;
    this.activePlayerIndex = 0;
    this.results = [];
    this.lastAttempt = undefined;
  }

  private renderError(message: string, error?: unknown, recoverable = false) {
    this.setPhase("error", ui.attention);
    this.panel.innerHTML = `
      <div class="game-copy game-copy--center" role="alert">
        <p class="eyebrow">${ui.quickFix}</p>
        <h2>${ui.couldNotContinue}</h2>
        <p>${message}</p>
        ${recoverable ? `<button class="button button--primary" type="button" data-reset-game>${ui.trySoundcheck}</button>` : `<button class="button button--primary" type="button" data-reload-game>${ui.reloadGame}</button>`}
      </div>`;
    this.panel.querySelector<HTMLButtonElement>("[data-reset-game]")?.addEventListener("click", () => {
      this.releaseResources();
      this.renderPermission();
    });
    this.panel.querySelector<HTMLButtonElement>("[data-reload-game]")?.addEventListener("click", () => window.location.reload());
    if (error) console.error("Browser voice game error", error);
  }

  private endMicrophoneSession() {
    this.releaseResources();
    this.resetShow();
    this.renderMainMenu();
    this.status.textContent = ui.micOff;
  }

  private releaseResources() {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = undefined;
    void this.audioContext?.close();
    this.audioContext = undefined;
    this.analyser = undefined;
    this.endMicButton.hidden = true;
    if (this.recordingUrl) URL.revokeObjectURL(this.recordingUrl);
    this.recordingUrl = undefined;
  }

  private async toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await this.root.requestFullscreen();
      trackSiteEvent("fullscreen_toggled", { active: Boolean(document.fullscreenElement) });
    } catch {
      this.status.textContent = ui.fullscreenUnavailable;
    }
  }

  private resizeCanvas() {
    const bounds = this.canvas.getBoundingClientRect();
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.max(1, Math.round(bounds.width * ratio));
    this.canvas.height = Math.max(1, Math.round(bounds.height * ratio));
    this.canvasContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  private draw = () => {
    const context = this.canvasContext;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 2.5;
    context.strokeStyle = this.phase === "recording" ? "#ff5f45" : "#26c6da";
    context.beginPath();

    if (this.analyser) this.analyser.getFloatTimeDomainData(this.waveform);
    const samples = this.analyser ? this.waveform : Float32Array.from({ length: 96 }, (_, index) => Math.sin(index * 0.37) * Math.sin(index * 0.07) * 0.22);
    for (let index = 0; index < samples.length; index += 1) {
      const x = (index / Math.max(1, samples.length - 1)) * width;
      const y = height / 2 + samples[index] * height * 0.62;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
    this.animationFrame = window.requestAnimationFrame(this.draw);
  };
}

document.querySelectorAll<HTMLElement>("[data-voice-show-game]").forEach((root) => {
  void new VoiceShowGame(root).initialize();
});
