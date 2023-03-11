import { Component } from "../components.js";

export const customizeLevelPage = () => {
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
    .setChild({ htmlElement: randomHighlightOption }).htmlElement;

  const reversLabel = new Component()
    .create("label")
    .setTextContext("odwrócone")
    .setChild({ htmlElement: reversHighlightOption }).htmlElement;

  const normalLabel = new Component()
    .create("label")
    .setTextContext("standardowe")
    .setChild({ htmlElement: normalHighlightOption }).htmlElement;

  const radioGroup = new Component()
    .create("div")
    .setClassList("radio-group")
    .setChild(
      { htmlElement: randomLabel },
      { htmlElement: reversLabel },
      { htmlElement: normalLabel }
    ).htmlElement;

  const customLevel = new Component()
    .create("div")
    .setChild({ htmlElement: radioGroup })
    .setId("custom-level").htmlElement;

  return { id: "custom-level", htmlElement: customLevel };
};
