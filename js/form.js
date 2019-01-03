'use strict';
(function () {

  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');
  var closeFormBtn = form.querySelector('#upload-cancel');
  var uploadFile = form.querySelector('#upload-file');
  // var uploadSendBtn = form.querySelector('.img-upload__submit');
  var escPressHandler = null;

  function activateForm(handler) {
    uploadFile.addEventListener('change', openFormHandler);
    escPressHandler = handler(closeForm);
  }
  function deActivateForm() {
    uploadFile.removeEventListener('change', openFormHandler);
  }
  function openFormHandler(evt) {
    evt.preventDefault();
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    closeFormBtn.addEventListener('click', closeFormHandler);
    // uploadSendBtn.disabled = false;
    window.effect.activate();
    window.validation.activate();
  }

  function closeForm() {
    if (document.activeElement !== form.hashtags && form) {
      overlay.classList.add('hidden');
      document.removeEventListener('keydown', escPressHandler);
      closeFormBtn.removeEventListener('click', closeFormHandler);
      window.effect.deActivate();
      window.validation.deActivate();
      form.reset();
    }
  }

  function closeFormHandler(evt) {
    evt.preventDefault();
    closeForm();
  }

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      window.message.openSuccess();
      closeForm();
    },
    function () {
      window.message.openError();
      closeForm();
    });
    evt.preventDefault();
  });

  window.form = {
    activate: activateForm,
    deActivate: deActivateForm
  };
})();
