export class AudioAnalyzer {
  constructor(stream, options = {}) {
    this.options = {
      fftSize: 2048,
      smoothingTimeConstant: 0.8,
      bassRange: [0, 40],
      ...options
    };
    
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = this.options.fftSize;
    this.analyser.smoothingTimeConstant = this.options.smoothingTimeConstant;
    
    const source = this.context.createMediaStreamSource(stream);
    source.connect(this.analyser);
    
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
  }

  getBassIntensity() {
    this.analyser.getByteFrequencyData(this.dataArray);
    
    const [bassStart, bassEnd] = this.options.bassRange;
    const bassRange = this.dataArray.slice(bassStart, bassEnd);
    const bass = bassRange.reduce((a, b) => a + b) / bassRange.length;
    
    return Math.min((bass * 1.5) / 255, 1.5);
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }

  destroy() {
    this.context.close();
  }
}