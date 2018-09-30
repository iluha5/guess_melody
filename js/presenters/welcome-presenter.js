import {WelcomeView} from "../view/welcome-view";
import {Application} from "../application";

class WelcomePresenter {
  constructor() {
  }

  init() {
    this._welcomeView = new WelcomeView();

    this._welcomeView.onPlayButtonClick = (evt) => {
      Application.setHash(Application.URLS.GAME);
    };
  }

  get welcomeViewElement() {
    return this._welcomeView.element;
  }

  renderScreen() {
    this._welcomeView.showScreen();
  }
}

export {WelcomePresenter};

