import { random } from "../../utils/functions.js";
import { gameAnswers } from "../../board/game-answers.js";
import { GameFeedback } from "../../board/game-feedback.js";

export class RandomHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = "RANDOM_HIGHLIGHT";
  characterIndexForHighlight = 0;
  lastIndex = 0;
  currentHighlightElementGroup = undefined;
  subscribers = [];
  userCanClickTimer = false;
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

  _incraseIndex() {
    const alphabetLength = this.characters.length - 1;
    if (!this.lastIndex) {
      this.characterIndexForHighlight = random(0, alphabetLength);
      this.lastIndex = this.characterIndexForHighlight;
      return;
    }
    this.lastIndex = this.characterIndexForHighlight;
    this.characterIndexForHighlight = random(0, alphabetLength);
    if (this.characterIndexForHighlight === this.lastIndex) {
      while (this.characterIndexForHighlight === this.lastIndex) {
        this.characterIndexForHighlight = random(0, alphabetLength);
      }
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
      this._incraseIndex();
      this.highlight(this.characterIndexForHighlight);

      this.userClickManagement();

      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
      return;
    }
    this._incraseIndex();
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
    new GameFeedback(gameAnswers.checkAnswer()).render(
      this.currentHighlightElementGroup.symbol
    );
    clearTimeout(this.timerId);
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
    this.lastIndex = 0;
    this.index = 0;
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
