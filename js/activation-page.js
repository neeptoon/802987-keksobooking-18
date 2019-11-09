'use strict';

(function () {

  var renderPins = function (adverts) {
    window.advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();
    adverts.forEach(function (item) {
      pinsFragment.appendChild(window.getPin(item));
    });
    window.advertPinsList.appendChild(pinsFragment);
  };

  var advertFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.load(window.returnStartPage, window.showError, 'POST', new FormData(window.util.advertForm));
  };

  var isDownload = false;

  window.activationPage = function (isActivePage) {
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
      if (!isDownload) {
        window.load(renderPins, window.showError, 'GET');
        isDownload = true;
      }
      window.util.advertForm.addEventListener('submit', advertFormSubmitHandler);
    } else {
      window.util.mapAdverts.classList.add('map--faded');
      window.util.advertForm.classList.add('ad-form--disabled');
      window.util.advertForm.removeEventListener('submit', advertFormSubmitHandler);
      isDownload = false;
    }
  };
  window.activationPage(false);
})();
