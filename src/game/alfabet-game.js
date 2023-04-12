import { Board } from "../Board/board.js";
import { Timer } from "../timer.js";
import { CreateGameSymbols } from "../Board/CreateGameSymbols.js";
import { NormalHighlightCharacters } from "../GameEffects/NormalHighlightCharacters.js";
import { RandomHighlightCharacters } from "../GameEffects/RandomHighlightCharacters.js";
import { ReverseHighlightCharacters } from "../GameEffects/ReverseHighlightCharacters.js";
import { random } from "../utils.js";
import { backdrop, showModal } from "../modal.js";
import { GameMenu } from "../game-menu.js";
import { Component } from "../components.js";
import { points } from "../GameStats/Points.js";
import { Statistics } from "../GameStats/Stats.js";
import { Tips } from "../GameStats/tips.js";

export class AlphabetGame extends Board {
  timer = undefined;
  timerHtmlElement = undefined;
  currentLevel = undefined;
  lastGameEffect = undefined;
  currentGameEffect = undefined;
  randomEffectTime = {
    min: 1000 * 24,
    max: 1000 * 30,
  };
  fasterRateTime = {
    value: 100,
    minIntevalTime: 300,
    howManySecondsChange: 24000,
  };
  initialTimerTime = 3000;

  effectStarted = false;
  timers = [];

  constructor(level) {
    super();
    this.currentLevel = level;
  }

  startEffects() {
    this.currentGameEffect = this.currentLevel.effects[0];
    if (this.currentGameEffect !== undefined) {
      this.currentGameEffect.start();
    }
  }

  stopEffects() {
    this.currentGameEffect = this.currentLevel.effects[0];
    if (this.currentGameEffect !== undefined) {
      this.currentGameEffect.stop();
    }
  }

  initialTimer() {
    const timer = new Timer(this.initialTimerTime, { parent: document.body });
    const label = new Component()
      .create("span")
      .setTextContext("Przygotuj się...")
      .setClassList("timer-label").htmlElement;

    timer.render();
    timer.timerHtmlElement.classList.add("initialTimer");
    timer.timerHtmlElement.prepend(label);
    const backdropELement = backdrop();
    document.body.prepend(backdropELement);
    timer.startTimer();
    setTimeout(() => {
      timer.clearTimer();
      timer.timerHtmlElement.remove();
      backdropELement.remove();
    }, this.initialTimerTime + 20);
  }

  randomEffects() {
    points.addPoints("normal-highlight", 1);
    this.currentLevel.effects = [
      new NormalHighlightCharacters(),
      new RandomHighlightCharacters(),
      new ReverseHighlightCharacters(),
    ];

    this.currentLevel.effects.forEach((el) => {
      el.setCharacters(this.createdSymbols);
      el.intervalTime = this.currentLevel.options.highlightOptions.intervalTime;
    });

    let randomDurationEffectTime = random(
      this.randomEffectTime.min,
      this.randomEffectTime.max
    );
    let randomEffectIndex = random(0, this.currentLevel.effects.length - 1);

    this.currentGameEffect = this.currentLevel.effects[randomEffectIndex];

    if (!this.lastGameEffect) this.lastGameEffect = this.currentGameEffect;

    let effectTimeout = undefined;

    const randomEffectTimer = setInterval(() => {
      if (!this.effectStarted) {
        this.effectStarted = true;
        this.currentGameEffect.start();
        effectTimeout = setTimeout(() => {
          this.stopEffects();
          this.effectStarted = false;
          randomEffectIndex = random(0, this.currentLevel.effects.length - 1);
          randomDurationEffectTime = random(
            this.randomEffectTime.min,
            this.randomEffectTime.max
          );

          if (!this.lastGameEffect) {
            this.currentGameEffect =
              this.currentLevel.effects[randomEffectIndex];
          }

          if (
            this.lastGameEffect.effectName === this.currentGameEffect.effectName
          ) {
            this.lastGameEffectIndex = this.currentGameEffect;
            while (
              this.lastGameEffect.effectName ===
              this.currentGameEffect.effectName
            ) {
              randomEffectIndex = random(
                0,
                this.currentLevel.effects.length - 1
              );
              this.currentGameEffect =
                this.currentLevel.effects[randomEffectIndex];
            }
          } else {
            this.lastGameEffect = this.currentGameEffect;
            this.currentGameEffect =
              this.currentLevel.effects[randomEffectIndex];
          }
        }, randomDurationEffectTime);
      }
      this.timers.push({ type: "timeout", id: effectTimeout });
    }, 500);
    this.timers.push({ type: "interval", id: randomEffectTimer });
  }

  fasterRateEffect() {
    const fasterRateTimer = setInterval(() => {
      this.currentLevel.effects.forEach((el) => {
        if (this.fasterRateTime.minIntevalTime === el.intervalTime) {
          clearInterval(fasterRateTimer);
        }
        if (el.intervalTime > this.fasterRateTime.minIntevalTime) {
          el.intervalTime -= this.fasterRateTime.value;
        } else {
          el.intervalTime = this.fasterRateTime.minIntevalTime;
        }
      });
      this.currentGameEffect.update();
    }, this.fasterRateTime.howManySecondsChange);
    this.timers.push({ type: "interval", id: fasterRateTimer });
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

  startGame() {
    const stats = new Statistics();

    this.createTimer(this.currentLevel.gameTime);

    this.renderGame();

    this.initialTimer();

    GameMenu.hideMenu();
    setTimeout(() => {
      this.timer.startTimer();
      this.gameAnswers.addListener((e) => {
        if (e.target.dataset.answer) {
          this.gameAnswers.setUserAnswear(e.target.dataset.answer);
          console.log(
            "Punkty: " + points.currentPoints,
            `correct answers:${points.correctAnswers}`,
            `incorrect answers:${points.incorrectAnswers}`
          );
          this.currentGameEffect.next();
        }
      });

      if (this.currentLevel.effects && !this.currentLevel.randomEffects) {
        this.startEffects();
      }

      if (this.currentLevel.randomEffects) {
        this.randomEffects();
      }
      if (this.currentLevel.fasterRate === true) {
        this.fasterRateEffect();
      }
      if (this.currentLevel.effects !== undefined) {
        this.currentLevel.effects.forEach((el) => {
          el.subscribe((currentEl) => {
            console.log(
              "Punkty: " + points.currentPoints,
              `correct answers:${points.correctAnswers}`,
              `incorrect answers:${points.incorrectAnswers}`
            );
            this.gameAnswers.setCorrentAnswear(currentEl.values.symbol);
            this.gameAnswers.checkAnswer()
              ? points.addPoints()
              : points.substractPoints();
          });
        });
      }

      const gameTimer = setTimeout(() => {
        if (this.currentLevel !== undefined) {
          this.stopEffects();
        }
        this.finishGame();
        stats.addStatOption(
          "bad-answers",
          "Złe odpowiedzi: ",
          points.incorrectAnswers
        );
        stats.addStatOption(
          "good-answers",
          "Dobre odpowiedzi: ",
          points.correctAnswers
        );
        stats.addStatOption("points", "Punkty: ", points.currentPoints);
        stats.addStatOption(
          "multipler",
          "Mnożnik punktów: ",
          points.multiplerPoints
        );
        const tip = new Tips(points.currentPoints);
        points.clear();
        showModal("Koniec Gry!", (content) => {
          content.innerHTML +=
            "<p>Koniecznie pochwal się na naszym discordzie jak ci poszło!<br>Jeśli masz jakieś uwagi do gry skontaktuj się z nami.</p>";

          content.innerHTML += "Statystyki:";
          content.appendChild(stats.getHtmlElement());
          content.innerHTML += `<p>${tip.getCurrentTip()}</p>`;
        });

        this.timers.push({ type: "timeout", id: gameTimer });
      }, this.currentLevel.gameTime);
    }, this.initialTimerTime);

    this.cancelGameButton.addEventListener("click", () => {
      if (this.currentLevel.effects) {
        this.stopEffects();
      }
      points.clear();
      this.clearTimers();
      this.finishGame();
    });
  }

  finishGame() {
    this.boardHtmlElement.remove();
    this.clearTimers();
    this.timer.clearTimer();
    GameMenu.showMenu();
    this.currentLevel = undefined;
    this.currentGameEffect = undefined;
    this.lastGameEffect = undefined;
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
