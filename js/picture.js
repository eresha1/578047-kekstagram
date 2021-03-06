'use strict';
(function () {
  var template = document.querySelector('#picture').content.querySelector('.picture');
  var сontainerPictures = document.querySelector('.pictures');
  var renderedPhoto = [];

  function renderPictures(data, cb) {
    var fragment = document.createDocumentFragment();
    data.forEach(function (item) {
      var photo = template.cloneNode(true);
      photo.querySelector('.picture__img').src = item.url;
      photo.querySelector('.picture__comments').textContent = item.comments.length;
      photo.querySelector('.picture__likes').textContent = item.likes;

      photo.addEventListener('click', function (event) {
        event.preventDefault();
        cb(item);
      });

      fragment.appendChild(photo);
      renderedPhoto.push(photo);
      сontainerPictures.appendChild(fragment);
    });
  }

  var cleanPictures = function () {
    renderedPhoto.forEach(function (item) {
      item.remove();
    });
    renderedPhoto = [];
  };


  window.picture = {
    render: renderPictures,
    clean: cleanPictures
  };
})();
