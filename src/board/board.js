import { Component } from "../components/components.js";
import { CreateGameSymbols } from "./create-game-symbols.js";
import { gameAnswers } from "./game-answers.js";
import { scrollToTop } from "../utils/functions";
import { ScrollController } from "../game/scroll-controller";

export class Board {
  boardHtmlElement = undefined;
  boardHeaderHtmlElement = undefined;
  cancelGameButton = undefined;
  gameHtmlElement = document.getElementById("alphabet-game");
  createdSymbols = [];
  alphabet = [];
  symbols = [];
  gameAnswers = undefined;
  scrollController = undefined;

  constructor(alphabet, symbols) {
    this.alphabet = alphabet;
    this.symbols = symbols;
    this.createdSymbols = new CreateGameSymbols(alphabet, symbols);
  }

  scrollBoard() {}

  resizeBoard(el) {
    if (
      (window.innerHeight < 800 && window.innerWidth < 800) ||
      (window.innerHeight < window.innerWidth && window.innerHeight < 900)
    ) {
      el.style.height = window.innerHeight - 80 - 40 - 50;
    } else {
      el.style.height = "min-content";
    }
    window.addEventListener("resize", () => {
      console.log(window.innerHeight);
      if (
        (window.innerHeight < 800 && window.innerWidth < 800) ||
        (window.innerHeight < window.innerWidth && window.innerHeight < 900)
      ) {
        el.style.height = window.innerHeight - 80 - 40 - 50;
      } else {
        el.style.height = "min-content";
      }
    });
  }

  renderBoard() {
    this.gameAnswers = gameAnswers;
    this.boardHtmlElement = document.createElement("div");
    const boardContent = document.createElement("div");
    this.boardHeaderHtmlElement = document.createElement("header");
    this.boardHtmlElement.id = "board";
    this.boardHeaderHtmlElement.className = "game-header";
    boardContent.classList.add("board-content");
    this.cancelGameButton = new Component()
      .create("button")
      .setClassList("cancel-game-btn")
      .setTextContext("wybierz inny poziom").htmlElement;
    const charactersContainer = new Component()
      .create("div")
      .setClassList("board-container");
    this.createdSymbols.forEach((el) => {
      charactersContainer.setChild({ htmlElement: el.group });
    });
    boardContent.append(charactersContainer.htmlElement);
    this.boardHeaderHtmlElement.append(this.cancelGameButton);
    this.boardHtmlElement.append(this.boardHeaderHtmlElement);
    this.boardHtmlElement.append(boardContent);
    this.gameHtmlElement.append(this.boardHtmlElement);
    this.gameAnswers.render(this.boardHtmlElement);
    this.resizeBoard(boardContent);
    scrollToTop();
    this.scrollController = new ScrollController(boardContent);
    this.scrollController.activate();
  }
}
