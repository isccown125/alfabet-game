import { Component } from "./components.js";
import { PageManager } from "./pageManager.js";

export class GameMenu {
  gameMenu = undefined;
  actionsContainer = undefined;

  constructor() {
    const game = document.getElementById("alphabet-game");
    this.gameMenu = new Component()
      .create("div")
      .setId("main-menu").htmlElement;
    this.pageManager = new PageManager(this.gameMenu);
    game.append(this.gameMenu);
  }

  static hideMenu() {
    document.getElementById('main-menu').classList.add('d-none')
  }

  static showMenu() {
    document.getElementById('main-menu').classList.remove('d-none')
  }

  init() {
    this.pageManager.setCurrentPage(this.pageManager.defaultPage);
    this.actionsContainer =
      this.pageManager.getPage("choose-level").htmlElement.lastChild;
  }
}
