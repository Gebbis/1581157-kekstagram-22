/* global _:readonly */

import {
  getData
} from './api.js'

import {
  picturesList,
  fillPosts
} from './fill-posts.js'

const imageFilters = document.querySelector('.img-filters');
const filterDefaultButton = imageFilters.querySelector('#filter-default');
const filterRandomButton = imageFilters.querySelector('#filter-random');
const filterDiscussedButton = imageFilters.querySelector('#filter-discussed');
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

const filterDefaultComments = function (postsArray, cb) {
  filterDefaultButton.addEventListener('click', () => {
    cleanPicturesList();
    cb(postsArray);
  })
}

const filterRandomComments = function (postsArray, cb) {
  filterRandomButton.addEventListener('click', () => {
    const commentsFilteredList = postsArray
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, MAX_RANDOM_COMMENT);

    cleanPicturesList();
    cb(commentsFilteredList);
  })
}

const filterDiscussedComments = function (postsArray, cb) {
  filterDiscussedButton.addEventListener('click', () => {
    const commentsFilteredList = postsArray
      .slice()
      .sort(sortPictures);

    cleanPicturesList();
    cb(commentsFilteredList);
  })
}

getData((posts) => {
  fillPosts(posts);
  imageFilters.classList.remove('img-filters--inactive');
  filterDefaultComments(posts, _.debounce(fillPosts, FILTER_DELAY));
  filterRandomComments(posts, _.debounce(fillPosts, FILTER_DELAY));
  filterDiscussedComments(posts, _.debounce(fillPosts, FILTER_DELAY));
});
