import {LevelArtistView} from "../view/level-artist-view";
import {getGameOverStatus, GLOBAL_CONST, getVerdict} from '../utils/utils';
import {setErrorsLeft, setStepsLeft, setPoints, setAnswers, setTimeLeft} from "../data/user-data";
import {LevelGenreView} from "../view/level-genre-view";
import {initUser, USER_CONSTS} from "../data/user-data";
import {Application} from "../application";


class GamePresenter {
  constructor(gameData) {
    this._gameData = gameData.slice(0);
    this._user = Object.assign({}, initUser);
    this._gameOverStatus = GLOBAL_CONST.GAME_IN_PROGRESS;
    this._verdict = GLOBAL_CONST.GAME_IN_PROGRESS;
    this._isInitCircle = false;
  }

  get verdict() {
    return this._verdict;
  }

  set verdict(verdict) {
    this._verdict = verdict;
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

  get _nextScreenData() {
    return this._gameData.splice(0, 1)[0];
  }

  get _nextView() {
    const nextScreen = this._nextScreenData;

    switch (nextScreen.toString()) {
      case `Genre`:
        return this._getGenreView(nextScreen);
      case `Artist`:
        return this._getArtistView(nextScreen);
    }

    throw new Error(`Invalid screen type in game config`);
  }

  renderRandomScreen() {
    this._nextView.showScreen();
    window.initializeCountdown(USER_CONSTS.GAME_TIME - this._user.timeLeft);
  }

  _changeTimer(user, element, viewEl) {
    if (user.timeLeft === 0) {
      this._gameOverStatus = getGameOverStatus(user);

      if (this._gameOverStatus !== GLOBAL_CONST.GAME_IN_PROGRESS) {
        clearInterval(this._timerId);
        if (this._destroyPlayer) {
          this._destroyPlayer();
          this._destroyPlayer = null;
        }
        this.verdict = getVerdict(this._gameOverStatus);

        Application.setHash(Application.URLS.GAME_OVER);
        return;
      }

      return;
    }

    user.timeLeft = setTimeLeft(user, (user.timeLeft - 1)).timeLeft;
    viewEl.renderTimer(element, user.timeLeft);
  }

  _getArtistView(data) {
    this._artistScreenData = data;
    this._artistView = new LevelArtistView(this._artistScreenData, this._user);

    this._artistView.onMainListElementClick = (evt) => {
      if (evt.target.classList.contains(`main-answer-r`)) {
        // debugger;
        if (+evt.target.value.substr(4, (evt.target.value.length - 4)) === this._artistScreenData.song.id) {
          this._user = setPoints(this._user, (this._user.points + 1));
          this._user = setAnswers(this._user, (this._user.answers + 1));
        } else {
          this._user = setErrorsLeft(this._user, (this._user.errorsLeft - 1));
        }
        this._user = setStepsLeft(this._user, (this._user.stepsLeft - 1));

        this._gameOverStatus = getGameOverStatus(this._user);
        if (this._gameOverStatus !== GLOBAL_CONST.GAME_IN_PROGRESS) {
          clearInterval(this._timerId);
          if (this._destroyPlayer) {
            this._destroyPlayer();
          }
          this._destroyPlayer = null;
          this.verdict = getVerdict(this._gameOverStatus);

          Application.setHash(Application.URLS.GAME_OVER);
          return;
        }

        if (this._destroyPlayer) {
          this._destroyPlayer();
        }
        this._destroyPlayer = null;
        clearInterval(this._timerId);

        this.renderRandomScreen();
      }
    };

    this._timerId = setInterval(this._changeTimer.bind(this, this._user, this._artistView.element, this._artistView), 1000);
    this._destroyPlayer = this._artistView.initPlayer(this._artistScreenData.song.linkToFile);

    return this._artistView;
  }

  _getGenreView(data) {
    this._genreScreenData = data;
    this._genreView = new LevelGenreView(this._genreScreenData, this._user);

    this._genreView.onClickToMelody = (evt) => {
      evt.target.classList.toggle(`genre-answer-check--checked`);

      const checkBoxes = Array.from(this._genreView.element.querySelectorAll(`.genre-answer-check`));
      this._genreView.sendButton.disabled = !checkBoxes.find((answ) => answ.classList.contains(`genre-answer-check--checked`));
    };

    this._genreView.onClickSendButton = (evt) => {
      evt.preventDefault();
      let inputs = this._genreView.element.querySelectorAll(`.genre-answer-check`);
      inputs = Array.from(inputs);

      // searching for user's errors in answers
      let isWrongAnswer = inputs.find((el) => {
        const id = +el.dataset.value.substr(7, el.dataset.value.length - 7);
        const song = this._genreScreenData.answers.filter((thisSong) => thisSong.id === id);
        const verd = ((song[0].genre === this._genreScreenData.genre) && el.classList.contains(`genre-answer-check--checked`))
          || ((song[0].genre !== this._genreScreenData.genre) && !el.classList.contains(`genre-answer-check--checked`));
        return !verd;
      });

      isWrongAnswer = typeof isWrongAnswer !== `undefined`;

      if (isWrongAnswer) {
        this._user = setErrorsLeft(this._user, (this._user.errorsLeft - 1));
      } else {
        this._user = setPoints(this._user, (this._user.errorsLeft + 1));
        this._user = setAnswers(this._user, (this._user.answers + 1));
      }
      this._user = setStepsLeft(this._user, (this._user.stepsLeft - 1));

      this._gameOverStatus = getGameOverStatus(this._user);

      if (this._gameOverStatus !== GLOBAL_CONST.GAME_IN_PROGRESS) {
        clearInterval(this._timerId);
        this._destroyPlayersArr.forEach((destroyPlayer) => destroyPlayer());
        this._destroyPlayersArr = [];
        this.verdict = getVerdict(this._gameOverStatus);

        Application.setHash(Application.URLS.GAME_OVER);
        return;
      }

      clearInterval(this._timerId);
      this._destroyPlayersArr.forEach((destroyPlayer) => destroyPlayer());
      this._destroyPlayersArr = [];
      this.renderRandomScreen();
    };

    this._timerId = setInterval(this._changeTimer.bind(this, this._user, this._genreView.element, this._genreView), 1000);
    this._destroyPlayersArr = this._genreView.initPlayer(this._genreScreenData);

    return this._genreView;
  }
}

export {GamePresenter};
