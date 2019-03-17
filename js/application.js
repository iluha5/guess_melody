import {GamePresenter} from "./presenters/game-presenter";
import {Hash} from "./utils/hash";
import {WelcomePresenter} from "./presenters/welcome-presenter";
import {GameOverPresenter} from "./presenters/game-over-presenter";
import {Model} from "./data/model";
import {Adapter} from "./utils/adapter";
import {GLOBAL_CONST} from "./utils/utils";
import {PreloaderPresenter} from "./presenters/preloader-presenter";

class Application {
  static init() {
    this.URLS = {
      'WELCOME': ``,
      'GAME': `game`,
      'GAME_OVER': `game_over`
    };

    this._gameData = null;
    this._picsUrls = null;

    this._model = new class extends Model {
      get urlRead() {
        return `http://localhost:3000/questions`;
        // return `http://178.62.215.132:8083/questions`;
        // return `http://142.93.129.161:8084/api/v1/questions`;

      }
    }();

    this._adapter = Adapter.getInstance;

    this.showPreloader();

    this._model.load()
      .then((gameData) => {
        this._gameData = gameData;
        this._picsUrls = [];
        this._tracksUrls = [];
        gameData.forEach((screenData) => {
          if (screenData.type === `artist`) {
            screenData.answers.forEach((image) => this._picsUrls.push(image.image.url));
            this._tracksUrls.push(screenData.src);
          }
          if (screenData.type === `genre`) {
            screenData.answers.forEach((track) => this._tracksUrls.push(track.src));
          }
        });

      })
      .then(() => this._model.loadPics(this._picsUrls))
      .then(() => this._model.loadTracks(this._tracksUrls))
      .then(() => this._adapter.getAdapted(this._gameData))
      .then((adaptedGameData) => this.setup(adaptedGameData))
      .catch((err) => {
        // window.console.error(err);
        window.console.error(`Loading data error`, err);
        window.alert(`Ошибка загрузки данных, пожалуйста, обновите страницу!`);      });
  }

  static setup(gameData) {
    this._gameData = gameData;
    this._bind();

    let hash = Hash.get();

    this.router(hash);
  }

  static router(hash) {
    switch (hash) {
      case this.URLS.WELCOME:
        this.showWelcome();
        break;
      case this.URLS.GAME:
        this.showGame(this._gameData);
        break;
      case this.URLS.GAME_OVER:
        if (this._gamePresenter.verdict === GLOBAL_CONST.USER_WINS) {
          this._model = new class extends Model {
            get urlRead() {
              return `http://localhost:3000/stats`;
              // return `http://178.62.215.132:8083/stats`;
              // return `http://142.93.129.161:8084/api/v1/stats`;
            }
            get urlWrite() {
              return `http://localhost:3000/stats`;
              // return `http://178.62.215.132:8083/stats`;
              // return `http://142.93.129.161:8084/api/v1/stats`;
            }
          }();

          const sendData = this._adapter.getAdapdetUser(this._gamePresenter.user);
          this._model.send(sendData)
            .catch((err) => window.console.error(err));


          this._model.load()
            .then((stats) => this._adapter.getAdaptedStats(stats))
            .then((adaptedStats) => this.showGameOver(adaptedStats))
            .catch((err) => window.console.error(err));
        } else {
          this.showGameOver();
        }
        break;
      default:
        this.setHash(this.URLS.WELCOME);
        break;
    }
  }

  static _bind() {
    window.addEventListener(`hashchange`, () => {
      let hash = Hash.get();
      hash = hash.replace(`#`, ``);

      this.router(hash);
    });
  }

  static setHash(hash = ``) {
    Hash.set(hash);
  }

  static showPreloader() {
    this._preloaderPresenter = new PreloaderPresenter();
    this._preloaderPresenter.init();
    this._preloaderPresenter.renderScreen();
  }

  static showWelcome() {
    this._welcomePresenter = new WelcomePresenter();
    this._welcomePresenter.init();
    this._welcomePresenter.renderScreen();
  }

  static showGame(gameData) {
    this._gamePresenter = new GamePresenter(gameData);
    this._gamePresenter.renderRandomScreen();
  }

  static showGameOver(stats) {
    if (!this._gamePresenter) {
      this.showWelcome();
      return;
    }

    this._gameOverPresenter = new GameOverPresenter(this._gamePresenter.user, stats);
    this._gameOverPresenter.renderScreen(this._gamePresenter.verdict);
  }

}

export {Application};
