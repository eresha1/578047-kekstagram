'use strict';
(function () {
  var data = null;
  window.data = {
    get: function () {
      return data;
    },
    set: function (newPictures) {
      data = newPictures;
    }
  };
})();
