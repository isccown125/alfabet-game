import { NormalHighlightCharacters } from "../GameEffects/NormalHighlightCharacters.js";

export class Hard {
  gameTime = 1000 * 60 * 3;
  name = "hard";
  effects = [new NormalHighlightCharacters()];
  alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "R",
    "S",
    "T",
    "U",
    "W",
    "X",
    "Y",
    "Z",
  ];
  symbols = ["L", "P", "O"];

  constructor() {
    this.effects[0].intervalTime = 800
  }

  setTime(time = this.gameTime) {
    this.gameTime = time;
  }

  setEffects(...effects) {
    effects.forEach((el) => this.effects.push(el));
  }

  setAlphabet(alphabet) { }

  setSymbols(symbols) { }
}
