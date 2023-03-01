import {GameMenu} from "./game-menu.js";

class App{
    gameMenu = new GameMenu();
        constructor() {
            this.gameMenu.createRule('Zasady gry', {htmlTag:"p", classes: "main-menu-headers"})
            this.gameMenu.createRule('Po przejściu do gry będzie generowała się plansza z alfabetem oraz symbolami.', {htmlTag:"p", classes: "text-style"})
            this.gameMenu.createRule('W ciągu określonego czasu musisz przeczytać cały alfabet jednocześnie podnąsząc ręce do góry w zależności od symbolu.', {htmlTag:"p", classes: "text-style"})
            this.gameMenu.createRule('Pod literami alfabetu znajdują się symbole, w zależności od symbolu musisz wykonać jakąś akcje.',{htmlTag:"p", classes: "text-style"})
            const parent = this.gameMenu.createRule('', {htmlTag: 'ul', group: true, classes:"list"})
            this.gameMenu.createRule('Oznaczenia', {group: true, htmlTag: "p", parent, classes:"list-head"})
            this.gameMenu.createRule('L - gdy widzisz ten symbol podnosisz do góry lewą ręke.', {group: true, htmlTag: "li", parent})
            this.gameMenu.createRule('P - gdy widzisz ten symbol podnosisz do góry prawą ręke.',{group: true, htmlTag: "li", parent})
            this.gameMenu.createRule('O - gdy widzisz ten symbol podnosisz do góry obie ręce.',{group: true, htmlTag: "li", parent})
            this.gameMenu.createRule('Wybierz poziom', {htmlTag:'p', classes: "main-menu-headers"})
            this.gameMenu.createLevel('VERY_HARD', 500*60, "bardzo łatwy")
            this.gameMenu.createLevel('HARD', 1000*60, 'łatwy')
            this.gameMenu.createLevel('MEDIUM', 1000*60*2, 'średni' )
            this.gameMenu.createLevel('EASY', 1000*60*3, "trudny")
            this.gameMenu.levels.map((el)=>this.gameMenu.createButton(el.label, {name: el.name, time: el.time}))
            this.gameMenu.render()
        }
}
window.addEventListener('load', ()=>{
    new App();
})