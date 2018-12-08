'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 1;
var MAX_COMMENTS = 6;
var MIN_COMMENT_AVATAR = 1;
var MAX_COMMENT_AVATAR = 6;
var AVATAR_WIDTH = 35;
var AVATAR_HEIGHT = 35;
var PHOTOS_COUNT = 25;

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

// Выдает рандомное число
function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

var generateArr = function (arr) {
  var randItem = arr[getRandomInteger(0, arr.length - 1)];
  return randItem;
};


// Выдает рандомный комментарий, состоящий из 1 или 2 фраз (но фразы не уникальные)

var getComment = function () {
  var arrayComment = [];
  var random = Math.random();
  var comment = random < 0.5 ? comment = generateArr(COMMENTS) : generateArr(COMMENTS) + ' ' + generateArr(COMMENTS);
  arrayComment.push(comment);
  return arrayComment;
};


// Выдает рандомный комментарий, состоящий из 1 или 2 фраз (с неповторяющимися фразами )

// Вопрос: не правильно работает функция, в чем ошибка

// var getComment = function (minCount, maxCount) {
//   var arrayComment = [];
//   var count = getRandomInteger(minCount, maxCount);
//   for (var i = 0; i < count; i++) {
//     var index = getRandomInteger (i, COMMENTS.length - 1);
//     var tmp = COMMENTS[index];
//     COMMENTS[index] = arrayComment[i];
//     COMMENTS[i] = tmp;
//     arrayComment.push(tmp);
//   }
//   return arrayComment.join('*');
// };

// console.log(getComment(1, 2));


// Выдает рандомный массив с комментариями

var getArrayComments = function () {
  var arrayComments = [];
  var numberComments = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  for (var i = MIN_COMMENTS; i <= numberComments; i++) {
    var comment = getComment();
    arrayComments.push(comment);
  }
  return arrayComments;
};

// Генерируем массив с рандомными объектами фотографий.

var generatePhotoCollection = function (count) {
  var photoBlock = [];
  for (var i = 0; i < count; i++) {
    photoBlock.push({
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getArrayComments(),
      description: generateArr(DESCRIPTION)
    });
  }
  return photoBlock;
};

// массив с фото
var photoCollection = generatePhotoCollection(PHOTOS_COUNT);

// console.log(photoCollection[].url);

// Находим контейнер, в который будем вставлять маленькие картинки
var сontainerPictures = document.querySelector('.pictures');

// Находим шаблон, который будем копировать
var pictureTemplate = document.querySelector('#picture').content;


// Создаем содержимое блока маленькой картинки на основе шаблона

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


// БОЛЬШАЯ КАРТИНКА


// Находим блок с большим изображением

var bigPicture = document.querySelector('.big-picture');

// Находим в разметке фото
var bigPicturePhoto = bigPicture.querySelector('.big-picture__img img');

// Находим в разметке информацию о фото:
// подпись.
var bigPictureDescription = bigPicture.querySelector('.social__caption');
// количество лайков
var bigPictureLikes = bigPicture.querySelector('.likes-count');
// количество комментариев
var bigPictureCommentsCount = bigPicture.querySelector('.comments-count');

// Удаляем из разметки комментарии к изображению по-умолчанию и добавляем сгенерированные комментарии в список

var renderBigPictureComments = function (data) {
  var bigPictureCommentsList = bigPicture.querySelector('.social__comments');

  bigPictureCommentsList.innerHTML = '';

  for (var i = 0; i < data.comments.length; i++) {
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

    textComment.textContent = getComment();
    listItem.appendChild(textComment);

    bigPictureCommentsList.appendChild(listItem);
  }
  return bigPictureCommentsList;
};

// Создаем большую картинку с данными из элемента сгенерированного массива:

var renderBigPictureElement = function (element) {
  bigPicturePhoto.src = element.url;
  bigPictureDescription.textContent = element.description;
  bigPictureLikes.textContent = element.likes;
  bigPictureCommentsCount.textContent = element.comments.length;
  renderBigPictureComments(element);
};

// Прячем блок счётчика комментариев
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');

// Прячем блок загрузки новых комментариев
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');


// Загрузка и показ формы редактирования
// кнопка загрузки изображения

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var EFFECT_LEVEL_DEFAULT = 20;

var uploadFile = сontainerPictures.querySelector('#upload-file');

// Форма редактирования изображения
var uploadOverlay = сontainerPictures.querySelector('.img-upload__overlay');

// Кнопка закрытия формы редактирования
var uploadCancelBtn = сontainerPictures.querySelector('#upload-cancel');

// Появление и закрытие попапа


var openPopup = function (target) {
  target.classList.remove('hidden');
  // document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function (target) {
  target.classList.add('hidden');
  // document.removeEventListener('keydown', popupEscPressHandler);
};

// обработчик закрытия окна формы загрузки по нажатию на Esc (вопрос: нужно ли добавлять обработчик )

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(uploadOverlay);
  }
};


uploadFile.addEventListener('change', function () {
  openPopup(uploadOverlay);
  document.addEventListener('keydown', popupEscPressHandler);
});


// Обработка закрытия формы загрузки

// по нажатию на крестик

uploadCancelBtn.addEventListener('click', function () {
  closePopup(uploadOverlay);

  document.removeEventListener('keydown', popupEscPressHandler);
});

// клавишей enter

uploadCancelBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(uploadOverlay);
  }
  document.removeEventListener('keydown', popupEscPressHandler);
});

// РАБОТА С ЭФФЕКТАМИ

var uploadEffects = сontainerPictures.querySelector('.img-upload__effects');

// var uploadPreview = сontainerPictures.querySelector('.img-upload__preview');

var effectLevelPin = сontainerPictures.querySelector('.effect-level__pin');


var effectLevelValue = сontainerPictures.querySelector('.effect-level__value');


// Добавление обработчиков на эффекты

var effectsItemInput = uploadEffects.querySelectorAll('.effects__item input');

// Вопрос по наименованию функции addEventListenerEffect???

var EffectClickHandler = function (effects) {
  debugger

  // не переключается в обратном порядке
  effects.addEventListener('click', function () {
    effectLevelChange(EFFECT_LEVEL_DEFAULT);
    сontainerPictures.querySelector('img').classList.add('effects__preview--' + effects.value);
  });
};

// Объявлен глобально или надо сделать иначе?

for (var i = 0; i < effectsItemInput.length; i++) {
  EffectClickHandler(effectsItemInput[i]);
}

// ОБРАБОТКА ДЕЙСТВИЙ ПО ВЗАИМОДЕЙСТВИЮ С ПОЛЗУНКОМ

// изменение значения ползунка

var effectLevelChange = function (level) {
  effectLevelValue.value = level;
};

// при отпускании ползунка - определяем координаты ползунка

var effectLevelPinMouseupHandler = function () {

  // ширина родительского блока
  var fullWidth = effectLevelPin.parentElement.offsetWidth;
  // расположение ползунка
  var level = Math.floor(effectLevelPin.offsetLeft * 100 / fullWidth);

  effectLevelChange(level);
};

// ОТКРЫТИЕ И ЗАКРЫТИЕ БОЛЬШОЙ КАРТИНКИ

// обработчик закрытия большой картинки по нажатию на Esc (как сделать универсальный?)

var bigPictureEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(bigPicture);
  }
};

// Открытие большой картинки
function showBigPictureClickHandler() {
  openPopup(bigPicture);
  document.addEventListener('keydown', bigPictureEscPressHandler);
}


// Добавление обработчиков на все маленькие картинки

var thumbnails = сontainerPictures.querySelectorAll('.picture');
// Вопрос по наименованию функции ToThumbnailsClickHandler???
var addListenersToThumbnails = function (preview, element) {
  preview.addEventListener('click', function () {
    renderBigPictureElement(element);
    showBigPictureClickHandler();
  });
};

// Объявлен глобально или надо сделать иначе?

for (var j = 0; j < thumbnails.length; j++) {
  addListenersToThumbnails(thumbnails[j], photoCollection[j]);
}


// Кнопка закрытия большой картинки
var bigPictureCancelBtn = bigPicture.querySelector('#picture-cancel');

// закрытие по нажатию на крестик

bigPictureCancelBtn.addEventListener('click', function () {
  closePopup(bigPicture);

  document.removeEventListener('keydown', bigPictureEscPressHandler);
});

// закрытие клавишей enter

bigPictureCancelBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(bigPicture);
  }
  document.removeEventListener('keydown', bigPictureEscPressHandler);
});

