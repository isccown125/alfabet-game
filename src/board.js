export class Board {
    boardHtmlElement = undefined
    boardHeaderHtmlElement = undefined
    createdElements = [];
    alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","R","S","T","U","W","X","Y","Z"];
    symbols = ["L","P", "O"];
    groupedAlphabet = [];
    countSymbols = 0;
    lastSymbol = undefined

    randomizeSymbols(){
        const random = ()=>{
            return Math.round(Math.random()*(this.symbols.length-1))
        }
        let randomIndex = random();
        if(this.lastSymbol === this.symbols[randomIndex]&&this.countSymbols < 2){
            this.countSymbols++
        }
        if(this.lastSymbol !== this.symbols[randomIndex]){
            console.log(this.lastSymbol, this.countSymbols, this.symbols[randomIndex], 'w')
            this.lastSymbol = this.symbols[randomIndex];
            this.countSymbols = 0;

            return this.symbols[randomIndex]
        }

        if(this.countSymbols === 2){
            while (this.symbols[randomIndex] === this.lastSymbol){
                randomIndex = random();
            }
            this.countSymbols = 0;
        }
        console.log(this.lastSymbol, this.countSymbols, this.symbols[randomIndex], 'poza')
        return this.symbols[randomIndex]
    }

    elementsGroup(){
        this.groupedAlphabet = this.alphabet.map((el)=>{ return {character: el, symbol: this.randomizeSymbols()}})
    }

    createTextGroup(character, symbol){
        const div = document.createElement('div');
        const span = document.createElement('span');
        const span1 = document.createElement('span');

        div.className='character-group'

        span.textContent = character;
        span1.textContent = symbol

        span.className = 'character';
        span1.className = 'symbol'


        div.appendChild(span);
        div.appendChild(span1);
        return div;
    }
    createGame(){
        this.elementsGroup()
        this.createTextGroup();
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
                this.boardHtmlElement.append(group);
            })
        }
    }
}