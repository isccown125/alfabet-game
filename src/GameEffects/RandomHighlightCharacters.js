import { random } from "../utils/functions.js";
import { points } from "../GameStats/Points.js";

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
  firstStart = true;

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

  start() {
    console.log("cos");
    const alphabetLength = this.characters.length - 1;
    if (this.firstStart) {
      points.addPoints("normal-highlight", 0, 75);
      this.characterIndexForHighlight = random(0, alphabetLength);
      this.lastIndex = this.characterIndexForHighlight;
      this.highlight(this.characterIndexForHighlight);
      this.timerId = setTimeout(() => {
        this.next();
        this.firstStart = false;
      }, this.intervalTime);
    } else {
      // sprawdzenie indexu
      if (this.characterIndexForHighlight === this.lastIndex) {
        while (this.characterIndexForHighlight === this.lastIndex) {
          this.characterIndexForHighlight = random(0, alphabetLength);
        }
      } else {
        this.characterIndexForHighlight = random(0, alphabetLength);
      }
      // podświetlenie następnej literki
      this.highlight(this.characterIndexForHighlight);

      // ustawienie czasu na odp
      this.timerId = setTimeout(() => {
        this.next();
      }, this.intervalTime);
    }
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
