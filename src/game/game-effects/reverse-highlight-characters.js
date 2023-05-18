import { GameFeedback } from "../../board/game-feedback.js";
import { gameAnswers } from "../../board/game-answers.js";

export class ReverseHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  intervalTime = 1000;
  className = "highlight";
  effectName = "REVERSE_HIGHLIGHT";
  characterIndexForHighlight = 0;
  currentHighlightElementGroup = undefined;
  subscribers = [];
  firstStart = true;

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    this.currentHighlightElementGroup = this.characters[index];
    gameAnswers.setCorrectAnswer(this.currentHighlightSymbol);

    if (!this.lastHighlightElement) {
      this.currentHighlightElement = elementForHighlight;
      this.currentHighlightElement.classList.add(this.className);
      this.lastHighlightElement = this.currentHighlightElement;
      return;
    }

    this.currentHighlightElement = elementForHighlight;
    this.currentHighlightElement.classList.add(this.className);
    this.lastHighlightElement.classList.remove(this.className);
    this.lastHighlightElement = this.currentHighlightElement;
  }

  get currentHighlightSymbol() {
    return this.currentHighlightElementGroup.values.symbol;
  }

  _increaseIndex() {
    const alphabetLength = this.characters.length - 1;
    if (this.characterIndexForHighlight === 0) {
      this.characterIndexForHighlight = alphabetLength;
    } else {
      this.characterIndexForHighlight--;
    }
  }

  userClickManagement() {
    this.userCanClickTimer = setTimeout(() => {
      this.subscribers.forEach((el) => {
        el("USER_DISABLE_CLICK");
      });
    }, this.intervalTime - 50);
    setTimeout(() => {
      this.subscribers.forEach((el) => {
        el("USER_CAN_CLICK");
      });
    }, 50);
    this.subscribers.forEach((el) => {
      el("USER_DISABLE_CLICK");
    });
  }

  start() {
    if (this.firstStart) {
      this.characterIndexForHighlight = this.characters.length - 1;
      this.highlight(this.characterIndexForHighlight);
      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
      this.userClickManagement();
      return;
    }
    this._increaseIndex();
    this.highlight(this.characterIndexForHighlight);
    this.timerId = setTimeout(() => {
      this.next();
    }, this.intervalTime);
    this.userClickManagement();
  }

  next() {
    clearTimeout(this.userCanClickTimer);
    if (this.firstStart) {
      clearTimeout(this.timerId);
      this.firstStart = false;
      new GameFeedback(gameAnswers.checkAnswer()).render(
        this.currentHighlightElementGroup.symbol
      );
      this.start();
      return;
    }
    clearTimeout(this.timerId);
    new GameFeedback(gameAnswers.checkAnswer()).render(
      this.currentHighlightElementGroup.symbol
    );
    this.start();
  }

  stop() {
    clearInterval(this.timerId);
    if (this.currentHighlightElement) {
      this.currentHighlightElement.classList.remove(this.className);
    }
    if (this.lastHighlightElement) {
      this.lastHighlightElement.classList.remove(this.className);
    }
    this.index = 0;
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
