import {gameAnswers} from "../../board/game-answers.js";
import {GameFeedback} from "../../board/game-feedback.js";

export class NormalHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  intervalTime = 1000;
  className = "highlight";
  effectName = "NORMAL_HIGHLIGHT";
  currentHighlightElementGroup = undefined;
  subscribers = [];
  characterIndexForHighlight = 0;
  nextCharacterIndexForHighlight = 1;
  firstStart = true;
  userCanClickTimer = undefined;

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

  _increaseIndex() {
    const alphabetLength = this.characters.length - 1;
    if (this.characterIndexForHighlight === alphabetLength) {
      this.characterIndexForHighlight = 0;
    } else {
      this.characterIndexForHighlight++;
    }
  }

  get currentHighlightSymbol() {
    return this.currentHighlightElementGroup.values.symbol;
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
      new GameFeedback(gameAnswers.checkAnswer()).render(
          this.currentHighlightElementGroup.symbol
      );
      this.firstStart = false;
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
    clearTimeout(this.timerId);
    if (this.currentHighlightElement) {
      this.currentHighlightElement.classList.remove(this.className);
    }
    if (this.lastHighlightElement) {
      this.lastHighlightElement.classList.remove(this.className);
    }
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.characterIndexForHighlight = 0;
    this.nextCharacterIndexForHighlight = 1;
    this.firstStart = true;
    this.subscribers = [];
    this.options = {randomize: false, reverse: false};
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
