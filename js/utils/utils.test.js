import assert from 'assert';
import {Stat} from "../data/stats";
import {sortStats, getPercentages} from "./utils";

describe(`Testing utils.js:`, () => {
  describe(`Testing sortStats:`, () => {
    it(`should return sroted Array like output for 6 diff Stat objects`, () => {
      const output = [`John`, `Kriss`, `Dev`, `Alice`, `Iluha`, `Jimm`];

      let statistics = [
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Jimm`, 112, 8, 8),
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`Iluha`, 70, 8, 14)
      ];

      let newStat = sortStats(statistics);
      let newStatNames = newStat.map((stat) => stat.name);

      assert(newStatNames.every((el, i) => output[i] === el));
      // assert.equal(output, newStatNames);
      // assert.equal(output, newStatNames);
    });

    it(`should return sroted Array like output for 9 diff Stat objects`, () => {
      const output = [`John`, `Kriss`, `Dev`, `Alice`, `Iluha`, `Jimm`, `Iluha1`, `John1`, `Kriss1`];

      let statistics = [
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Jimm`, 112, 8, 8),
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`John1`, 80, 7, 14),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Kriss1`, 93, 7, 14),
        new Stat(`Iluha1`, 70, 7, 14)
      ];

      let newStat = sortStats(statistics);
      newStat = newStat.map((stat) => stat.name);

      assert(newStat.every((el, i) => output[i] === el));
    });

    it(`should return sroted Array like output for 9 Stat objects. Two of them have the same data`, () => {
      const output = [`John`, `Kriss`, `Dev`, `Alice`, `Iluha`, `Jimm`, `Kriss1`, `Iluha1`, `John1`];

      let statistics = [
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Jimm`, 112, 8, 8),
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`John1`, 80, 7, 14),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Kriss1`, 70, 7, 14),
        new Stat(`Iluha1`, 70, 7, 14)
      ];

      let newStat = sortStats(statistics);
      newStat = newStat.map((stat) => stat.name);

      assert(newStat.every((el, i) => output[i] === el));
    });

    it(`shouldn't return sorted Array like output (output is broken - wrong sorted row)`, () => {
      const output = [`John`, `Kriss`, `Alice`, `Dev`, `Iluha`, `Jimm`, `Kriss1`, `Iluha1`, `John1`];

      let statistics = [
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Jimm`, 112, 8, 8),
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`John1`, 80, 7, 14),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Kriss1`, 70, 7, 14),
        new Stat(`Iluha1`, 70, 7, 14)
      ];

      let newStat = sortStats(statistics);
      newStat = newStat.map((stat) => stat.name);
      assert(!newStat.every((el, i) => output[i] === el));
    });

    it(`Wrong input data (string instead array of Stat elements). Should return -1`, () => {
      let statistics = `bla`;
      let newStat = sortStats(statistics);
      assert.strictEqual(newStat, -1);
    });

    it(`Wrong input data - array with wrong elements types (not Stat elemenents). Should return -1`, () => {
      let statistics = [
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Jimm`, 112, 8, 8),
        {test: `test`},
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`John1`, 80, 7, 14),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Kriss1`, 70, 7, 14),
        new Stat(`Iluha1`, 70, 7, 14)
      ];

      let newStat = sortStats(statistics);
      assert.strictEqual(newStat, -1);
    });
  });

  describe(`Testing getPercentages:`, () => {
    it(`should return 66 fo 2th element of 6`, () => {
      let statistics = [
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Jimm`, 112, 8, 8)
      ];
      let stat = statistics[1];

      assert.strictEqual(getPercentages(statistics, stat), 66);
    });

    it(`should return 37 for 5th element of 8`, () => {
      let statistics = [
        new Stat(`John`, 80, 10, 14),
        new Stat(`Kriss`, 93, 10, 14),
        new Stat(`Dev`, 94, 9, 10),
        new Stat(`Alice`, 60, 8, 8),
        new Stat(`Iluha`, 70, 8, 14),
        new Stat(`Jimm`, 112, 8, 8),
        new Stat(`Jimm`, 114, 8, 8),
        new Stat(`Jimm`, 117, 8, 8)
      ];
      let stat = statistics[4];

      assert.strictEqual(getPercentages(statistics, stat), 37);
    });
  });
});
