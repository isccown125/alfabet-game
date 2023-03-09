import { Board } from "./board.js";

export class AlphabetGame extends Board {
  timerId = null;
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
    this.highlightCharacter(this.highlightTimeSpeed);
    this.timer(level.time);
  }

  finishGame() {
    this.boardHtmlElement.remove();
    this.boardHeaderHtmlElement.remove();
    clearInterval(this.timerId);
    clearInterval(this.highlightTimerId);
  }

  renderGame() {
    this.boardHtmlElement = document.getElementById("alphabet-game");
    document.body.appendChild(this.boardHtmlElement);
  }
}
