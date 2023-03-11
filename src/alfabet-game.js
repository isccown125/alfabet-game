import { Board } from "./board.js";
import { Timer } from "./timer.js";
import { HighlightCharacters } from "./gameEvents/highlightCharacters.js";

export class AlphabetGame extends Board {
  timer = undefined;
  gameTimerId = undefined;
  timerHtmlElement = undefined;
  events = [new HighlightCharacters(this)];

  constructor() {
    super();
    this.renderGame();
  }

  setGameBoard() {
    this.render();
  }

  startGame(level) {
    const [highlight] = this.events;
    if (!level.name || !level.time) {
      throw new Error("Cannot start game!");
    }
    this.setGameBoard();
    if (level.options.highlightOptions.normal) {
      highlight.intervalTime = level.options.highlightOptions.intervalTime;
      highlight.updateOptions(level.options.highlightOptions);
      highlight.start();
      highlight.updateStateGame(this);
    }
    this.createTimer(level.time);
    this.timer.startTimer();
  }

  finishGame() {
    const [highlight] = this.events;
    this.boardHtmlElement.remove();
    this.boardHeaderHtmlElement.remove();
    this.timer.clearTimer();
    highlight.stop();
  }

  createTimer(time) {
    this.timer = new Timer(time, {
      parent: this.boardHeaderHtmlElement,
    });
    this.timerHtmlElement = this.timer.render();
  }

  renderGame() {
    this.boardHtmlElement = document.getElementById("alphabet-game");
    document.body.appendChild(this.boardHtmlElement);
  }
}
