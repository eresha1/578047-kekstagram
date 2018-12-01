'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
var MIN_COMMENT_AVATAR = 1;
var MAX_COMMENT_AVATAR = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var PHOTOS_COUNT = 25;

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

var generateArr = function (arr) {
  var randItem = arr[getRandomInteger(0, arr.length - 1)];
  return randItem;
};

var getArrayComments = function () {

  var arrayComments = [];
  var numberComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  for (var i = MIN_COMMENTS; i <= numberComments; i++) {
    var random = Math.random();
    if (random < 0.5) {
      var comment = generateArr(COMMENTS);

    } else {
      comment = generateArr(COMMENTS) + ' ' + generateArr(COMMENTS);
    }
    arrayComments.push(comment);
  }
  return arrayComments;
};

var generatePhotoCollection = function () {
  var photoBlock = [];
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    photoBlock.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getArrayComments(),
      description: generateArr(DESCRIPTION)
    });
  }
  return photoBlock;
};

var photoCollection = generatePhotoCollection();
var сontainerPictures = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;

  return pictureElement;
};

var getFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photoCollection.length; i++) {
    fragment.appendChild(renderPicture(photoCollection[i]));
  }
  return fragment;
};

сontainerPictures.appendChild(getFragment());

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var renderBigPictureElement = function (element) {
  var bigPicturePhoto = bigPicture.querySelector('.big-picture__img > img');
  bigPicturePhoto.src = element.url;

  var bigPictureDescription = bigPicture.querySelector('.social__caption');
  bigPictureDescription.textContent = element.description;

  var bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = element.likes;

  var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = element.comments.length;
};

renderBigPictureElement(photoCollection[0]);

var bigPictureCommentsList = bigPicture.querySelector('.social__comments');

var deleteDefaultComments = function () {
  while (bigPictureCommentsList.firstChild) {
    bigPictureCommentsList.removeChild(bigPictureCommentsList.firstChild);
  }
};

var createBigPictureComment = function () {
  var listItem = document.createElement('li');
  listItem.classList.add('social__comment');

  var avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = 'img/avatar-' + getRandomInteger(MIN_COMMENT_AVATAR, MAX_COMMENT_AVATAR) + '.svg';
  avatar.alt = 'Аватар комментатора фотографии';
  avatar.width = AVATAR_WIDTH;
  avatar.height = AVATAR_HEIGHT;
  listItem.appendChild(avatar);

  var textComment = document.createElement('p');
  textComment.classList.add('social__text');

  textComment.textContent = generateArr(photoCollection[0].comments);
  listItem.appendChild(textComment);

  return listItem;
};

var renderBigPictureComments = function () {
  deleteDefaultComments();
  for (var i = 0; i < photoCollection[0].comments.length; i++) {
    var commentsItem = createBigPictureComment();
    bigPictureCommentsList.appendChild(commentsItem);
  }
  return bigPictureCommentsList;
};

renderBigPictureComments();

var bigPictureCommentsCount = bigPicture.querySelector('.social__comment-count');
bigPictureCommentsCount.classList.add('visually-hidden');

var bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');
bigPictureCommentsLoader.classList.add('visually-hidden');
