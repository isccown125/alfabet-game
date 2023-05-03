class KeyBinder {
    actions = [];
    bindedKeys = [];
    addAction({ key, actionID, typeKeyEvent, actionCB }) {
        if (!typeKeyEvent || !actionID) {
            throw new Error('You must provide key event(keydown or keyup or keypress) and actionID');
        }
        this.actions.push({ actionID, key, typeKeyEvent, actionCB });
        this.bindedKeys.push(key);
    }
    bindAction(actionID, key) {
        const newActions = this.actions.map((el) => {
            if (el.actionID === actionID) {
                el.key = key;
            }
        })
        this.actions = [...newActions];
    }

    resetActions() {
        this.actions = [];
        this.bindedKeys = [];
    }

    keyDownHandler(e) {
        this.bindedKeys.forEach((el) => {
            if (el === e.key) {
                this.actions.find((el) => {
                    if (el.key === e.key) {
                        el.actionCB();
                    }
                })
            }
        })
    }

    init() {
        window.addEventListener('keydown', this.keyDownHandler.bind(this));
    }
}

export const keyBinder = new KeyBinder();