import {random} from "./utils.js";
import {Component} from "./components.js";

export class Board {
    boardHtmlElement = undefined
    boardHeaderHtmlElement = undefined
    createdElements = [];
    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "W", "X", "Y", "Z"];
    symbols = ["L", "P", "O"];
    groupedAlphabet = [];
    countSymbols = 0;
    maxSymbolRepeition = 2;
    lastSymbol = undefined

    randomizeSymbols() {
        let randomIndex = random(1, this.symbols.length);
        if (this.lastSymbol === this.symbols[randomIndex] && this.countSymbols < this.maxSymbolRepeition) {
            this.countSymbols++
        }
        if (this.lastSymbol !== this.symbols[randomIndex]) {
            this.lastSymbol = this.symbols[randomIndex];
            this.countSymbols = 0;

            return this.symbols[randomIndex]
        }
        if (this.countSymbols === this.maxSymbolRepeition) {
            while (this.symbols[randomIndex] === this.lastSymbol) {
                randomIndex = random(1, this.symbols.length);
            }
            this.countSymbols = 0;
        }
        return this.symbols[randomIndex]
    }

    elementsGroup() {
        this.groupedAlphabet = this.alphabet.map((el) => {
            return {character: el, symbol: this.randomizeSymbols()}
        })
    }

    createTextGroup(character, symbol) {
        const span = new Component().create('span').setClassList('character').setTextContext(character).htmlElement
        const span1 = new Component().create('span').setClassList('symbol').setTextContext(symbol).htmlElement
        const div = new Component().create('div').setClassList('character-group').setChild({htmlElement: span}, {htmlElement: span1}).htmlElement
        return div;
    }

    createGame() {
        this.elementsGroup()
        this.createTextGroup();
    }

    higlihtCharacter() {

    }


    render() {
        this.gameHtmlElement = document.getElementById('alphabet-game');
        this.boardHtmlElement = document.createElement('div');
        this.boardHeaderHtmlElement = document.createElement('header');
        this.boardHtmlElement.id = 'board';
        this.boardHeaderHtmlElement.className = 'game-header';


        this.createGame()
        this.gameHtmlElement.append(this.boardHeaderHtmlElement);
        this.gameHtmlElement.append(this.boardHtmlElement);
        if (this.groupedAlphabet) {
            this.groupedAlphabet.forEach((el, index) => {
                const group = this.createTextGroup(el.character, el.symbol);
                this.createdElements.push({id: index, group})
                this.boardHtmlElement.append(group);
            })
        }
    }
}