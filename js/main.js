'use strict';

// // get-adverts.js
// var getAdverts = function () {
//   var AMOUNT_ADVERT = 8;
//   var MIN_X = 0;
//   var MAX_X = 1200;
//   var MAX_Y = 630;
//   var MIN_Y = 130;
//   var TIME = ['12:00', '13:00', '14:00'];

//   var maxPrice = 10000;
//   var minPrice = 50000;
//   var minRooms = 1;
//   var maxRooms = 3;
//   var minGuests = 1;
//   var maxGuests = 7;

//   var advertList = [];

//   for (var i = 0; i < AMOUNT_ADVERT; i++) {
//     var location = {
//       x: window.util.getRandomNumber(MIN_X, MAX_X),
//       y: window.util.getRandomNumber(MIN_Y, MAX_Y)
//     };

//     var advertData = {
//       author: {
//         avatar: 'img/avatars/user0' + (i + 1) + '.png'
//       },
//       offer: {
//         title: window.util.titleList[window.util.getRandomNumber(0, window.util.titleList.length - 1)],
//         address: location.x + ' ' + location.y,
//         price: window.util.getRandomNumber(minPrice, maxPrice),
//         type: window.util.typeList[window.util.getRandomNumber(0, window.util.typeList.length - 1)],
//         rooms: window.util.getRandomNumber(minRooms, maxRooms),
//         guests: window.util.getRandomNumber(minGuests, maxGuests),
//         checkin: TIME[window.util.getRandomNumber(0, TIME.length - 1)],
//         checkout: TIME[window.util.getRandomNumber(0, TIME.length - 1)],
//         features: window.util.getRandomArray(window.util.features),
//         description: window.util.descriptionList[window.util.getRandomNumber(0, window.util.descriptionList.length - 1)],
//         photos: window.util.getRandomArray(window.util.photos)
//       },
//       location: location
//     };
//     advertList.push(advertData);
//   }
//   return advertList;
// };

// var adverts = getAdverts();

// получение метки объявления
// var advertPinsList = window.util.mapAdverts.querySelector('.map__pins');

// var getPin = function (advert) {
//   var PIN_WIDTH = 50;
//   var PIN_HEIGHT = 70;
//   var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
//   var advertPinElement = advertPinTemplate.cloneNode(true);
//   var advertPinImg = advertPinElement.querySelector('img');
//   advertPinImg.src = advert.author.avatar;
//   advertPinElement.style.left = (advert.location.x - PIN_WIDTH / 2) + 'px';
//   advertPinElement.style.top = (advert.location.y - PIN_HEIGHT) + 'px';
//   return advertPinElement;
// };

// var pinsFragment = document.createDocumentFragment();
// window.adverts.forEach(function (item) {
//   pinsFragment.appendChild(getPin(item));
// });
// advertPinsList.appendChild(pinsFragment);

// var pins = advertPinsList.querySelectorAll('button[type = "button"]');
// pins.forEach(function (item) {
//   item.classList.add('hidden');
// });

// var AccommodationTypes = {
//   BUNGALO: 'Бунгало',
//   HOUSE: 'Дом',
//   PALACE: 'Дворец',
//   FLAT: 'Квартира'
// };

// var getAdvertCard = function (advert) {
//   var advertCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
//   var advertCardElement = advertCardTemplate.cloneNode(true);
//   var advertCardTitle = advertCardElement.querySelector('.popup__title');
//   var advertCardAddress = advertCardElement.querySelector('.popup__text--address');
//   var advertCardPrice = advertCardElement.querySelector('.popup__text--price');
//   var advertCardType = advertCardElement.querySelector('.popup__type');
//   var advertCardCapacity = advertCardElement.querySelector('.popup__text--capacity');
//   var advertCardCheck = advertCardElement.querySelector('.popup__text--time');
//   var advertCardFeatures = advertCardElement.querySelector('.popup__features');
//   var advertCardDescription = advertCardElement.querySelector('.popup__description');
//   var advertCardPhotos = advertCardElement.querySelector('.popup__photos');
//   var advertCardPhoto = advertCardPhotos.querySelector('.popup__photo');
//   var advertCardAvatar = advertCardElement.querySelector('.popup__avatar');

//   advertCardTitle.textContent = advert.offer.title;
//   advertCardAddress.textContent = advert.offer.address;
//   advertCardPrice.textContent = advert.offer.price + '\u20bd' + '/ночь';
//   advertCardType.textContent = AccommodationTypes[advert.offer.type.toUpperCase()];
//   advertCardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
//   advertCardCheck.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
//   advertCardDescription.textContent = advert.offer.description;
//   advertCardPhotos.removeChild(advertCardPhoto);
//   advertCardAvatar.src = advert.author.avatar;

//   advertCardFeatures.textContent = '';

//   advert.offer.features.forEach(function (item) {
//     var fragment = document.createDocumentFragment();
//     var li = document.createElement('li');
//     li.classList.add('popup__feature');
//     li.classList.add('popup__feature--' + item);
//     fragment.appendChild(li);
//     advertCardFeatures.appendChild(fragment);
//   });

//   advert.offer.photos.forEach(function (item) {
//     var addPhoto = advertCardPhoto.cloneNode(true);
//     advertCardPhotos.appendChild(addPhoto);
//     addPhoto.src = item;
//   });
//   return advertCardElement;
// };

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

var popup = null;

var closePopup = function () {
  if (popup) {
    popup.remove();
  }
  document.removeEventListener('keydown', documentKeyDownHandler);
  document.removeEventListener('click', documentClickHandler);
};

var documentKeyDownHandler = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    closePopup();
  }
};

var documentClickHandler = function (evt) {
  var closePopupButton = popup.querySelector('.popup__close');
  if (evt.target === closePopupButton) {
    closePopup();
  }
};

var openPopup = function (advert) {
  popup = window.getAdvertCard(advert);
  window.util.mapAdverts.querySelector('.map__pins').insertAdjacentElement('afterend', popup);
  document.addEventListener('keydown', documentKeyDownHandler);
  document.addEventListener('click', documentClickHandler);
};

var insertSelectedAdvertCard = function (pin, advert) {
  pin.addEventListener('click', function () {
    closePopup();
    openPopup(advert);
  });
};

for (var i = 0; i < window.adverts.length; i++) {
  insertSelectedAdvertCard(window.pins[i], window.adverts[i]);
}

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

// получение адреса объявления
var addressField = window.util.advertForm.querySelector('#address');
var getAdvertAddress = function (evt) {
  var MAIN_PIN_HEIGHT = 72;
  var MAIN_PIN_WIDTH = 84;
  addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetLeft + MAIN_PIN_HEIGHT);
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
