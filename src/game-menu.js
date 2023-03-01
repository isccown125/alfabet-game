import {AlphabetGame} from "./alfabet-game.js";
import {showModal} from "./modal.js";

export class GameMenu{
    rules = []
    levelButtons = []
    levels = [];
    gameMenu = undefined;
    actionsContainer = undefined;
    rulesContainer = undefined;
    timerId = undefined

    createRule(description, options = {htmlTag:'p', group: false, parent:undefined, classes: ""}) {
        const {htmlTag, group, parent, classes} = options
        const htmlElement = document.createElement(htmlTag);

        if(classes && classes.length>0){
            htmlElement.classList.add(classes);
        }
        if(group){
            if(parent){
                htmlElement.textContent = description
                parent.append(htmlElement)
                return htmlElement;
            }
            this.rules.push(htmlElement)
            htmlElement.textContent = description
            return htmlElement;
        }
        htmlElement.textContent = description
        this.rules.push(htmlElement)
        return htmlElement;
    }

    createButton(label, gameLevel){
        const button = document.createElement('button');
        button.textContent = label
        button.className='level-button';
        button.setAttribute('data-level', gameLevel.name);
        this.levelButtons.push(button);
    }

    hideMenu (){
        this.gameMenu.classList.add('d-none')
    }
    showMenu(){
        this.gameMenu.classList.remove('d-none');

    }

    createLevel (name, time, label){
        if(typeof name === "string" && typeof time === "number"){
            this.levels.push({label,name,time})
        } else {
            throw new Error(`Name must be type of string and time must be typeof number. Given: name:${typeof name}, time:${typeof time}`);
        }
    }


    getLevel(name){
        if(!name || typeof name !== 'string'){
            throw new Error('Cannot start game!');
        }
        return this.levels.find((el)=>el.name === name);
    }

    startGameHandler(event){
        if(event.target.nodeName ==='BUTTON'){
            const level = this.getLevel(event.target.dataset.level);
            const game = new AlphabetGame();
            const cancelGame = document.createElement('button')

            cancelGame.textContent='Wybierz inny poziom';
            cancelGame.classList.add('cancel-game-btn')

            game.startGame(level)
            cancelGame.addEventListener('click', ()=>{
                game.finishGame()
                cancelGame.remove()
                this.showMenu();
                clearTimeout(this.timerId)
            });
            game.boardHeaderHtmlElement.prepend(cancelGame)
            this.hideMenu()
            this.timerId = setTimeout(()=>{
                game.finishGame();
                cancelGame.remove()
                this.showMenu();
                showModal("Koniec czasu!", "<p>Możesz pochwalić jak ci poszło na naszym discordzie.</p>\n<p>Jeśli masz jakieś uwagi do samej gry <br>skontaktuj się z nami!</p>");
            }, level.time)

        }
    }

    render(){
        const game = document.getElementById('alphabet-game');
        this.gameMenu = document.createElement('div');
        this.gameMenu.id = 'main-menu';

        const title = document.createElement('p')
        title.textContent = 'Alphabet Game'
        title.id = 'game-title'

        this.rulesContainer = document.createElement('div');
        this.rulesContainer.id = 'rules'
        this.actionsContainer = document.createElement('div');
        this.actionsContainer.id = 'actions'

        this.rules.map((el)=>this.rulesContainer.append(el));
        this.levelButtons.map((el)=>this.actionsContainer.append(el));


        this.gameMenu.append(title)
        this.gameMenu.append(this.rulesContainer);
        this.gameMenu.append(this.actionsContainer)

        this.actionsContainer.addEventListener('click',this.startGameHandler.bind(this));
        game.append(this.gameMenu)
    }
}