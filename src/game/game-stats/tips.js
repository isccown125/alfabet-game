export class Tips {
  points = 0;
  currentTip = "Idzie ci coraz lepiej!";

  constructor(points) {
    if (!isNaN(points)) {
      this.points = points;
    }
  }

  getCurrentTip() {
    if (this.points <= 30 && this.points >= 0) {
      this.currentTip =
        "Musisz jeszcze troche popracować, ale nie poddawaj się!";
    }
    if (this.points <= 50 && this.points > 30) {
      this.currentTip = "Świetnie! Trzymaj tak dalej :)";
    }
    if (this.points <= 80 && this.points > 50) {
      this.currentTip = "Wow! Już prawie jesteś legendą tej gry.";
    }
    if (this.points > 80) {
      this.currentTip =
        "Twój poziom koncentracji jest na naprawdę wysokim poziomie,<br> ale nie odpuszczaj sobie ciśnij dalej!";
    }

    return this.currentTip;
  }
}
