const getTimerHTML = (time) => `<div class="timer-value">
        <span class="timer-value-mins">0${Math.floor(time / 60)}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${time % 60 > 9 ? time % 60 : `0` + time % 60}</span>
      </div>`;

export {getTimerHTML};
