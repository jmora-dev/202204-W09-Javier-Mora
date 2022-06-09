import { iComponent } from "../interfaces/iComponent";
import { iPokemonListElement } from "../interfaces/iPokemonListElements";
import {
  getPokemonDetailsByName,
  getPokemonList,
} from "../services/pokemonApi";
import { Component } from "./Component";
import { Pagination } from "./Pagination";
import { PokemonListItem } from "./PokemonListItem";

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
    getPokemonList(this.page, this.elementsByPage).then((res) => {
      console.log(res.results);
      this.elementsTotal = res.count;
      this.next = res.next ? res.next : "";
      this.back = res.previous ? res.previous : "";
      const arrayPromises = res.results.map((pokemon: any) =>
        getPokemonDetailsByName(pokemon.name)
      );
      Promise.all(arrayPromises).then((res) => {
        this.pokemonList = res.map((item) => ({
          name: item.name,
          sprite: item.sprites.front_default,
        }));
        this.render();
      });
      this.render();
    });
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
    this.pokemonList.forEach(
      (pokemon) =>
        new PokemonListItem(
          this.selector + ` [data-id='${pokemon.name}']`,
          pokemon
        )
    );
  }

  onSelectPage(page: number): void {
    this.page = page;
    this.updatePokemonList();
  }

  createTemplate(): string {
    let html = "<ul class='pokemon-list'>";
    html += this.pokemonList
      .map((pokemon) => `<li data-id="${pokemon.name}"></li>`)
      .join("");
    html += "</ul>";
    html += "<div class='pagination-container'></div>";
    return html;
  }
}
