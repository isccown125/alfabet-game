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
    const points = Number(
      (this.defalutPointsValue * this.multiplerPoints).toFixed(2)
    );
    this.currentPoints += points;
    this.correctAnswers++;
    this.validatePoints();
  }

  substractPoints() {
    this.validateMultipler();
    const points = Number(
      (this.defalutPointsValue * this.multiplerPoints).toFixed(2)
    );
    this.currentPoints -= points;
    this.incorrectAnswers++;
    this.validatePoints();
  }

  incraseMultipler(id, value) {
    if (value < 0) {
      console.log("cannot incrase multipler");
    }
    this.historyMultiplers.push({ id, value });
    this.sumHistoryMultipler();
  }

  reduceMultipler(id) {
    this.historyMultiplers.forEach((el, index) => {
      if (el.id === id) {
        this.historyMultiplers.splice(index, 1);
      }
    });
    this.sumHistoryMultipler();
  }

  sumHistoryMultipler() {
    const multiplers = this.historyMultiplers.map((el) => el.value);
    this.multiplerPoints = multiplers.reduce(
      (prev, curr) => prev + curr,
      this.multiplerDefaultValue
    );
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
  }
}

export const points = new Points();
