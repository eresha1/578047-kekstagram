'use strict';

(function () {
  var NEW_PHOTO_NUMBER = 10;

  var photos = [];

  var Filter = {
    POPULAR: 'filter-popular',
    NEW: 'filter-new',
    DISCUSSED: 'filter-discussed'
  };
  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');
  var imgFiltersButton = imgFilters.querySelectorAll('.img-filters__button');
  // var filterPopularButton = imgFilters.querySelector('#filter-popular');
  // var filterNewButton = imgFilters.querySelector('#filter-new');
  // var filterDiscussedButton = imgFilters.querySelector('#filter-discussed');

  // var renderNewPhoto = function (array) {
  //   var arrayNewPhoto = [];
  //   var count = NEW_PHOTO_NUMBER;
  //   for (var i = 0; i < count; i++) {
  //     var index = window.data.getRandomInteger(i, array.length - 1);
  //     var tmp = array[index];
  //     array[index] = array[i];
  //     array[i] = tmp;
  //     arrayNewPhoto.push(tmp);
  //   }
  //   return arrayNewPhoto;
  // };

  // var renderCommentsPhoto = function (array) {
  //   var arrayCopy = array.slice();
  //   arrayCopy.sort(function (first, second) {
  //     if (first.comments.length < second.comments.length) {
  //       return 1;
  //     } else if (first.comments.length > second.comments.length) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //   return arrayCopy;
  // };


  var changeClassButton = function (target) {
    imgFiltersButton.forEach(function (element) {
      element.classList.remove('img-filters__button--active');
    });
    target.classList.add('img-filters__button--active');
  };


  var changeFilter = function (evt) {
    window.picture.clean();
    var target = evt.target;

    switch (target.id) {
      case Filter.POPULAR:
        console.log('популярные');
        break;
      case Filter.NEW:
        console.log('новые');
        break;
      case Filter.DISCUSSED:
        console.log('обсуждаемые');
        break;
    }
  };

  imgFiltersForm.addEventListener('click', function (evt) {
    var target = evt.target;
    changeFilter(evt);
    changeClassButton(target);
  });



  window.filter = {
    show: function () {
      imgFilters.classList.remove('img-filters--inactive');
    }
  };
})();
