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
const effectLevelSliderBox = imageUpload.querySelector('.effect-level');
const effectLevelSlider = imageUpload.querySelector('.effect-level__slider');
const effectLevelValue = imageUpload.querySelector('.effect-level__value');
const chromeEffectFilter = imageUpload.querySelector('#effect-chrome');
const sepiaEffectFilter = imageUpload.querySelector('#effect-sepia');
const marvinEffectFilter = imageUpload.querySelector('#effect-marvin');
const fobosEffectFilter = imageUpload.querySelector('#effect-phobos');
const heatEffectFilter = imageUpload.querySelector('#effect-heat');
const noneEffectFilter = imageUpload.querySelector('#effect-none');
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;
const SCALE_STEP_RANGE = 25;

const chromeEffectValues = {
  effectClass: 'effects__preview--chrome',
  minRange: 0,
  maxRange: 1,
  startRange: 1,
  stepRange: 0.1,
}

const sepiaEffectValues = {
  effectClass: 'effects__preview--sepia',
  minRange: 0,
  maxRange: 1,
  startRange: 1,
  stepRange: 0.1,
}

const marvinEffectValues = {
  effectClass: 'effects__preview--marvin',
  minRange: 0,
  maxRange: 100,
  startRange: 100,
  stepRange: 1,
}

const fobosEffectValues = {
  effectClass: 'effects__preview--phobos',
  minRange: 0,
  maxRange: 3,
  startRange: 3,
  stepRange: 0.1,
}

const heatEffectValues = {
  effectClass: 'effects__preview--heat',
  minRange: 1,
  maxRange: 3,
  startRange: 3,
  stepRange: 0.1,
}

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
  if (!effectLevelSlider.noUiSlider) {
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
}

const destroyEffectSlider = function () {
  if (effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.reset();
    effectLevelSlider.noUiSlider.destroy();
  }
}

const setEffectsValues = function ({
  effectClass,
  minRange,
  maxRange,
  startRange,
  stepRange,
}) {
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
  effectLevelSliderBox.style.display = 'none';

  for (let i = 0; i < effectsRadio.length; i++) {
    effectsRadio[i].addEventListener('click', () => {

      if (noneEffectFilter.checked) {
        effectLevelSliderBox.style.display = 'none';
        destroyEffectSlider();
      } else {
        effectLevelSliderBox.style.display = 'block';
        createEffectSlider();
      }

      if (chromeEffectFilter.checked) {
        setEffectsValues(chromeEffectValues);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'grayscale(' + effectLevelValue.value + ')';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--chrome');
      }

      if (sepiaEffectFilter.checked) {
        setEffectsValues(sepiaEffectValues);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'sepia(' + effectLevelValue.value + ')';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--sepia');
      }

      if (marvinEffectFilter.checked) {
        setEffectsValues(marvinEffectValues);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'invert(' + effectLevelValue.value + '%)';
        });
      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--marvin');
      }

      if (fobosEffectFilter.checked) {
        setEffectsValues(fobosEffectValues);

        effectLevelSlider.noUiSlider.on('update', () => {
          imgUploadPreviewImage.style.filter = 'blur(' + effectLevelValue.value + 'px)';
        });

      } else {
        imgUploadPreviewImage.classList.remove('effects__preview--phobos');
      }

      if (heatEffectFilter.checked) {
        setEffectsValues(heatEffectValues);

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
  imageUploadFrom.removeEventListener('submit', onFormSubmit);
  uploadFile.value = '';
  clearFormData();
}

const addTransformScale = function (element) {
  const transofrmScaleValue = scaleControl.value / 100;
  element.style.transform = 'scale(' + transofrmScaleValue + ')';
}

const clearScaleControl = function () {
  scaleControl.value = SCALE_MAX_VALUE;
  addTransformScale(imgUploadPreviewImage);
  scaleControl.value += '%';
}

const clearFormData = function () {
  noneEffectFilter.checked = true;
  hashtagInput.value = '';
  commentInput.value = '';
  clearScaleControl();
  destroyEffectSlider();
}

const onFormSubmit = function (evt) {
  evt.preventDefault();
  sendData(showSuccessPopup, showErrorPopup, new FormData(evt.target));
  closeimageEditing(evt);
}

uploadFile.addEventListener('change', () => {
  imageEditing.classList.remove('hidden');
  htmlBody.classList.add('modal-open');
  uploadClose.addEventListener('click', closeimageEditing);
  document.addEventListener('keydown', onEscDown);
  setImageEffects();
  checkCommentInputValues();
  checkHashtagInputValues();
  imageUploadFrom.addEventListener('submit', onFormSubmit);
})

scaleControlSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  const scaleControlCurrentValue = Number(scaleControl.value.slice(0, -1));

  if (scaleControlCurrentValue > SCALE_MIN_VALUE) {
    scaleControl.value = scaleControlCurrentValue - SCALE_STEP_RANGE;
    addTransformScale(imgUploadPreviewImage);
    scaleControl.value += '%';
  }
})

scaleControlBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  const scaleControlCurrentValue = Number(scaleControl.value.slice(0, -1));

  if (scaleControlCurrentValue < SCALE_MAX_VALUE) {
    scaleControl.value = scaleControlCurrentValue + SCALE_STEP_RANGE;
    addTransformScale(imgUploadPreviewImage);
    scaleControl.value += '%';
  }
})

export {
  imgUploadPreviewImage,
  onEscDown
}
