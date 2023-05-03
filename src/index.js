import { gameState } from "./game-state/game-state.js";
import { keyBinder } from "./key-binder/key-binder.js";

window.addEventListener("load", () => {
  gameState.initialize();
  keyBinder.init();
});

