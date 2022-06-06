import { Component } from "../components/Component";
import { PokemonList } from "../components/PokemonList";
import { TeamList } from "../components/TeamList";
import { iComponent } from "../interfaces/iComponent";
import { iPokemonListResponse } from "../interfaces/iPokemonListElements";
import { getPokemonList } from "../services/pokemonApi";

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
    getPokemonList(this.page, this.elementsByPage)
      .then((res) => res.json())
      .then((res) => (this.pokemonListResponse = res))
      .catch(() => (this.pokemonListResponse = null))
      .finally(() => this.render());
  }

  onSelectPage(page: number): void {
    this.page = page;
    this.updatePokemonList();
  }

  render(): void {
    super.render();
    new TeamList(this.selector + " .team-container");
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
        <h2 class="section-title">Team</h2>
        <div class="team-container"></div>   
        <h2 class="section-title">Pokedex</h2>
        <div class="table-container"></div>   
      </section>`;
  }
}
