import { random } from "../utils/functions.js";

export class RandomHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = 'RANDOM_HIGHLIGHT';
  index = 0
  lastIndex = 0;

  setCharacters(characters) {
    this.characters = characters;
  }


  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    const elementPos = elementForHighlight.getBoundingClientRect()
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
    this.index = alphabetLength;
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
    }, this.intervalTime);
  }
  update() {
    clearInterval(this.timerId)
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
    this.lastIndex = 0
    this.index = 0
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
  }
}
