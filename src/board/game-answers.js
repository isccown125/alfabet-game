import { Component } from "../components/components.js";

export class GameAnswers {
  correctAnswer = undefined;
  userAnswer = undefined;
  actionComponent = undefined;
  goodAnswers = 0;
  badAnswers = 0;

  get badAnswers() {
    return this.badAnswers >= 0 ? this.badAnswers : 0;
  }

  get goodAnswers() {
    return this.goodAnswers >= 0 ? this.goodAnswers : 0;
  }

  reset() {
    this.goodAnswers = 0;
    this.badAnswers = 0;
  }

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
        this.resetAnswers();
        this.goodAnswers++;
        return "good-answer";
      }
      this.resetAnswers();
      this.badAnswers++;
      return "bad-answer";
    } else {
      if (this.correctAnswer === this.userAnswer) {
        this.resetAnswers();
        this.goodAnswers++;
        return "good-answer";
      }
    }
    this.resetAnswers();
    this.badAnswers++;
    return "bad-answer";
  }

  resetAnswers() {
    this.userAnswer = undefined;
    this.correctAnswer = undefined;
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
