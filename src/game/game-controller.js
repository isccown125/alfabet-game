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
    this.touchListener();
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

  touchListener() {
    window.addEventListener("touchend", (e) => {
      if (this.#isActive) {
        console.log(e.target);
        if (e.target.dataset.answer === "L") this.historyAnswers.push("L");
        if (e.target.dataset.answer === "P") this.historyAnswers.push("P");
        this.subscribers.forEach((subscriber) => {
          subscriber(this.historyAnswers.join(""));
        });
      }
    });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}