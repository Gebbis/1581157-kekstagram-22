const picturesList = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const fillPosts = function (postsArray) {
  const picturesListFragment = document.createDocumentFragment();

  postsArray.forEach(({
    url,
    likes,
    comments,
  }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });

  picturesList.appendChild(picturesListFragment);
}

export {
  picturesList,
  fillPosts
};
