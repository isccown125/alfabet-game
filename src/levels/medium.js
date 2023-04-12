import { NormalHighlightCharacters } from "../GameEffects/NormalHighlightCharacters.js";
import { points } from "../GameStats/Points.js";

export class Medium {
  gameTime = 1000 * 60 * 2;
  name = "medium";
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
    this.effects[0].intervalTime = 1200;
    points.incraseMultipler("medium", 1);
  }

  setTime(time = this.gameTime) {
    this.gameTime = time;
  }

  setEffects(...effects) {
    effects.forEach((el) => this.effects.push(el));
  }

  setAlphabet(alphabet) {}

  setSymbols(symbols) {}
}
