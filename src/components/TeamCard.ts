import { iComponent } from "../interfaces/iComponent";
import { Component } from "./Component";

export class TeamCard extends Component implements iComponent {
  editable = false;
  constructor(
    public selector: string,
    public alias: string,
    public name: string,
    public sprite: string,
    public onChangeAlias: (newAlias: string) => void,
    public onDelete: () => void
  ) {
    super(selector, () => this.createTemplate());
    this.render();
  }

  render(): void {
    super.render();
    document
      .querySelectorAll(this.selector + " .team-card__button-panel button")
      .forEach((button) =>
        button.addEventListener("click", (e) => this.buttonHandler(e))
      );
  }

  buttonHandler(event: Event): void {
    const target = <HTMLElement>event.target;
    if (target.dataset.role === "edit") {
      this.editable = true;
      this.render();
    }
    if (target.dataset.role === "cancel") {
      this.editable = false;
      this.render();
    }
    if (target.dataset.role === "save") {
      const newAlias = (<HTMLInputElement>(
        document.querySelector(this.selector + " input")
      ))?.value;
      if (newAlias.trim() && newAlias.trim() !== this.name) {
        this.onChangeAlias(newAlias.trim());
      }
    }
    if (target.dataset.role === "delete") {
      this.onDelete();
    }
  }

  onEdit(): void {
    this.editable = true;
    this.render();
  }

  createTemplate(): string {
    if (!this.editable) {
      return `<div class="team-card">
      <h3>${this.alias ? this.alias : this.name}</h3>
        <img src="${this.sprite}" alt="${this.name} sprite" />
        <p class="team-card__pokemon-name">${this.name}</p>
        <div class="team-card__button-panel">
            <a href="/?search=${this.name}" class="button">Details</a>
            <button data-role="edit" class="button">Edit</button>
            <button data-role="delete" class="button">Set free</button>
        </div>
        </div>
    `;
    } else {
      return `<div class="team-card">
      <h3><input type="text" value="${
        this.alias ? this.alias : this.name
      }" /></h3>
        <img src="${this.sprite}" alt="${this.name} sprite" />
        <p class="team-card__pokemon-name">${this.name}</p>
        <div class="team-card__button-panel">
            <button data-role="save" class="button button--green">Save</button>
            <button data-role="cancel" class="button button--red">Cancel</button>
        </div>
        </div>
    `;
    }
  }
}
