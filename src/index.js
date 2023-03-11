import { GameMenu } from "./game-menu.js";
import { customizeLevelPage } from "./gameMenuPages/customize-level-page.js";
import { chooseLevelPage } from "./gameMenuPages/choose-level-page.js";

class App {
  gameMenu = new GameMenu();

  constructor() {
    this.gameMenu.pageManager.registerPage(chooseLevelPage());
    this.gameMenu.pageManager.registerPage(customizeLevelPage());
    this.gameMenu.levelManager.createLevel({
      name: "EASY_LEVEL",
      time: 1000 * 60,
      options: {
        highlightOptions: {
          normal: true,
          intervalTime: 1000,
        },
      },
    });
    this.gameMenu.levelManager.createLevel({
      name: "MEDIUM_LEVEL",
      time: 1000 * 60 * 2,
      options: {
        highlightOptions: {
          normal: true,
          intervalTime: 1000,
        },
      },
    });
    this.gameMenu.levelManager.createLevel({
      name: "HARD_LEVEL",
      time: 1000 * 60 * 3,
      options: {
        highlightOptions: {
          normal: true,
          intervalTime: 1000,
        },
      },
    });
    this.gameMenu.init();
  }
}

window.addEventListener("load", () => {
  new App();
});
