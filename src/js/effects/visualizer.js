export class AudioVisualizer {
  constructor(canvas, analyser, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.analyser = analyser;
    this.options = {
      barWidth: 3,
      barSpacing: 1,
      barColor: '#fff',
      ...options
    };
    
    this.dataArray = new Uint8Array(analyser.frequencyBinCount);
  }

  drawWaveform() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = this.options.barColor;
    this.ctx.beginPath();
    
    const sliceWidth = this.canvas.width / this.dataArray.length;
    let x = 0;
    
    for (let i = 0; i < this.dataArray.length; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * this.canvas.height / 2;
      
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.ctx.stroke();
  }

  drawBars() {
    this.analyser.getByteFrequencyData(this.dataArray);
    
    this.ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    const barWidth = this.options.barWidth;
    const barSpacing = this.options.barSpacing;
    const totalBars = Math.floor(this.canvas.width / (barWidth + barSpacing));
    
    for (let i = 0; i < totalBars; i++) {
      const percent = this.dataArray[i] / 255;
      const height = this.canvas.height * percent;
      const x = i * (barWidth + barSpacing);
      const hue = (i / totalBars) * 360;
      
      this.ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
      this.ctx.fillRect(x, this.canvas.height - height, barWidth, height);
    }
  }
}