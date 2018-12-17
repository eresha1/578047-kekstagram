'use strict';
(function () {
  var SCALE_CONTROL_VALUE_MAX = 100;
  var effectBox = document.querySelector('.img-upload__effects');
  var effectTarget = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.img-upload__effect-level');
  var currentEffect = 'effects__preview--none';
  var appliedEffect = 'none';

  var linePine = slider.querySelector('.effect-level__line');
  var effectPin = linePine.querySelector('.effect-level__pin');
  var lineDepth = linePine.querySelector('.effect-level__depth');
  var btnBigger = document.querySelector('.scale__control--bigger');
  var btnSmaller = document.querySelector('.scale__control--smaller');
  var controlScale = document.querySelector('.scale__control--value');
  var newValue = SCALE_CONTROL_VALUE_MAX;
  var effectMap = {
    none: {filter: 'none', min: '', max: '', unit: ''},
    chrome: {filter: 'grayscale', min: 0, max: 1, unit: ''},
    sepia: {filter: 'sepia', min: 0, max: 1, unit: ''},
    marvin: {filter: 'invert', min: 0, max: 100, unit: '%'},
    phobos: {filter: 'blur', min: 0, max: 3, unit: 'px'},
    heat: {filter: 'brightness', min: 1, max: 3, unit: ''}
  };

  function getEffectValue(min, max, num) {
    return min + (max - min) * (num / 100);
  }

  btnBigger.addEventListener('click', function () {
    if (newValue >= 100) {
      newValue += 0;
    } else {
      newValue += 25;
      controlScale.value = newValue + '%';
      effectTarget.style.transform = 'scale' + '(' + newValue / 100 + ')';
    }
  });

  btnSmaller.addEventListener('click', function () {
    if (newValue <= 25) {
      newValue -= 0;
    } else {
      newValue -= 25;
      controlScale.value = newValue + '%';
      effectTarget.style.transform = 'scale' + '(' + newValue / 100 + ')';
    }
  });

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
    slider.classList.add('hidden');
    effectTarget.classList.add(currentEffect);
    effectBox.elements[0].checked = true;
  }
  function removeEffects() {
    effectBox.removeEventListener('change', changeEffectHandler);
  }
  function changeEffectHandler(event) {
    event.preventDefault();
    if (event.target.name === 'effect') {
      appliedEffect = event.target.value;
      var method = appliedEffect === 'none' ? 'add' : 'remove';
      slider.classList[method]('hidden');
      effectTarget.classList.remove(currentEffect);

      // не убирает последний использованный фильтр при выборе оригинала (не становится style="filter: none;")
      effectTarget.style.filter = effectMap[appliedEffect].filter + '(' + effectMap[appliedEffect].max + effectMap[appliedEffect].unit + ')';

      // сдвигаю ползунок на 100% - Tак можно делать?
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
