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

  // активация страницы по маус- и кейдаун
  window.util.mainPin.addEventListener('mousedown', function () {
    setActivePage(true);
  });

  window.util.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      setActivePage(true);
    }
  });
})();
