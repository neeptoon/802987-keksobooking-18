'use strict';

(function () {
  var setActivePage = function (isActivePage) {
    var filters = window.util.mapAdverts.querySelector('.map__filters-container');
    var filtersForm = filters.querySelector('.map__filters');
    var advertFormFields = window.util.advertForm.querySelectorAll('fieldset, select');
    var filtersFormFields = filtersForm.querySelectorAll('fieldset, select');
    advertFormFields.forEach(function (item) {
      item.disabled = !isActivePage;
    });

    filtersFormFields.forEach(function (item) {
      item.disabled = !isActivePage;
    });

    if (isActivePage) {
      window.util.mapAdverts.classList.remove('map--faded');

      window.util.advertForm.classList.remove('ad-form--disabled');

      window.pins.forEach(function (item) {
        item.classList.remove('hidden');
      });
    } else {
      window.util.mapAdverts.classList.add('map--faded');
      window.util.advertForm.classList.add('ad-form--disabled');
    }
  };

  setActivePage(false);

  // получение адреса объявления
  var addressField = window.util.advertForm.querySelector('#address');
  var getAdvertAddress = function (evt) {
    var MAIN_PIN_HEIGHT = 72;
    var MAIN_PIN_WIDTH = 84;
    addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetLeft + MAIN_PIN_HEIGHT);
  };

  // активация страницы по клику и кейдауну
  var mapPinActivation = window.util.mapAdverts.querySelector('.map__pin--main');
  mapPinActivation.addEventListener('mousedown', function (evt) {
    setActivePage(true);
    getAdvertAddress(evt);
  });

  mapPinActivation.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      setActivePage(true);
      getAdvertAddress(evt);
    }
  });
})();
