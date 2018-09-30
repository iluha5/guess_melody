import {AbstractView} from "./abstract-view";

class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main main--welcome"> 
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты — за 2 минуты дать максимальное количество правильных ответов.<br>Удачи!
        </p> 
      </section>`;
  }

  _bind() {
    const playButton = this.element.querySelector(`.main-play`);

    playButton.addEventListener(`click`, this.onPlayButtonClick);
  }

  onPlayButtonClick() {}
}

export {WelcomeView};
