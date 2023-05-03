import { gameAnswers } from "../Board/game-answers.js";
import { Board } from "../Board/board.js";
import { GameMenu } from "../game-menu.js";
import { AlphabetGame } from "../game/alfabet-game.js";
import { chooseLevelPage } from "../game-menu-pages/choose-level-page.js";
import { CustomLevelPage } from "../game-menu-pages/custom-level-page.js";
import { LevelFactory } from "../levels/level-factory.js";
import { LevelManager } from "../levels/level-manager.js";
import { showModal } from "../modal.js";
import { keyBinder } from "../key-binder/key-binder.js";

class GameState {
  currentState = "main-menu";
  gameStates = [
    "start-game",
    "init-game",
    "clear-game",
    "main-menu",
    "customize-level",
    "default",
  ];
  points = 0;
  currentLevel = { name: "", instance: undefined };
  pointsMultipler = 1;
  subscribers = [];
  gameMenu = undefined;
  levelManager = undefined;
  game = undefined;

  setState(state) {
    if (!state || typeof state !== "string") {
      this.currentState = "main-menu";
    }
    if (!this._validateState(state)) {
      this.currentState = "main-menu";
    }
    this.currentState = state;
    this.subscribers.forEach((subscriber) => {
      subscriber({
        currentState: this.currentState,
        points: this.points,
        pointsMultipler: this.pointsMultipler,
      });
    });
    this.runState();
  }

  runState() {
    switch (this.currentState) {
      case "main-menu":
        this.showMenu();
        break;
      case "start-game":
        this.startGame();
        break;
      case "customize-level":
        this.customizeLevel();
        break;
      case "init-game":
        this.initGame();
        break;
      case "finish-game":
        this.finishGame();
        break;
      case "clear-game":
        this.clearGame();
        break;
      case "default":
        this.setDefaultState();
        break;
    }
  }

  _validateState(state) {
    let stateIsValid = false;
    this.gameStates.forEach((el) => {
      if (el === state) {
        stateIsValid = true;
        return stateIsValid;
      }
    });
    return stateIsValid;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  setDomRootForReneder() {
    const root = document.getElementById("alphabet-game");
    if (root instanceof HTMLElement) {
      this.root = root;
    } else {
      throw new Error("Cannot found root in dom for init AlphabetGame!");
    }
  }

  showMenu() {
    this.gameMenu.pageManager.setCurrentPage("choose-level");
    this.gameMenu.showMenu();
  }

  setDefaultState() {
    if (this.game instanceof AlphabetGame) {
      this.setState("clear-game");
      return;
    }
    this.game = undefined;
    this.points = 0;
    this.pointsMultipler = 1;
    this.setState("main-menu");
  }

  startGame() {
    let answerState = "USER_DISABLE_CLICK";

    this.currentLevel.instance.effect.subscribe((data) => {
      answerState = data;
    });

    keyBinder.addAction({
      key: "d",
      actionID: "cos",
      typeKeyEvent: "keydown",
      actionCB: () => {
        if (answerState === "USER_CAN_CLICK") {
          gameAnswers.setCorrentAnswear(
            this.currentLevel.instance.effect.currentHighlightElementGroup
              .values.symbol
          );
          if (gameAnswers.corretAnswear === "O") {
            gameAnswers.setUserAnswear("P");
            if (!gameAnswers.twoKeyTimer) {
              console.log(gameAnswers.checkAnswer());
              this.currentLevel.instance.effect.next();
            }
          } else {
            gameAnswers.setUserAnswear("P");
            console.log(gameAnswers.checkAnswer());
            this.currentLevel.instance.effect.next();
          }
        }
      },
    });
    keyBinder.addAction({
      key: "a",
      actionID: "cos",
      typeKeyEvent: "keydown",
      actionCB: () => {
        if (answerState === "USER_CAN_CLICK") {
          gameAnswers.setCorrentAnswear(
            this.currentLevel.instance.effect.currentHighlightElementGroup
              .values.symbol
          );
          if (gameAnswers.corretAnswear === "O") {
            gameAnswers.setUserAnswear("L");
            if (!gameAnswers.twoKeyTimer) {
              console.log(gameAnswers.checkAnswer());
              this.currentLevel.instance.effect.next();
            }
          } else {
            gameAnswers.setUserAnswear("L");
            console.log(gameAnswers.checkAnswer());
            this.currentLevel.instance.effect.next();
          }
        }
      },
    });
    gameAnswers.addListener((e) => {
      if (e.target.classList.value.includes("level-button")) {
        if (answerState === "USER_CAN_CLICK") {
          gameAnswers.setCorrentAnswear(
            this.currentLevel.instance.effect.currentHighlightElementGroup
              .values.symbol
          );
          if (gameAnswers.corretAnswear === "O") {
            gameAnswers.setUserAnswear(e.target.dataset.asnwer);
            if (!gameAnswers.twoKeyTimer) {
              console.log(gameAnswers.checkAnswer());
              this.currentLevel.instance.effect.next();
            }
          } else {
            gameAnswers.setUserAnswear(e.target.dataset.answer);
            console.log(gameAnswers.checkAnswer());
            this.currentLevel.instance.effect.next();
          }
        }
      }
    });
    this.game.start((e) => {
      if (e === "GAME_FINISH") {
        this.setState("finish-game");
      }
    });
  }

  finishGame() {
    this.game.finishGame();
    showModal("Koniec gry!", (content) => {
      content.innerHTML = `
        :)
      `;
    });
    this.setState("clear-game");
  }

  clearGame() {
    this.currentLevel = { name: "", instance: undefined };
    this.game.clearGame();
    this.points = 0;
    this.pointsMultipler = 1;
    this.setState("main-menu");
  }

  initGame() {
    keyBinder.resetActions();
    if (this.game instanceof AlphabetGame || this.game) {
      this.setState("default-state");
    }
    this.gameMenu.hideMenu();
    this.game = new AlphabetGame(this.currentLevel.instance, this.root);
    const board = new Board(
      this.currentLevel.instance.alphabet,
      this.currentLevel.instance.symbols
    );
    board.renderBoard(board.boardHtmlElement);
    board.cancelGameButton.addEventListener("click", () => {
      this.setState("clear-game");
    });
    this.game.setGameBoard(board);
    this.game.setTimer();
    this.game.loadGameScreen(() => {
      this.setState("start-game");
    }, 3000);
  }

  customizeLevel() {}

  initialize() {
    this.setDomRootForReneder();
    this.levelManager = new LevelManager();
    const page1 = chooseLevelPage(this.levelManager.getRoot());
    const page2 = new CustomLevelPage();
    this.gameMenu = new GameMenu();
    this.gameMenu.pageManager.registerPage(page1);
    this.gameMenu.pageManager.registerPage(page2.page);
    this.gameMenu.init();
    page2.subscribe((customLevel) => {
      if (customLevel === "choose-level") {
        this.gameMenu.pageManager.setCurrentPage(customLevel);
        return;
      }
      this.currentLevel = { name: "custom", instance: customLevel };
      this.setState("init-game");
    });
    this.levelManager.subscribe((name) => {
      if (name !== "custom") {
        this.currentLevel = {
          name: name,
          instance: new LevelFactory().getLevel(name),
        };
        this.setState("init-game");
      }
      if (name === "custom") {
        this.gameMenu.pageManager.setCurrentPage("custom-level");
        this.setState("customize-level");
      }
    });
    this.setState("main-menu");
  }
}

export const gameState = new GameState();
