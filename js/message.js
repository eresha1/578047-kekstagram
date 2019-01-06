'use strict';

(function () {
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  // var messagesTemplate = document.querySelector('#messages').content.querySelector('.img-upload__message');
  var escPressSuccessHandler = null;
  var escPressErrorHandler = null;

  function setSuccessHandler(handler) {
    escPressSuccessHandler = handler(closeSuccess);
  }

  var successInnerClickHandler = function (evt) {
    var successInner = main.querySelector('.success__inner');
    if (evt.target !== successInner) {
      closeSuccess();
    }
  };

  var openSuccess = function () {
    var messageSuccess = successTemplate.cloneNode(true);
    main.appendChild(messageSuccess);
    var openedBtn = messageSuccess.querySelector('.success__button');
    openedBtn.focus();

    openedBtn.addEventListener('click', function () {
      closeSuccess();
    });

    document.addEventListener('keydown', escPressSuccessHandler);
    document.addEventListener('click', successInnerClickHandler);
  };

  var closeSuccess = function () {
    document.removeEventListener('keydown', escPressSuccessHandler);
    document.removeEventListener('click', successInnerClickHandler);
    main.removeChild(main.querySelector('.success'));
  };


  function setErrorHandler(handler) {
    escPressErrorHandler = handler(closeError);
  }

  var errorInnerClickHandler = function (evt) {
    var errorInner = main.querySelector('.error__inner');
    if (evt.target !== errorInner) {
      closeError();
    }
  };

  // var openMessageUload = function () {
  //   var messageUpload = messagesTemplate.cloneNode(true);
  //   main.appendChild(messageUpload);
  // };

  var openError = function (errorText) {
    var messageError = errorTemplate.cloneNode(true);
    main.appendChild(messageError);
    messageError.querySelector('.error__title').textContent = errorText;
    messageError.querySelector('.error__title').style = 'line-height: 1.5';
    var errorMessageBtn = messageError.querySelectorAll('.error__button');
    errorMessageBtn[0].focus();
    errorMessageBtn.forEach(function (item) {
      item.addEventListener('click', function () {
        closeError();
      });
    });

    document.addEventListener('keydown', escPressErrorHandler);
    document.addEventListener('click', errorInnerClickHandler);
  };

  var closeError = function () {
    main.removeChild(main.querySelector('.error'));
    document.removeEventListener('keydown', escPressErrorHandler);
    document.removeEventListener('click', errorInnerClickHandler);
  };


  var loadError = function (errorText) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.textContent = errorText;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.message = {
    openSuccess: openSuccess,
    openError: openError,
    setErrorHandler: setErrorHandler,
    setSuccessHandler: setSuccessHandler,
    loadError: loadError
  };

})();
