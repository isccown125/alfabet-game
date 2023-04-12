import { points } from "../GameStats/Points.js";

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

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    console.log(index, elementForHighlight);
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

  start() {
    const alphabetLength = this.characters.length - 1;
    if (this.firstStart) {
      points.addPoints("normal-highlight", 0, 25);
      this.highlight(this.characterIndexForHighlight);
      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
    } else {
      // sprawdzenie indexu
      if (this.characterIndexForHighlight === alphabetLength) {
        this.characterIndexForHighlight = 0;
      } else {
        this.characterIndexForHighlight++;
      }
      // podświetlenie następnej literki
      this.highlight(this.characterIndexForHighlight);

      // ustawienie czasu na odp
      this.timerId = setTimeout(() => {
        this.next();
      }, this.intervalTime);
    }
  }

  next() {
    if (this.firstStart) {
      clearTimeout(this.timerId);
      this.subscribers.forEach((el) => {
        el(this.currentHighlightElementGroup);
      });
      this.firstStart = false;
      this.start();
      return;
    }
    clearTimeout(this.timerId);
    this.subscribers.forEach((el) => {
      el(this.currentHighlightElementGroup);
    });
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
