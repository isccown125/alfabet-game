import { GameMenu } from "./game-menu.js";
import { CustomLevelPage } from "./gameMenuPages/custom-level-page.js";
import { chooseLevelPage } from "./gameMenuPages/choose-level-page.js";
import { LevelManager } from "./levels/LevelManager.js";
import { LevelFactory } from "./levels/LevelFactory.js";
import { AlphabetGame } from "./alfabet-game.js";


class App {
  static init() {
    const gameMenu = new GameMenu();
    const levelManager = new LevelManager();
    const level = new LevelFactory();
    const customLevelPage = new CustomLevelPage();

    customLevelPage.subscribe((level) => {
      if (level === "choose-level") {
        return;
      }
      const game = new AlphabetGame(level);
      game.createCharacters();
      if (level.effects) {
        level.effects.forEach((el) => {
          el.setCharacters(game.createdSymbols);
        });
      }
      game.startGame()
    });

    levelManager.subscribe((selectedLevel) => {
      const currentLevel = level.getLevel(selectedLevel);
      if (currentLevel.name === "custom") {
        gameMenu.pageManager.setCurrentPage("custom-level");
        return;
      }
      const game = new AlphabetGame(currentLevel);
      game.createCharacters();
      if (currentLevel.effects) {
        currentLevel.effects.forEach((el) => {
          el.setCharacters(game.createdSymbols);
        });
      }
      game.startGame();
    });
    gameMenu.pageManager.registerPage(chooseLevelPage(levelManager.getRoot()));
    gameMenu.pageManager.registerPage(customLevelPage.page);
    gameMenu.init();

    customLevelPage.subscribe((data) => {
      if (data === "choose-level") {
        gameMenu.pageManager.setCurrentPage(data)
      }
    })
  }
}

window.addEventListener("load", () => {
  App.init();
});
