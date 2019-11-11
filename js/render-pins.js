'use strict';
(function () {
  var AMOUNT_PINS = 4;
  var adverts = [];
  var pinsFragment = document.createDocumentFragment();
  var housingTypeFilter = document.querySelector('#housing-type');

  window.renderPins = function (data) {
    adverts = data;
    updateAdverts();
  };

  var updateAdverts = function () {
    var sameHousingType = adverts.filter(function (it) {
      return it.offer.type === housingTypeFilter.value;
    });

    render(sameHousingType);
  };

  var render = function (data) {
    window.advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
    data
      .filter(function (it, i) {
        return i <= AMOUNT_PINS;
      })
      .forEach(function (item) {
        pinsFragment.appendChild(window.getPin(item));
      });
    window.advertPinsList.appendChild(pinsFragment);
  };
})();
