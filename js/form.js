'use strict';
(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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

  var selectFile = function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var preview = window.effect.effectTarget;

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    // } else {
    //   window.message.loadError('Ошибка! Неправильный тип файла. Просьба выбрать файл в формате JPG, PNG, JPEG, GIF');
    }
  };

  function openFormHandler(evt) {
    evt.preventDefault();
    selectFile();
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
    evt.preventDefault();
    window.backend.upload(new FormData(form), function () {
      window.message.openSuccess();
      closeForm();
    },
    function (error) {
      window.message.openError(error);
      closeForm();
    });
  });

  window.form = {
    activate: activateForm,
    deActivate: deActivateForm
  };
})();
