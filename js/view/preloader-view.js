import {AbstractView} from "./abstract-view";

class PreloaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="main main--welcome"> 
        <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
        <span class="text">Загрузка данных..........</span>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты — за 2 минуты дать максимальное количество правильных ответов.<br>Удачи!
        </p> 
      </section>`;
  }

  _bind() {}
}

export {PreloaderView};
