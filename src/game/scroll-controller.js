export class ScrollController {
  nodeElement = undefined;
  isActive = false;
  notActiveTimer = undefined;
  timeForActivateScrollController = 500;
  constructor(nodeElement) {
    this.nodeElement = nodeElement;
    this.userScroll();
  }
  userScroll() {
    this.nodeElement.addEventListener("scroll", () => {
      this.isActive = false;
      clearTimeout(this.notActiveTimer);
      this.notActiveTimer = setTimeout(() => {
        this.isActive = true;
      }, this.timeForActivateScrollController);
    });
  }
  activate() {
    this.isActive = true;
  }
  scrollTo({ elPos }) {
    if (this.isActive) {
      elPos.scrollIntoView({ block: "center", behavior: "smooth" });

      const nodeElHeight = this.nodeElement.getBoundingClientRect().height;

      const scrollY = this.nodeElement.scrollTop;

      const elY = elPos.getBoundingClientRect().top + scrollY;

      const targetY =
        elY -
        this.nodeElement.getBoundingClientRect().top -
        nodeElHeight / 2 +
        elPos.offsetHeight / 2;
      this.nodeElement.scroll({ top: targetY });
    }
  }
}
