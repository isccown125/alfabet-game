import { Component } from "../components.js";

export class LevelManager {
  subscribers = [];
  root = undefined;

  constructor(root) {
    this.root =
      root || new Component().create("div").setClassList("actions").htmlElement;
    this.createButtons();
  }

  createButtons() {
    this.root.appendChild(this.createButton("easy", "Łatwy"));
    this.root.appendChild(this.createButton("medium", "Średni"));
    this.root.appendChild(this.createButton("hard", "Trudny"));
    this.root.appendChild(this.createButton("custom", "Niestandardowy"));
  }

  getRoot() {
    return this.root;
  }

  createButton(name, label) {
    const button = new Component()
      .create("button")
      .setClassList("level-button")
      .setAttributes({ name: "data-level", value: name })
      .setTextContext(label).htmlElement;
    button.addEventListener("click", () => {
      this.subscribers.forEach((s) => {
        s(name);
      });
    });
    return button;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
