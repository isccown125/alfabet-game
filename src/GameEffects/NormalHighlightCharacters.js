export class NormalHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  intervalTime = 1000;
  className = "highlight";

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    if (index % 4 === 0) {
      this.scrollToCurrentCharacter(elementForHighlight);
    }

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

  scrollToCurrentCharacter(character) {
    const elementBoudingRect = character.getBoundingClientRect();
    const { top, left } = elementBoudingRect;
    const x = left;
    const y = window.scrollY + top - 50;
    window.scrollTo(x, y);
  }

  start() {
    let index = 0;
    const alphabetLength = this.characters.length;
    this.timerId = setInterval(() => {
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
