/* global noUiSlider:readonly */

import {
  htmlBody,
  isEscEvent
} from './util.js'

import {
  sendData
} from './api.js'

import {
  showSuccessPopup,
  showErrorPopup
} from './popups.js'

import {
  hashtagInput,
  commentInput,
  checkHashtagInputValues,
  checkCommentInputValues
} from './comment-checking.js'

const imageUpload = document.querySelector('.img-upload');
const imageUploadFrom = imageUpload.querySelector('.img-upload__form');
const uploadFile = imageUpload.querySelector('#upload-file');
const imageEditing = imageUpload.querySelector('.img-upload__overlay');
const uploadClose = imageUpload.querySelector('#upload-cancel');
const scaleControlSmaller = imageUpload.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUpload.querySelector('.scale__control--bigger');
const scaleControl = imageUpload.querySelector('.scale__control--value');
const imgUploadPreview = imageUpload.querySelector('.img-upload__preview');
const imgUploadPreviewImage = imgUploadPreview.querySelector('img');
const effectsRadio = imageUpload.querySelectorAll('.effects__radio');
const effectLevelSlider = imageUpload.querySelector('.effect-level__slider');
const effectLevelValue = imageUpload.querySelector('.effect-level__value');
const chromeEffectFilter = imageUpload.querySelector('#effect-chrome');
const sepiaEffectFilter = imageUpload.querySelector('#effect-sepia');
const marvinEffectFilter = imageUpload.querySelector('#effect-marvin');
const fobosEffectFilter = imageUpload.querySelector('#effect-phobos');
const heatEffectFilter = imageUpload.querySelector('#effect-heat');
const noneEffectFilter = imageUpload.querySelector('#effect-none');

const onEscDown = function (evt) {
  if (isEscEvent(evt)) {
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    } else if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    } else if (evt.target !== commentInput && evt.target !== hashtagInput) {
      closeimageEditing(evt);
    }
  }
}

const createEffectSlider = function () {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
  });
}

const setEffectsValues = function (effectClass, minRange, maxRange, startRange, stepRange) {

  imgUploadPreviewImage.classList.add(effectClass);
  effectLevelSlider.noUiSlider.reset();

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: minRange,
      max: maxRange,
    },
    start: startRange,
    step: stepRange,
  })
}

const setImageEffects = function () {

  for (let i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', () => {

      if (noneEffectFilter.checked) {
        effectLevelSlider.style.display = 'none';
        effectLevelSlider.noUiSlider.reset();
      } else {
        effectLevelSlider.style.display = 'block';
      }

      if (chromeEffectFilter.checked) {
        const EFFECT_CLASS = 'effects__preview--chrome';
        const MIN_RANGE = 0;
        const MAX_RANGE = 1;
        const START_RANGE = 0;
        const STEP_RANGE = 0.1;

        setEffectsValues(EFFECT_CLASS, MIN_RANGE, MAX_RANGE, START_RANGE, STEP_RANGE);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'grayscale(' + effectLevelValue.value + ')';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--chrome');
      }

      if (sepiaEffectFilter.checked) {
        const EFFECT_CLASS = 'effects__preview--sepia';
        const MIN_RANGE = 0;
        const MAX_RANGE = 1;
        const START_RANGE = 0;
        const STEP_RANGE = 0.1;

        setEffectsValues(EFFECT_CLASS, MIN_RANGE, MAX_RANGE, START_RANGE, STEP_RANGE);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'sepia(' + effectLevelValue.value + ')';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--sepia');
      }

      if (marvinEffectFilter.checked) {
        const EFFECT_CLASS = 'effects__preview--marvin';
        const MIN_RANGE = 0;
        const MAX_RANGE = 100;
        const START_RANGE = 0;
        const STEP_RANGE = 1;

        setEffectsValues(EFFECT_CLASS, MIN_RANGE, MAX_RANGE, START_RANGE, STEP_RANGE);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'invert(' + effectLevelValue.value + '%)';
        });
      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--marvin');
      }

      if (fobosEffectFilter.checked) {
        const EFFECT_CLASS = 'effects__preview--phobos';
        const MIN_RANGE = 0;
        const MAX_RANGE = 3;
        const START_RANGE = 0;
        const STEP_RANGE = 0.1;

        setEffectsValues(EFFECT_CLASS, MIN_RANGE, MAX_RANGE, START_RANGE, STEP_RANGE);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'blur(' + effectLevelValue.value + 'px)';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--phobos');
      }

      if (heatEffectFilter.checked) {
        const EFFECT_CLASS = 'effects__preview--heat';
        const MIN_RANGE = 1;
        const MAX_RANGE = 3;
        const START_RANGE = 0;
        const STEP_RANGE = 0.1;

        setEffectsValues(EFFECT_CLASS, MIN_RANGE, MAX_RANGE, START_RANGE, STEP_RANGE);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'brightness(' + effectLevelValue.value + ')';
        });
      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--heat');
      }
    })
  }
};

const closeimageEditing = function (evt) {
  evt.preventDefault();
  imageEditing.classList.add('hidden');
  htmlBody.classList.remove('modal-open');
  uploadClose.removeEventListener('click', closeimageEditing);
  document.removeEventListener('keydown', onEscDown);
  uploadFile.value = '';
  clearFormData();
}

const addTransformScale = function (element) {
  const transofrmScaleValue = scaleControl.value / 100;
  element.style.transform = 'scale(' + transofrmScaleValue + ')';
}

const clearFormData = function () {
  noneEffectFilter.checked = true;
  effectLevelSlider.style.display = 'none';
  effectLevelSlider.noUiSlider.reset();
  hashtagInput.value = '';
  commentInput.value = '';
}

const onFormSubmit = function () {
  imageUploadFrom.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(showSuccessPopup, showErrorPopup, new FormData(evt.target));
    clearFormData();
  })
}

uploadFile.addEventListener('change', () => {
  imageEditing.classList.remove('hidden');
  htmlBody.classList.add('modal-open');
  uploadClose.addEventListener('click', closeimageEditing);
  document.addEventListener('keydown', onEscDown);
  createEffectSlider();
  setImageEffects();
  checkCommentInputValues();
  checkHashtagInputValues();
  onFormSubmit();
})

scaleControlSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  const scaleControlCurrentValue = Number(scaleControl.value.slice(0, -1));

  if (scaleControlCurrentValue > 25) {
    scaleControl.value = scaleControlCurrentValue - 25;
    addTransformScale(imgUploadPreviewImage);
    scaleControl.value += '%';
  }
})

scaleControlBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  const scaleControlCurrentValue = Number(scaleControl.value.slice(0, -1));

  if (scaleControlCurrentValue < 100) {
    scaleControl.value = scaleControlCurrentValue + 25;
    addTransformScale(imgUploadPreviewImage);
    scaleControl.value += '%';
  }
})

export {
  imgUploadPreviewImage
}
