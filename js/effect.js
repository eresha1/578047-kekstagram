'use strict';
(function () {
  var effectBox = document.querySelector('.img-upload__effects');
  var effectTarget = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.img-upload__effect-level');

  var effectInput = effectBox.querySelector('.effects__radio[checked]');
  var currentEffect = 'effects__preview--none';
  var appliedEffect = effectInput.value;

  var linePine = slider.querySelector('.effect-level__line');
  var effectPin = linePine.querySelector('.effect-level__pin');
  var lineDepth = linePine.querySelector('.effect-level__depth');
  var btnBigger = document.querySelector('.scale__control--bigger');
  var btnSmaller = document.querySelector('.scale__control--smaller');
  var controlScale = document.querySelector('.scale__control--value');
  var effectMap = {
    none: {filter: 'none', showRange: false},
    chrome: {filter: 'grayscale', showRange: true, min: 0, max: 1, unit: ''},
    sepia: {filter: 'sepia', showRange: true, min: 0, max: 1, unit: ''},
    marvin: {filter: 'invert', showRange: true, min: 0, max: 100, unit: '%'},
    phobos: {filter: 'blur', showRange: true, min: 0, max: 3, unit: 'px'},
    heat: {filter: 'brightness', showRange: true, min: 1, max: 3, unit: ''}
  };
  var size = {min: 25, max: 100, step: 25, default: 100};

  var changeEffect = new Event('change', {bubbles: true});

  var resizeImg = function (argument) {
    var newValue = controlScale.value;
    newValue = parseInt(newValue, 10) + size.step * argument;
    if (newValue >= size.max) {
      newValue = size.max;
    } else if (newValue <= size.min) {
      newValue = size.min;
    }
    effectTarget.parentElement.style.transform = 'scale' + '(' + newValue / 100 + ')';
    controlScale.value = newValue + '%';
  };

  var btnBiggerClickHandler = function () {
    resizeImg(1);
  };

  var btnSmallerClickHandler = function () {
    resizeImg(-1);
  };

  function getEffectValue(min, max, num) {
    return min + (max - min) * (num / 100);
  }

  var pinMouseDownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };
    var pinMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var scale = (effectPin.offsetLeft - shift.x) / linePine.clientWidth * 100;
      if (scale < 0) {
        scale = 0;
      }
      if (scale > 100) {
        scale = 100;
      }
      effectPin.style.left = scale + '%';
      lineDepth.style.width = scale + '%';
      var value = getEffectValue(effectMap[appliedEffect].min, effectMap[appliedEffect].max, scale);
      effectTarget.style.filter = effectMap[appliedEffect].filter + '(' + value + effectMap[appliedEffect].unit + ')';
    };
    var pinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', pinMouseMoveHandler);
      document.removeEventListener('mouseup', pinMouseUpHandler);
    };
    document.addEventListener('mousemove', pinMouseMoveHandler);
    document.addEventListener('mouseup', pinMouseUpHandler);
  };

  effectPin.addEventListener('mousedown', pinMouseDownHandler);

  function setEffects() {
    effectBox.addEventListener('change', changeEffectHandler);
    effectInput.dispatchEvent(changeEffect);
    btnBigger.addEventListener('click', btnBiggerClickHandler);
    btnSmaller.addEventListener('click', btnSmallerClickHandler);
    effectTarget.parentElement.style.transform = 'scale(1)';
    controlScale.value = '100%';
  }
  function removeEffects() {
    effectBox.removeEventListener('change', changeEffectHandler);
    btnBigger.removeEventListener('click', btnBiggerClickHandler);
    btnSmaller.removeEventListener('click', btnSmallerClickHandler);

  }
  function changeEffectHandler(event) {
    event.preventDefault();
    if (event.target.name === 'effect') {
      appliedEffect = event.target.value;
      var method = appliedEffect === 'none' ? 'add' : 'remove';
      slider.classList[method]('hidden');
      effectTarget.classList.remove(currentEffect);

      if (effectMap[appliedEffect].showRange === false) {
        effectTarget.style.filter = '';
      }
      effectTarget.style.filter = effectMap[appliedEffect].filter + '(' + effectMap[appliedEffect].max + effectMap[appliedEffect].unit + ')';
      effectPin.style.left = 100 + '%';
      lineDepth.style.width = 100 + '%';
      currentEffect = 'effects__preview--' + appliedEffect;
      effectTarget.classList.add(currentEffect);
    }
  }

  window.effect = {
    activate: setEffects,
    deActivate: removeEffects
  };
})();
