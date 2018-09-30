import {AbstractView} from "./abstract-view";

class WinResultView extends AbstractView {
  constructor(user, statPercentages) {
    super();
    this._user = user;
    this._percentages = statPercentages;
  }

  get template() {
    return `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
     <h2 class="title">Вы настоящий меломан!</h2>
      <div class="main-stat">За 2 минуты <br> вы отгадали ${this._user.answers} мелодии</div>
      <span class="main-comparison">Ваш результат выше чем у ${this._percentages}% игроков!</span>
      <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  _bind() {
    const mainReplay = this._element.querySelector(`.main-replay`);

    mainReplay.addEventListener(`click`, this.onMainReplayClick);
  }

  onMainReplayClick() {}
}

export {WinResultView};
