export class NormalHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = 'NORMAL_HIGHLIGHT';
  index = 0;


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
    const alphabetLength = this.characters.length;
    this.timerId = setInterval(() => {
      if (alphabetLength === this.index) {
        this.index = 0;
      }
      this.highlight(this.index);
      this.index++;
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
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.currentIndex = 0
    this.options = { randomize: false, reverse: false };
  }
}
