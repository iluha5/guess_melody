const GENRES = {
  POP: `Попса`,
  ROCK: `Рок`,
  DANCE: `Танцевальная`
};

class Song {
  constructor(name, genre, artist, linkToFile = `.\\musics\\555.mp3`, image, isCorrect = false) {
    this._id = (Song.prototype.currID++);
    this._name = name;
    this._genre = genre;
    this._artist = artist;
    this._linkToFile = linkToFile;
    this._isCorrect = isCorrect;
    this._src = image || {url: `http://placehold.it/705x455`, width: 300, height: 300};
  }

  set id(id) {
    this._id = id;
  }

  get isCorrect() {
    return this._isCorrect;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get genre() {
    return this._genre;
  }

  get artist() {
    return this._artist;
  }

  get linkToFile() {
    return this._linkToFile;
  }

  get src() {
    return this._src;
  }

  static get GENRES() {
    return GENRES;
  }
}
Song.prototype.currID = 0;

// This array - for testing goal
const songs = [
  new Song(`song1`, Song.GENRES.POP, `Alex Fouly`, `.\\musics\\pop2.mp3`),
  new Song(`song2`, Song.GENRES.POP, `Dona`, `.\\musics\\pop1.mp3`),
  new Song(`song3`, Song.GENRES.ROCK, `Чиж`, `.\\musics\\chizh.mp3`),
  new Song(`song4`, Song.GENRES.ROCK, `Земфира`, `.\\musics\\zemfira.mp3`),
  new Song(`song5`, Song.GENRES.DANCE, `DanceBoy`, `.\\musics\\dance.mp3`),
];
export {songs, Song};
