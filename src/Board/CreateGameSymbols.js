import { random } from "../utils.js";
import { Component } from "../components.js";

export class CreateGameSymbols {
  alphabet = [];
  symbols = [];
  countSymbols = 0;
  maxSymbolRepeition = 2;
  lastSymbol = undefined;
  createdElements = [];

  constructor(alphabet, symbols) {
    this.alphabet = alphabet;
    this.symbols = symbols;
    this.elementsGroup();
    this.groupedAlphabet.forEach((el) => {
      this.createTextGroup(el.character, el.symbol);
    });
    return this.createdElements;
  }

  randomizeSymbols() {
    let randomIndex = random(0, this.symbols.length - 1);

    if (
      this.lastSymbol === this.symbols[randomIndex] &&
      this.countSymbols < this.maxSymbolRepeition
    ) {
      this.countSymbols++;
    }
    if (this.lastSymbol !== this.symbols[randomIndex]) {
      this.lastSymbol = this.symbols[randomIndex];
      this.countSymbols = 0;

      return this.symbols[randomIndex];
    }
    if (this.countSymbols === this.maxSymbolRepeition) {
      while (this.symbols[randomIndex] === this.lastSymbol) {
        randomIndex = random(1, this.symbols.length - 1);
      }
      this.countSymbols = 0;
    }
    return this.symbols[randomIndex];
  }

  elementsGroup() {
    this.groupedAlphabet = this.alphabet.map((el) => {
      return { character: el, symbol: this.randomizeSymbols() };
    });
  }

  createTextGroup(character, symbol) {
    const span = new Component()
      .create("span")
      .setClassList("character")
      .setTextContext(character).htmlElement;
    const span1 = new Component()
      .create("span")
      .setClassList("symbol")
      .setTextContext(symbol).htmlElement;
    const div = new Component()
      .create("div")
      .setClassList("character-group")
      .setChild({ htmlElement: span }, { htmlElement: span1 }).htmlElement;
    this.createdElements.push({ group: div, character: span, symbol: span1, values: { character, symbol } });
    return div;
  }
}
