export class Component {
    htmlElement = undefined

    create(htmlTag){
        if(!htmlTag){
            throw new Error('Cannot create html element. Argument is not given.');
        }
        if(typeof name !== "string"){
            throw new Error('Cannot set tag name. Given argument is not string');
        }
        this.htmlElement = document.createElement(htmlTag)

        return this
    }

    setClassList(...name){
        if(!name){
            throw new Error('Argument is not given.');
        }
        if(typeof name === "string"){
            throw new Error('Cannot set classes. Given argument is not string');
        }
        if(!this.htmlElement){
            throw new Error('You must create html element after set class.');
        }
        name.forEach((el)=>{
            this.htmlElement.classList.add(el);
        })
        return this
    }
    setId(name){
        if(!name){
            throw new Error('Argument is not given.');
        }
        if(typeof name !== "string"){
            throw new Error('Cannot set id. Given argument is not string');
        }
        if(!this.htmlElement){
            throw new Error('You must create html element after set class.');
        }
        this.htmlElement.id = name;
        return this
    }
    setAttributes(...obj){
        obj.forEach((el)=>{
            if(!el.name || !el.value){
                throw new Error('Cannot set attributes without name or value')
            }
            if(typeof el.name !== 'string'){
                throw new Error(`Object name or value must be a string. Given: name:${typeof obj.name}`)
            }
            this.htmlElement.setAttribute(el.name, el.value)
        });
        return this
    }
    setTextContext(...text){
        if(!text){
            throw new Error('Argument is not given.');
        }
        if(typeof name !== "string"){
            throw new Error('Cannot set text content. Given argument is not string');
        }
        if(!this.htmlElement){
            throw new Error('You must create html element after set class.');
        }
        text.map((el)=>{
            this.htmlElement.textContent = el;
        })
        return this;
    }
    setChild(...children){
        if(!children){
            throw new Error('Cannot set child without child')
        }
        if(!this.htmlElement){
            throw new Error('You must create html element after set class.');
        }
        children.forEach((el)=>{
            const {htmlElement, options} = el
            if(!htmlElement){
                throw new Error('Cannot set child without child')
            }
            if(options){
                if(options.hasOwnProperty('prependChild') && options.prependChild === true){
                    this.htmlElement.prepend(htmlElement);
                    return this
                }
            }

            this.htmlElement.append(htmlElement);
            return this
        })

        return this
    }
}

