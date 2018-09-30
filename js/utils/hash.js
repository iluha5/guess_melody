class Hash {

  static get() {
    return window.location.hash;
  }

  static set(hashData) {
    let hash = ``;
    switch (typeof hashData) {
      case `string`:
        hash = hashData.trim();
        window.location.hash = hash;
        break;
      case `Object`:
        for (let key in hashData) {
          if (hashData.hasOwnProperty(key)) {
            hash += `&` + key + `=` + hashData[key];
          }
        }
        window.location.hash = hash.substr(1);
        break;
    }
  }

  static setString(hashString) {
    window.location.hash = hashString;
  }


  static add(key, val) {
    let hash = this.get();

    hash[key] = val;
    this.set(hash);
  }

  static remove(key) {
    let hash = this.get();

    delete hash[key];
    this.set(hash);
  }

  static clear() {
    this.set({});
  }

}


export {Hash};

