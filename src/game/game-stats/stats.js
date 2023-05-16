import { Component } from "../../components/components.js";

export class Statistics {
  stats = [];

  addStatOption(id, label, value) {
    if (label.length <= 0) {
      throw new Error(
        "Label must be type of string and length must be longer than 1"
      );
    }
    if (isNaN(value)) {
      this.stats.push({ label, value: undefined });
      return;
    }
    this.stats.push({ label, value: value });
  }

  remove(id) {
    this.stats.forEach((el, index) => {
      if (el.id === id) this.stats.splice(index, 1);
    });
  }

  getHtmlElement() {
    const statsComponent = new Component()
      .create("div")
      .setClassList("statistics").htmlElement;

    this.stats.forEach((el) => {
      const div = new Component()
        .create("div")
        .setClassList("statistics-group").htmlElement;
      const label = new Component().create("span").htmlElement;
      const value = new Component().create("span").htmlElement;

      label.textContent = el.label;
      value.textContent = el.value;

      div.appendChild(label);
      div.appendChild(value);

      statsComponent.appendChild(div);
    });
    return statsComponent;
  }
}
