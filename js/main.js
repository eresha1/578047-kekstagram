'use strict';

(function () {
  var ESC_KEY = 27;
  function escPress(cb) {
    return function (event) {
      if (event.keyCode === ESC_KEY) {
        cb();
      }
    };
  }
  document.addEventListener('DOMContentLoaded', function () {
    // var pictures = window.data.get();
    var pictures = window.backend.load(window.picture.getSuccessHandler);
    window.picture.render(pictures, window.bigPicture.show);
    window.bigPicture.setHandler(escPress);
    window.form.activate(escPress);
    window.effect.activate();
    window.message.setErrorHandler(escPress);
    window.message.setSuccessHandler(escPress);

  });
})();
