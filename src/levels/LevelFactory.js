import { Easy } from "./easy.js";
import { Medium } from "./medium.js";
import { Hard } from "./hard.js";
import { Custom } from "./custom.js";

export class LevelFactory {
  constructor() {
    this.easy = new Easy();
    this.medium = new Medium();
    this.hard = new Hard();
    this.custom = new Custom();
  }

  getLevel(level) {
    switch (level) {
      case "easy":
        return this.easy;
      case "medium":
        return this.medium;
      case "hard":
        return this.hard;
      case "custom":
        return this.custom;
    }
  }
}
