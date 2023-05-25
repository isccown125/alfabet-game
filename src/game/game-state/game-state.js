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
import {
  calculateCorrectnessOfAnswersInPercentage,
  debounce,
} from "../../utils/functions.js";
import config from "../../config";
import { Tip } from "../game-stats/tips.js";

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
  userClubData;

  setDefaultUserClubData(isShowGlobalPoints = false) {
    this.userClubData = {
      beatRecord: false,
      globalPoints: isShowGlobalPoints ? 0 : null,
      minimumPoints: 0,
    };
  }

  async setState(state) {
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
    await this.runState();
  }

  async runState() {
    switch (this.currentState) {
      case "main-menu":
        this.showMenu();
        break;
      case "start-game":
        this.startGame();
        break;
      case "init-game":
        await this.initGame();
        break;
      case "finish-game":
        await this.finishGame();
        break;
      case "clear-game":
        await this.clearGame();
        break;
      case "default":
        await this.setDefaultState();
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

  async setDefaultState() {
    if (this.game instanceof AlphabetGame) {
      await this.setState("clear-game");
      return;
    }
    this.game = undefined;
    this.points = 0;
    this.pointsMultiplier = 1;
    await this.setState("main-menu");
  }

  startGame() {
    this.setDefaultUserClubData();
    this.currentLevel.instance.effect.subscribe((data) => {
      data.clickManagement === "USER_CAN_CLICK"
        ? this.gameController.on()
        : this.gameController.off();
    });

    this.game.start(async (e) => {
      if (e === "GAME_FINISH") {
        await this.setState("finish-game");
      }
    });
  }

  async finishGame() {
    this.game.finishGame();

    const points = new Points(
      gameAnswers.badAnswers,
      gameAnswers.goodAnswers,
      this.currentLevel.instance.pointsMultiplier
    );

    this.gameController.off();

    const correctly = calculateCorrectnessOfAnswersInPercentage(
      gameAnswers.goodAnswers,
      gameAnswers.badAnswers
    );

    const gameData = JSON.stringify({
      difficulty: this.currentLevel.instance.difficulty,
      badAnswers: gameAnswers.badAnswers,
      goodAnswers: gameAnswers.goodAnswers,
      points: points.valueOfPoints,
      correctly,
    });

    const modalContent = showModal("Koniec gry!", (content) => {
      content.innerHTML = `<div>Proszę czekać... Za chwilę zobaczysz podsumowanie gry.</div>`;
    });

    const clubUrl = config().clubUrl ?? "";
    if (clubUrl !== "") {
      this.setDefaultUserClubData(true);
      const headers = {
        "Content-Type": "application/json",
      };
      try {
        const response = await fetch(`${clubUrl}add-alphabet-game-user-data`, {
          method: "post",
          body: gameData,
          headers,
        });
        if (response.ok) {
          const resultClubUserData = await response.json();
          this.userClubData.beatRecord = resultClubUserData.beatRecord ?? false;
          this.userClubData.globalPoints = resultClubUserData.globalPoints ?? 0;
          this.userClubData.minimumPoints =
            resultClubUserData.minimumPoints ?? 0;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const personalRecordMessage = this.userClubData.beatRecord
      ? `<div class="info_background">
          <div class="info_result_message personal_record">Gratuluję! Pobiłeś swój rekord w grze</div>
      </div>`
      : "";

    let globalPointsMessage = "";
    if (this.userClubData.globalPoints !== null) {
      if (this.userClubData.globalPoints > 0) {
        globalPointsMessage = `
          <div class="info_background">
            <div class="info_points_message bolded">Dodano punktów do Twojego konta:</div>
            <div class="info_points_number">${this.userClubData.globalPoints}</div>       
          </div>`;
      } else {
        if (this.userClubData.minimumPoints > 0) {
          globalPointsMessage = `
            <div class="info_background">            
                <div class="info_result_message">Musisz zdobyć minimum ${this.userClubData.minimumPoints} punktów w Alfabet game, aby dostać punkty</div>
            </div>`;
        } else {
          globalPointsMessage = `
            <div class="info_background">            
                <div class="info_result_message">Osiągnięto limit rozegranych gier na dzień. Zagraj jutro, aby zdobyć kolejne punkty.</div>
            </div>`;
        }
      }
    }

    const html = `
      ${personalRecordMessage}
      <div class="info_background">
          <div class="info_points_message bolded">Otrzymane punkty w Alfabet game:</div>
          <div class="info_points_number">${points.valueOfPoints}</div>
      </div>
      <div class="info_background">
          <div class="info_result_message">${
            new Tip(points.valueOfPoints).currentTip
          }</div>
      </div>
      <div class="info_background poprawnosc correctly">
          <div class="info_points_message">Poprawność:</div>
          <div class="info_points_number good">${correctly}%</div>
      </div>
      <div class="info_background">
          <div class="info_points_message">Dobrych odpowiedzi:</div>
          <div class="info_points_number good">${gameAnswers.goodAnswers}</div>
      </div>
      <div class="info_background blednych incorrect">
          <div class="info_points_message">Błędnych odpowiedzi:</div>
          <div class="info_points_number bad">${gameAnswers.badAnswers}</div>
      </div>
      ${globalPointsMessage}
    `;
    modalContent.innerHTML = html;

    await this.setState("clear-game");
  }

  async clearGame() {
    this.currentLevel = { name: "", instance: undefined };
    await this.game.clearGame();
    this.points = 0;
    this.pointsMultiplier = 1;
    await this.setState("main-menu");
  }

  async initGame() {
    if (this.game instanceof AlphabetGame || this.game) {
      await this.setState("default-state");
    }
    this.gameMenu.hideMenu();
    this.game = new AlphabetGame(this.currentLevel.instance, this.root);
    const board = new Board(
      this.currentLevel.instance.alphabet,
      this.currentLevel.instance.symbols
    );
    this.pointsMultiplier = this.currentLevel.instance.pointsMultiplier;
    board.renderBoard(board.boardHtmlElement);
    board.cancelGameButton.addEventListener("click", async () => {
      await this.setState("clear-game");
    });
    this.game.setGameBoard(board);
    this.game.setTimer();
    gameAnswers.reset();
    this.game.loadGameScreen(async () => {
      await this.setState("start-game");
    }, this.loadGameScreenTime);
  }

  async initialize() {
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
        if (this.currentLevel.instance !== undefined) {
          this.currentLevel.instance.effect.next();
        }
        this.gameController.resetHistory();
      }, this.keyboardDelay)
    );
    page2.subscribe(async (customLevel) => {
      if (customLevel === "choose-level") {
        this.gameMenu.pageManager.setCurrentPage(customLevel);
        return;
      }
      this.currentLevel = { name: "custom", instance: customLevel };
      await this.setState("init-game");
    });
    this.levelManager.subscribe(async (name) => {
      if (name !== "custom") {
        this.currentLevel = {
          name: name,
          instance: new LevelFactory().getLevel(name),
        };
        await this.setState("init-game");
      }
      if (name === "custom") {
        this.gameMenu.pageManager.setCurrentPage("custom-level");
        await this.setState("customize-level");
      }
    });
    await this.setState("main-menu");
  }
}

export const gameState = new GameState();
