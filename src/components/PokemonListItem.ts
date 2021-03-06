import { iComponent } from "../interfaces/iComponent";
import { iPokemonListElement } from "../interfaces/iPokemonListElements";
import { Component } from "./Component";

export class PokemonListItem extends Component implements iComponent {
  constructor(public selector: string, public pokemon: iPokemonListElement) {
    super(selector, () => this.createTemplate());
    this.render();
  }

  createTemplate(): string {
    return `<a class='pokemon-list__item-link' href="/?search=${this.pokemon.name}">
        <img src="${this.pokemon.sprite}" />
        <p class="pokemon-list__item-name">${this.pokemon.name}</p>
    </a>`;
  }
}
