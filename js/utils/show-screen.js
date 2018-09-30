const showScreen = (element) => {
  if (!element) {
    return;
  }
  const mainElement = document.querySelector(`.main`);
  const mainElementParent = mainElement.parentElement;
  mainElementParent.replaceChild(element, mainElement);
};

export {showScreen};
