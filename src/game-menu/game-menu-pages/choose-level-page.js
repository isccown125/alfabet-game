import { Component } from "../../components/components.js";

export const chooseLevelPage = (buttonsContainer) => {
  const chooseLevelPage = new Component().create("div").setId("choose-level");
  chooseLevelPage.htmlElement.innerHTML += `
    <p id="game-title">AlphabetGame</p>
     <div class="rules">
     <div class="rules-content">
     

        <p><strong>Alfabet Game to gra podnosząca koncentrację dzięki której możesz wejść w stan flow.</strong></p>
        <p class="main-menu-headers">Zasady gry.</p>
        <p>Twoim zadaniem jest czytać kolejne litery Alfabetu (najlepiej na głos) i jednocześnie podnosić ręce do góry w zależności od symbolu.</p>
        <p>Pamiętaj, że w tym ćwiczeniu nie chodzi o poprawność i perfekcjonizm a o prędkość i to jak szybko potrafisz wrócić do gry w momencie gdy stracisz rytm.</p>
        <p>Postaraj się przejść jak najwięcej razy cały alfabet w czasie który pokazuje zegar.</p>
        <ul class="list">
            <p class="list-head">Oznaczenia</p>
            <li>L - gdy widzisz ten symbol naciskasz na klawiaturze <strong>A</strong>.</li>
            <li>P - gdy widzisz ten symbol naciskasz na klawiaturze <strong>D</strong>.</li>
            <li>O - gdy widzisz ten symbol naciskasz na klawiaturze jednocześnie <strong>A</strong> oraz <strong>D</strong>.</li>
        </ul>
        <p>Urządzeń z ekranem dotykowym mają specjalne przyciski z napisami <strong>Lewa ręka</strong> oraz <strong>Prawa ręka</strong> w ich przypadku jest podobnie jak z przyciskami na klawiaturze</p>
    </div>
    </div>
    <p class="main-menu-headers">Wybierz poziom</p>
  `;
  chooseLevelPage.setChild({ htmlElement: buttonsContainer });

  return { id: "choose-level", htmlElement: chooseLevelPage.htmlElement };
};
