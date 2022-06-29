import { Observable, Subscription, timer } from 'rxjs';

class IntervalManager {
  callback?: () => void;
  source: Observable<number>;
  subscription?: Subscription;

  constructor(intervalMs: number) {
    this.source = timer(0, intervalMs);
  }

  setCallback(callback: () => void) {
    this.callback = callback;
  }

  startInterval() {
    if (!!this.callback) {
      this.subscription =
        this.source.subscribe(() => this.callback!());
    }
  };

  stopInterval() {
    this.subscription && this.subscription.unsubscribe()
  }
}

export default IntervalManager;