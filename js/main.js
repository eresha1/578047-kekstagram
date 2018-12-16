'use strict';

(function () {
  var ESC_KEY = 27;
  function escPress(cb) {
    return function (event) {
      // console.log(event);
      if (event.keyCode === ESC_KEY) {
        cb();
      }
    };
  }
  document.addEventListener('DOMContentLoaded', function (event) {
    // Б23. Нельзя пользоваться глобальной переменной event
    var pictures = window.data.get();
    window.picture.render(pictures, window.bigPicture.show);
    window.bigPicture.setHandler(escPress);
    window.form.activate(escPress);
    window.effect.activate();
  });
})();
