'use strict';
(function () {
  var AMOUNT_PINS = 5;
  var adverts;
  var mapFilter = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilter.querySelector('#housing-type');
  var housingPriceFilter = mapFilter.querySelector('#housing-price');
  var housingRoomsFilter = mapFilter.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilter = mapFilter.querySelectorAll('[name = features]');


  window.renderPins = function (request) {
    adverts = request;
    updateAdverts(adverts);
  };


  var updateAdverts = function () {
    var filteredField;

    var mapFilterChangeHandler = window.debounce(function () {
      if (housingTypeFilter.value !== 'any') {
        filteredField = adverts.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        filteredField = adverts.slice();
      }
      console.log(filteredField);

      if (housingPriceFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          return it.offer.price === housingPriceFilter.value;
        });
      } else {
        filteredField = filteredField.slice();
      }

      if (housingRoomsFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          return it.offer.price === housingRoomsFilter.value;
        });
      } else {
        filteredField = filteredField.slice();
      }

      if (housingGuestsFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          return it.offer.price === housingGuestsFilter.value;
        });
      } else {
        filteredField = filteredField.slice();
      }

      console.log(filteredField);

      render(filteredField);
    });

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

    mapFilter.addEventListener('change', mapFilterChangeHandler);
    render(adverts);
  };

})();
