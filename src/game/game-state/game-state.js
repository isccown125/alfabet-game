import { gameAnswers } from "../../board/game-answers.js";
import { Board } from "../../board/board.js";
import { GameMenu } from "../../game-menu/game-menu.js";
import { AlphabetGame } from "../alfabet-game.js";
import { chooseLevelPage } from "../../game-menu/game-menu-pages/choose-level-page.js";
import { CustomLevelPage } from "../../game-menu/game-menu-pages/custom-level-page.js";
import { LevelFactory } from "../../levels/level-factory.js";
import { LevelManager } from "../../levels/level-manager.js";
import { showModal } from "../../components/modal.js";
import { Points } from "../game-stats/points.js";
import { GameController } from "../game-controller.js";
import { calculatePercentage, debounce } from "../../utils/functions.js";

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
  currentLevel = { name: "", instance: undefined };
  subscribers = [];
  gameMenu = undefined;
  levelManager = undefined;
  game = undefined;
  gameController = undefined;
  loadGameScreenTime = 3000;
  keyboardDelay = 50;

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
        pointsMultiplier: this.pointsMultiplier,
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

  setDomRootForRender() {
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
    this.pointsMultiplier = 1;
    this.setState("main-menu");
  }

  startGame() {
    this.currentLevel.instance.effect.subscribe((data) => {
      data === "USER_CAN_CLICK"
        ? this.gameController.on()
        : this.gameController.off();
    });

    this.game.start((e) => {
      if (e === "GAME_FINISH") {
        const points = new Points(
          gameAnswers.badAnswers,
          gameAnswers.goodAnswers,
          this.currentLevel.instance.pointsMultiplier
        );
        const customEvent = new CustomEvent("alphabetgame-finish", {
          detail: {
            gameData: JSON.stringify({
              badAnswers: gameAnswers.badAnswers,
              goodAnswers: gameAnswers.goodAnswers,
              points: points.points,
              correctly: calculatePercentage(
                gameAnswers.goodAnswers,
                gameAnswers.goodAnswers,
                gameAnswers.badAnswers
              ).toFixed(2),
            }),
          },
        });
        window.dispatchEvent(customEvent);
        this.setState("finish-game");
      }
    });
  }

  finishGame() {
    this.game.finishGame();
    const points = new Points(
      gameAnswers.badAnswers,
      gameAnswers.goodAnswers,
      this.currentLevel.instance.pointsMultiplier
    );

    showModal("Koniec gry!", (content) => {
      content.innerHTML = `
       <p>Świetnie ci poszło!</p>
       <div>Twoje punkty: ${points.points}</div>
       <div>Złe odpowiedzi: ${gameAnswers.badAnswers} <br> Dobre odpowiedzi: ${
        gameAnswers.goodAnswers
      }</div>
       <div>Poprawność odpowiedzi ${calculatePercentage(
         gameAnswers.goodAnswers,
         gameAnswers.goodAnswers,
         gameAnswers.badAnswers
       ).toFixed(2)}%</div>
      `;
    });
    this.gameController.off();
    this.setState("clear-game");
  }

  clearGame() {
    this.currentLevel = { name: "", instance: undefined };
    this.game.clearGame();
    this.points = 0;
    this.pointsMultiplier = 1;
    this.setState("main-menu");
  }

  initGame() {
    if (this.game instanceof AlphabetGame || this.game) {
      this.setState("default-state");
    }
    this.gameMenu.hideMenu();
    this.game = new AlphabetGame(this.currentLevel.instance, this.root);
    const board = new Board(
      this.currentLevel.instance.alphabet,
      this.currentLevel.instance.symbols
    );
    this.pointsMultiplier = this.currentLevel.instance.pointsMultiplier;
    board.renderBoard(board.boardHtmlElement);
    board.cancelGameButton.addEventListener("click", () => {
      this.setState("clear-game");
    });
    this.game.setGameBoard(board);
    this.game.setTimer();
    gameAnswers.reset();
    this.game.loadGameScreen(() => {
      this.setState("start-game");
    }, this.loadGameScreenTime);
  }

  initialize() {
    this.setDomRootForRender();
    this.levelManager = new LevelManager();
    const page1 = chooseLevelPage(this.levelManager.getRoot());
    const page2 = new CustomLevelPage();
    this.gameMenu = new GameMenu();
    this.gameMenu.pageManager.registerPage(page1);
    this.gameMenu.pageManager.registerPage(page2.page);
    this.gameMenu.init();
    this.gameController = new GameController();
    this.gameController.initListeners();
    this.gameController.subscribe(
      debounce((data) => {
        gameAnswers.setUserAnswer(data);
        this.currentLevel.instance.effect.next();
        this.gameController.resetHistory();
      }, this.keyboardDelay)
    );
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
