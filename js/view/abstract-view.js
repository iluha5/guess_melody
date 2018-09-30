import {showScreen} from "../utils/show-screen";

class AbstractView {
  constructor() {
    this._element = null;
  }

  get template() {
    throw new Error(`Abstract method called. You should specify template method`);
  }

  _render(template) {
    template = template.trim();

    let el = document.createElement(`DIV`);
    el.innerHTML = template;

    return el.firstChild;
  }

  _bind() {}

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this._render(this.template);
    this._bind();

    return this._element;
  }

  showScreen() {
    showScreen(this.element);
  }
}

export {AbstractView};
