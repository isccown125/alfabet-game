import { Component } from "../components.js";
import { points } from "../game-stats/points.js";

export class GameAnswers {
  corretAnswear = undefined;
  userAnswear = undefined;
  answers = ["L", "P", "O"];
  timeForAnswear = 1000;
  actionComponent = undefined;
  leftHand = false;
  rightHand = false;
  twoKeyTimer = false;

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
    if (this.corretAnswear === "O") {
      if (this.userAnswear === "LP" || this.userAnswear === "PL") {
        points.addPoints();
        return "good-answer";
      }
      points.substractPoints();
      return "bad-answer";
    } else {
      if (this.corretAnswear === this.userAnswear) {
        points.addPoints();
        return "good-answer";
      }
    }
    points.substractPoints();
    return "bad-answer";
  }

  createActionsComponent() {
    this.actionComponent = new Component()
      .create("div")
      .setId("choose-answer").htmlElement;
    const button = this.createAnswerButton("lewa ręka", "L");
    const button2 = this.createAnswerButton("prawa ręka", "P");
    this.actionComponent.append(button);
    this.actionComponent.append(button2);
    return this.actionComponent;
  }

  setCorrentAnswear(answer) {
    if (typeof answer !== "string") {
      this.corretAnswear = undefined;
    }

    this.corretAnswear = answer;
  }

  setUserAnswer(answer) {
    if (typeof answer !== "string") {
      this.userAnswear = undefined;
    }
    if (this.corretAnswear === "O") {
      if (answer === "L") {
        this.leftHand = true;
      }
      if (answer === "P") {
        this.rightHand = true;
      }
      if (this.rightHand && this.leftHand) {
        clearTimeout(this.twoKeyTimer);
        this.twoKeyTimer = false;
        this.leftHand = false;
        this.rightHand = false;
        return (this.userAnswear = "LP");
      }
      if (this.rightHand || this.leftHand) {
        this.twoKeyTimer = setTimeout(() => {
          if (!this.rightHand || !this.leftHand) {
            this.leftHand = false;
            this.rightHand = false;
            this.userAnswear = undefined;
            console.log(this.checkAnswer());
          }
        }, 200);
      }
      this.userAnswear += answer;
      return;
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

export const gameAnswers = new GameAnswers();
