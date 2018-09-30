const getLevelArtistHTML = (artist, id, value, src) => `<div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-${id}" name="answer" value="val-${value}" />
          <label class="main-answer" for="answer-${id}">
            <img class="main-answer-preview" src="${src.url}" width="${src.width}" height="${src.height}">
            ${artist}
          </label>
        </div>`;

export {getLevelArtistHTML};
