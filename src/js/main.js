import { AudioAnalyzer } from './audio/analyzer.js';
import { AudioVisualizer } from './effects/visualizer.js';
import { PsychedelicEffect } from './effects/psychedelic.js';
import { RippleEffect } from './effects/ripple.js';

// Configuração e inicialização do app
const CONFIG = {
  FPS: 10,
  TOTAL_FRAMES: 173,
  FRAME_PREFIX: 'ezgif-frame-',
  FRAME_PATH: 'assets/frames/',
  STAR_COUNT: 100,
  STAR_BASE_SPEED: 0.5,
  BASS_FREQ_RANGE: [0, 40],
  WARNING_DISPLAY_TIME: 5000
};

// Elementos do DOM
const elements = {
  canvas: document.getElementById('canvas'),
  ctx: canvas.getContext('2d'),
  startBtn: document.getElementById('startBtn'),
  mobileMicBtn: document.getElementById('mobileMicBtn'),
  menuToggle: document.getElementById('menuToggle'),
  sideMenu: document.getElementById('sideMenu'),
  closeMenu: document.getElementById('closeMenu'),
  reconnectBtn: document.getElementById('reconnectBtn'),
  donatePopup: document.getElementById('donatePopup'),
  popupContent: document.getElementById('popupContent'),
  closePopupBtn: document.getElementById('closePopupBtn'),
  shareWarning: document.getElementById('shareWarning'),
  mobileIndicator: document.getElementById('mobileIndicator'),
  customCursor: document.getElementById('customCursor'),
  checkboxes: {
    showWaveform: document.getElementById('showWaveform'),
    kaleidoscope: document.getElementById('kaleidoscope'),
    beatRipples: document.getElementById('beatRipples'),
    rgbStars: document.getElementById('rgbStars'),
    colorPulse: document.getElementById('colorPulse'),
    psychedelicBg: document.getElementById('psychedelicBg'),
    beatBlink: document.getElementById('beatBlink')
  }
};

// Estado global do app
const state = {
  currentFrame: 0,
  audioAnalyzer: null,
  visualizer: null,
  psychedelicEffect: null,
  rippleEffect: null,
  stars: [],
  bassIntensity: 0,
  mediaStream: null,
  loadedFrames: [],
  bgHue: 0,
  isUsingMic: false,
  animationInterval: null,
  animationFrameId: null,
  isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
};

// Inicialização
function initApp() {
  setupEventListeners();
  setupMobileUI();
  setupCursor();
  initEffects();
}

// Setup de eventos
function setupEventListeners() {
  elements.startBtn.addEventListener('click', startCapture);
  elements.mobileMicBtn.addEventListener('click', toggleMic);
  elements.menuToggle.addEventListener('click', toggleMenu);
  elements.closeMenu.addEventListener('click', toggleMenu);
  elements.reconnectBtn.addEventListener('click', reconnectCapture);
  elements.closePopupBtn.addEventListener('click', closePopup);
  
  // Eventos dos checkboxes
  Object.entries(elements.checkboxes).forEach(([key, checkbox]) => {
    checkbox.addEventListener('change', () => updateEffects());
  });
  
  window.addEventListener('resize', handleResize);
  
  if (!state.isMobile) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
}

// Inicialização dos efeitos
function initEffects() {
  state.psychedelicEffect = new PsychedelicEffect();
  state.rippleEffect = new RippleEffect(elements.canvas);
}

// Atualização dos efeitos
function updateEffects() {
  // Atualiza efeito psicodélico
  state.psychedelicEffect.setActive(elements.checkboxes.psychedelicBg.checked);
  
  // Atualiza visualizador de áudio
  if (state.visualizer) {
    elements.canvas.style.opacity = elements.checkboxes.showWaveform.checked ? '1' : '0';
  }
  
  // Outros efeitos são atualizados durante a renderização
}

// Renderização do frame
function renderFrame() {
  updateBackground();
  elements.ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
  
  if (elements.checkboxes.showWaveform.checked && state.visualizer) {
    state.visualizer.drawBars();
  }
  
  if (elements.checkboxes.rgbStars.checked) {
    drawStars();
  }
  
  if (elements.checkboxes.beatRipples.checked) {
    state.rippleEffect.createBeatRipple(state.bassIntensity);
  }
  
  drawNinja();
  
  state.currentFrame = (state.currentFrame + 1) % CONFIG.TOTAL_FRAMES;
}

// Atualização do background
function updateBackground() {
  if (elements.checkboxes.psychedelicBg.checked) {
    state.bgHue = (state.bgHue + 1) % 360;
    const pulseValue = Math.min(state.bassIntensity * 50, 30);
    document.body.style.background = `hsla(${state.bgHue}, 80%, ${10 + pulseValue}%, 0.8)`;
    state.psychedelicEffect.update(state.bassIntensity);
  } else {
    document.body.style.background = 'rgba(0, 0, 0, 0.8)';
  }
}

// [Resto do código atual do main.js, incluindo as funções de áudio,
// animação, controles de UI, etc.]

// Inicializa o app quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);