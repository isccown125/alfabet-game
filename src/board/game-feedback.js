export class GameFeedback {
  iconsPath = [
    {
      id: "good-answer",
      src: "./src/assets/icons/check-solid-green.svg",
      classList: "feedback-icon good-answer",
    },
    {
      id: "bad-answer",
      src: "./src/assets/icons/xmark-solid-red.svg",
      classList: "feedback-icon bad-answer",
    },
  ];
  answerFlag = null;
  feedbackForRender = null;

  constructor(answerFlag) {
    this.answerFlag = answerFlag;
    console.log(answerFlag);
    this.iconsPath.forEach((el) => {
      if (!answerFlag) {
        this.answerFlag = "bad-answer";
      }
      if (el.id === this.answerFlag) {
        this.feedbackForRender = el;
      }
    });
  }

  render(rootEl) {
    if (!this.feedbackForRender) return;
    if (rootEl instanceof HTMLElement) {
      const icon = document.createElement("img");
      icon.src = this.feedbackForRender.src;
      icon.classList = this.feedbackForRender.classList;
      rootEl.append(icon);
      setTimeout(() => {
        icon.remove();
      }, 300);
    }
  }
}
