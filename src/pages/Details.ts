import { CatchButton } from "../components/CatchButton";
import { Component } from "../components/Component";
import { iComponent } from "../interfaces/iComponent";
import { iPokemonDetails } from "../interfaces/iPokemonDetails";
import { getPokemonDetailsByName } from "../services/pokemonApi";
import { responseToPokemonDetails } from "../utils/responseToPokemonDetails";

export class Details extends Component implements iComponent {
  pokemonDetails: iPokemonDetails | null = null;
  loading = true;
  catchingMessage = { error: false, message: "" };
  constructor(selector: string, public pokemonSearch: string) {
    super(selector, () => this.createTemplate());
    this.render();
    this.loadPokemon();
  }

  loadPokemon() {
    getPokemonDetailsByName(this.pokemonSearch)
      .then((res) => res.json())
      .then((res) => (this.pokemonDetails = responseToPokemonDetails(res)))
      .catch(() => (this.pokemonDetails = null))
      .finally(() => {
        this.loading = false;
        this.render();
      });
  }

  render(): void {
    super.render();
    if (this.pokemonDetails) {
      new CatchButton(
        this.selector + " [data-role='catch']",
        this.pokemonDetails
      );
    }
  }

  createTemplate(): string {
    if (this.loading) {
      return "Loading...";
    }
    if (!this.pokemonDetails) {
      return "<p>Pokemon not found</p><p><a href='/'>Go to pokedex</a></p>";
    }

    const pokemon = this.pokemonDetails;
    return `
      <section class='details-card'>
        <h2 class='details-card__title'>${pokemon.name}</h2>
        <img src='${pokemon.spriteDefault}' alt='${pokemon.name} sprite' />
        <h3>Data</h3>
        <ul class="details-card__data-list">
          <li>Order: ${pokemon.order}</li>
          <li>Height: ${pokemon.height}</li>
          <li>Weight: ${pokemon.weight}</li>
        </ul>
        <slot data-role="catch"></slot>
      </section>
      <footer><p><a class='button' href='/'>Go to pokedex</a></p></footer>`;
  }
}
