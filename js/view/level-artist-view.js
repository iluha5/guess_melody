import {AbstractView} from "./abstract-view";
import {getLevelArtistHTML} from "../templates/answer-artist";
import {getCircleHTML} from "../templates/circle";
import {getTimerHTML} from "../templates/timer";
import {getElementByString} from "../utils/utils";

class LevelArtistView extends AbstractView {
  constructor(artistObj, user) {
    super();
    this._artistObj = artistObj;
    this._user = user;
    this._element = null;
  }

  get template() {
    const mainTimer = `<div class="main-timer"></div>`;
    return `<section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          ${getCircleHTML()}
        </svg>
        ${getTimerHTML(this._user.timeLeft)}
        <div class="main-wrap">
          ${mainTimer}
          <h2 class="title main-title">Кто исполняет эту песню?</h2>
          <div class="player-wrapper"></div>
          <form class="main-list">
          ${this._artistObj.answer.map((song) => getLevelArtistHTML(song.artist, song.id, song.id, song.src)).join(``)}
          </form>
        </div>
      </section>`;
  }

  _bind() {
    const mainListElement = this._element.querySelector(`.main-list`);

    mainListElement.addEventListener(`click`, this.onMainListElementClick);
  }

  onMainListElementClick() {}

  renderTimer(element, timeLeft) {
    const newTimerEl = getElementByString(getTimerHTML(timeLeft));

    const timerEl = element.querySelector(`.timer-value`);
    timerEl.parentNode.replaceChild(newTimerEl, timerEl);
  }

  initPlayer(linkToFile) {
    const playerWrapper = this.element.querySelector(`.player-wrapper`);
    let destroyPlayer = window.initializePlayer(playerWrapper, linkToFile, true);

    return destroyPlayer;
  }

}

export {LevelArtistView};
