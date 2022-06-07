import { iComponent } from "../interfaces/iComponent";
import { iPokemonListElement } from "../interfaces/iPokemonListElements";
import { getPokemonList } from "../services/pokemonApi";
import { Component } from "./Component";
import { Pagination } from "./Pagination";

export class PokemonList extends Component implements iComponent {
  page = 1;
  elementsByPage = 50;
  elementsTotal = 0;
  next = "";
  back = "";
  pokemonList: Array<iPokemonListElement> = [];

  constructor(public selector: string) {
    super(selector, () => this.createTemplate());
    this.render();
    this.updatePokemonList();
  }

  updatePokemonList(): void {
    getPokemonList(this.page, this.elementsByPage)
      .then((res) => {
        this.pokemonList = res.results;
        this.elementsTotal = res.count;
        this.next = res.next ? res.next : "";
        this.back = res.previous ? res.previous : "";
      })
      .finally(() => this.render());
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

  onSelectPage(page: number): void {
    this.page = page;
    this.updatePokemonList();
  }

  createTemplate(): string {
    let html = "<ul class='pokemon-list'>";
    if (this.pokemonList.length) {
      html += this.pokemonList
        .map((pokemon) => {
          return `<li><a class='pokemon-list__item-link' href="/?search=${pokemon.name}">${pokemon.name}</a></li>`;
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
