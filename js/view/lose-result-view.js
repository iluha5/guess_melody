import {AbstractView} from "./abstract-view";

class LoseResultView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main main--result">
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <h2 class="title">Вы проиграли</h2>
        <div class="main-stat">Ничего, вам повезет в следующий раз</div>
        <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
      </section>`;
  }

  _bind() {
    const mainReplay = this._element.querySelector(`.main-replay`);
    this.onMainReplayClick = this.onMainReplayClick.bind(this);

    mainReplay.addEventListener(`click`, this.onMainReplayClick);
  }

  onMainReplayClick() {}

}

export {LoseResultView};
