'use strict';

(function () {
  var NEW_PHOTO_NUMBER = 10;

  // var photos = [];
  // photos = window.data.get();
  // console.log(photos);

  var Filter = {
    POPULAR: 'filter-popular',
    NEW: 'filter-new',
    DISCUSSED: 'filter-discussed'
  };
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');

  var renderNewPhoto = function (array) {
    var arrayCopy = array.slice();
    var arrayNewPhoto = [];
    var count = NEW_PHOTO_NUMBER;
    for (var i = 0; i < count; i++) {
      var index = window.data.getRandomInteger(i, arrayCopy.length - 1);
      var tmp = arrayCopy[index];
      arrayCopy[index] = arrayCopy[i];
      arrayCopy[i] = tmp;
      arrayNewPhoto.push(tmp);
    }
    return arrayNewPhoto;
  };

  var renderCommentsPhoto = function (array) {
    var arrayCopy = array.slice();
    arrayCopy.sort(function (first, second) {
      if (first.comments.length < second.comments.length) {
        return 1;
      } else if (first.comments.length > second.comments.length) {
        return -1;
      }
      return 0;
    });
    return arrayCopy;
  };

  var changeClassButton = function (evt) {
    imgFiltersButton.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
  };


  var changeFilter = /* window.debounce( */ function (evt) {
    window.picture.clean();
    // var target = evt.target;

    switch (evt.target.id) {
      case Filter.POPULAR:
        // console.log('популярные');
        window.picture.render(window.data.get(), window.bigPicture.show);
        break;
      case Filter.NEW:
        // console.log('новые');
        window.picture.render(renderNewPhoto(window.data.get()), window.bigPicture.show);

        break;
      case Filter.DISCUSSED:
        // console.log('обсуждаемые');
        window.picture.render(renderCommentsPhoto(window.data.get()), window.bigPicture.show);
        break;
    }
  }/* ) */;

  imgFiltersForm.addEventListener('click', function (evt) {
    // var target = evt.target;

    changeFilter(evt);
    changeClassButton(evt);
  });

  window.filter = {
    show: function () {
      imgFilters.classList.remove('img-filters--inactive');
    }
  };
})();
