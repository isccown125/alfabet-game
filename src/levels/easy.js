import { NormalHighlightCharacters } from "../GameEffects/NormalHighlightCharacters.js";

export class Easy {
  gameTime = 1000 * 60;
  name = "easy";
  createdCharacters = [];
  effect = new NormalHighlightCharacters();
  pointsMultipler = 0;
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
    this.effect.intervalTime = 1500
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

}
