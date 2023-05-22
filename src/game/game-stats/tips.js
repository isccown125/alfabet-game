export class Tip {
  points = 0;
  currentTip = "Idzie ci coraz lepiej!";

  constructor(points) {
    if (!isNaN(points)) {
      this.points = points;
    }
  }

  get currentTip() {
    this.currentTip =
      "Twój wynik nie jest najlepszy. Chyba jeszcze nie jesteś na tym etapie. Spróbuj zagrać na prostszym poziomie.";
    if (this.points > 200) {
      this.currentTip =
        "Jesteś mistrzem! Nawet nam jest trudno osiągnąć tyle punktów. Koniecznie pochwal się swoim wynikiem w komentarzach lub napisz na naszej stronie na Facebook-u!";
    } else if (this.points > 150) {
      this.currentTip =
        "Wow! Świetny wynik! Jeśli udało ci się go osiągnąć, twój mózg pracuje na wysokich obrotach. Koniecznie pochwal się tym wynikiem w komentarzach lub napisz na naszej stronie na Facebook-u!";
    } else if (this.points > 100) {
      this.currentTip =
        "Świetna robota! Właśnie o to chodzi. Ciekawe czy potrafisz pokonać barierę 150 punktów?";
    } else if (this.points > 50) {
      this.currentTip = "Idzie Ci co raz lepiej - ćwicz dalej!";
    } else if (this.points > 10) {
      this.currentTip = "Wiesz już o co chodzi. Nie przestawaj - ćwicz dalej!";
    }
    return this.currentTip;
  }
}
