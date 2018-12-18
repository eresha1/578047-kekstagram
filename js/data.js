'use strict';
(function () {
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var PHOTOS_COUNT = 25;
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var NAMES = ['Артем', 'Семен', 'Антон', 'Марина', 'Светлана', 'Геннадий'];
  var pictures = null;

  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  var getComment = function (minCount, maxCount) {
    var arrayComment = [];
    var count = getRandomInteger(minCount, maxCount);
    for (var i = 0; i < count; i++) {
      var index = getRandomInteger(i, COMMENTS.length - 1);
      var tmp = COMMENTS[index];
      COMMENTS[index] = COMMENTS[i];
      COMMENTS[i] = tmp;
      arrayComment.push(tmp);
    }
    return arrayComment.join(' ');
  };

  function getComments() {
    var comments = [];
    var numberComments = getRandomInteger(1, 38);
    for (var i = 0; i <= numberComments; i++) {
      comments.push({
        avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
        message: getComment(1, 2),
        name: NAMES[getRandomInteger(0, NAMES.length - 1)]
      });
    }
    return comments;
  }

  function createPhotosData() {
    var photosData = [];
    for (var i = 0; i < PHOTOS_COUNT; i++) {
      photosData.push({
        url: 'photos/' + (i + 1) + '.jpg',
        likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
        comments: getComments(),
        description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)]
      });
    }
    return photosData;
  }

  pictures = createPhotosData();

  window.data = {
    get: function () {
      return pictures;
    },
    set: function (newPictures) {
      pictures = newPictures;
    }
  };
})();
