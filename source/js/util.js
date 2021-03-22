const htmlBody = document.querySelector('body');
const POPUP_SHOW_TIME = 4000;

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
  isEscEvent,
  htmlBody,
  showAlertPopup
};
