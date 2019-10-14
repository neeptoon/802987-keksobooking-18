'use strict';

(function () {
  // валидация формы объявления
  var roomNumber = window.util.advertForm.querySelector('#room_number');
  var capacity = window.util.advertForm.querySelector('#capacity');

  var HousingPriceOnType = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var SetTime = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var checkForm = function () {
    if (+roomNumber.value < +capacity.value && capacity.value !== '0') {
      roomNumber.setCustomValidity('Не хватит места для гостей');
    } else if (roomNumber.value.length > capacity.value.length && capacity.value !== '0') {
      capacity.setCustomValidity('Без гостей, ради бога!');
    } else if (roomNumber.value > capacity.value && capacity.value === '0' && +roomNumber.value !== 100) {
      roomNumber.setCustomValidity('Без гостей только 100 комнат');
    }
  };

  window.util.advertForm.addEventListener('click', checkForm);
  window.util.advertForm.addEventListener('change', function () {
    roomNumber.setCustomValidity('');
    capacity.setCustomValidity('');
  });

  // настройка формы объявления
  var housingType = window.util.advertForm.querySelector('#type');
  var pricePerNight = window.util.advertForm.querySelector('#price');

  housingType.addEventListener('change', function () {
    pricePerNight.min = HousingPriceOnType[housingType.value];
    pricePerNight.placeholder = HousingPriceOnType[housingType.value];
  });

  // настройка времени прибытия - убытия
  var timeIn = window.util.advertForm.querySelector('#timein');
  var timeOut = window.util.advertForm.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = SetTime[timeIn.value];
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = SetTime[timeOut.value];
  });
})();
