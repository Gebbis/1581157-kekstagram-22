const htmlBody = document.querySelector('body');
const POPUP_SHOW_TIME = 4000;

const isLengthFit = function (checkedLine, maxLength) {
  return checkedLine.length <= maxLength;
}

const getRandomNumber = function (min, max) {
  min = Math.abs(Math.ceil(min));
  max = Math.abs(Math.floor(max));

  if (max < min) {
    let temp = max;
    max = min;
    min = temp;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; // Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
}

const randomNumbersList = function (quantity) {
  return new Array(quantity)
    .fill(null)
    .map((elem, idx) => idx + 1)
    .sort(() => Math.random() - 0.5);
}

const getRandomElement = function (array) {
  return array[getRandomNumber(0, array.length - 1)]
}

const isEscEvent = (evt) => {
  return evt.keyCode === 27;
};

const showAlertPopup = (message) => {
  const popupContainer = document.createElement('div');
  popupContainer.style.zIndex = 100;
  popupContainer.style.position = 'absolute';
  popupContainer.style.width = '300px';
  popupContainer.style.height = '200px';
  popupContainer.style.textTransform = 'none';
  popupContainer.style.left = '50%';
  popupContainer.style.top = '50%';
  popupContainer.style.padding = '10px 3px';
  popupContainer.style.fontSize = '22px';
  popupContainer.style.textAlign = 'center';
  popupContainer.style.backgroundColor = 'white';
  popupContainer.style.color = 'black';
  popupContainer.textContent = 'Произошла ошибка: ' + message;

  document.body.append(popupContainer);

  setTimeout(() => {
    popupContainer.remove();
  }, POPUP_SHOW_TIME);
}

export {
  isLengthFit,
  getRandomNumber,
  randomNumbersList,
  getRandomElement,
  isEscEvent,
  htmlBody,
  showAlertPopup
};
