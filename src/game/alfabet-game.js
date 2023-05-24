import { Board } from "../board/board.js";
import { Component } from "../components/components.js";
import { backdrop } from "../components/modal.js";
import { Timer } from "../timer.js";

export class AlphabetGame {
  currentLevel = undefined;
  board = undefined;
  gameLoopId = undefined;
  timer = undefined;
  gameRoot = undefined;

  constructor(level, root) {
    this.currentLevel = level;
    this.gameRoot = root;
  }

  setGameBoard(board) {
    if (board instanceof Board) {
      this.board = board;
    } else {
      throw new Error("Fatal error while init game.");
    }
  }

  setTimer() {
    this.timer = new Timer(this.currentLevel.gameTime);
    this.timer.render(this.board.boardHeaderHtmlElement);
  }

  loadGameScreen(startGameCB, time) {
    const gameBackdrop = backdrop();
    this.gameRoot.append(gameBackdrop);
    const timer = new Timer(time);
    const timerContainer = new Component()
      .create("div")
      .setClassList("timer-container").htmlElement;
    const card = new Component()
      .create("div")
      .setClassList("card", "game-loader").htmlElement;
    const label = new Component()
      .create("label")
      .setClassList("load-screen__label")
      .setTextContext("Przygotuj się").htmlElement;
    card.append(label);
    timerContainer.append(card);
    timer.render(card);
    timer.timerHtmlElement.classList.add("initialTimer");
    this.gameRoot.append(timerContainer);
    timer.startTimer();
    setTimeout(() => {
      timer.clearTimer();
      gameBackdrop.remove();
      timerContainer.remove();
      startGameCB();
    }, time + 10);
  }

  initGame() {
    if (this.currentLevel.effect !== undefined) {
      this.currentLevel.effect.setCharacters(this.board.createdSymbols);
      this.currentLevel.effect.start();
      this.currentLevel.effect.subscribe((data) => {
        if (data.hasOwnProperty("elPos")) {
          this.board.scrollController.scrollTo({
            elPos: data.elPos,
          });
        }
      });
    }
  }

  start(cb) {
    this.initGame();
    this.timer.startTimer();
    this.gameLoopId = setTimeout(() => {
      this.timer.stopTimer();
      this.finishGame();
      cb("GAME_FINISH");
    }, this.currentLevel.gameTime + 50);
  }

  finishGame() {
    this.clearGame();
  }

  clearGame() {
    if (this.currentLevel.effect) {
      this.currentLevel.effect.stop();
    }
    this.board.boardHtmlElement.remove();
    if (this.gameLoopId) {
      clearTimeout(this.gameLoopId);
    }
    this.gameLoopId = undefined;
    this.timer = undefined;
  }
}
