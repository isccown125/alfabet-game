import { Component } from "../../components/components.js";

export const chooseLevelPage = (buttonsContainer) => {
  const chooseLevelPage = new Component().create("div").setId("choose-level");
  chooseLevelPage.htmlElement.innerHTML += `
    <p id="game-title">Alfabet Game</p>
     <div class="rules">
     <div class="rules-content">
        <p><strong>Alfabet Game to gra podnosząca koncentrację dzięki której możesz wejść w stan flow.</strong></p>
        <p class="main-menu-headers">Zasady gry.</p>
        <p>Twoim zadaniem jest czytać kolejne litery Alfabetu (najlepiej na głos) i jednocześnie podnosić ręce do góry w zależności od symbolu.</p>
        <p>Na dole pod planszą zobaczysz przyciski symbolizujące “lewą rękę” i “prawą rękę”.</p>
        <p>Pamiętaj, że w tym ćwiczeniu nie chodzi o poprawność i perfekcjonizm a o prędkość i to jak szybko potrafisz wrócić do gry w momencie gdy stracisz rytm.</p>
        <p>Postaraj się przejść jak najwięcej razy cały alfabet w czasie który pokazuje zegar.</p>
        <ul class="list">
            <p class="list-head">Oznaczenia</p>
            <li>L - gdy widzisz ten symbol naciskasz na klawiaturze <stron>A lub przycisk “Lewa ręka”.</stron></li>
            <li>P - gdy widzisz ten symbol naciskasz na klawiaturze <strong>D lub przycisk “Prawa ręka”.</strong></li>
            <li>O - gdy widzisz ten symbol naciskasz na klawiaturze jednocześnie <strong>A</strong> oraz <strong>D lub oba przyciski - “Lewa ręka” i “Prawa ręka”</strong>.</li>
        </ul>
    </div>
    </div>
    <p class="main-menu-headers">Wybierz poziom</p>
  `;
  chooseLevelPage.setChild({ htmlElement: buttonsContainer });

  return { id: "choose-level", htmlElement: chooseLevelPage.htmlElement };
};
