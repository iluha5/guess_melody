import {AbstractView} from "./abstract-view";
import {getAnswerGenreHTML} from "../templates/answer-genre";
import {getCircleHTML} from "../templates/circle";
import {getTimerHTML} from "../templates/timer";
import {getElementByString} from "../utils/utils";

class LevelGenreView extends AbstractView {
  constructor(genreObj, user) {
    super();

    this._genreObj = genreObj;
    this._user = user;
    this._element = null;
    this._sendButton = null;
  }

  get template() {
    let sendBut = `<button class="genre-answer-send" type="submit">Отправить</button>`;
    return `<section class="main main--level main--level-genre">
      <h2 class="title">Выберите все песни<br> с жанром: ${this._genreObj.genre}</h2>
      <form class="genre">
        ${this._genreObj.answers.map((song) => getAnswerGenreHTML(song.id, song.id, song.genre)).join(``)}
        ${sendBut}
      </form>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      ${getCircleHTML()}
    </svg>      
    ${getTimerHTML(this._user.timeLeft)}
    </section>`;

  }

  get sendButton() {
    if (!this._sendButton) {
      this._sendButton = this.element.querySelector(`.genre-answer-send`);
    }
    return this._sendButton;
  }

  _bind() {
    this.onChangeGenreElement = this.onChangeGenreElement.bind(this);
    this.onClickSendButton = this.onClickSendButton.bind(this);

    this.sendButton.disabled = true;

    this.element.addEventListener(`change`, this.onChangeGenreElement);
    this.sendButton.addEventListener(`click`, this.onClickSendButton);

    const labels = this.element.querySelectorAll(`.genre-answer-check`);
    labels.forEach((label) => {
      label.addEventListener(`click`, this.onClickToMelody);
    });
  }

  onChangeGenreElement() {}

  onClickToMelody() {}

  onClickSendButton() {}

  renderTimer(element, timeLeft) {
    const newTimerEl = getElementByString(getTimerHTML(timeLeft));

    const timerEl = element.querySelector(`.timer-value`);
    timerEl.parentNode.replaceChild(newTimerEl, timerEl);
  }

  initPlayer(genreScreenData) {
    const playerWrappersArr = this.element.querySelectorAll(`.player-wrapper`);
    let destroyPlayersArr = [];
    let i = 0;
    let autoPlay = false;

    playerWrappersArr.forEach((playerWrapper) => {
      // debugger;
      autoPlay = !!(i === 0);
      destroyPlayersArr[i] = window.initializePlayer(playerWrapper, genreScreenData.answers[i].linkToFile, autoPlay);
      i++;
    });

    return destroyPlayersArr;
  }

}

export {LevelGenreView};
