import { Component } from "./components/components.js";

export class Timer {
  timerId = undefined;
  timerHtmlElement = undefined;
  currentTimeInMilliseconds = 0;
  remainingMilliseconds = 0;
  options = {
    reverse: false,
    interval: false,
    intervalTime: 1000,
    parent: undefined,
  };
  elementForUpdate = undefined;

  constructor(
    time,
    options = {
      reverse: false,
      intervalTime: 1000,
      parent: undefined,
    }
  ) {
    if (!time) {
      throw new Error("Cannot create timer without time");
    }
    this.options = { ...this.options, ...options };
    this.currentTimeInMilliseconds = time;
    this.remainingMilliseconds = time;
  }

  getSeconds() {
    return ((this.remainingMilliseconds / 1000) % 60).toFixed(0);
  }

  getMinutes() {
    return Math.floor(this.remainingMilliseconds / 1000 / 60);
  }

  updateTimer() {
    this.currentTimeInMilliseconds = this.remainingMilliseconds;
    this.clearTimer();
    this.createInterval();
  }

  stopTimer() {
    this.clearTimer();
    this.currentTimeInMilliseconds = this.remainingMilliseconds;
  }

  startTimer() {
    this.createInterval();
  }

  clearTimer() {
    clearInterval(this.timerId);
    this.timerId = undefined;
  }

  createTimerHtmlElement() {
    const { parent } = this.options;
    this.elementForUpdate = new Component().create("span").htmlElement;
    this.timerHtmlElement = new Component()
      .create("div")
      .setClassList("timer").htmlElement;
    this.timerHtmlElement.appendChild(this.elementForUpdate);
    if (parent) {
      parent.appendChild(this.timerHtmlElement);
    }
  }

  updateTimerHtmlElement() {
    if (this.remainingMilliseconds <= 1000 * 60) {
      if (this.remainingMilliseconds === 1000 * 60) {
        this.elementForUpdate.textContent = `60s`;
        return;
      }
      this.elementForUpdate.textContent = `${
        this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds()
      }s`;
      return;
    }
    this.elementForUpdate.textContent = `${
      this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes()
    }m${this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds()}s`;
  }

  render(elementForRender) {
    this.createTimerHtmlElement();
    this.updateTimerHtmlElement();
    elementForRender.append(this.timerHtmlElement);
  }

  createInterval() {
    this.remainingMilliseconds = this.currentTimeInMilliseconds;
    this.timerId = setInterval(() => {
      if (this.remainingMilliseconds > 0) {
        this.remainingMilliseconds -= 1000;
        this.updateTimerHtmlElement();
      } else {
        this.stopTimer();
      }
    }, 1000);
  }
}
