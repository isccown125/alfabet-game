import {Component} from "../components.js";
import {points} from "../game-stats/points.js";

export class GameAnswers {
  correctAnswer = undefined;
  userAnswer = undefined;
  answers = ["L", "P", "O"];
  timeForAnswear = 1000;
  actionComponent = undefined;
  leftHand = false;
  rightHand = false;
  twoKeyTimer = false;

  createAnswerButton(label, id) {
    return new Component()
        .create("button")
        .setClassList("answer-button")
        .setTextContext(label)
        .setAttributes({
          name: "data-answer",
          value: id,
        }).htmlElement;
  }

  checkAnswer() {
    if (this.correctAnswer === "O") {
      if (this.userAnswer === "LP" || this.userAnswer === "PL") {
        points.addPoints();
        this.resetAnswers()
        return "good-answer";
      }
      points.substractPoints();
      this.resetAnswers()
      return "bad-answer";
    } else {
      if (this.correctAnswer === this.userAnswer) {
        points.addPoints();
        this.resetAnswers()
        return "good-answer";
      }
    }
    points.substractPoints();
    this.resetAnswers()
    return "bad-answer";
  }

  resetAnswers() {
    this.userAnswer = undefined;
    this.correctAnswer = undefined
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

  setCorrectAnswer(answer) {
    if (typeof answer !== "string") {
      this.correctAnswer = undefined;
    }

    this.correctAnswer = answer;
  }

  setUserAnswer(answer) {
    if (typeof answer !== "string") {
      this.userAnswer = undefined;
    }
    this.userAnswer = answer;
  }

  render(parent) {
    if (parent !== undefined) {
      parent.appendChild(this.createActionsComponent());
    }
  }
}

export const gameAnswers = new GameAnswers();
