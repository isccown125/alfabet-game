class KeyBinder {
  actions = [];
  bindedKeys = [];

  addAction({ key, actionID, typeKeyEvent, actionCB, delay }) {
    if (!typeKeyEvent || !actionID) {
      throw new Error(
        "You must provide key event(keydown/keyup/keypress) and actionID"
      );
    }
    this.actions.push({ actionID, key, typeKeyEvent, actionCB, delay });
    this.bindedKeys.push(key);
  }

  bindAction(actionID, key) {
    const newActions = this.actions.map((el) => {
      if (el.actionID === actionID) {
        el.key = key;
      }
    });
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
            if (typeof el.delay === "number" && el.delay > 0) {
              setTimeout(() => {
                el.actionCB();
              }, el.delay);
              return;
            }
            el.actionCB();
          }
        });
      }
    });
  }

  init() {
    window.addEventListener("keydown", this.keyDownHandler.bind(this));
  }
}

export const keyBinder = new KeyBinder();
