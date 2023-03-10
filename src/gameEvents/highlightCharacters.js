import { State } from "../state.js";

class HighlightCharacters extends State {
  timerId = undefined;
  characters = [];
  game = {};

  constructor(game) {
    super("HIGHLIGHT");
    this.game = game;
  }

  start() {
    setInterval();
  }
}
