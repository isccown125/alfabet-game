import { AlphabetGame } from "./alfabet-game.js";
import { showModal } from "./modal.js";
import { Component } from "./components.js";

export class GameMenu {
  rules = [];
  levelButtons = [];
  levels = [];
  gameMenu = undefined;
  actionsContainer = undefined;
  rulesContainer = undefined;
  timerId = undefined;

  createRule(
    description,
    options = { htmlTag: "p", group: false, parent: undefined, classes: [] }
  ) {
    const { htmlTag, group, parent, classes } = options;
    const rule = new Component().create(htmlTag);

    if (classes && classes.length > 0) {
      if (Array.isArray(classes)) {
        classes.forEach((el) => {
          rule.setClassList(el);
        });
      } else {
        rule.setClassList(classes);
      }
    }
    if (group) {
      if (parent) {
        rule.setTextContext(description);
        parent.append(rule.htmlElement);
        return rule.htmlElement;
      }
      this.rules.push(rule.htmlElement);
      rule.setTextContext(description);
      return rule.htmlElement;
    }
    rule.setTextContext(description);
    this.rules.push(rule.htmlElement);
    return rule.htmlElement;
  }

  createButton(label, gameLevel) {
    const button = new Component()
      .create("button")
      .setClassList("level-button")
      .setTextContext(label)
      .setAttributes({
        name: "data-level",
        value: gameLevel.name,
      }).htmlElement;
    this.levelButtons.push(button);
  }

  hideMenu() {
    this.gameMenu.classList.add("d-none");
  }

  showMenu() {
    this.gameMenu.classList.remove("d-none");
  }

  createLevel(name, time, label) {
    if (typeof name === "string" && typeof time === "number") {
      this.levels.push({ label, name, time });
    } else {
      throw new Error(
        `Name must be type of string and time must be typeof number. Given: name:${typeof name}, time:${typeof time}`
      );
    }
  }

  getLevel(name) {
    if (!name || typeof name !== "string") {
      throw new Error("Cannot start game!");
    }
    return this.levels.find((el) => el.name === name);
  }

  startGameHandler(event) {
    if (event.target.nodeName === "BUTTON") {
      const level = this.getLevel(event.target.dataset.level);
      const game = new AlphabetGame();
      const cancelGame = new Component()
        .create("button")
        .setClassList("cancel-game-btn")
        .setTextContext("Wybierz inny poziom").htmlElement;

      game.startGame(level);
      cancelGame.addEventListener("click", () => {
        game.finishGame();
        cancelGame.remove();
        this.showMenu();
        clearTimeout(this.timerId);
      });
      game.boardHeaderHtmlElement.prepend(cancelGame);
      this.hideMenu();
      this.timerId = setTimeout(() => {
        game.finishGame();
        cancelGame.remove();
        this.showMenu();
        showModal(
          "Runda się zakończyła!",
          "<p>Koniecznie pochwal się jak ci poszło na naszym discordzie.</p>\n<p>Jeśli masz jakieś uwagi do samej gry <br>skontaktuj się z nami!</p>"
        );
      }, level.time);
    }
  }

  render() {
    const game = document.getElementById("alphabet-game");
    const title = new Component()
      .create("p")
      .setId("game-title")
      .setTextContext("Alphabet Game").htmlElement;
    this.rulesContainer = new Component().create("div").setId("rules");
    this.actionsContainer = new Component().create("div").setId("actions");
    this.gameMenu = new Component()
      .create("div")
      .setId("main-menu")
      .setChild(
        { htmlElement: title },
        { htmlElement: this.rulesContainer.htmlElement },
        { htmlElement: this.actionsContainer.htmlElement }
      ).htmlElement;
    this.rules.map((el) => this.rulesContainer.setChild({ htmlElement: el }));
    this.levelButtons.map((el) =>
      this.actionsContainer.setChild({ htmlElement: el })
    );

    this.actionsContainer.htmlElement.addEventListener(
      "click",
      this.startGameHandler.bind(this)
    );
    game.append(this.gameMenu);
  }
}
