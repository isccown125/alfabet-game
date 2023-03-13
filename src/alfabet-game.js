import { Board } from "./Board/board.js";
import { Timer } from "./timer.js";
import { CreateGameSymbols } from "./Board/CreateGameSymbols.js";

export class AlphabetGame extends Board {
  timer = undefined;
  timerHtmlElement = undefined;
  currentLevel = undefined;

  constructor(level) {
    super();
    this.currentLevel = level;
  }

  startEffects() {
    this.currentLevel.effects.forEach((el) => {
      el.start();
    });
  }

  stopEffects() {
    this.currentLevel.effects.forEach((el) => {
      el.stop();
    });
  }

  startGame(finishGameCB) {
    this.createTimer(this.currentLevel.gameTime);
    this.renderGame();
    if (this.currentLevel.effects) {
      this.startEffects();
    }
    this.timer.startTimer();
    this.cancelGameButton.addEventListener("click", () => {
      if (this.currentLevel.effects) {
        this.stopEffects();
      }
      this.finishGame();
      finishGameCB(false);
    });
    setTimeout(() => {
      if (this.currentLevel.effects) {
        this.stopEffects();
      }
      this.finishGame();
      finishGameCB(true);
    }, this.currentLevel.gameTime);
  }

  finishGame() {
    this.boardHtmlElement.remove();
    this.timer.clearTimer();
    this.currentLevel = undefined;
  }

  createTimer(time) {
    this.timer = new Timer(time, {
      parent: this.boardHeaderHtmlElement,
    });
    this.timerHtmlElement = this.timer.render();
  }

  createCharacters() {
    this.setAlphabet(this.currentLevel.alphabet);
    this.setSymbols(this.currentLevel.symbols);
    this.createdSymbols = new CreateGameSymbols(this.alphabet, this.symbols);
  }

  renderGame() {
    this.renderBoard();

    this.boardHeaderHtmlElement.appendChild(this.timerHtmlElement);
  }
}
