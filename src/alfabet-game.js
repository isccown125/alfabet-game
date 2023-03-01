import {Board} from "./board.js";

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
        const div = document.createElement('div');
        const span = document.createElement('span');
        const levelTime = time / 1000
        div.id = 'timer'
        div.textContent = 'Czas'
        span.textContent = `${levelTime}s`
        div.appendChild(span)
        this.timerHtmlElement = div
        this.boardHeaderHtmlElement.append(div);
        let seconds = levelTime;
        this.timerId = setInterval(()=>{
            seconds--
            span.textContent = (seconds<=9)?`0${seconds}s`: `${seconds}s`;
            div.appendChild(span)
        }, 1000)


    }

    renderGame() {
        this.boardHtmlElement = document.getElementById('alphabet-game');
        document.body.appendChild(this.boardHtmlElement);
    }
}