import {
  showAlertPopup
} from './util.js'

const getData = function (onSuccess) {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((comments) => {
      onSuccess(comments);
    })
    .catch((error) => {
      showAlertPopup(error);
    });
}

const sendData = function (onSuccess, onFail, body) {
  fetch(
    'https://22.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => onFail())
}

export {
  getData,
  sendData
}
