import { iComponent } from "../interfaces/iComponent";
import { iPokemonListElements } from "../interfaces/iPokemonListElements";
import { Component } from "./Component";
import { Pagination } from "./Pagination";

export class PokemonList extends Component implements iComponent {
  constructor(
    public selector: string,
    public elements: iPokemonListElements | null,
    public page: number,
    public elementsTotal: number,
    public elementsByPage: number,
    public onSelectPage: (page: number) => void
  ) {
    super(selector, () => this.createTemplate());
    console.log(selector);
    this.render();
  }

  render(): void {
    super.render();
    new Pagination(
      this.selector + " .pagination-container",
      this.page,
      this.elementsTotal,
      this.elementsByPage,
      this.onSelectPage.bind(this)
    );
  }

  createTemplate(): string {
    let html = "<ul class='pokemon-list'>";
    if (this.elements && this.elements.length) {
      html += this.elements
        .map((element) => {
          return `<li><a class='pokemon-list__item-link' href="/?search=${element.name}">${element.name}</a></li>`;
        })
        .join("");
    } else {
      html += "No hay elementos para mostrar";
    }
    html += "</ul>";
    html += "<div class='pagination-container'></div>";
    return html;
  }
}
