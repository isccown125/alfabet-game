import { gameAnswers } from "../../board/game-answers.js";
import { GameFeedback } from "../../board/game-feedback.js";
import { random } from "../../utils/functions.js";

export class RandomizeHighlightGameEffect {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  intervalTime = 1000;
  effectChangeTime = 5000;
  className = "highlight";
  effectName = "REVERSE_HIGHLIGHT";
  characterIndexForHighlight = 0;
  lastIndex = undefined;
  currentHighlightElementGroup = undefined;
  subscribers = [];
  firstStart = true;
  currentEffectIndex = 0;
  lastEffectIndex;
  nextEffect = true;
  effectTimer = undefined;

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
    this.lastIndex = this.characterIndexForHighlight;
    if (this.characterIndexForHighlight === alphabetLength) {
      this.characterIndexForHighlight = 0;
    } else {
      this.characterIndexForHighlight++;
    }
  }

  _decreaseIndex() {
    const alphabetLength = this.characters.length - 1;
    this.lastIndex = this.characterIndexForHighlight;
    if (this.characterIndexForHighlight === 0) {
      this.characterIndexForHighlight = alphabetLength;
    } else {
      this.characterIndexForHighlight--;
    }
  }

  _randomIndex() {
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

  _changeEffects() {
    if (this.firstStart) {
      this.currentEffectIndex = 0;
      this.lastEffectIndex = 0;
      this.currentEffectIndex = random(0, 2);
      this.lastEffectIndex = this.currentEffectIndex;
    }
    if (this.nextEffect) {
      this.nextEffect = false;
      this.effectTimer = setTimeout(() => {
        this.lastIndex = this.currentEffectIndex;
        this.currentEffectIndex = random(0, 2);
        if (this.currentEffectIndex === this.lastIndex) {
          while (this.currentEffectIndex === this.lastIndex) {
            this.currentEffectIndex = random(0, 2);
          }
        }
        this.nextEffect = true;
      }, this.effectChangeTime);
    }
    switch (this.currentEffectIndex) {
      case 0:
        this._increaseIndex();
        break;
      case 1:
        this._decreaseIndex();
        break;
      case 2:
        this._randomIndex();
        break;
    }
  }

  start() {
    if (this.firstStart) {
      this._changeEffects();
      this.characterIndexForHighlight = this.characters.length - 1;
      this.highlight(this.characterIndexForHighlight);
      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
      this.userClickManagement();
      return;
    }
    this._changeEffects();
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
    clearTimeout(this.timerId);
    clearTimeout(this.effectTimer);
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
