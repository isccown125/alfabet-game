import { Board } from "./board.js";
import { Timer } from "./timer.js";

export class AlphabetGame extends Board {
  timer = undefined;
  timerHtmlElement = undefined;

  constructor() {
    super();
    this.renderGame();
  }

  setGameBoard() {
    this.render();
  }

  startGame(level) {
    if (!level.name || !level.time) {
      throw new Error("Cannot start game!");
    }
    this.setGameBoard();
    this.createTimer(level.time);
    this.timer.startTimer();
  }

  finishGame() {
    this.boardHtmlElement.remove();
    this.boardHeaderHtmlElement.remove();
    this.timer.clearTimer();
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
