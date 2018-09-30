import {getTimerHTML} from "../templates/timer";
import {setTimeLeft, USER_CONSTS} from "../data/user-data";
import {Stat} from "../data/stats";

const GLOBAL_CONST = Object.freeze({
  ERRORS_OVER: 1,
  TIME_OVER: 2,
  STEPS_OVER: 3,
  USER_WINS: 11,
  USER_LOSE: 12,
  GAME_IN_PROGRESS: -1
});

const getElementByString = (htmlString) => {
  htmlString = htmlString.trim();

  let el = document.createElement(`DIV`);
  el.innerHTML = htmlString;

  return el.firstChild;
};

const getHtmlFromClassName = (className) => {
  const templateElement = document.querySelector(`#templates`);
  let currElement;

  if (`content` in templateElement) {
    currElement = templateElement.content.querySelector(`.${className}`);
  } else {
    currElement = templateElement.querySelector(`.${className}`);
  }

  const container = document.createElement(`div`);
  container.appendChild(currElement);

  return container.innerHTML;
};

const getGameOverStatus = (user) => {
  if (user.errorsLeft === 0) {
    return GLOBAL_CONST.ERRORS_OVER;
  }
  if (user.timeLeft <= 0) {
    return GLOBAL_CONST.TIME_OVER;
  }
  if (user.stepsLeft === 0) {
    return GLOBAL_CONST.STEPS_OVER;
  }
  return -1;
};

const getVerdict = (gameOverVerdict) => {
  if (gameOverVerdict === GLOBAL_CONST.STEPS_OVER) {
    return GLOBAL_CONST.USER_WINS;
  }
  if ((gameOverVerdict === GLOBAL_CONST.ERRORS_OVER) || (gameOverVerdict === GLOBAL_CONST.TIME_OVER)) {
    return GLOBAL_CONST.USER_LOSE;
  }

  return GLOBAL_CONST.GAME_IN_PROGRESS;
};

const changeTimer = (user, element) => {
  if (user.timeLeft === 0) {
    return;
  }

  user.timeLeft = setTimeLeft(user, (user.timeLeft - 1)).timeLeft;

  const newTimerEl = getElementByString(getTimerHTML(user.timeLeft));

  const timerEl = element.querySelector(`.timer-value`);
  timerEl.parentNode.replaceChild(newTimerEl, timerEl);
};

const addToStats = (statistics, user) => {
  const newStatistics = statistics.map((stat) => {
    return Object.assign(stat);
  });
  const newStat = new Stat(user.name, +(USER_CONSTS.GAME_TIME - user.timeLeft), user.answers, user.points);
  newStatistics.push(newStat);

  return [newStatistics, newStat];
};

const sortStats = (statistics) => {
  // console.log(statArr);
  if (!Array.isArray(statistics)) {
    return -1;
  }
  if (!statistics.every((el) => el.toString() === `Stat`)) {
    return -1;
  }

  const newStatistics = statistics.map((stat) => {
    return Object.assign(stat);
  });

  newStatistics.sort((a, b) => {
    return b.answers - a.answers;
  });

  newStatistics.sort((a, b) => {
    if (a.answers !== b.answers) {
      return 0;
    }
    return a.time - b.time;
  });

  return newStatistics;
};

const getPercentages = (statisticsArr, statEl) =>{
  const index = statisticsArr.indexOf(statEl);
  return parseInt((statisticsArr.length - index - 1) / statisticsArr.length * 100, 10);
};

export {getElementByString, getHtmlFromClassName, getGameOverStatus, GLOBAL_CONST, getVerdict, changeTimer, sortStats, addToStats, getPercentages};
