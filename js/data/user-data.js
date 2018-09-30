const USER_CONSTS = {
  MAX_ERRORS: 3,
  GAME_TIME: 120,
  MAX_GAME_STEPS: 10
};

const initUser = Object.freeze({
  name: `iluha`,
  errorsLeft: USER_CONSTS.MAX_ERRORS,
  timeLeft: USER_CONSTS.GAME_TIME,
  points: 0,
  answers: 0,
  stepsLeft: USER_CONSTS.MAX_GAME_STEPS
});

const setName = (user, name) => {
  if (typeof name !== `string`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.name = name;

  return newUser;
};

const setErrorsLeft = (user, errorsLeft) => {
  if (typeof errorsLeft !== `number`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.errorsLeft = errorsLeft;

  return newUser;
};

const setPoints = (user, points) => {
  if (typeof points !== `number`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.points = points;

  return newUser;
};

const setAnswers = (user, answers) => {
  if (typeof answers !== `number`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.answers = answers;

  return newUser;
};

const setStepsLeft = (user, stepsLeft) => {
  if (typeof stepsLeft !== `number`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.stepsLeft = stepsLeft;

  return newUser;
};

const setTimeLeft = (user, timeLeft) => {
  if (typeof timeLeft !== `number`) {
    return -1;
  }
  const newUser = Object.assign({}, user);
  newUser.timeLeft = timeLeft;

  return newUser;
};


export {initUser, setErrorsLeft, setName, setPoints, setStepsLeft, setTimeLeft, setAnswers, USER_CONSTS};
