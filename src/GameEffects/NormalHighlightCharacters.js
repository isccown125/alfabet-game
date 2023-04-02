export class NormalHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = "NORMAL_HIGHLIGHT";
  index = 0;
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

  start() {
    const alphabetLength = this.characters.length;
    this.canBeSkipped = false;
    this.skipTimer1 = setTimeout(() => {
      this.canBeSkipped = true;
    }, 100);
    this.timerId = setInterval(() => {
      this.skipTimer1 = setTimeout(() => {
        this.canBeSkipped = true;
      }, 100);

      this.highlight(this.index);
      this.subscribers.forEach((el) => {
        el(this.currentHighlightElementGroup);
      });
      this.index++;
      this.skipTimer = setTimeout(() => {
        this.canBeSkipped = false;
      }, this.intervalTime - 100);
      if (alphabetLength === this.index) {
        this.index = 0;
      }
    }, this.intervalTime);
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
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.index = 0;
    this.subscribers = [];
    this.options = { randomize: false, reverse: false };
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
