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
      return `<h1>${this.alias ? this.alias : this.name}</h1>
        <img src="${this.sprite}" alt="${this.name} sprite" />
        <div class="team-card__button-panel">
            <a href="/?search=${this.name}">Details</a>
            <button data-role="edit">Edit</button>
            <button data-role="delete">Set free</button>
        </div>
    `;
    } else {
      return `<h1><input type="text" value="${
        this.alias ? this.alias : this.name
      }" /></h1>
        <img src="${this.sprite}" alt="${this.name} sprite" />
        <div class="team-card__button-panel">
            <button data-role="save">Save</button>
            <button data-role="cancel">Cancel</button>
        </div>
    `;
    }
  }
}
