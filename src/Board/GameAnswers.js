import { Component } from "../components.js";

export class GameAnswers {
  corretAnswear = undefined;
  userAnswear = undefined;
  answers = ["L", "P", "O"];
  timeForAnswear = 1000;
  actionComponent = undefined;

  createAnswerButton(label, id) {
    return new Component()
      .create("button")
      .setClassList("level-button")
      .setTextContext(label)
      .setAttributes({
        name: "data-answer",
        value: id,
      }).htmlElement;
  }

  checkAnswer() {
    console.log(
      "Answear",
      "correct " + this.corretAnswear,
      "incorr: " + this.userAnswear
    );
    if (!this.corretAnswear || !this.userAnswear) {
      return false;
    }
    this.answers.forEach((el) => {
      if (this.corretAnswear !== el) return false;
      if (this.userAnswear !== el) return false;
    });
    if (this.userAnswear === this.corretAnswear) {
      this.corretAnswear = undefined;
      this.userAnswear = undefined;
      return true;
    }
    this.corretAnswear = undefined;
    this.userAnswear = undefined;
    return false;
  }

  createActionsComponent() {
    this.actionComponent = new Component()
      .create("div")
      .setId("choose-answer").htmlElement;
    const button = this.createAnswerButton("lewa ręka", "L");
    const button1 = this.createAnswerButton("obie ręce", "O");
    const button2 = this.createAnswerButton("prawa ręka", "P");
    this.actionComponent.append(button);
    this.actionComponent.append(button1);
    this.actionComponent.append(button2);
    this.actionComponent.addEventListener("click", () => {});
    return this.actionComponent;
  }

  setCorrentAnswear(answer) {
    if (typeof answer !== "string") {
      this.corretAnswear = undefined;
    }
    this.corretAnswear = answer;
  }

  setUserAnswear(answer) {
    if (typeof answer !== "string") {
      this.corretAnswear = undefined;
    }
    this.userAnswear = answer;
  }

  addListener(cb) {
    this.actionComponent.addEventListener("click", cb.bind(this));
  }

  render(parent) {
    if (parent !== undefined) {
      parent.appendChild(this.createActionsComponent());
    }
  }
}
