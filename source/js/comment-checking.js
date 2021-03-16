const imageUpload = document.querySelector('.img-upload');
const hashtagInput = imageUpload.querySelector('.text__hashtags');
const commentInput = imageUpload.querySelector('.text__description');
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const inputPattern = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;

const checkHashtagInputValues = function () {
  hashtagInput.addEventListener('input', () => {
    const hashtagsArray = hashtagInput.value.split(' ');
    let hashtagsSet = new Set();

    hashtagInput.setCustomValidity('');

    hashtagsArray.forEach(hashtagText => {
      const isLettersAndNumbers = inputPattern.test(hashtagText.slice(1));
      hashtagsSet.add(hashtagText.toLowerCase());

      if (hashtagText.length < MIN_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Не хватает ' + (MIN_HASHTAG_LENGTH - hashtagText.length) + ' символов или удалите пробел')
      } else if (hashtagText.length > MAX_HASHTAG_LENGTH) {
        hashtagInput.setCustomValidity('Удалите ' + (hashtagText.length - MAX_HASHTAG_LENGTH) + ' символов')
      } else if (!hashtagText.startsWith('#')) {
        hashtagInput.setCustomValidity('Хэштэг должен начинаться с символа #')
      } else if (!isLettersAndNumbers) {
        hashtagInput.setCustomValidity('Разрешены только буквы и цифры')
      }
    });

    if (hashtagsArray.length > MAX_HASHTAGS_COUNT) {
      hashtagInput.setCustomValidity('Удалите ' + (hashtagsArray.length - MAX_HASHTAGS_COUNT) + ' хэштэга');
    } else if (hashtagsSet.size !== hashtagsArray.length) {
      hashtagInput.setCustomValidity('Хэштэги не должны совпадать')
    }

    hashtagInput.reportValidity();
  });
}

const checkCommentInputValues = function () {
  commentInput.addEventListener('input', () => {
    const commentLength = commentInput.value.length;

    if (commentLength > MAX_COMMENT_LENGTH) {
      commentInput.setCustomValidity('Удалите ' + (commentLength - MAX_COMMENT_LENGTH) + ' символов');
    } else {
      commentInput.setCustomValidity('');
    }

    commentInput.reportValidity();
  })
}

export {
  hashtagInput,
  commentInput,
  checkCommentInputValues,
  checkHashtagInputValues
}
