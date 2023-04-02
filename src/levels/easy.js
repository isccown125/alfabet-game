import { NormalHighlightCharacters } from "../GameEffects/NormalHighlightCharacters.js";

export class Easy {
  gameTime = 1000 * 60;
  name = "easy";
  createdCharacters = [];
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
    this.effects[0].intervalTime = 1500
  }


  setCreatedCharacters(characters) {
    this.createdCharacters = characters;
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
