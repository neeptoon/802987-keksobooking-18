'use strict';

(function () {
  var advertPinsList = window.util.mapAdverts.querySelector('.map__pins');

  var getPin = function (advert) {
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

  var onSuccess = function (response) {
    window.util.adverts = response;
    var pinsFragment = document.createDocumentFragment();
    window.util.adverts.forEach(function (item) {
      pinsFragment.appendChild(getPin(item));
    });
    advertPinsList.appendChild(pinsFragment);

    window.util.pins = advertPinsList.querySelectorAll('button[type = "button"]');
    console.log(window.util.pins);
    console.log(window.util.adverts);

    window.util.pins.forEach(function (item) {
      item.classList.add('hidden');
    });
  };

  window.download(onSuccess);
})();
