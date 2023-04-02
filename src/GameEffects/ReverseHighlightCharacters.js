export class ReverseHighlightCharacters {
  timerId = undefined;
  characters = [];
  lastHighlightElement = undefined;
  currentHighlightElement = undefined;
  fasterRate = false;
  intervalTime = 1000;
  className = "highlight";
  effectName = 'REVERSE_HIGHLIGHT';
  index = 0
  currentHighlightElementGroup = undefined
  subscribers = [];

  setCharacters(characters) {
    this.characters = characters;
  }

  highlight(index) {
    const elementForHighlight = this.characters[index].character;
    this.currentHighlightElementGroup = this.characters[index]
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
  getCurrentHighlightElement() {
    return this.currentHighlightElementGroup
  }
  next() {
    this.index++
    this.update();
  }
  start() {
    const alphabetLength = this.characters.length - 1;
    this.index = alphabetLength;
    this.timerId = setInterval(() => {
      this.highlight(this.index);
      if (this.index === 0) {
        this.index = alphabetLength;
        return;
      }
      this.index--;
      this.subscribers.forEach((el) => {
        el(this.currentHighlightElementGroup)
      })
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
    this.index = 0
    this.currentHighlightElement = undefined;
    this.lastHighlightElement = undefined;
    this.subscribers = [];
  }
  subscribe(subscriber) {
    this.subscribers.push(subscriber)
  }
}
