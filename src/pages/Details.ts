import { Component } from "../components/Component";
import { iComponent } from "../interfaces/iComponent";
import { iPokemonDetails } from "../interfaces/iPokemonDetails";

export class Details extends Component implements iComponent {
  pokemonDetails: iPokemonDetails | null = null;
  loading = true;
  constructor(selector: string, public pokemonSearch: string) {
    super(selector, () => this.createTemplate());
    this.render();
    this.loadPokemon();
  }

  loadPokemon() {
    this.getPokemon(this.pokemonSearch)
      .then((res) => res.json())
      .then(
        (res) =>
          (this.pokemonDetails = this.pokemonResponseToPokemonDetails(res))
      )
      .catch(() => (this.pokemonDetails = null))
      .finally(() => {
        this.loading = false;
        this.render();
      });
  }

  pokemonResponseToPokemonDetails(data: any): iPokemonDetails {
    return {
      name: data.name,
      order: data.order,
      height: data.height,
      weight: data.weight,
      spriteDefault: data.sprites.front_default,
    };
  }

  getPokemon(pokemonName: string) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  }

  createTemplate(): string {
    console.log("1");
    if (this.loading) {
      return "Loading...";
    }
    console.log("2");
    if (!this.pokemonDetails) {
      return "<p>Pokemon not found</p><p><a href='/'>Go to pokedex</a></p>";
    }

    const pokemon = this.pokemonDetails;
    console.log("3", pokemon);
    return `
      <section class='details-card'>
        <h2 class='details-card__title'>${pokemon.name}</h2>
        <img src='${pokemon.spriteDefault}' alt='${pokemon.name} sprite' />
        <h3>Data</h3>
        <ul>
          <li>Order: ${pokemon.order}</li>
          <li>Height: ${pokemon.height}</li>
          <li>Weight: ${pokemon.weight}</li>
        </ul>
      </section>
      <footer><p><a href='/'>Go to pokedex</a></p></footer>`;
  }
}
