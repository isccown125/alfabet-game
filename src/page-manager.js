export class PageManager {
  pages = [];
  defaultPage = "choose-level";
  rootForRenderPage = undefined;
  lastPage = undefined;
  currentPage = undefined;

  constructor(root) {
    this.rootForRenderPage = root;
  }

  setCurrentPage(pageID) {
    const pageFound = this.pages.find((el) => pageID === el.id);
    if (this.lastPage) {
      this.lastPage = this.currentPage;
      this.currentPage = pageFound.htmlElement;
      this.rootForRenderPage.replaceChild(this.currentPage, this.lastPage);
      return;
    }
    this.lastPage = this.currentPage;
    this.currentPage = pageFound.htmlElement;
    this.rootForRenderPage.appendChild(this.currentPage);
    this.lastPage = this.currentPage;
  }

  registerPage({ id, htmlElement }) {
    this.pages.push({ id, htmlElement });
  }

  getPage(pageID) {
    return this.pages.find((el) => pageID === el.id);
  }

  update() { }
}
