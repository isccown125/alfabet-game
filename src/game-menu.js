import { AlphabetGame } from "./alfabet-game.js";
import { showModal } from "./modal.js";
import { Component } from "./components.js";
import { PageManager } from "./pageManager.js";
import { LevelManager } from "./levelManager.js";

export class GameMenu {
  gameMenu = undefined;
  alphabetGame = new AlphabetGame();
  pageManager = undefined;
  levelManager = new LevelManager();
  actionsContainer = undefined;

  constructor() {
    const game = document.getElementById("alphabet-game");
    this.gameMenu = new Component()
      .create("div")
      .setId("main-menu").htmlElement;
    this.pageManager = new PageManager(this.gameMenu);
    game.append(this.gameMenu);
  }

  hideMenu() {
    this.gameMenu.classList.add("d-none");
  }

  showMenu() {
    this.gameMenu.classList.remove("d-none");
  }

  chooseLevelHandler(event) {
    if (
      event.target.nodeName === "BUTTON" &&
      event.target.className.includes("level-button")
    ) {
      const levelName = event.target.getAttribute("data-level");
      if (levelName === "CUSTOM_LEVEL") {
        this.pageManager.setCurrentPage("custom-level");
      } else {
        this.hideMenu();
        this.levelManager.setCurrentLevel(levelName);
        this.alphabetGame.startGame(this.levelManager.currentLevel);
        setTimeout(() => {
          this.alphabetGame.finishGame();
          this.showMenu();
          showModal(
            "Koniec gry!",
            "<p>Koniecznie pochwal się na naszym klubowym discordzie jak ci poszło :) <br> Jeśli masz jakieś uwagi do gry prosimy abyś skontaktował się z nami.</p>"
          );
        }, this.levelManager.currentLevel.time + 2000);
      }
    }
  }

  init() {
    this.pageManager.setCurrentPage(this.pageManager.defaultPage);
    this.actionsContainer =
      this.pageManager.getPage("choose-level").htmlElement.lastChild;
    this.actionsContainer.addEventListener(
      "click",
      this.chooseLevelHandler.bind(this)
    );
  }
}
