'use strict';
(function () {
  var PRICE_PLACEHOLDER = 5000;

  var removePopup = function () {
    var popup = window.util.mapAdverts.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  window.returnStartPage = function () {
    window.pageActivation(false);
    window.util.mainPin.style.left = window.MainPinParams.START_COORDS_LEFT + 'px';
    window.util.mainPin.style.top = window.MainPinParams.START_COORDS_TOP + 'px';
    window.util.addressField.value = (window.util.mainPin.offsetLeft) + window.MainPinParams.MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetTop) + window.MainPinParams.MAIN_PIN_HEIGHT);
    window.util.advertForm.reset();
    document.querySelector('#price').placeholder = PRICE_PLACEHOLDER;
    removePopup();
    window.removePins();
    window.showSuccess();
  };
})();
