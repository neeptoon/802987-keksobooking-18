'use strict';

(function () {
  window.getPin = function (advert) {
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var advertPinElement = advertPinTemplate.cloneNode(true);
    var advertPinImg = advertPinElement.querySelector('img');
    advertPinImg.src = advert.author.avatar;
    advertPinElement.style.left = (advert.location.x - PIN_WIDTH / 2) + 'px';
    advertPinElement.style.top = (advert.location.y - PIN_HEIGHT) + 'px';
    return advertPinElement;
  };
})();
