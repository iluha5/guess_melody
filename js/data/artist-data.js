class Artist {
  constructor(question = `Кто исполняет эту песню?`, song, answer) {
    this._question = question;
    this._song = song;
    this._answers = answer;
  }

  get song() {
    return this._song;
  }

  set song(song) {
    this._song = song;
  }

  set songID(id) {
    this._song.id = id;
  }

  get answer() {
    return this._answers;
  }

  set answer(answerArr) {
    this._answers = answerArr;
  }

  toString() {
    return `Artist`;
  }
}

export {Artist};
