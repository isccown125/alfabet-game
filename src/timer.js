import { Component } from "./components.js";

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
    return;
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
    this.timerHtmlElement = new Component()
      .create("div")
      .setClassList("timer").htmlElement;
    if (parent) {
      parent.appendChild(this.timerHtmlElement);
    }
  }

  updateTimerHtmlElement() {
    if (this.remainingMilliseconds <= 1000 * 60) {
      if (this.remainingMilliseconds === 1000 * 60) {
        this.timerHtmlElement.textContent = `60s`;
        return;
      }
      this.timerHtmlElement.textContent = `${
        this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds()
      }s`;
      return;
    }
    this.timerHtmlElement.textContent = `${
      this.getMinutes() < 10 ? `0${this.getMinutes()}` : this.getMinutes()
    }m ${
      this.getSeconds() < 10 ? `0${this.getSeconds()}` : this.getSeconds()
    }s`;
  }

  render() {
    this.createTimerHtmlElement();
    this.updateTimerHtmlElement();
    return this.timerHtmlElement;
  }

  createInterval() {
    this.remainingMilliseconds = this.currentTimeInMilliseconds;
    this.timerId = setInterval(() => {
      if (this.remainingMilliseconds >= 0) {
        this.updateTimerHtmlElement();
        this.remainingMilliseconds -= 1000;
      } else {
        this.stopTimer();
      }
    }, this.options.intervalTime);
  }
}
