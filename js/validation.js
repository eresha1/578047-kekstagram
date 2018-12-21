'use strict';
(function () {

  var textHashtag = document.querySelector('.text__hashtags');
  var textComment = document.querySelector('.text__description');

  var HASHTAG_MAX_NUMBER = 5;
  var DESCRIPTION_LENGTH = 140;
  var HASHTAG = {
    regex: /^#([А-Яа-яЁёA-Za-z]{1,19})$/
  };
  var ERROR_MESSAGE = {
    noError: '',
    firstSimbol: 'Хэш-тег начинается с символа # (решётка). ',
    errorContent: 'Хеш-тег не может состоять только из одной решётки. ',
    notRepeat: 'Один и тот же хэш-тег не может быть использован дважды.',
    maxHashtag: 'Нельзя указать больше пяти хэш-тегов.',
    maxLengthHashtag: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
    maxText: 'Максимальная длина комментария не должна превышать 140 символов',
  };

  var escPressHandler = null;

  var getHashtagsArray = function (field) {
    return field.value.trim().replace(/\s{2,}/g, ' ').split(' ');
  };

  var checkElementsRepeat = function (array) {
    var obj = {};
    array.forEach(function (element) {
      var item = element.toLowerCase();
      obj[item] = true;
    });
    return Object.keys(obj);
  };


  var checkHashtag = function (array, regex) {
    var counter = false;
    array.forEach(function (element) {
      if (regex.test(element)) {
        counter = true;
      }
    });
    return counter;
  };

  // К
  var addRedBorder = function (element) {
    element.style.border = 'solid 5px red';
  };

  var removeRedBorder = function (element) {
    element.style.border = '';
  };

  var hashtagInputHandler = function (evt) {
    var hashtagsArr = getHashtagsArray(textHashtag);
    var target = evt.target;

    // Наверно лучше разделить на 3 разных сообщения об ошибках?
    // Вообще, нужно было ли использовать регулярное выражение HASHTAG.regex?

    if (!checkHashtag(hashtagsArr, HASHTAG.regex)) {
      target.setCustomValidity(ERROR_MESSAGE.firstSimbol + ' ' + ERROR_MESSAGE.maxLengthHashtag + ' ' + ERROR_MESSAGE.errorContent);
    } else if (hashtagsArr.length > HASHTAG_MAX_NUMBER) {
      target.setCustomValidity(ERROR_MESSAGE.maxHashtag);
    } else if (hashtagsArr.length !== checkElementsRepeat(hashtagsArr).length) {
      target.setCustomValidity(ERROR_MESSAGE.notRepeat);
    } else {
      target.setCustomValidity('');
    }
    if (textHashtag.value === '') {
      target.setCustomValidity('');
    }
  };

  // Вылазят всякие косяки.

  var commentChangeHandler = function () {
    if (textComment.value.length > DESCRIPTION_LENGTH) {
      textComment.setCustomValidity(ERROR_MESSAGE.maxText);
      addRedBorder(textComment);
    } else {
      textComment.setCustomValidity('');
      removeRedBorder(textComment);
    }
  };
  // Нужно ставить обработчик на кнопку опубликовать?

  textHashtag.addEventListener('input', hashtagInputHandler);
  textComment.addEventListener('change', commentChangeHandler);

  function setHandler() {
    textHashtag.addEventListener('focusin', function () {
      document.removeEventListener('keydown', escPressHandler);
    });
    textHashtag.addEventListener('focusout', function () {
      document.addEventListener('keydown', escPressHandler);
    });
    textComment.addEventListener('focusin', function () {
      document.removeEventListener('keydown', escPressHandler);
    });
    textComment.addEventListener('focusout', function () {
      document.addEventListener('keydown', escPressHandler);
    });
  }

  window.validation = {
    setHandler: setHandler
  };
})();
