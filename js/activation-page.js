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

  var showMistakes = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorResetButton = errorElement.querySelector('.error__button');
    main.appendChild(errorElement);
    errorResetButton.addEventListener('click', console.log('hello'));
  };

  var returnStartPage = function (evt) {
    evt.preventDefault();
    window.activationPage(false);
    window.util.mainPin.style.left = window.MainPinParams.START_COORDS_LEFT + 'px';
    window.util.mainPin.style.top = window.MainPinParams.START_COORDS_TOP + 'px';
    window.util.addressField.value = (window.util.mainPin.offsetLeft) + window.MainPinParams.MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetTop) + window.MainPinParams.MAIN_PIN_HEIGHT);
    window.util.advertForm.reset();
  };

  var advertFormSubmitHandler = function (evt) {
    window.load('https://js.dump.academy/keksobooking', returnStartPage, showMistakes, 'POST', new FormData(window.util.advertForm));
    evt.preventDefault();
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
      window.load('https://js.dump.academy/keksobooking/data', renderPins, showMistakes, 'GET');
      window.util.advertForm.addEventListener('submit', advertFormSubmitHandler);
    } else {
      window.util.mapAdverts.classList.add('map--faded');
      window.util.advertForm.classList.add('ad-form--disabled');
      window.util.advertForm.removeEventListener('submit', advertFormSubmitHandler);
    }
  };
  window.activationPage(false);
})();
