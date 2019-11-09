'use strict';
(function () {
  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  };

  var openSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  var closeSuccess = function () {
    var dialogSuccess = document.querySelector('.success');
    dialogSuccess.removeEventListener('click', closeSuccess);
    document.removeEventListener('keydown', onSuccessEscPress);
    dialogSuccess.remove();
  };

  window.showSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var promo = document.querySelector('.promo');
    promo.before(successElement);
    openSuccess();
  };
})();
