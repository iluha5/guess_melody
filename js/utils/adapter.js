import {Artist} from "../data/artist-data";
import {Song} from "../data/songs";
import {Genre} from "../data/genre-data";
import {Stat} from "../data/stats";

const GAME_TYPES = {
  GENRE: `genre`,
  ARTIST: `artist`
};

class Adapter {
  constructor(isGetInstance = false) {
    if (!isGetInstance) {
      throw new Error(`Singleton class. Use getInstance method`);
    }
  }

  static get getInstance() {
    this._instance = this._instance || new Adapter(true);
    return this._instance;
  }

  _getAdaptedArtist(artistObj) {
    this._artist = artistObj;

    let answerSong = new Song(null, null, null, this._artist.src);

    let answerArr = this._artist.answers.map((song) => {
      let newSong = new Song(null, null, song.title, null, song.image, song.isCorrect);
      if (newSong.isCorrect) {
        answerSong.id = newSong.id;
      }
      return newSong;
    });

    return new Artist(this._artist.question, answerSong, answerArr);
  }

  _getAdaptedGenre(genreObj) {
    this._genre = genreObj;

    let answers = this._genre.answers.map((song) => {
      return new Song(null, song.genre, null, song.src, null, null);
    });

    return new Genre(this._genre.question, this._genre.genre, answers);
  }

  getAdapted(gameData) {
    return gameData.map((screenData) => {
      switch (screenData.type) {
        case GAME_TYPES.GENRE:
          return this._getAdaptedGenre(screenData);
        case GAME_TYPES.ARTIST:
          return this._getAdaptedArtist(screenData);
        default:
          throw new Error(`Cannot resolve screenData type:${screenData.type}`);
      }
    });
  }

  getAdapdetUser(user) {
    return {
      "time": user.timeLeft,
      "answers": user.answers,
      "date": Date.now()
    };
  }

  getAdaptedStats(stats) {
    let newStats = [];
    stats.forEach((stat) => {
      newStats.push(new Stat(`Noname`, stat.time, stat.answers));
    });
    return newStats;
  }
}
export {Adapter};
