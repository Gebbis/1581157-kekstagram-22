/* global _:readonly */

import {
  getData
} from './api.js'

import {
  picturesList,
  fillPosts
} from './fill-posts.js'

const imageFilters = document.querySelector('.img-filters');
const MAX_RANDOM_COMMENT = 10;
const FILTER_DELAY = 500;

const getCommentsQuantity = function (element) {
  return element.comments.length;
}

const cleanPicturesList = function () {
  const picturesArray = picturesList.querySelectorAll('.picture');
  picturesArray.forEach(picture => {
    picture.remove();
  })
}

const sortPictures = function (pictureA, pictureB) {
  const commentA = getCommentsQuantity(pictureA);
  const commentB = getCommentsQuantity(pictureB);

  return commentB - commentA;
}

const changeToFilterActive = function (pressedButton) {
  const activeFilterButton = imageFilters.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
  pressedButton.classList.add('img-filters__button--active');
}

const filterPictures = function (evt, postsArray) {
  changeToFilterActive(evt.target);

  if (evt.target.matches('#filter-default')) {
    cleanPicturesList();
    fillPosts(postsArray);
  }

  if (evt.target.matches('#filter-random')) {
    const commentsFilteredList = postsArray
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, MAX_RANDOM_COMMENT);

    cleanPicturesList();
    fillPosts(commentsFilteredList);
  }

  if (evt.target.matches('#filter-discussed')) {
    const commentsFilteredList = postsArray
      .slice()
      .sort(sortPictures);

    cleanPicturesList();
    fillPosts(commentsFilteredList);
  }
}

getData((posts) => {
  fillPosts(posts);
  imageFilters.classList.remove('img-filters--inactive');
  const filterClickListener = _.debounce(function (evt) {
    filterPictures(evt, posts);
  }, FILTER_DELAY)

  document.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.addEventListener('click', filterClickListener);
  })
});
