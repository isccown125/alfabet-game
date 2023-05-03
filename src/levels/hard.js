import { NormalHighlightCharacters } from "../game-effects/normal-highlight-characters.js";

export class Hard {
  gameTime = 1000 * 60 * 3;
  name = "hard";
  effect = new NormalHighlightCharacters();
  pointsMultipler = 3;
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
    this.effect.intervalTime = 800;
  }

  setTime(time = this.gameTime) {
    this.gameTime = time;
  }

  setEffects(...effects) {
    effects.forEach((el) => this.effects.push(el));
  }
}
