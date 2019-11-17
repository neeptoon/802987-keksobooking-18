'use strict';
(function () {
  var AMOUNT_PINS = 5;
  var MAX_PRICE = 50000;
  var MIN_PRICE = 10000;
  var mapFilter = document.querySelector('.map__filters');
  var housingTypeFilter = mapFilter.querySelector('#housing-type');
  var housingPriceFilter = mapFilter.querySelector('#housing-price');
  var housingRoomsFilter = mapFilter.querySelector('#housing-rooms');
  var housingGuestsFilter = mapFilter.querySelector('#housing-guests');
  var featuresFilters = mapFilter.querySelector('#housing-features');

  window.renderPins = function (request) {
    var adverts = request;
    updateAdverts(adverts);
  };

  var updateAdverts = function (adverts) {

    var mapFilterChangeHandler = window.debounce(function () {
      var filteredField = adverts;
      if (housingTypeFilter.value !== 'any') {
        filteredField = adverts.filter(function (it) {
          return it.offer.type === housingTypeFilter.value;
        });
      }

      if (housingPriceFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          if (housingPriceFilter.value === 'low') {
            return it.offer.price < MIN_PRICE;
          } else if (housingPriceFilter === 'middle') {
            return it.offer.price > MIN_PRICE && it.offer.price < MAX_PRICE;
          } else if (housingPriceFilter === 'high') {
            return it.offer.price > MAX_PRICE;
          }
          return it;
        });
      }

      if (housingRoomsFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          return String(it.offer.rooms) === housingRoomsFilter.value;
        });
      }


      if (housingGuestsFilter.value !== 'any') {
        filteredField = filteredField.filter(function (it) {
          return String(it.offer.guests) === housingGuestsFilter.value;
        });
      }

      var checkedFiltersFeatures = Array.from(featuresFilters.querySelectorAll('input:checked'));
      var valueCheckedFiltersFeatures = checkedFiltersFeatures.map(function (elem) {
        return elem.value;
      });

      filteredField = filteredField.filter(function (it) {
        var count = 0;
        valueCheckedFiltersFeatures.forEach(function (elem) {
          count += it.offer.features.indexOf(elem) > -1 ? 1 : 0;
        });
        return count === valueCheckedFiltersFeatures.length;
      });

      render(filteredField);
    });

    var render = function (pins) {
      window.removePins();
      window.advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
      var pinsFragment = document.createDocumentFragment();
      pins
        .slice(0, AMOUNT_PINS)
        .forEach(function (item) {
          if (item.offer) {
            pinsFragment.appendChild(window.getPin(item));
          }
        });
      window.advertPinsList.append(pinsFragment);
    };

    mapFilter.addEventListener('change', mapFilterChangeHandler);
    render(adverts);
  };
})();
