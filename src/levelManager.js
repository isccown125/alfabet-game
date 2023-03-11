export class LevelManager {
  levels = [];
  currentLevel = undefined;
  options = {
    highlightOptions: {
      reverse: false,
      random: false,
      normal: false,
      intervalTime: 1000,
    },
  };

  createLevel(
    level = {
      time: 1000 * 60,
      name: "LEVEL",
      label: "LEVEL",
      options: {
        highlightOptions: {
          reverse: false,
          randomize: false,
          normal: false,
          intervalTime: 1000,
        },
      },
    }
  ) {
    this.levels.push({
      ...level,
    });
  }

  setCurrentLevel(name) {
    const foundLevel = this.levels.find((el) => el.name === name);

    if (!foundLevel) {
      throw new Error("Level not found!");
    }
    this.currentLevel = { options: { ...this.options }, ...foundLevel };
    console.log(this.currentLevel);
  }
}
