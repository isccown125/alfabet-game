export class GameController {
  #isActive = false;
  subscribers = [];
  historyAnswers = [];

  constructor() {}

  on() {
    this.#isActive = true;
  }

  off() {
    this.#isActive = false;
  }

  initListeners() {
    this.keyboardListener();
  }

  resetHistory() {
    this.historyAnswers = [];
  }

  keyboardListener = () => {
    window.addEventListener("keyup", (e) => {
      if (this.#isActive) {
        if (e.key === "a") this.historyAnswers.push("L");
        if (e.key === "d") this.historyAnswers.push("P");
        this.subscribers.forEach((subscriber) => {
          subscriber(this.historyAnswers.join(""));
        });
      }
    });
  };

  touchListener() {}

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
