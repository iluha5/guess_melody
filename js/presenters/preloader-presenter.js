import {PreloaderView} from "../view/preloader-view";

class PreloaderPresenter {
  constructor() {
  }

  init() {
    this._preloaderView = new PreloaderView();
  }

  get welcomeViewElement() {
    return this._preloaderView.element;
  }

  renderScreen() {
    this._preloaderView.showScreen();
  }
}

export {PreloaderPresenter};
