import assert from 'assert';
import {Artist} from "./artist-data";
import {songs} from "./songs";

describe(`artist-data.js`, () => {
  describe(`Testing Artist constructor`, () => {
    it(`New Artist object should have the same Song obj - in song value and in answer value (one of 3 Songs obj)`, () => {
      const artist = new Artist(songs);

      assert(artist._answers.indexOf(artist._song) !== -1);
    });

    it(`New Artist object should have answer value (array of 3 Song) with 3 different Song objects`, () => {
      const artist = new Artist(songs);
      const map = new Map(artist._answers.map((el) => [el, el]));
      let mapSize = map.size;
      let artistSize = artist._answers.length;
      assert(mapSize === artistSize);
      assert(mapSize === 3);
    });
  });
});
