'use strict';

var main = document.querySelector('main');

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
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    main.appendChild(errorElement);
  };

  var showSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    main.appendChild(successElement);
    document.addEventListener('click', returnStartPage);
  };

  var removePins = function () {
    var pins = window.util.mapAdverts.querySelectorAll('button[type = "button"]');
    pins.forEach(function (item) {
      item.remove();
    });
  };

  var returnStartPage = function () {
    window.activationPage(false);
    window.util.mainPin.style.left = window.MainPinParams.START_COORDS_LEFT + 'px';
    window.util.mainPin.style.top = window.MainPinParams.START_COORDS_TOP + 'px';
    window.util.addressField.value = (window.util.mainPin.offsetLeft) + window.MainPinParams.MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetTop) + window.MainPinParams.MAIN_PIN_HEIGHT);
    window.util.advertForm.reset();
    removePins();
  };

  var advertFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.load(returnStartPage, showMistakes, 'POST', new FormData(window.util.advertForm));
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
      window.load(renderPins, showMistakes, 'GET');
      window.util.advertForm.addEventListener('submit', advertFormSubmitHandler);
    } else {
      window.util.mapAdverts.classList.add('map--faded');
      window.util.advertForm.classList.add('ad-form--disabled');
      window.util.advertForm.removeEventListener('submit', advertFormSubmitHandler);
    }
  };
  window.activationPage(false);
})();
