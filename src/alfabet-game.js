import {Board} from "./board.js";
import {Component} from "./components.js";

export class AlphabetGame extends Board{
    timerId = null;
    timerHtmlElement = undefined;

    constructor() {
        super();
        this.renderGame()
    }

    setGameBoard(){
        this.render()
    }

    startGame(level){
        if(!level.name || !level.time){
            throw new Error('Cannot start game!');
        }
        this.setGameBoard()
        this.timer(level.time)
    }
    finishGame(){
        this.boardHtmlElement.remove();
        this.boardHeaderHtmlElement.remove();
        clearInterval(this.timerId)
    }

    timer (time){
        let seconds = time / 1000
        const div = new Component().create('div').setId('timer').setTextContext('Czas').htmlElement
        const span = new Component().create('span').setTextContext(`${seconds}s`).htmlElement

        div.append(span);
        this.timerHtmlElement = div
        this.boardHeaderHtmlElement.append(div);

        this.timerId = setInterval(()=>{
            seconds--
            span.textContent = (seconds<=9)?`0${seconds}s`: `${seconds}s`
            div.appendChild(span)
        }, 1000)

    }
    renderGame() {
        this.boardHtmlElement = document.getElementById('alphabet-game');
        document.body.appendChild(this.boardHtmlElement);

    }
}