import { NormalHighlightCharacters } from "../game/game-effects/normal-highlight-characters.js";

export class Easy {
  gameTime = 1000 * 60 * 2;
  name = "easy";
  difficulty = 1;
  createdCharacters = [];
  effect = new NormalHighlightCharacters();
  pointsMultiplier = 1;
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
    this.effect.intervalTime = 900;
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
