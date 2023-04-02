import { random } from "../utils/functions.js";

export class RandomHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = "RANDOM_HIGHLIGHT";
  index = 0;
  lastIndex = 0;
  currentHighlightElementGroup = undefined;
  subscribers = [];
  canBeSkipped = false;
  skipTimer = undefined;
  skipTimer1 = undefined;

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    this.currentHighlightElementGroup = this.characters[index];
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

  getCurrentHighlightElement() {
    return this.currentHighlightElementGroup;
  }

  next() {
    if (this.canBeSkipped) {
      clearInterval(this.timerId);
      clearTimeout(this.skipTimer);
      clearTimeout(this.skipTimer1);
      if (this.characters.length === this.index) {
        this.index = 0;
      }
      this.highlight(this.index);
      this.subscribers.forEach((el) => {
        el(this.currentHighlightElementGroup);
      });
      this.index++;
      this.start();
    }
  }

  start() {
    const alphabetLength = this.characters.length - 1;
    this.index = random(0, alphabetLength);
    this.lastIndex = this.index;
    this.timerId = setInterval(() => {
      this.index = random(0, alphabetLength);
      if (this.index === this.lastIndex) {
        while (this.index !== this.lastIndex) {
          this.index = random(0, alphabetLength);
        }
      }
      this.lastIndex = this.index;
      this.highlight(this.index);
      this.subscribers.forEach((el) => {
        el(this.currentHighlightElementGroup);
      });
    }, this.intervalTime);
  }

  update() {
    clearInterval(this.timerId);
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
