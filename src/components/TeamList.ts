import { iComponent } from "../interfaces/iComponent";
import { iPokemonTeam } from "../interfaces/iPokemonTeam";
import {
  deletePokemonFromTeam,
  getPokemonTeam,
  updateAliasPokemonFromTeam,
} from "../services/firebasePokemonTeam";
import { responseToPokemonTeam } from "../utils/responseToPokemonTeam";
import { Component } from "./Component";
import { TeamCard } from "./TeamCard";

export class TeamList extends Component implements iComponent {
  pokemonTeam: Array<iPokemonTeam> = [];
  constructor(public selector: string) {
    super(selector, () => this.createTemplate());
    this.render();
    this.updatePokemonTeam();
  }

  updatePokemonTeam() {
    getPokemonTeam()
      .then((res) => res.json())
      .then((res) => (this.pokemonTeam = responseToPokemonTeam(res)))
      .catch(() => (this.pokemonTeam = []))
      .finally(() => this.render());
  }

  onChangeAlias(id: string, newAlias: string): void {
    updateAliasPokemonFromTeam(id, newAlias).then(() =>
      this.updatePokemonTeam()
    );
  }

  onDelete(id: string): void {
    deletePokemonFromTeam(id).then(() => this.updatePokemonTeam());
  }

  render(): void {
    super.render();
    this.pokemonTeam.forEach((pokemon) => {
      new TeamCard(
        this.selector + ` [data-id="${pokemon.id}"]`,
        pokemon.alias,
        pokemon.name,
        pokemon.sprite,
        ((newAlias: string) => this.onChangeAlias(pokemon.id, newAlias)).bind(
          this
        ),
        (() => this.onDelete(pokemon.id)).bind(this)
      );
    });
  }

  createTemplate(): string {
    let html = "<ul class='team-list'>";
    html += this.pokemonTeam
      .map((pokemon) => `<li data-id="${pokemon.id}"></li>`)
      .join("");
    html += "</ul>";
    return html;
  }
}
