'use strict';
(function () {

  var textHashtag = document.querySelector('.text__hashtags');
  var textComment = document.querySelector('.text__description');
  // var btnSubmit = document.querySelector('.img-upload__submit');

  var HASHTAG_MAX_NUMBER = 5;
  var DESCRIPTION_LENGTH = 140;
  // var HASHTAG = {
  //   regex: /^#([А-Яа-яЁёA-Za-z]{1,19})$/
  // };
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
    var counter = 'good';
    var newArr = [];
    array.forEach(function (element) {
      element = element.toLowerCase();
      if (element[0] !== '#') {
        counter = ERROR_MESSAGE.firstSimbol;
      }
      if (element === '#') {
        counter = ERROR_MESSAGE.errorContent;
      }
      if (element.length > 20) {
        counter = ERROR_MESSAGE.maxLengthHashtag;
      }
      if (element.indexOf('#', 1) > -1) {
        counter = ERROR_MESSAGE.noSpace;
      }
      if (newArr.includes(element)) {
        counter = ERROR_MESSAGE.notRepeat;
      } else {
        newArr.push(element);
      }
    });
    return counter;
  };

  var hashtagInputHandler = function (evt) {
    var hashtagsArr = getHashtagsArray(textHashtag);
    var target = evt.target;
    var hashtag = checkHashtag(hashtagsArr);
    if (hashtag !== 'good') {
      target.setCustomValidity(hashtag);
    } else if (hashtagsArr.length > HASHTAG_MAX_NUMBER) {
      target.setCustomValidity(ERROR_MESSAGE.maxHashtag);
    } else {
      target.setCustomValidity('');
    }
    if (textHashtag.value === '') {
      target.setCustomValidity('');
    }
    redBorder(textHashtag);
  };

  var commentChangeHandler = function () {
    if (textComment.value.length > DESCRIPTION_LENGTH) {
      textComment.setCustomValidity(ERROR_MESSAGE.maxText);
    } else {
      textComment.setCustomValidity('');
    }
    redBorder(textComment);
  };

  var redBorder = function (field) {
    if (field.validity.valid) {
      field.style.outline = 'none';
    } else {
      field.style.outline = '2px solid red';
    }
  };

  // btnSubmit.addEventListener('click', function () {
  //   redBorder(textHashtag);
  //   redBorder(textComment);
  // });


  function verifyValidity() {
    textHashtag.focus();
    textHashtag.addEventListener('input', hashtagInputHandler);
    textComment.addEventListener('change', commentChangeHandler);
  }

  function removeVerifyValidity() {
    textHashtag.removeEventListener('input', hashtagInputHandler);
    textComment.removeEventListener('change', commentChangeHandler);
  }

  // textHashtag.addEventListener('focus', function () {
  //   document.removeEventListener('keydown', );
  // });


  // textHashtag.addEventListener('blur', function () {
  //   document.addEventListener('keydown', );
  // });

  window.validation = {
    activate: verifyValidity,
    deActivate: removeVerifyValidity
  };

})();
