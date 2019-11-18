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
  var adverts = [];
  var sameType;
  var samePrice;
  var sameRooms;
  var sameGuests;
  var sameFeatures;

  var renderSomehow = function (pins) {
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

  window.renderPins = function (request) {
    adverts = request;
    renderSomehow(adverts);
  };

  housingTypeFilter.addEventListener('change', function () {
    if (housingTypeFilter.value !== 'any') {
      sameType = adverts.filter(function (it) {
        return it.offer.type === housingTypeFilter.value;
      });
    }
    console.log(sameType);
    renderSomehow(sameType);
  });

  housingPriceFilter.addEventListener('change', function () {
    if (housingPriceFilter.value !== 'any') {
      samePrice = adverts.filter(function (it) {
        if (housingPriceFilter.value === 'low') {
          return it.offer.price < MIN_PRICE;
        } else if (housingPriceFilter.value === 'middle') {
          return it.offer.price >= MIN_PRICE && it.offer.price <= MAX_PRICE;
        } else if (housingPriceFilter.value === 'high') {
          return it.offer.price > MAX_PRICE;
        }
        return it;
      });
      console.log(samePrice);
      renderSomehow(samePrice);
    }
  });

  housingRoomsFilter.addEventListener('change', function () {
    if (housingRoomsFilter.value !== 'any') {
      sameRooms = adverts.filter(function (it) {
        return String(it.offer.rooms) === housingRoomsFilter.value;
      });
      console.log(sameRooms);
      renderSomehow(sameRooms);
    }
  });

  housingGuestsFilter.addEventListener('change', function () {
    if (housingGuestsFilter.value !== 'any') {
      sameGuests = adverts.filter(function (it) {
        return String(it.offer.guests) === housingGuestsFilter.value;
      });
      console.log(sameGuests);
      renderSomehow(sameGuests);
    }
  });

  featuresFilters.addEventListener('change', function () {
    var checkedFiltersFeatures = featuresFilters.querySelectorAll('input:checked');
    console.log(checkedFiltersFeatures);
  });
})();
