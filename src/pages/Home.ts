import { Component } from "../components/Component";
import { PokemonList } from "../components/PokemonList";
import { iComponent } from "../interfaces/iComponent";
import { iPokemonListResponse } from "../interfaces/iPokemonListElements";

export class Home extends Component implements iComponent {
  page = 1;
  elementsByPage = 50;
  pokemonListResponse: iPokemonListResponse | null = null;
  constructor(selector: string) {
    super(selector, () => this.createTemplate());
    this.render();
    this.updatePokemonList();
  }

  updatePokemonList() {
    this.getPokemonList(this.page, this.elementsByPage)
      .then((res) => res.json())
      .then((res) => (this.pokemonListResponse = res))
      .catch(() => (this.pokemonListResponse = null))
      .finally(() => this.render());
  }

  getPokemonList(page: number, elementByPage: number) {
    return fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${elementByPage}&offset=${
        elementByPage * (page - 1)
      }`
    );
  }

  onSelectPage(page: number): void {
    this.page = page;
    this.updatePokemonList();
  }

  render(): void {
    super.render();
    new PokemonList(
      this.selector + " .table-container",
      this.pokemonListResponse && this.pokemonListResponse.results,
      this.page,
      this.pokemonListResponse ? this.pokemonListResponse.count : 0,
      this.elementsByPage,
      this.onSelectPage.bind(this)
    );
  }

  createTemplate(): string {
    return `
      <section class="">
        <h2 class="section-title">Pokedex</h2>
        <div class="table-container"></div>   
      </section>`;
  }
}
