'use strict';

(function () {
  var popup = null;

  var closePopup = function () {
    if (popup) {
      popup.remove();
    }
    document.removeEventListener('keydown', documentKeyDownHandler);
    document.removeEventListener('click', documentClickHandler);
  };

  var documentKeyDownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var documentClickHandler = function (evt) {
    var closePopupButton = popup.querySelector('.popup__close');
    if (evt.target === closePopupButton) {
      closePopup();
    }
  };

  var openPopup = function (advert) {
    popup = window.getAdvertCard(advert);
    window.util.mapAdverts.querySelector('.map__pins').insertAdjacentElement('afterend', popup);
    document.addEventListener('keydown', documentKeyDownHandler);
    document.addEventListener('click', documentClickHandler);
  };

  var showPopup = function (pin, advert) {
    pin.addEventListener('click', function () {
      closePopup();
      openPopup(advert);
    });
  };

  for (var i = 0; i < window.util.adverts[i]; i++) {
    showPopup(window.util.pins[i], window.util.adverts[i]);
  }
})();
