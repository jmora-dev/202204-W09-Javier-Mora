import { iComponent } from "../interfaces/iComponent";
import { iPokemonDetails } from "../interfaces/iPokemonDetails";
import { insertPokemonInTeam } from "../services/firebasePokemonTeam";
import { Component } from "./Component";

enum CATCHING_STATUS {
  IDLE,
  CATCHING,
  SUCCESS,
  FAIL,
}

export class CatchButton extends Component implements iComponent {
  catchingStatus = CATCHING_STATUS.IDLE;
  currentTeamSize = 0;

  constructor(public selector: string, public pokemonDetails: iPokemonDetails) {
    super(selector, () => this.createTemplate());
    this.outRender();
  }

  outRender(): void {
    super.render();
    document
      .querySelector(this.selector)
      ?.addEventListener("click", () => this.catchPokemon(this.pokemonDetails));
  }

  catchPokemon(pokemon: iPokemonDetails) {
    this.catchingStatus = CATCHING_STATUS.CATCHING;
    this.outRender();
    insertPokemonInTeam({
      id: pokemon.id.toString(),
      alias: "",
      name: pokemon.name,
      sprite: pokemon.spriteDefault,
    })
      .then(() => (this.catchingStatus = CATCHING_STATUS.SUCCESS))
      .catch(() => (this.catchingStatus = CATCHING_STATUS.FAIL))
      .finally(() => this.outRender());
  }

  createTemplate(): string {
    switch (this.catchingStatus) {
      case CATCHING_STATUS.IDLE:
      default:
        return "<button data-role='catch' class='button'>Catch for team</button>";
      case CATCHING_STATUS.CATCHING:
        return "<button data-role='catch' class='button'>Search and catch...</button>";
      case CATCHING_STATUS.FAIL:
        return "<button data-role='catch' class='button'>Cath fail</button>";
      case CATCHING_STATUS.SUCCESS:
        return `<button data-role='catch' class='button'>Catch success</button>`;
    }
  }
}
