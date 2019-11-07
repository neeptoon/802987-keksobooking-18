'use strict';
(function () {
  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  };

  var openError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.addEventListener('click', closeError);
    dialogErrorButton.addEventListener('click', closeError);
    document.addEventListener('keydown', onErrorEscPress);
  };

  var closeError = function () {
    var dialogError = document.querySelector('.error');
    var dialogErrorButton = document.querySelector('.error__button');
    dialogError.remove();
    dialogError.removeEventListener('click', closeError);
    dialogErrorButton.removeEventListener('click', closeError);
    document.removeEventListener('keydown', onErrorEscPress);
    window.activationPage(false);
  };

  window.showError = function () {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var promo = document.querySelector('.promo');
    promo.before(errorElement);
    openError();
  };
})();
