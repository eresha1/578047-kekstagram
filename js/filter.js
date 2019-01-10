'use strict';

(function () {
  var NEW_PHOTO_NUMBER = 10;

  var Filter = {
    POPULAR: 'filter-popular',
    NEW: 'filter-new',
    DISCUSSED: 'filter-discussed'
  };
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
  var activeFilterButton = imgFilters.querySelector('.img-filters__button--active');

  var getRandomInteger = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  };

  var sortNewPhoto = function (array) {
    var arrayCopy = array.slice();
    var arrayNewPhoto = [];
    var count = arrayCopy.length < NEW_PHOTO_NUMBER ? arrayCopy.length : NEW_PHOTO_NUMBER;
    for (var i = 0; i < count; i++) {
      var index = getRandomInteger(i, arrayCopy.length - 1);
      var tmp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[i];
      arrayCopy[i] = tmp;
      arrayNewPhoto.push(tmp);
    }
    return arrayNewPhoto;
  };

  var sortCommentsPhoto = function (array) {
    var arrayCopy = array.slice();
    return arrayCopy.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  var changeFilter = function (evt) {
    window.picture.clean();
    var data = null;

    switch (evt.target.id) {
      case Filter.POPULAR:
        data = window.data.get();
        break;
      case Filter.NEW:
        data = sortNewPhoto(window.data.get());
        break;
      case Filter.DISCUSSED:
        data = sortCommentsPhoto(window.data.get());
        break;
    }
    window.picture.render(data, window.bigPicture.show);
  };

  imgFiltersForm.addEventListener('click', function (evt) {
    activeFilterButton.classList.remove('img-filters__button--active');
    activeFilterButton = evt.target;
    activeFilterButton.classList.add('img-filters__button--active');
    window.debounce(changeFilter.bind(null, evt));
  });

  window.filter = {
    show: function () {
      imgFilters.classList.remove('img-filters--inactive');
    }
  };
})();
