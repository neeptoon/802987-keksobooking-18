'use strict';

(function () {
  // валидация формы объявления
  var roomNumber = window.util.advertForm.querySelector('#room_number');
  var capacity = window.util.advertForm.querySelector('#capacity');

  var HousingPriceOnType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var advertFormClickHandler = function () {
    if (+roomNumber.value < +capacity.value && capacity.value !== '0') {
      roomNumber.setCustomValidity('Не хватит места для гостей');
    } else if (roomNumber.value.length > capacity.value.length && capacity.value !== '0') {
      capacity.setCustomValidity('Без гостей, ради бога!');
    } else if (roomNumber.value > capacity.value && capacity.value === '0' && +roomNumber.value !== 100) {
      roomNumber.setCustomValidity('Без гостей только 100 комнат');
    }
  };

  window.util.advertForm.addEventListener('click', advertFormClickHandler);
  window.util.advertForm.addEventListener('change', function () {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
  });

  // настройка формы объявления
  var housingType = window.util.advertForm.querySelector('#type');
  var pricePerNight = window.util.advertForm.querySelector('#price');

  housingType.addEventListener('change', function () {
    pricePerNight.min = HousingPriceOnType[housingType.value.toUpperCase()];
    pricePerNight.placeholder = HousingPriceOnType[housingType.value.toUpperCase()];
  });

  // настройка времени прибытия - убытия
  var timeIn = window.util.advertForm.querySelector('#timein');
  var timeOut = window.util.advertForm.querySelector('#timeout');

  var selectChangeClickHandler = function (evt) {
    var select = evt.currentTarget;
    if (select.name === 'timein') {
      timeOut.value = select.value;
    } else {
      timeIn.value = select.value;
    }
  };

  timeIn.addEventListener('change', selectChangeClickHandler);
  timeOut.addEventListener('change', selectChangeClickHandler);
})();
