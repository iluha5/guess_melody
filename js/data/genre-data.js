class Genre {
  constructor(question, genre, answers) {
    this._question = question;
    this._genre = genre;

    if (!answers) {
      throw new Error(`No answers in Genre screen presented`);
    } else {
      this._answers = answers.slice(0);
    }
  }

  get question() {
    return this._question;
  }

  get genre() {
    return this._genre;
  }

  get answers() {
    return this._answers;
  }

  toString() {
    return `Genre`;
  }
}

export {Genre};

