export class Custom {
  gameTime = 1000 * 60;
  name = "custom";
  effects = [];
  randomEffects = [];
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
  highlightOptions = {
    normal: false,
    standard: false,
    reverse: false,
    highlightSpeed: 1000,
  };
  accelerationPeace = false;

  setTime(time = this.gameTime) {
    this.gameTime = time;
  }

  setEffects(...effects) {
    effects.forEach((el) => this.effects.push(el));
  }
}
