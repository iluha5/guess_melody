import {GLOBAL_CONST} from "../utils/utils";
import {LoseResultView} from "../view/lose-result-view";
import {Application} from "../application";
import {WinResultView} from "../view/win-result-view";
import {Stat} from "../data/stats";

class GameOverPresenter {
  constructor(user, stats) {
    this._user = user;
    this._stats = stats;
  }

  get statPercentages() {
    return Stat.getStatPercentages(this._user);
  }

  get _getLoseResultView() {
    let loseResultView = new LoseResultView();

    loseResultView.onMainReplayClick = (evt) => {
      Application.setHash(Application.URLS.WELCOME);
    };

    return loseResultView;
  }

  get _getWinResultView() {
    let winResultView = new WinResultView(this._user, Stat.getStatPercentages(this._user, this._stats));

    winResultView.onMainReplayClick = (evt) => {
      Application.setHash(Application.URLS.WELCOME);
    };

    return winResultView;
  }

  renderScreen(verdict) {
    switch (verdict) {
      case GLOBAL_CONST.USER_WINS:
        this._getWinResultView.showScreen();
        return;
      case GLOBAL_CONST.USER_LOSE:
        this._getLoseResultView.showScreen();
        return;
    }
  }
}

export {GameOverPresenter};
