export class RippleEffect {
  constructor(canvas) {
    this.canvas = canvas;
    this.ripples = [];
  }

  createRipple(x, y, color = '#fff') {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.background = `radial-gradient(circle, ${color}77 0%, ${color}00 70%)`;
    
    document.body.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }

  createBeatRipple(bassIntensity) {
    if (bassIntensity > 0.5) {
      const x = this.canvas.width / 2;
      const y = this.canvas.height / 2;
      const hue = Math.random() * 360;
      this.createRipple(x, y, `hsl(${hue}, 100%, 50%)`);
    }
  }
}