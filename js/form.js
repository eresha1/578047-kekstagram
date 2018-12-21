'use strict';
(function () {

  var form = document.querySelector('.img-upload__form');
  var overlay = form.querySelector('.img-upload__overlay');
  var closeFormBtn = form.querySelector('#upload-cancel');
  var uploadFile = form.querySelector('#upload-file');
  var escPressHandler = null;

  function activateForm(handler) {
    uploadFile.addEventListener('change', openFormHandler);
    escPressHandler = handler(closeForm);
  }
  function deActivateForm() {
    uploadFile.removeEventListener('change', openFormHandler);
  }
  function openFormHandler(event) {
    event.preventDefault();
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', escPressHandler);
    closeFormBtn.addEventListener('click', closeFormHandler);
    window.effect.activate();
  }

  function closeForm() {
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', escPressHandler);
    closeFormBtn.removeEventListener('click', closeFormHandler);
    window.effect.deActivate();
    form.reset();
  }
  function closeFormHandler(event) {
    event.preventDefault();
    closeForm();
  }

  window.form = {
    activate: activateForm,
    deActivate: deActivateForm
  };
})();
