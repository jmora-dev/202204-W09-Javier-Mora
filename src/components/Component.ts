export abstract class Component {
  constructor(public selector: string, public callback: () => string) {}
  render(): void {
    const element = document.querySelector(this.selector);
    if (element) {
      element.innerHTML = this.callback();
    }
  }
  outRender(): void {
    const element = document.querySelector(this.selector);
    if (element) {
      element.outerHTML = this.callback();
    }
  }
  addRender(): void {
    const element = document.querySelector(this.selector);
    if (element) {
      element.innerHTML += this.callback();
    }
  }
}
