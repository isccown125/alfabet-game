export class Custom {
  gameTime = 1000 * 60;
  name = "custom";
  effects = [];
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
  symbols = ["L", "P", "saddas"];

  setTime(time = this.gameTime) {
    this.gameTime = time;
  }

  setEffects(...effects) {
    effects.forEach((el) => this.effects.push(el));
  }

  setAlphabet(alphabet) {
    this.alphabet = alphabet.split("");
  }

  setSymbols(symbols) {
    this.symbols = symbols.split("");
  }
}
