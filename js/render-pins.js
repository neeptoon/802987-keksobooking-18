'use strict';
(function () {
  var AMOUNT_PINS = 5;
  var adverts = [];
  var housingTypeFilter = document.querySelector('#housing-type');

  window.renderPins = function (data) {
    adverts = data;
    updateAdverts();
  };


  var updateAdverts = function () {
    var sameHousingType = adverts;

    var filterChangeHandler = function () {
      if (housingTypeFilter.value !== 'any') {
        sameHousingType = adverts.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        sameHousingType = adverts.slice();
      }
      render(sameHousingType);
    };

    var render = function (pins) {
      window.removePins();
      window.advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
      var pinsFragment = document.createDocumentFragment();
      pins
        .slice(0, AMOUNT_PINS)
        .forEach(function (item) {
          pinsFragment.appendChild(window.getPin(item));
        });
      window.advertPinsList.append(pinsFragment);
    };

    housingTypeFilter.addEventListener('change', filterChangeHandler);
    render(sameHousingType);
  };

})();
