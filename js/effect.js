'use strict';
(function () {
  var effectBox = document.querySelector('.img-upload__effects');
  var effectTarget = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.img-upload__effect-level');
  var currentEffect = 'effects__preview--none';
  var appliedEffect = 'none';

  var linePine = slider.querySelector('.effect-level__line');
  var effectPin = linePine.querySelector('.effect-level__pin');
  var lineDepth = linePine.querySelector('.effect-level__depth');
  // var effectValue = document.querySelector('.effect-level__value');

  // СЛАЙДЕР

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



 // var resetFilterLevel = function () {
 //    effectPin.style.left = '100%';
 //    lineDepth.style.width = '100%';
// }


  var effectMap = {
    none: {filter: 'none', min: '', max: '', unit: ''},
    chrome: {filter: 'grayscale', min: 0, max: 1, unit: ''},
    sepia: {filter: 'sepia', min: 0, max: 1, unit: ''},
    marvin: {filter: 'invert', min: 0, max: 100, unit: '%'},
    phobos: {filter: 'blur', min: 0, max: 3, unit: 'px'},
    heat: {filter: 'brightness', min: 1, max: 3, unit: ''}
      };



  // Для слайдера заготовка получения значения
  /* console.dir(effectBox)

  var effectMap = {

  }
  effectMap[appliedEffect]

  function getEffectValue(min, max, num) {
    return min + (max - min) * (num / 100);
  } */



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
      currentEffect = 'effects__preview--' + appliedEffect;
      effectTarget.classList.add(currentEffect);
    }
    var minRang = (effectMap[appliedEffect]).min;
    var maxRang = (effectMap[appliedEffect]).max;
    console.log(minRang, maxRang)

  }

  window.effect = {
    activate: setEffects,
    deActivate: removeEffects
  }
})();
