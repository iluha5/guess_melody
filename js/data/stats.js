import {USER_CONSTS} from "./user-data";
import {addToStats, getPercentages, sortStats} from "../utils/utils";

class Stat {
  constructor(name = ``, time = 0, answers = 0, points = 0) {
    this.name = name;
    this.time = time;
    this.answers = answers;
    this.points = points;
  }
  toString() {
    return `Stat`;
  }

  static getStatistics() {
    return [
      new Stat(`Dev`, 94, 9, 10),
      new Stat(`Alice`, 60, 8, 8),
      new Stat(`Jimm`, 112, 8, 8),
      new Stat(`John`, 80, 10, 14),
      new Stat(`Kriss`, 93, 10, 14),
      new Stat(`Jimm`, 112, 7, 8),
      new Stat(`John`, 80, 7, 14),
      new Stat(`Kriss`, 33, 7, 14),
      new Stat(`Jimm`, 112, 7, 8),
      new Stat(`John`, 80, 7, 14),
      new Stat(`Kriss`, 33, 7, 14),
    ];
  }

  static addToStats(statistics, user) {
    const newStatistics = statistics.map((stat) => {
      return Object.assign(stat);
    });
    const newStat = new Stat(user.name, +(USER_CONSTS.GAME_TIME - user.timeLeft), user.answers, user.points);
    newStatistics.push(newStat);

    return [newStatistics, newStat];
  }

  static sortStats(statistics) {
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
  }

  static getPercentagesFromSortArr(statisticsArr, statEl) {
    const index = statisticsArr.indexOf(statEl);
    return parseInt((statisticsArr.length - index - 1) / statisticsArr.length * 100, 10);
  }

  static getStatPercentages(user, stats) {
    let [newStatArr, newStatEl] = addToStats(stats, user);
    newStatArr = sortStats(newStatArr);
    return getPercentages(newStatArr, newStatEl);
  }
}

const statArr = Stat.getStatistics();

export {statArr, Stat};
