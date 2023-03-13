import { Component } from "../components.js";

export const customizeLevelPage = () => {
  const title = new Component()
    .create("p")
    .setTextContext("Dostosuj poziom do siebie :)")
    .setClassList("main-menu-headers").htmlElement;

  const randomHighlightOption = new Component().create("input").setAttributes({
    name: "type",
    value: "radio",
  }).htmlElement;
  const reversHighlightOption = new Component()
    .create("input")
    .setAttributes({
      name: "type",
      value: "radio",
    })
    .setChild().htmlElement;
  const normalHighlightOption = new Component().create("input").setAttributes({
    name: "type",
    value: "radio",
  }).htmlElement;

  const randomLabel = new Component()
    .create("label")
    .setTextContext("randomowe")
    .setChild().htmlElement;

  const reversLabel = new Component()
    .create("label")
    .setTextContext("odwrócone")
    .setChild().htmlElement;

  const normalLabel = new Component()
    .create("label")
    .setTextContext("standardowe")
    .setChild().htmlElement;

  const radioGroup = new Component()
    .create("fieldset")
    .setClassList("radio-group")
    .setChild(
      { htmlElement: randomHighlightOption },
      { htmlElement: randomLabel },
      { htmlElement: reversHighlightOption },
      { htmlElement: reversLabel },
      { htmlElement: normalHighlightOption },
      { htmlElement: normalLabel }
    ).htmlElement;

  const radioHeader = new Component()
    .create("div")
    .setClassList("main-menu-headers")
    .setTextContext("Wybierz podświetlenie wyrazów").htmlElement;

  const inputRange = new Component()
    .create("input")
    .setAttributes(
      { name: "type", value: "range" },
      { name: "min", value: "300" },
      { name: "max", value: "1500" }
    ).htmlElement;

  const inputTextHeader = new Component()
    .create("div")
    .setClassList("main-menu-headers")
    .setTextContext("Wybierz prędkość podświetlania").htmlElement;
  const inputNumber = new Component()
    .create("input")
    .setAttributes(
      { name: "type", value: "number" },
      { name: "min", value: "300" },
      { name: "max", value: "1500" }
    ).htmlElement;
  inputNumber.value = 750;
  inputRange.addEventListener("change", (e) => {
    inputNumber.value = e.target.value;
  });
  inputNumber.addEventListener("change", (e) => {
    if (e.target.value > 1500) e.target.value = 1500;
    if (e.target.value < 300) e.target.value = 300;
    inputRange.value = e.target.value;
  });

  const inputMetrics = new Component()
    .create("span")
    .setTextContext("ms").htmlElement;
  const inputGroup = new Component()
    .create("div")
    .setChild(
      { htmlElement: inputRange },
      { htmlElement: inputNumber },
      { htmlElement: inputMetrics }
    ).htmlElement;

  const customLevel = new Component()
    .create("div")
    .setChild(
      { htmlElement: title },
      { htmlElement: radioHeader },
      { htmlElement: radioGroup },
      { htmlElement: inputTextHeader },
      { htmlElement: inputGroup }
    )
    .setId("custom-level").htmlElement;

  return { id: "custom-level", htmlElement: customLevel };
};
