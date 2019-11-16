'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
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


  window.getPin = function (advert) {

    var pinClickHandler = function () {
      closePopup();
      openPopup(advert);
    };

    var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var advertPinElement = advertPinTemplate.cloneNode(true);
    advertPinElement.addEventListener('click', pinClickHandler);
    var advertPinImg = advertPinElement.querySelector('img');
    advertPinImg.src = advert.author.avatar;
    advertPinElement.style.left = (advert.location.x - PIN_WIDTH / 2) + 'px';
    advertPinElement.style.top = (advert.location.y - PIN_HEIGHT) + 'px';
    return advertPinElement;
  };
})();
