import { GameMenu } from "./game-menu.js";
import { customizeLevelPage } from "./gameMenuPages/customize-level-page.js";
import { chooseLevelPage } from "./gameMenuPages/choose-level-page.js";
import { LevelManager } from "./levels/LevelManager.js";
import { LevelFactory } from "./levels/LevelFactory.js";
import { AlphabetGame } from "./alfabet-game.js";
import { showModal } from "./modal.js";

class App {
  static init() {
    const gameMenu = new GameMenu();
    const levelManager = new LevelManager();
    const level = new LevelFactory();

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
      game.startGame((finish) => {
        gameMenu.showMenu();
        if (finish) {
          showModal(
            "Koniec Gry!",
            "<p>Koniecznie pochwal się na naszym discordzie jak ci poszło!<br>Jeśli masz jakieś uwagi do gry skontaktuj się z nami.</p>"
          );
        }
      });
      gameMenu.hideMenu();
    });
    gameMenu.pageManager.registerPage(chooseLevelPage(levelManager.getRoot()));
    gameMenu.pageManager.registerPage(customizeLevelPage());
    gameMenu.init();
  }
}

window.addEventListener("load", () => {
  App.init();
});
