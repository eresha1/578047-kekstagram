'use strict';
(function () {

  var textHashtag = document.querySelector('.text__hashtags');
  var textComment = document.querySelector('.text__description');

  var HASHTAG_MAX_NUMBER = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var DESCRIPTION_LENGTH = 140;

  var ERROR_MESSAGE = {
    noError: '',
    firstSimbol: 'Хэш-тег начинается с символа # (решётка). ',
    errorContent: 'Хеш-тег не может состоять только из одной решётки. ',
    notRepeat: 'Один и тот же хэш-тег не может быть использован дважды.',
    maxHashtag: 'Нельзя указать больше пяти хэш-тегов.',
    maxLengthHashtag: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
    maxText: 'Максимальная длина комментария не должна превышать 140 символов',
    noSpace: 'Хэш-теги должны быть разделены пробелами'
  };

  var getHashtagsArray = function (field) {
    return field.value.trim().split(/\s+/gi);
  };

  var checkHashtag = function (array) {
    var counter = false;
    var newArr = [];
    if (array.length > HASHTAG_MAX_NUMBER) {
      return ERROR_MESSAGE.maxHashtag;
    }
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element = element.toLowerCase();
      if (element[0] !== '#') {
        counter = ERROR_MESSAGE.firstSimbol;
        break;
      }
      if (element.length < 2) {
        counter = ERROR_MESSAGE.errorContent;
        break;
      }
      if (element.length > HASHTAG_MAX_LENGTH) {
        counter = ERROR_MESSAGE.maxLengthHashtag;
        break;
      }
      if (element.indexOf('#', 1) > -1) {
        counter = ERROR_MESSAGE.noSpace;
        break;
      }
      if (newArr.includes(element)) {
        counter = ERROR_MESSAGE.notRepeat;
        break;
      } else {
        newArr.push(element);
      }
    }
    return counter;
  };

  var hashtagInputHandler = function (evt) {
    var hashtagsArr = getHashtagsArray(textHashtag);
    var target = evt.target;
    var hashtagErr = checkHashtag(hashtagsArr);
    if (hashtagErr /* && textHashtag.value !== '' */) {
      target.setCustomValidity(hashtagErr);
      textHashtag.style = 'border: 3px solid red';
    } else {
      target.setCustomValidity('');
      textHashtag.style = '';
    }
  };

  var commentChangeHandler = function () {
    if (textComment.value.length > DESCRIPTION_LENGTH) {
      textComment.setCustomValidity(ERROR_MESSAGE.maxText);
    } else {
      textComment.setCustomValidity('');
    }
  };


  function verifyValidity() {
    textHashtag.focus();
    textHashtag.addEventListener('input', hashtagInputHandler);
    textComment.addEventListener('change', commentChangeHandler);
  }

  function removeVerifyValidity() {
    textHashtag.removeEventListener('input', hashtagInputHandler);
    textComment.removeEventListener('change', commentChangeHandler);
    textHashtag.setCustomValidity('');
    textComment.setCustomValidity('');
    textHashtag.style = '';
    textComment.style = '';
  }

  window.validation = {
    activate: verifyValidity,
    deActivate: removeVerifyValidity
  };

})();
