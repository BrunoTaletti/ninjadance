export class PsychedelicEffect {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'psychedelic-bg';
    
    this.kaleidoscope = document.createElement('div');
    this.kaleidoscope.className = 'kaleidoscope';
    
    this.container.appendChild(this.kaleidoscope);
    document.body.appendChild(this.container);
  }

  update(bassIntensity) {
    const scale = 1 + (bassIntensity * 0.5);
    const speed = 10 - (bassIntensity * 5);
    const blur = 100 - (bassIntensity * 50);
    
    this.kaleidoscope.style.transform = `translate(-50%, -50%) scale(${scale})`;
    this.kaleidoscope.style.animationDuration = `${speed}s`;
    this.kaleidoscope.style.filter = `blur(${blur}px)`;
  }

  setActive(active) {
    this.container.classList.toggle('active', active);
  }
}