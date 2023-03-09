import { GameMenu } from "./game-menu.js";
import { Timer } from "./timer.js";

class App {
  gameMenu = new GameMenu();

  constructor() {
    this.gameMenu.createRule("Zasady gry", {
      htmlTag: "p",
      classes: "main-menu-headers",
    });

    this.gameMenu.createRule(
      "Po przejściu do gry będzie generowała się plansza z alfabetem oraz symbolami.",
      {
        htmlTag: "p",
        classes: "text-style",
      }
    );

    this.gameMenu.createRule(
      "W ciągu określonego czasu musisz przeczytać cały alfabet jednocześnie podnąsząc ręce do góry w zależności od symbolu.",
      {
        htmlTag: "p",
        classes: "text-style",
      }
    );

    this.gameMenu.createRule(
      "Pod literami alfabetu znajdują się symbole, w zależności od symbolu musisz wykonać jakąś akcje.",
      {
        htmlTag: "p",
        classes: "text-style",
      }
    );

    const parent = this.gameMenu.createRule("", {
      htmlTag: "ul",
      group: true,
      classes: "list",
    });

    this.gameMenu.createRule("Oznaczenia", {
      group: true,
      htmlTag: "p",
      parent,
      classes: "list-head",
    });

    this.gameMenu.createRule(
      "L - gdy widzisz ten symbol podnosisz do góry lewą ręke.",
      {
        group: true,
        htmlTag: "li",
        parent,
      }
    );

    this.gameMenu.createRule(
      "P - gdy widzisz ten symbol podnosisz do góry prawą ręke.",
      {
        group: true,
        htmlTag: "li",
        parent,
      }
    );

    this.gameMenu.createRule(
      "O - gdy widzisz ten symbol podnosisz do góry obie ręce.",
      {
        group: true,
        htmlTag: "li",
        parent,
      }
    );

    this.gameMenu.createRule("Wybierz poziom", {
      htmlTag: "p",
      classes: "main-menu-headers",
    });
    this.gameMenu.createLevel("HARD", 100 * 60, "łatwy");
    this.gameMenu.createLevel("MEDIUM", 1000 * 60 * 2, "średni");
    this.gameMenu.createLevel("EASY", 1000 * 60 * 3, "trudny");
    this.gameMenu.createLevel("CUSTOM", 1000, "CUSTOM", {
      customLevel: true,
      increasingPaceGame: true,
      reverseAlphabet: true,
    });

    this.gameMenu.levels.map((el) => {
      if (el.options.linkButton) {
        this.gameMenu.createButton(
          el.label,
          { name: el.name, time: el.time },
          {
            linkButton: el.options.linkButton,
            pageId: el.name,
          }
        );
        return;
      }
      this.gameMenu.createButton(el.label, { name: el.name, time: el.time });
    });
    this.gameMenu.render();
    this.gameMenu.createPage("custom-page");

    const timer = new Timer(1000000, {
      withMinutes: true,
      interval: true,
    });
    timer.render({
      parent: parent,
    });
    timer.createInterval();
  }
}

window.addEventListener("load", () => {
  new App();
});
