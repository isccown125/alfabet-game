class Points {
  multiplerPoints = 1;
  multiplerDefaultValue = 1;
  currentPoints = 0;
  defalutPointsValue = 1;
  maxValueMultiper = 5;
  correctAnswers = 0;
  incorrectAnswers = 0;
  historyMultiplers = [];

  addPoints() {
    this.validateMultipler();
    const points = Number(this.defalutPointsValue * this.multiplerPoints);
    this.currentPoints += points;
    this.correctAnswers++;
    this.validatePoints();
  }

  substractPoints() {
    this.validateMultipler();
    const points = Number(this.defalutPointsValue * this.multiplerPoints);
    this.currentPoints -= points;
    this.incorrectAnswers++;
    this.validatePoints();
  }

  set multipler(multipler) {
    this.multiplerPoints = multipler;
    this.validateMultipler();
  }

  validateMultipler() {
    if (this.multiplerPoints <= 1) {
      this.multiplerPoints = 1;
    }
    if (this.multiplerPoints > this.maxValueMultiper) {
      this.multiplerPoints = this.maxValueMultiper;
    }
  }

  validatePoints() {
    if (this.currentPoints < 0) {
      this.currentPoints = 0;
    }
  }

  clear() {
    this.currentPoints = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.multiplerPoints = 1;
  }
}

export const points = new Points();
