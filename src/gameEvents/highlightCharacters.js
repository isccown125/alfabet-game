import { State } from "../state.js";

export class HighlightCharacters extends State {
  timerId = undefined;
  characters = [];
  game = {};
  options = { randomize: false, reverse: false };
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  intervalTime = 1000;
  className = "highlight";
  scrollY = 0;

  constructor(game) {
    super("HIGHLIGHT");
    this.game = game;
  }

  updateStateGame(game) {
    this.game = game;
  }

  updateOptions(options = { randomize: false, reverse: false }) {
    this.options = { ...this.options, ...options };
    console.log(this.options);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min));
  }

  scrollToHighlight(x, y) {
    window.scrollTo(x, y);
  }

  highlight(index) {
    const { createdElements } = this.game;
    const elementForHighlight = createdElements[index].character;
    const elementBounding = elementForHighlight.getBoundingClientRect();
    if (index % 4 === 0) {
      this.top = window.screenX + elementBounding.top + elementBounding.top / 2;
      console.log(this.top, elementBounding.top);
    }
    this.scrollToHighlight(elementBounding.left, this.top);
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
    let index = 0;
    const alphabetLength = this.game.groupedAlphabet.length;
    if (this.options.reverse) {
      index = alphabetLength;
    }
    let lastIndex = index;
    this.timerId = setInterval(() => {
      if (this.options.randomize) {
        index = this.random(0, alphabetLength);
        if (index === lastIndex) {
          while (index !== lastIndex) {
            index = this.random(0, alphabetLength);
          }
        }
        lastIndex = index;
        this.highlight(index);
        return;
      }
      if (this.options.reverse) {
        this.highlight(index);

        if (index === 0) {
          index = alphabetLength;
          return;
        }
        index--;
        return;
      }
      if (alphabetLength === index) {
        index = 0;
      }
      this.highlight(index);
      index++;
    }, this.intervalTime);
  }

  stop() {
    clearInterval(this.timerId);
    if (this.currentHighlightElement) {
      this.currentHighlightElement.classList.remove(this.className);
    }
    if (this.lastHighlightElement) {
      this.lastHighlightElement.classList.remove(this.className);
    }
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.options = { randomize: false, reverse: false };
  }
}
