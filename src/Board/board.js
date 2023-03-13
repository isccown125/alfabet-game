import { Component } from "../components.js";

export class Board {
  boardHtmlElement = undefined;
  boardHeaderHtmlElement = undefined;
  cancelGameButton = undefined;
  gameHtmlElement = document.getElementById("alphabet-game");
  createdSymbols = [];
  alphabet = [];
  symbols = [];

  constructor() {}

  setAlphabet(alphabet) {
    this.alphabet = alphabet;
  }

  setSymbols(symbols) {
    this.symbols = symbols;
  }

  renderBoard() {
    this.boardHtmlElement = document.createElement("div");
    this.boardHeaderHtmlElement = document.createElement("header");
    this.boardHtmlElement.id = "board";
    this.boardHeaderHtmlElement.className = "game-header";
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
    this.boardHeaderHtmlElement.append(this.cancelGameButton);
    this.boardHtmlElement.append(this.boardHeaderHtmlElement);
    this.boardHtmlElement.append(charactersContainer.htmlElement);
    this.gameHtmlElement.append(this.boardHtmlElement);
  }
}
