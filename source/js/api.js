import {
  showAlertPopup
} from './util.js'

const GET_DATA_URL = 'https://22.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/kekstagram';

const getData = function (onSuccess) {
  fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((comments) => {
      onSuccess(comments);
    })
    .catch((error) => {
      showAlertPopup(error);
    });
}

const sendData = function (onSuccess, onFail, body) {
  fetch(SEND_DATA_URL, {
    method: 'POST',
    body,
  }).then((response) => {
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
