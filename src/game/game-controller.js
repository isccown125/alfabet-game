export class GameController {
  #isActive = false;
  subscribers = [];
  historyAnswers = [];
  clickButtonTimer = undefined;

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

  answerButtonClick(letter) {
    const answersButton = document.querySelectorAll(".answer-button");
    if (answersButton.length > 0) {
      answersButton.forEach((el) => {
        if (el.dataset.answer === letter) {
          clearTimeout(this.clickButtonTimer);
          el.classList.add("click-button");
          setTimeout(() => {
            el.classList.remove("click-button");
          }, 200);
        }
      });
    }
  }

  answerButtonTouchStyle = () => {
    window.addEventListener("touchstart", (e) => {
      if (
        e.target.classList.contains("answer-button") &&
        (e.target.dataset.answer === "L" || e.target.dataset.answer === "P")
      ) {
        e.target.classList.add("click-button");
      }
    });
    window.addEventListener("touchend", (e) => {
      if (
        e.target.classList.contains("answer-button") &&
        (e.target.dataset.answer === "L" || e.target.dataset.answer === "P")
      ) {
        e.target.classList.remove("click-button");
      }
    });
  };

  keyboardListener = () => {
    window.addEventListener("keyup", (e) => {
      if (this.#isActive && (e.key === "a" || e.key === "d")) {
        if (e.key === "a") {
          this.historyAnswers.push("L");
          this.answerButtonClick("L");
        }
        if (e.key === "d") {
          this.historyAnswers.push("P");
          this.answerButtonClick("P");
        }
        this.subscribers.forEach((subscriber) => {
          subscriber(this.historyAnswers.join(""));
        });
      }
    });
  };

  touchListener() {
    this.answerButtonTouchStyle();
    window.addEventListener("touchend", (e) => {
      if (this.#isActive && e.target.parentElement.id === "choose-answer") {
        if (e.target.dataset.answer === "L") {
          this.historyAnswers.push("L");
        }
        if (e.target.dataset.answer === "P") {
          this.historyAnswers.push("P");
        }
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
