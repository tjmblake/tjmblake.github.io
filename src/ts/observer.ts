declare interface IntersectionalOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

declare interface ObserverOptions {
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  intOptions?: IntersectionalOptions;
  devMode?: boolean;
  isIntersecting: boolean;
}

export default class Observer {
  devMode: boolean;
  target: HTMLElement | null;
  callback: (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => void;
  intOptions: IntersectionalOptions;
  observer: IntersectionObserver | undefined;
  triggered: boolean;
  isIntersecting: boolean;

  constructor(target: string, options: ObserverOptions) {
    this.devMode = options.devMode || false;
    this.log(`Constructing for... ${target}`);
    this.target = document.querySelector(target);
    this.callback = options.callback;
    this.triggered = false;
    this.isIntersecting = options.isIntersecting;

    this.intOptions = {
      root: options.intOptions?.root || null,
      rootMargin: options.intOptions?.rootMargin || "0px",
      threshold: options.intOptions?.threshold || 0.4,
    };

    this.init();
  }

  init() {
    this.log("Initialising");
    this.observer = new IntersectionObserver((entries, obs) => {
      this.log(entries);
      if (
        !this.triggered &&
        entries[0].isIntersecting === this.isIntersecting
      ) {
        this.log("Triggered Callback!");
        this.callback(entries, obs);
        this.triggered = true;
      }
    }, this.intOptions);
    this.log(this.target);
    if (this.target) this.observer.observe(this.target);
  }

  log(msg: any) {
    if (this.devMode) console.log(msg);
  }
}
