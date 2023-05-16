import { Component } from "../../components/components.js";
import { NormalHighlightCharacters } from "../../game/game-effects/normal-highlight-characters.js";
import { RandomHighlightCharacters } from "../../game/game-effects/random-highlight-characters.js";
import { ReverseHighlightCharacters } from "../../game/game-effects/reverse-highlight-characters.js";

export class CustomLevelPage {
  page = {
    id: "custom-level",
    htmlElement: undefined,
  };
  level = {
    alphabet: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "R",
      "S",
      "T",
      "U",
      "W",
      "X",
      "Y",
      "Z",
    ],
    symbols: ["L", "P", "O"],
    randomEffects: false,
    fasterRate: false,
    options: {
      highlightOptions: {
        normal: true,
        reverse: false,
        random: false,
        intervalTime: 1000,
      },
    },
    effect: undefined,
    gameTime: 0,
  };
  subscribers = [];
  generalOptionsComponent = undefined;

  highlightSpeed = {
    min: 300,
    max: 3000,
  };

  constructor() {
    this.page.htmlElement = new Component()
      .create("div")
      .setId("custom-level").htmlElement;
    this.innerHtml();
    this.highlightOptions();
    this.generalOptions();
    this.actionsComponent();
    this.addListener("change", this.changeHandler);
    this.getSavedLevel();
    this.initSavedLevel();
  }

  innerHtml() {
    this.page.htmlElement.innerHTML = `
      <p class="custom-level-title">STWÓRZ SWÓJ WŁASNY POZIOM</p>
    `;
  }

  saveLevel() {
    this.getCurrentOptions();
    localStorage.setItem("custom-level", JSON.stringify(this.level));
  }

  getSavedLevel() {
    const savedLevel = localStorage.getItem("custom-level");
    if (savedLevel) {
      this.level = JSON.parse(savedLevel);
    }
  }

  initSavedLevel() {
    const highlightSpeed = this.page.htmlElement.querySelector(
      "input[name='highlight-speed']"
    );
    const randomEffects = this.page.htmlElement.querySelector(
      "input[name='random-effects']"
    );
    const fasterRate = this.page.htmlElement.querySelector(
      "input[name='faster-rate']"
    );
    const gameTime = this.page.htmlElement.querySelector(
      "input[name='game-time']"
    );
    const highlightType = this.page.htmlElement.querySelectorAll(
      "input[name='highlight-type']"
    );

    if (
      this.level.gameTime !== undefined &&
      typeof this.level.gameTime === "number"
    ) {
      gameTime.value = this.convertMsToTime(this.level.gameTime);
    }
    if (typeof this.level.options.highlightOptions.intervalTime === "number") {
      highlightSpeed.value = this.level.options.highlightOptions.intervalTime;
    }
    if (this.level.fasterRate) {
      fasterRate.checked = true;
    }
    if (this.level.randomEffects) {
      randomEffects.checked = this.level.randomEffects;
    }

    highlightType.forEach((el) => {
      if (
        this.level.options.highlightOptions.normal &&
        el.dataset.highlightDirection === "normal"
      ) {
        el.checked = true;
      }
      if (
        this.level.options.highlightOptions.random &&
        el.dataset.highlightDirection === "random"
      ) {
        el.checked = true;
      }
      if (
        this.level.options.highlightOptions.reverse &&
        el.dataset.highlightDirection === "reverse"
      ) {
        el.checked = true;
      }
    });
    this.highlightOptionsValidate();
    this.timeOptionValidate();
  }

  addListener(event, cb) {
    this.page.htmlElement.addEventListener(event, cb.bind(this));
  }

  startGameHandler() {
    this.getCurrentOptions();
    this.subscribers.forEach((el) => el(this.level));
  }

  changeHandler(e) {
    if (e.target.dataset.highlightDirection) {
      this.setEffect(e.target.dataset.highlightDirection);
    }
    this.highlightOptionsValidate();
    this.timeOptionValidate();
    if (e.target.name === "game-time") {
      this.gameTime = this.convertTimeToMs(e.target.value);
    }
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  convertTimeToMs(time) {
    const arr = time.split(":");
    return arr[0] * 60 * 60 * 1000 + arr[1] * 60 * 1000 + arr[2] * 1000;
  }

  convertMsToTime(ms) {
    const hours = Math.floor(ms / 1000 / 60 / 60);
    const minutes = Math.floor(ms / 1000 / 60) % 60;
    const seconds = Math.floor(ms / 1000) % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  timeOptionValidate() {
    const gameTime = this.page.htmlElement.querySelector(
      "input[name='game-time']"
    );
    if (
      this.convertTimeToMs("01:00:00") < this.convertTimeToMs(gameTime.value)
    ) {
      gameTime.value = "01:00:00";
    }
    if (
      this.convertTimeToMs("00:00:01") > this.convertTimeToMs(gameTime.value)
    ) {
      gameTime.value = "00:00:01";
    }
    this.level.gameTime = this.convertTimeToMs(gameTime.value);
  }

  getCurrentOptions() {
    const highlightSpeed = this.page.htmlElement.querySelector(
      "input[name='highlight-speed']"
    );
    const randomEffects = this.page.htmlElement.querySelector(
      "input[name='random-effects']"
    );
    const fasterRate = this.page.htmlElement.querySelector(
      "input[name='faster-rate']"
    );
    const gameTime = this.page.htmlElement.querySelector(
      "input[name='game-time']"
    );
    const highlightType = this.page.htmlElement.querySelectorAll(
      "input[name='highlight-type']"
    );

    highlightType.forEach((el) => {
      if (el.checked) {
        this.setEffect(el.dataset.highlightDirection);
      }
    });

    this.level.gameTime = this.convertTimeToMs(gameTime.value);
    this.level.fasterRate = fasterRate.checked;
    this.level.randomEffects = randomEffects.checked;
    this.level.options.highlightOptions.intervalTime = Number(
      highlightSpeed.value
    );
  }

  highlightOptionsValidate() {
    const highlightSpeed = this.page.htmlElement.querySelector(
      "input[name='highlight-speed']"
    );
    const randomEffects = this.page.htmlElement.querySelector(
      "input[name='random-effects']"
    );
    const fasterRate = this.page.htmlElement.querySelector(
      "input[name='faster-rate']"
    );

    if (
      !this.level.options.highlightOptions.random &&
      !this.level.options.highlightOptions.reverse &&
      !this.level.options.highlightOptions.normal
    ) {
      if (!randomEffects.checked) {
        fasterRate.disabled = true;
        fasterRate.checked = false;
      } else {
        fasterRate.disabled = false;
      }

      randomEffects.disabled = false;

      if (randomEffects.checked) {
        highlightSpeed.disabled = false;
        if (highlightSpeed.value < this.highlightSpeed.min) {
          highlightSpeed.value = this.highlightSpeed.min;
        }
        if (highlightSpeed.value > this.highlightSpeed.max) {
          highlightSpeed.value = this.highlightSpeed.max;
        }
      } else {
        highlightSpeed.disabled = true;
      }
    } else {
      fasterRate.disabled = false;
      randomEffects.disabled = true;
      randomEffects.checked = false;
      highlightSpeed.disabled = false;

      if (highlightSpeed.value < this.highlightSpeed.min) {
        highlightSpeed.value = this.highlightSpeed.min;
      }
      if (highlightSpeed.value > this.highlightSpeed.max) {
        highlightSpeed.value = this.highlightSpeed.max;
      }
    }
    this.level.fasterRate = fasterRate.checked;
    this.level.randomEffects = randomEffects.checked;
    this.level.options.highlightOptions.intervalTime = Number(
      highlightSpeed.value
    );
  }

  highlightOptions() {
    const highlightComponent = new Component()
      .create("div")
      .setClassList("highlight-options-component").htmlElement;
    highlightComponent.innerHTML =
      "<p>Wybierz rodzaj podświetlenia alfabetu</p>";
    const radio = this.createHighLightOption("standardowe", "normal", {
      checked: true,
      tooltipContent: "Alfabet podświetla się od początku.",
    });
    const radio1 = this.createHighLightOption("odwrócone", "reverse", {
      tooltipContent: "Alfabet zaczyna podświetlać od tyłu.",
    });
    const radio2 = this.createHighLightOption("randomowe", "random", {
      tooltipContent: "Alfabet jest podświetlany randomowo.",
    });
    const radio3 = this.createHighLightOption("wyłączone", "off", {
      tooltipContent: "Podświetlenie alfabetu jest wyłączone.",
    });
    highlightComponent.appendChild(radio);
    highlightComponent.appendChild(radio1);
    highlightComponent.appendChild(radio2);
    highlightComponent.appendChild(radio3);
    this.page.htmlElement.appendChild(highlightComponent);
  }

  generalOptions() {
    const generalOptionsComponent = new Component()
      .create("div")
      .setId("general-options").htmlElement;
    this.page.htmlElement.appendChild(generalOptionsComponent);

    const option = this.createNumberOption(
      "highlight-speed",
      "Prędkość podświetlania wyrazów",
      {
        name: "data-highlight-speed",
        value: 1000,
      },
      {
        min: this.highlightSpeed.min,
        max: this.highlightSpeed.max,
        units: "ms",
        defaultValue: 1000,
      }
    );
    const option1 = this.createCheckboxOption(
      "random-effects",
      "Randomowe zdarzenia podczas gry"
    );
    const option2 = this.createCheckboxOption(
      "faster-rate",
      "Przyspieszanie tempa gry"
    );
    const option3 = this.createTimeOption("game-time", "Czas gry", {
      min: "00:00:01",
      max: "01:00:00",
      step: "1",
      defaultValue: "00:01:00",
    });

    generalOptionsComponent.appendChild(option);
    generalOptionsComponent.appendChild(option1);
    generalOptionsComponent.appendChild(option2);
    generalOptionsComponent.appendChild(option3);

    this.generalOptionsComponent = generalOptionsComponent;
  }

  setEffect(name) {
    switch (name) {
      case "normal":
        this.level.options.highlightOptions.normal = true;
        this.level.options.highlightOptions.reverse = false;
        this.level.options.highlightOptions.random = false;
        this.level.effect = new NormalHighlightCharacters();
        break;
      case "random":
        this.level.options.highlightOptions.normal = false;
        this.level.options.highlightOptions.reverse = false;
        this.level.options.highlightOptions.random = true;
        this.level.effect = new RandomHighlightCharacters();
        break;
      case "reverse":
        this.level.options.highlightOptions.normal = false;
        this.level.options.highlightOptions.reverse = true;
        this.level.options.highlightOptions.random = false;
        this.level.effect = new ReverseHighlightCharacters();
        break;
      default:
        this.level.options.highlightOptions.normal = false;
        this.level.options.highlightOptions.reverse = false;
        this.level.options.highlightOptions.random = false;
        this.level.effect = undefined;
    }
  }

  actionsComponent() {
    const actionsComponent = new Component()
      .create("div")
      .setClassList("actions").htmlElement;
    const button = new Component()
      .create("button")
      .setClassList("custom-level-button")
      .setTextContext("Powrót").htmlElement;
    const button1 = new Component()
      .create("button")
      .setClassList("custom-level-button")
      .setTextContext("Zapisz ustawienia").htmlElement;
    const button2 = new Component()
      .create("button")
      .setClassList("custom-level-button")
      .setTextContext("ZACZNIJ GRĘ").htmlElement;

    button2.addEventListener("click", this.startGameHandler.bind(this));
    button.addEventListener("click", this.changePageHandler.bind(this));
    button1.addEventListener("click", this.saveLevel.bind(this));

    actionsComponent.appendChild(button);
    actionsComponent.appendChild(button1);
    actionsComponent.appendChild(button2);

    this.page.htmlElement.appendChild(actionsComponent);
  }

  changePageHandler() {
    this.subscribers.forEach((el) => {
      el("choose-level");
    });
  }

  createHighLightOption(label, name, { tooltipContent = "", checked = false }) {
    const highlightComponent = new Component()
      .create("div")
      .setClassList("radio-group");

    const input = new Component()
      .create("input")
      .setAttributes(
        { name: "type", value: "radio" },
        { name: "name", value: "highlight-type" },
        { name: "data-highlight-direction", value: name }
      );
    if (checked) {
      input.setAttributes({ name: "checked", value: "" });
    }
    const inputLabel = new Component()
      .create("label")
      .setTextContext(label).htmlElement;

    highlightComponent.setChild(
      { htmlElement: inputLabel },
      { htmlElement: input.htmlElement }
    );
    if (tooltipContent.length > 0) {
      const tooltip = new Component()
        .create("span")
        .setClassList("tooltip-icon")
        .setAttributes({
          name: "data-tippy-content",
          value: tooltipContent,
        })
        .setClassList("tooltip-icon").htmlElement;
      const tooltipImg = new Component()
        .create("img")
        .setClassList("tooltip-icon__img")
        .setAttributes({
          name: "src",
          value: "./src/assets/icons/icons8-info.svg",
        })
        .setClassList("tooltip-icon").htmlElement;

      tooltip.append(tooltipImg);
      highlightComponent.setChild({ htmlElement: tooltip });
      tippy(tooltip, {
        allowHTML: false,
        arrow: true,
        placement: "right",
        zIndex: 20,
      });
    }

    return highlightComponent.htmlElement;
  }

  createCheckboxOption(name, label) {
    const checkboxLabel = new Component()
      .create("label")
      .setTextContext(label).htmlElement;

    const checkbox = new Component()
      .create("input")
      .setClassList("input-style")
      .setAttributes(
        { name: "type", value: "checkbox" },
        { name: `name`, value: name }
      ).htmlElement;

    return new Component()
      .create("div")
      .setClassList("group-container")
      .setChild({ htmlElement: checkboxLabel }, { htmlElement: checkbox })
      .htmlElement;
  }

  createTimeOption(
    name,
    label,
    options = {
      min: undefined,
      max: undefined,
      step: undefined,
      defaultValue: "00:01:00",
    }
  ) {
    const { min, max, step, defaultValue } = options;
    const inputLabel = new Component()
      .create("label")
      .setTextContext(label).htmlElement;

    const inputTime = new Component()
      .create("input")
      .setClassList("input-style")
      .setAttributes(
        { name: "type", value: "time" },
        { name: "name", value: name }
      );

    const timeCopmonent = new Component()
      .create("div")
      .setClassList("group-container")
      .setChild(
        { htmlElement: inputLabel },
        { htmlElement: inputTime.htmlElement }
      );

    if (step) {
      inputTime.setAttributes({ name: "step", value: step });
    }
    if (min) {
      inputTime.setAttributes({ name: "min", value: min });
    }
    if (max) {
      inputTime.setAttributes({ name: "max", value: max });
    }

    if (defaultValue) {
      inputTime.htmlElement.value = defaultValue;
    }
    return timeCopmonent.htmlElement;
  }

  createNumberOption(
    name,
    label,
    attr = { name: "", value: 0 },
    options = { min: 0, max: 2000, units: undefined, defaultValue: undefined }
  ) {
    const { min, max, units, defaultValue } = options;
    const inputGroup = new Component()
      .create("div")
      .setClassList("group-container").htmlElement;

    const inputNumber = new Component()
      .create("input")
      .setClassList("input-style")
      .setAttributes(
        { name: "type", value: "number" },
        { name: "name", value: name },
        { name: attr.name, value: attr.value }
      );

    const inputLabel = new Component()
      .create("label")
      .setTextContext(label).htmlElement;

    if (min) {
      inputNumber.setAttributes({ name: "min", value: min });
    }
    if (max) {
      inputNumber.setAttributes({ name: "max", value: max });
    }
    if (defaultValue) {
      inputNumber.htmlElement.value = defaultValue;
    }

    inputGroup.appendChild(inputLabel);
    inputGroup.appendChild(inputNumber.htmlElement);

    if (units) {
      const unitsText = new Component()
        .create("span")
        .setTextContext(units).htmlElement;
      inputGroup.appendChild(unitsText);
    }
    return inputGroup;
  }
}
