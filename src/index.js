import { gameState } from "./game/game-state/game-state.js";

window.addEventListener("load", async () => {
  await gameState.initialize();
});
