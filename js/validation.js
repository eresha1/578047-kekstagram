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
    return field.value === '' ? [] : field.value.trim().split(/\s+/gi);
  };

  var checkHashtag = function (array) {
    var errMsg = null;
    var newArr = [];
    if (array.length > HASHTAG_MAX_NUMBER) {
      return ERROR_MESSAGE.maxHashtag;
    }
    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      element = element.toLowerCase();
      if (element[0] !== '#') {
        errMsg = ERROR_MESSAGE.firstSimbol;
        break;
      }
      if (element.length < 2) {
        errMsg = ERROR_MESSAGE.errorContent;
        break;
      }
      if (element.length > HASHTAG_MAX_LENGTH) {
        errMsg = ERROR_MESSAGE.maxLengthHashtag;
        break;
      }
      if (element.indexOf('#', 1) > -1) {
        errMsg = ERROR_MESSAGE.noSpace;
        break;
      }
      if (newArr.includes(element)) {
        errMsg = ERROR_MESSAGE.notRepeat;
        break;
      } else {
        newArr.push(element);
      }
    }
    return errMsg;
  };

  var hashtagInputHandler = function (evt) {
    var hashtagsArr = getHashtagsArray(textHashtag);
    var target = evt.target;
    var hashtagErr = checkHashtag(hashtagsArr);
    if (hashtagErr) {
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
      textComment.style = 'border: 3px solid red';
    } else {
      textComment.setCustomValidity('');
      textComment.style = '';
    }
  };


  function verifyValidity() {
    textHashtag.focus();
    textHashtag.addEventListener('input', hashtagInputHandler);
    textComment.addEventListener('input', commentChangeHandler);
  }

  function removeVerifyValidity() {
    textHashtag.removeEventListener('input', hashtagInputHandler);
    textComment.removeEventListener('input', commentChangeHandler);
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
