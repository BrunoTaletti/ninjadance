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
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// Resto do código atual do main.js, refatorado para usar os novos módulos
// [O código continua com todas as funções existentes, adaptadas para usar
// os novos módulos de efeitos]