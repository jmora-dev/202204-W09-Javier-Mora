import { iComponent } from "../interfaces/iComponent";
import { Component } from "./Component";

export class Pagination extends Component implements iComponent {
  constructor(
    public selector: string,
    public page: number,
    public elementsTotal: number,
    public elementsByPage: number,
    public onSelectPage: (page: number) => void
  ) {
    super(selector, () => this.createTemplate());
    this.render();
  }

  render(): void {
    super.render();
    document
      .querySelectorAll(this.selector + " .pagination__item")
      .forEach((item, index) =>
        item.addEventListener("click", () => this.onSelectPage(index + 1))
      );
  }

  createTemplate(): string {
    const pagesNeeded = Math.ceil(this.elementsTotal / this.elementsByPage);
    const pagesHtml = [];
    for (let index = 0; index < pagesNeeded; index++) {
      pagesHtml.push(
        `<li role="button" class='pagination__item ${
          this.page === index + 1 ? "is-active" : ""
        }'>${index + 1}<li>`
      );
    }
    return `<ol class='pagination'>${pagesHtml.join("")}</ol>`;
  }
}
