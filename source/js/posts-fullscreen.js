import {
  isEscEvent,
  htmlBody
} from './util.js'

const bigPost = document.querySelector('.big-picture');
const commentsLoader = bigPost.querySelector('.comments-loader');
const closeBigPostButton = bigPost.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const visibleCommentsCount = document.querySelector('.social__visible-comment-count');
const commentTemplate = document.querySelector('#social__comment')
  .content
  .querySelector('.social__comment');

const createBigPost = function (element) {
  const commentsListFragment = document.createDocumentFragment();

  const {
    url,
    likes,
    description,
    comments,
  } = element;
  bigPost.querySelector('img').src = url;
  bigPost.querySelector('.likes-count').textContent = likes;
  bigPost.querySelector('.social__caption').textContent = description;
  bigPost.querySelector('.comments-count').textContent = comments.length;

  element.comments.forEach(({
    avatar,
    name,
    message,
  }) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    commentElement.classList.add('hidden');
    commentsListFragment.appendChild(commentElement);
  });

  commentsList.appendChild(commentsListFragment);
};

const clearCommentsList = function () {
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
}

const showHiddenComments = function (evt) {
  evt.preventDefault();
  const socialCommentsList = commentsList.querySelectorAll('.social__comment');
  const hiddenCommentsList = commentsList.querySelectorAll('.hidden');
  let maxHiddenCommentIndex = 5;
  let visibleCommentsCountValue;
  let hiddenCommentsLength = hiddenCommentsList.length;

  if (hiddenCommentsList.length <= maxHiddenCommentIndex) {
    commentsLoader.classList.add('hidden');
    maxHiddenCommentIndex = hiddenCommentsList.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  hiddenCommentsList.forEach((comment, i) => {
    if (i < maxHiddenCommentIndex) {
      comment.classList.remove('hidden');
      hiddenCommentsLength--;
    }
  })

  if (socialCommentsList.length < 5) {
    visibleCommentsCountValue = socialCommentsList.length;
  } else {
    visibleCommentsCountValue = socialCommentsList.length - hiddenCommentsLength;
  }

  visibleCommentsCount.textContent = visibleCommentsCountValue;
}

const onEscDown = function (evt) {
  if (isEscEvent(evt)) {
    closeBigPost(evt);
  }
}

const closeBigPost = function (evt) {
  evt.preventDefault();
  bigPost.classList.add('hidden');
  htmlBody.classList.remove('modal-open');
  closeBigPostButton.removeEventListener('click', closeBigPost);
  document.removeEventListener('keydown', onEscDown);
  clearCommentsList();
  commentsLoader.removeEventListener('click', showHiddenComments);
}

const openBigPost = function (picture, pictureData) {
  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPost.classList.remove('hidden');
    htmlBody.classList.add('modal-open');
    closeBigPostButton.addEventListener('click', closeBigPost);
    document.addEventListener('keydown', onEscDown);
    createBigPost(pictureData);
    showHiddenComments(evt);
    commentsLoader.addEventListener('click', showHiddenComments);
  })
};

export {
  onEscDown,
  openBigPost
}
