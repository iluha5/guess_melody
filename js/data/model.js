class Model {
  constructor() {
    this.QUESTION_TYPE = {
      GENRE: `genre`,
      ARTIST: `artist`
    };

    this.GENRE = {
      COUNTRY: `country`,
      BLUES: `blues`,
      FOLK: `folk`,
      CLASSICAL: `classical`,
      ELECTRONIC: `electronic`,
      HIP_HOP: `hip-hop`,
      JAZZ: `jazz`,
      POP: `pop`,
      ROCK: `rock`,
      DANCE: `dance`
    };

    this.CONSTS = {
      IMAGE_LOAD_TIMEOUT: 15000,
      TRACK_LOAD_TIMEOUT: 30000
    };

    this._picsArr = [];
  }

  get urlRead() {
    throw new Error(`Abstract method. Define the URL for model`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. Define the URL for model`);
  }

  set picsUrls(arr) {
    this._picsUrls = arr;
  }

  load() {
    const params = {
      mode: `no-cors`,
      header: {
        'Access-Control-Allow-Origin': `*`
      }
    };
    return fetch(this.urlRead)
      .then((resp) => resp.json());
  }

  send(data) {
    const init = {
      method: `POST`,
      headers: {
        'Accept': `application/json`,
        'Content-Type': `application/json`
      },
      body: JSON.stringify(data)
    };

    return fetch(this.urlWrite, init);
  }

  loadPics(urls) {
    return Promise.all(
        urls.map((url) => {
          return new Promise((resolve, reject) => {
            let timeout;
            const img = new Image();
            img.addEventListener(`load`, (evt) => {
              clearTimeout(timeout);
              resolve(url);
            }, false);
            img.src = url;
            timeout = setTimeout(() => reject(url), this.CONSTS.IMAGE_LOAD_TIMEOUT);
          });
        })
    );
  }

  loadTracks(tracksArr) {
    return Promise.all(
        tracksArr.map((url) => {
          return new Promise((resolve, reject) => {
            let timeout;
            const track = new Audio();
            track.addEventListener(`canplaythrough`, (evt) => {
              clearTimeout(timeout);
              resolve(url);
            }, false);
            track.src = url;
            timeout = setTimeout(() => reject(url), this.CONSTS.TRACK_LOAD_TIMEOUT);
          });
        })
    );
  }
}

export {Model};
