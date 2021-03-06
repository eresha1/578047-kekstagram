'use strict';

(function () {
  var ESC_KEY = 27;

  function escPress(cb) {
    return function (evt) {
      if (evt.keyCode === ESC_KEY) {
        cb();
      }
    };
  }

  document.addEventListener('DOMContentLoaded', function () {
    window.backend.load(function (data) {
      window.data.set(data);
      window.picture.render(window.data.get(), window.bigPicture.show);
      window.filter.show();
    }, function (error) {
      window.message.loadError(error);
    });
    window.bigPicture.setHandler(escPress);
    window.form.activate(escPress);
    window.effect.activate();
    window.message.setErrorHandler(escPress);
    window.message.setSuccessHandler(escPress);

  });
})();
