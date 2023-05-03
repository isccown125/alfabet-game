import { gameAnswers } from "../Board/GameAnswers.js";

export class NormalHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = "NORMAL_HIGHLIGHT";
  currentHighlightElementGroup = undefined;
  subscribers = [];
  characterIndexForHighlight = 0;
  nextCharacterIndexForHighlight = 1;
  answearTimer = undefined;
  firstStart = true;
  userCanClickTimer = undefined;

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    this.currentHighlightElementGroup = this.characters[index];
    gameAnswers.setCorrentAnswear(
      this.currentHighlightElementGroup.values.symbol
    );
    const elementPos = elementForHighlight.getBoundingClientRect();
    window.scrollBy(window.innerHeight / 2, Math.floor(elementPos.y) - 50);

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

  start() {
    const alphabetLength = this.characters.length - 1;
    if (this.firstStart) {
      this.highlight(this.characterIndexForHighlight);
      this.userCanClickTimer = setTimeout(() => {
        this.subscribers.forEach((el) => {
          el("USER_DISABLE_CLICK");
        });
      }, this.intervalTime - 200);
      gameAnswers.setCorrentAnswear(
        this.currentHighlightElementGroup.values.symbol
      );
      this.subscribers.forEach((el) => {
        el("USER_CAN_CLICK");
      });
      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
    } else {
      if (this.characterIndexForHighlight === alphabetLength) {
        this.characterIndexForHighlight = 0;
      } else {
        this.characterIndexForHighlight++;
      }
      this.highlight(this.characterIndexForHighlight);

      this.timerId = setTimeout(() => {
        this.next();
      }, this.intervalTime);

      this.userCanClickTimer = setTimeout(() => {
        this.subscribers.forEach((el) => {
          el("USER_DISABLE_CLICK");
        });
      }, this.intervalTime - 150);
      gameAnswers.setCorrentAnswear(
        this.currentHighlightElementGroup.values.symbol
      );
      this.subscribers.forEach((el) => {
        el("USER_CAN_CLICK");
      });
    }
  }

  next() {
    clearTimeout(this.userCanClickTimer);
    if (this.firstStart) {
      clearTimeout(this.timerId);
      this.firstStart = false;
      this.start();
      return;
    }
    clearTimeout(this.timerId);
    this.start();
  }

  update() {
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
    this.options = { randomize: false, reverse: false };
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
