export class Points {
  #_points = 0;
  goodAnswers = 0;
  badAnswers = 0;
  multiplier;

  constructor(badAnswers, goodAnswers, multiplier) {
    if (typeof badAnswers !== "number" || badAnswers < 0) {
      throw new Error("BadAnswers must be typeof positive number");
    }
    if (typeof goodAnswers !== "number" || goodAnswers < 0) {
      throw new Error("GoodAnswers must be typeof positive number");
    }
    if (typeof multiplier !== "number" || (multiplier < 0 && multiplier > 5)) {
      throw new Error(
        "Multiplier must be typeof positive number and must be number between 0 and 5"
      );
    }
    this.goodAnswers = goodAnswers;
    this.badAnswers = badAnswers;
    this.multiplier = multiplier;
    this.#calculatePoints();
  }

  #calculatePoints() {
    this.#_points =
      this.goodAnswers * this.multiplier - this.badAnswers * this.multiplier;
    this.#_validatePoints();
  }

  #_validatePoints() {
    if (this.#_points < 0) {
      this.#_points = 0;
    }
  }

  get valueOfPoints() {
    return this.#_points;
  }
}
