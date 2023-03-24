import { Board } from "./Board/board.js";
import { Timer } from "./timer.js";
import { CreateGameSymbols } from "./Board/CreateGameSymbols.js";
import { NormalHighlightCharacters } from "./GameEffects/NormalHighlightCharacters.js";
import { RandomHighlightCharacters } from "./GameEffects/RandomHighlightCharacters.js";
import { ReverseHighlightCharacters } from "./GameEffects/ReverseHighlightCharacters.js";
import { random } from "./utils.js";
import { showModal } from "./modal.js";
import { GameMenu } from "./game-menu.js";

export class AlphabetGame extends Board {
  timer = undefined;
  timerHtmlElement = undefined;
  currentLevel = undefined;
  lastGameEffect = undefined
  currentGameEffect = undefined
  randomEffectTime = {
    min: 1000 * 24,
    max: 1000 * 30,
  }
  fasterRateTime = {
    value: 100,
    minIntevalTime: 300,
    howManySecondsChange: 24000
  }

  effectStarted = false;
  timers = [];

  constructor(level) {
    super();
    this.currentLevel = level;
  }

  startEffects() {
    this.currentLevel.effects.forEach((el) => {
      if (Object.hasOwn(this.currentLevel, "options")) {
        el.intervalTime =
          this.currentLevel.options.highlightOptions.intervalTime;
      }
      el.start();
    });
  }

  stopEffects() {
    this.currentLevel.effects.forEach((el) => {
      el.stop();
    });
  }

  randomEffects() {
    this.currentLevel.effects = [
      new NormalHighlightCharacters(),
      new RandomHighlightCharacters(),
      new ReverseHighlightCharacters(),
    ];

    this.currentLevel.effects.forEach((el) => {
      el.setCharacters(this.createdSymbols);
      el.intervalTime = this.currentLevel.options.highlightOptions.intervalTime
    });

    let randomDurationEffectTime = random((this.randomEffectTime.min), (this.randomEffectTime.max));
    let randomEffectIndex = random(0, this.currentLevel.effects.length - 1);

    this.currentGameEffect = this.currentLevel.effects[randomEffectIndex];

    if (!this.lastGameEffect) this.lastGameEffect = this.currentGameEffect;

    let effectTimeout = undefined

    const randomEffectTimer = setInterval(() => {
      if (!this.effectStarted) {
        this.effectStarted = true
        this.currentGameEffect.start();
        effectTimeout = setTimeout(() => {
          this.stopEffects();
          this.effectStarted = false
          randomEffectIndex = random(0, this.currentLevel.effects.length - 1);
          randomDurationEffectTime = random((this.randomEffectTime.min), (this.randomEffectTime.max));

          if (!this.lastGameEffect) {
            this.currentGameEffect = this.currentLevel.effects[randomEffectIndex];
          }

          if (this.lastGameEffect.effectName === this.currentGameEffect.effectName) {
            this.lastGameEffectIndex = this.currentGameEffect
            while (this.lastGameEffect.effectName === this.currentGameEffect.effectName) {
              randomEffectIndex = random(0, this.currentLevel.effects.length - 1);
              this.currentGameEffect = this.currentLevel.effects[randomEffectIndex];
            }
          } else {
            this.lastGameEffect = this.currentGameEffect
            this.currentGameEffect = this.currentLevel.effects[randomEffectIndex];
          }
        }, randomDurationEffectTime)
      }
      this.timers.push({ type: 'timeout', id: effectTimeout })
    }, 500);
    this.timers.push({ type: 'interval', id: randomEffectTimer })
  }

  fasterRateEffect() {
    const fasterRateTimer = setInterval(() => {

      this.currentLevel.effects.forEach((el) => {
        if (this.fasterRateTime.minIntevalTime === el.intervalTime) {
          clearInterval(fasterRateTimer)
          console.log('clear faster rate interval')
        }
        if (el.intervalTime > this.fasterRateTime.minIntevalTime) {
          el.intervalTime -= this.fasterRateTime.value;
        } else {
          el.intervalTime = this.fasterRateTime.minIntevalTime;
        }

      })
      this.currentGameEffect.update();
      console.log(this.currentGameEffect)
    }, this.fasterRateTime.howManySecondsChange)
    this.timers.push({ type: 'interval', id: fasterRateTimer })
  }


  clearTimers() {
    this.timers.forEach((el) => {
      if (el.type === "interval") {
        clearInterval(el.id);
        return;
      }
      if (el.type === "timeout") {
        clearTimeout(el.id);
      }
    });
  }

  updateStateGame() {
    this.createTimer(this.currentLevel.gameTime);
    if (this.currentLevel.effects && !this.currentLevel.randomEffects) {
      if (this.currentLevel.options.highlightOptions.intervalTime < 1000) {
        setTimeout(() => {
          this.stopEffects();
          this.startEffects();
        }, 1000)
      } else {
        this.startEffects();
      }
    }

    if (this.currentLevel.randomEffects) this.randomEffects();
    if (this.currentLevel.fasterRate) { }
    this.timers.push({ type: "timeout", id: gameTimer });
  }

  startGame() {
    this.createTimer(this.currentLevel.gameTime);

    this.renderGame();

    this.timer.startTimer();

    if (this.currentLevel.effects && !this.currentLevel.randomEffects) {
      this.startEffects();
    }

    if (this.currentLevel.randomEffects) {
      this.randomEffects();
    }
    if (this.currentLevel.fasterRate === true) {
      this.fasterRateEffect();
    }
    GameMenu.hideMenu();
    const gameTimer = setTimeout(() => {
      if (this.currentLevel.effects) {
        this.stopEffects();
      }
      this.finishGame();
      showModal(
        "Koniec Gry!",
        "<p>Koniecznie pochwal się na naszym discordzie jak ci poszło!<br>Jeśli masz jakieś uwagi do gry skontaktuj się z nami.</p>"
      );
    }, this.currentLevel.gameTime);

    this.cancelGameButton.addEventListener("click", () => {
      if (this.currentLevel.effects) {
        this.stopEffects();
      }
      this.clearTimers();
      this.finishGame();
    });

    this.timers.push({ type: "timeout", id: gameTimer });
  }

  finishGame() {
    this.boardHtmlElement.remove();
    this.clearTimers();
    this.timer.clearTimer();
    GameMenu.showMenu();
    this.currentLevel = undefined;
    this.currentGameEffect = undefined;
    this.lastGameEffect = undefined
  }

  createTimer(time) {
    this.timer = new Timer(time, {
      parent: this.boardHeaderHtmlElement,
    });
    this.timerHtmlElement = this.timer.render();
  }

  createCharacters() {
    this.setAlphabet(this.currentLevel.alphabet);
    this.setSymbols(this.currentLevel.symbols);
    this.createdSymbols = new CreateGameSymbols(this.alphabet, this.symbols);
  }

  renderGame() {
    this.renderBoard();
    this.boardHeaderHtmlElement.appendChild(this.timerHtmlElement);
  }
}
