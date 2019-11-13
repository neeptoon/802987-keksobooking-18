'use strict';
(function () {
  var AMOUNT_PINS = 5;
  var adverts = [];
  var mapFilter = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilter.querySelector('#housing-type');
  var housingPriceFilter = mapFilter.querySelector('#housing-price');
  var housingRoomsFilter = mapFilter.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilter = mapFilter.querySelectorAll('[name = features]');


  window.renderPins = function (request) {
    adverts = request;
    updateAdverts();
  };


  var updateAdverts = function () {
    var filteredSelect = adverts;

    var mapFilterChangeHandler = function () {
      if (housingTypeFilter.value !== 'any') {
        filteredSelect = adverts.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      } else {
        filteredSelect = adverts.slice();
      }
      // filteredSelect = adverts.filter(function (it) {
      //   return it.offer.type === housingTypeFilter.value;
      // }).filter(function (it) {
      //   return it.offer.rooms === housingRoomsFilter.value;
      // }).filter(function (it) {
      //   return it.offer.price === housingPriceFilter.value;
      // }).filter(function (it) {
      //   return it.offer.guests === housingGuestsFilter.value;
      // });
      render(filteredSelect);
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

    mapFilter.addEventListener('change', mapFilterChangeHandler);
    render(filteredSelect);
  };

})();
