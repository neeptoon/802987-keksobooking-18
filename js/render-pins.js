'use strict';
(function () {
  window.renderPins = function (adverts) {
    window.advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();
    adverts.forEach(function (item) {
      pinsFragment.appendChild(window.getPin(item));
    });
    window.advertPinsList.appendChild(pinsFragment);
  };
})();
