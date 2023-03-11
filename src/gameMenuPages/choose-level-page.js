import { Component } from "../components.js";

export const chooseLevelPage = () => {
  const gameTitle = new Component()
    .create("p")
    .setId("game-title")
    .setTextContext("ALphabetGame").htmlElement;

  const gameRule1 = new Component()
    .create("p")
    .setClassList("text-style", "font-bold")
    .setTextContext(
      "Alfabet Game to gra podnosząca koncentrację dzięki której możesz wejść w stan flow."
    ).htmlElement;

  const ruleHeader = new Component()
    .create("p")
    .setClassList("main-menu-headers")
    .setTextContext("Zasady gry").htmlElement;

  const gameRule2 = new Component()
    .create("p")
    .setClassList("text-style")
    .setTextContext(
      "Twoim zadaniem jest czytać kolejne litery Alfabetu (najlepiej na głos) i jednocześnie podnosić ręce do góry w zależności od symbolu."
    ).htmlElement;

  const gameRule3 = new Component()
    .create("p")
    .setClassList("text-style")
    .setTextContext(
      "Pamiętaj, że w tym ćwiczeniu nie chodzi o poprawność i perfekcjonizm \n" +
        "a o prędkość i to jak szybko potrafisz wrócić do gry w momencie gdy stracisz rytm."
    ).htmlElement;

  const gameRule4 = new Component()
    .create("p")
    .setClassList("text-style")
    .setTextContext(
      "Postaraj się przejść jak najwięcej razy cały alfabet w czasie który pokazuje zegar."
    ).htmlElement;

  const listHead = new Component()
    .create("p")
    .setClassList("list-head")
    .setTextContext("Oznaczenia").htmlElement;

  const listElement = new Component()
    .create("li")
    .setTextContext(
      "L - gdy widzisz ten symbol podnosisz do góry lewą ręke."
    ).htmlElement;

  const listElement1 = new Component()
    .create("li")
    .setTextContext(
      "P - gdy widzisz ten symbol podnosisz do góry prawą ręke."
    ).htmlElement;

  const listElement2 = new Component()
    .create("li")
    .setTextContext(
      "O - gdy widzisz ten symbol podnosisz do góry obie ręce."
    ).htmlElement;

  const list = new Component()
    .create("ul")
    .setClassList("list")
    .setChild(
      { htmlElement: listHead },
      { htmlElement: listElement },
      { htmlElement: listElement1 },
      { htmlElement: listElement2 }
    ).htmlElement;

  const gameRuleContainer = new Component()
    .create("div")
    .setId("rules")
    .setChild(
      { htmlElement: gameRule1 },
      { htmlElement: ruleHeader },
      { htmlElement: gameRule2 },
      { htmlElement: gameRule3 },
      { htmlElement: gameRule4 },
      { htmlElement: list }
    ).htmlElement;
  const levelHeader = new Component()
    .create("main-menu-headers")
    .setClassList("main-menu-headers")
    .setTextContext("Wybierz poziom").htmlElement;

  const levelButton = new Component()
    .create("button")
    .setClassList("level-button")
    .setAttributes({
      name: "data-level",
      value: "EASY_LEVEL",
    })
    .setTextContext("ŁATWY").htmlElement;
  const levelButton1 = new Component()
    .create("button")
    .setClassList("level-button")
    .setAttributes({
      name: "data-level",
      value: "MEDIUM_LEVEL",
    })
    .setTextContext("ŚREDNI").htmlElement;
  const levelButton2 = new Component()
    .create("button")
    .setClassList("level-button")
    .setAttributes({
      name: "data-level",
      value: "HARD_LEVEL",
    })
    .setTextContext("TRUDNY").htmlElement;
  const levelButton3 = new Component()
    .create("button")
    .setClassList("level-button")
    .setAttributes({
      name: "data-level",
      value: "CUSTOM_LEVEL",
    })
    .setTextContext("NIESTANDARDOWY").htmlElement;

  const actions = new Component()
    .create("div")
    .setChild(
      { htmlElement: levelButton },
      { htmlElement: levelButton1 },
      { htmlElement: levelButton2 }
      // { htmlElement: levelButton3 }
    )
    .setId("actions").htmlElement;

  const chooseLevelPage = new Component()
    .create("div")
    .setId("choose-level")
    .setChild(
      { htmlElement: gameTitle },
      { htmlElement: gameRuleContainer },
      { htmlElement: levelHeader },
      { htmlElement: actions }
    ).htmlElement;

  return { id: "choose-level", htmlElement: chooseLevelPage };
};
