class IntervalManager {
  interval?: NodeJS.Timer;
  callback?: () => void;
  intervalMs: number;

  constructor(intervalMs: number) {
    this.intervalMs = intervalMs;
  }

  setCallback(callback: () => void) {
    this.callback = callback;
  }

  startInterval() {
    if (!this.interval && this.callback) {
      this.interval = setInterval(this.callback, this.intervalMs);
    }
  };

  stopInterval() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  resetInterval() {
    this.stopInterval();
    this.startInterval();
  }
}

export default IntervalManager;