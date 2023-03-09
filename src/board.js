import {random} from "./utils.js";
import {Component} from "./components.js";

export class Board {
    boardHtmlElement = undefined
    boardHeaderHtmlElement = undefined
    createdElements = [];
    alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","X","Y","Z"];
    symbols = ["L","P", "O"];
    groupedAlphabet = [];
    groupedAlphabetHtml = [];
    lastHighlightedCharacter = undefined
    currentHighlightedCharacter = undefined
    highlightTimerId = undefined
    highlightTimeSpeed = 500
    countSymbols = 0;
    maxSymbolRepeition = 2;
    lastSymbol = undefined

    randomizeSymbols(){
        let randomIndex = random(1 ,this.symbols.length);
        if(this.lastSymbol === this.symbols[randomIndex]&&this.countSymbols < this.maxSymbolRepeition){
            this.countSymbols++
        }
        if(this.lastSymbol !== this.symbols[randomIndex]){
            this.lastSymbol = this.symbols[randomIndex];
            this.countSymbols = 0;

            return this.symbols[randomIndex]
        }
        if(this.countSymbols === this.maxSymbolRepeition){
            while (this.symbols[randomIndex] === this.lastSymbol){
                randomIndex = random(1 ,this.symbols.length);
            }
            this.countSymbols = 0;
        }
        return this.symbols[randomIndex]
    }
    elementsGroup(){
        this.groupedAlphabet = this.alphabet.map((el)=>{ return {character: el, symbol: this.randomizeSymbols()}})
    }

    createTextGroup(character, symbol){
        const span = new Component().create('span').setClassList('character').setTextContext(character).htmlElement
        const span1 = new Component().create('span').setClassList('symbol').setTextContext(symbol).htmlElement
        const div = new Component().create('div').setClassList('character-group').setChild({htmlElement: span}, {htmlElement:span1}).htmlElement
        this.groupedAlphabetHtml.push({character: span, symbol: span1});
        return {htmlGroup: div, character: span, symbol: span1};
    }
    createGame(){
        this.elementsGroup()
        this.createTextGroup();
    }

    highlightCharacter(timePerCharacter){
        let elementIndex = 0

        this.highlightTimerId = setInterval(()=>{
             if(this.createdElements.length <= elementIndex){
                 elementIndex = 0
             }
             this.createdElements[elementIndex].group.character.classList.add('highlight-character')
             this.lastHighlightedCharacter = this.currentHighlightedCharacter
             this.createdElements[elementIndex].group.character.classList.add('highlight-character')
             this.currentHighlightedCharacter = this.createdElements[elementIndex]

             if(this.lastHighlightedCharacter) {
                 this.lastHighlightedCharacter.group.character.classList.remove('highlight-character')
             }
             elementIndex++
        }, timePerCharacter)

    }

    render(){
        this.gameHtmlElement = document.getElementById('alphabet-game');
        this.boardHtmlElement = document.createElement('div');
        this.boardHeaderHtmlElement = document.createElement('header');
        this.boardHtmlElement.id = 'board';
        this.boardHeaderHtmlElement.className = 'game-header';
        this.createGame()
        this.gameHtmlElement.append(this.boardHeaderHtmlElement);
        this.gameHtmlElement.append(this.boardHtmlElement);
        if(this.groupedAlphabet){
            this.groupedAlphabet.forEach((el, index)=>{
                const group = this.createTextGroup(el.character, el.symbol);
                this.createdElements.push({id: index, group})
                this.boardHtmlElement.append(group.htmlGroup);
            })
        }
    }
}