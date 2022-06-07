import { Component } from "../components/Component";
import { PokemonList } from "../components/PokemonList";
import { TeamList } from "../components/TeamList";
import { iComponent } from "../interfaces/iComponent";

export class Home extends Component implements iComponent {
  constructor(selector: string) {
    super(selector, () => this.createTemplate());
    this.render();
  }

  render(): void {
    super.render();
    new TeamList(this.selector + " .team-container");
    new PokemonList(this.selector + " .table-container");
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
