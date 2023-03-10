import { GameMenu } from "./game-menu.js";

class App {
  gameMenu = new GameMenu();

  constructor() {
    this.gameMenu.createRule(
      "Alfabet Game to gra podnosząca koncentrację dzięki której możesz wejść w stan flow.",
      {
        htmlTag: "p",
        classes: ["text-style", "font-bold"],
      }
    );
    this.gameMenu.createRule("Zasady gry", {
      htmlTag: "p",
      classes: "main-menu-headers",
    });
    this.gameMenu.createRule(
      "Twoim zadaniem jest czytać kolejne litery Alfabetu (najlepiej na głos) i jednocześnie podnosić ręce do góry w zależności od symbolu.",
      {
        htmlTag: "p",
        classes: "text-style",
      }
    );
    this.gameMenu.createRule(
      " Pamiętaj, że w tym ćwiczeniu nie chodzi o poprawność i perfekcjonizm \n" +
        "a o prędkość i to jak szybko potrafisz wrócić do gry w momencie gdy stracisz rytm. ",
      {
        htmlTag: "p",
        classes: "text-style",
      }
    );
    this.gameMenu.createRule(
      "Postaraj się przejść jak najwięcej razy cały alfabet w czasie który pokazuje zegar.",
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
    this.gameMenu.createLevel("HARD", 1000 * 60 * 1.1, "łatwy");
    this.gameMenu.createLevel("MEDIUM", 1000 * 60 * 2, "średni");
    this.gameMenu.createLevel("EASY", 1000 * 60 * 3, "trudny");
    this.gameMenu.levels.map((el) =>
      this.gameMenu.createButton(el.label, { name: el.name, time: el.time })
    );
    this.gameMenu.render();
  }
}

window.addEventListener("load", () => {
  new App();
});
