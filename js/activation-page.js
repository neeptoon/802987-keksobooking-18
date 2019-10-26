'use strict';

(function () {
  var renderPins = function (adverts) {
    var advertPinsList = window.util.mapAdverts.querySelector('.map__pins');
    var pinsFragment = document.createDocumentFragment();
    adverts.forEach(function (item) {
      pinsFragment.appendChild(window.getPin(item));
    });
    advertPinsList.appendChild(pinsFragment);
  };

  var showMistakes = function (message) {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorDescription = errorElement.querySelector('.error__message');
    errorDescription.textContent = message;
    main.appendChild(errorElement);
  };

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
      window.download(renderPins, showMistakes);
    } else {
      window.util.mapAdverts.classList.add('map--faded');
      window.util.advertForm.classList.add('ad-form--disabled');
    }
  };
  window.activationPage(false);
})();
