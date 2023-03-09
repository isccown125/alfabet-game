import { Component } from "./components.js";

export class Timer {
  timerId = undefined;
  timerHtmlElement = undefined;
  time = 0;
  currentTime = 0;
  options = {
    interval: false,
    intervalTime: 1000,
    withMinutes: false,
    reversIntervalTimer: false,
  };

  constructor(
    time,
    options = {
      withMinutes: false,
      intervalTime: 1000,
      interval: false,
      reversIntervalTimer: false,
    }
  ) {
    this.options.withMinutes = options.withMinutes;
    this.time = time;
  }

  createHtmlElement(time, className = "") {
    if (className) {
      this.timerHtmlElement = new Component()
        .create("div")
        .setClassList(className).htmlElement;
    } else {
      this.timerHtmlElement = new Component().create("div").htmlElement;
    }
  }

  createInterval() {
    const { reversIntervalTimer, withMinutes, intervalTime } = this.options;

    if (this.timerId) {
      throw new Error("Cannot set two timers!");
    }
    this.currentTime = this.time;
    let seconds = Math.round((this.currentTime / 60) % 60);
    console.log(seconds);
    this.timerId = setInterval(() => {
      console.log(this.currentTime, this.time);
      if (reversIntervalTimer) {
        this.currentTime += intervalTime;
      } else {
        this.currentTime -= intervalTime;
      }

      if (withMinutes) {
        if (seconds === 0) {
          seconds = 60;
        }
        seconds--;
        if (this.currentTime < 1000 * 60) {
          this.timerHtmlElement.textContent = `${this.getSeconds(
            this.currentTime
          )}`;
          return;
        }
        this.timerHtmlElement.textContent = `${this.getMinutes().toFixed(
          0
        )}m${seconds}s`;
        return;
      }

      this.timerHtmlElement.textContent = `${this.getSeconds(
        this.currentTime
      )}`;
      if (this.currentTime <= 0) {
        clearInterval(this.timerId);
        this.timerHtmlElement.textContent = "00";
      }
    }, this.options.intervalTime);
  }

  getSeconds() {
    return this.currentTime / 1000;
  }

  getMinutes() {
    return this.currentTime / (1000 * 60);
  }

  render(options = { parent: undefined, className: "" }) {
    const { parent, className } = options;

    this.createHtmlElement(this.time, className);

    if (this.options.withMinutes) {
      this.timerHtmlElement.textContent = "00-00";
    } else {
      this.timerHtmlElement.textContent = "00s";
    }

    if (parent) {
      parent.append(this.timerHtmlElement);
      return;
    }
    return this.timerHtmlElement;
  }
}
