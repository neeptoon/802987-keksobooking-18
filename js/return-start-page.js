'use strict';
(function () {
  var removePins = function () {
    var pins = window.util.mapAdverts.querySelectorAll('button[type = "button"]');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var removePopup = function () {
    var popup = window.util.mapAdverts.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  window.returnStartPage = function () {
    window.activationPage(false);
    window.util.mainPin.style.left = window.MainPinParams.START_COORDS_LEFT + 'px';
    window.util.mainPin.style.top = window.MainPinParams.START_COORDS_TOP + 'px';
    window.util.addressField.value = (window.util.mainPin.offsetLeft) + window.MainPinParams.MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetTop) + window.MainPinParams.MAIN_PIN_HEIGHT);
    window.util.advertForm.reset();
    removePopup();
    removePins();
    window.showSuccess();
  };
})();
