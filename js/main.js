'use strict';

var AMOUNT_ADVERT = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TIME = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_HEIGHT = 72;
var MAIN_PIN_WIDTH = 84;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var mapAdverts = document.querySelector('.map');
var filters = mapAdverts.querySelector('.map__filters-container');
var filtersForm = filters.querySelector('.map__filters');
var filtersFormFields = filtersForm.querySelectorAll('fieldset, select');
var advertPinsList = mapAdverts.querySelector('.map__pins');
var advertForm = document.querySelector('.ad-form');
var advertFormFields = advertForm.querySelectorAll('fieldset, select');
var mapPinActivation = mapAdverts.querySelector('.map__pin--main');
var addressField = advertForm.querySelector('#address');
var roomNumber = advertForm.querySelector('#room_number');
var capacity = advertForm.querySelector('#capacity');

var maxPrice = 10000;
var minPrice = 50000;
var minRooms = 1;
var maxRooms = 3;
var minGuests = 1;
var maxGuests = 7;

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var titleList = ['Отличная двушка по цене трешки', 'Холостяцкое гнездышко с видом на море', 'Хата с глухими соседями', 'Квартира в аренду посуточно рядом с клубом', 'Просто отличная квартира', 'Кошатницам вход запрещен'];
var descriptionList = ['можно с детьми', 'можно с животными', 'можно с детьми животных', 'никаких детей', 'никаких животных'];

var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomArray = function (arr) {
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  return arr.splice(0, getRandomNumber(1, arr.length));
};

var getAdverts = function () {
  var advertList = [];

  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    var location = {
      x: getRandomNumber(MIN_X, MAX_X),
      y: getRandomNumber(MIN_Y, MAX_Y)
    };

    var advertData = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titleList[getRandomNumber(0, titleList.length - 1)],
        address: location.x + ' ' + location.y,
        price: getRandomNumber(minPrice, maxPrice),
        type: typeList[getRandomNumber(0, typeList.length - 1)],
        rooms: getRandomNumber(minRooms, maxRooms),
        guests: getRandomNumber(minGuests, maxGuests),
        checkin: TIME[getRandomNumber(0, TIME.length - 1)],
        checkout: TIME[getRandomNumber(0, TIME.length - 1)],
        features: getRandomArray(features),
        description: descriptionList[getRandomNumber(0, descriptionList.length - 1)],
        photos: getRandomArray(photos)
      },
      location: location
    };
    advertList.push(advertData);
  }
  return advertList;
};

var adverts = getAdverts();

var getPin = function (advert) {
  var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var advertPinElement = advertPinTemplate.cloneNode(true);
  var advertPinImg = advertPinElement.querySelector('img');
  advertPinImg.src = advert.author.avatar;
  advertPinElement.style.left = (advert.location.x - PIN_WIDTH / 2) + 'px';
  advertPinElement.style.top = (advert.location.y - PIN_HEIGHT) + 'px';
  return advertPinElement;
};

var pinsFragment = document.createDocumentFragment();
adverts.forEach(function (item) {
  pinsFragment.appendChild(getPin(item));
});
advertPinsList.appendChild(pinsFragment);

var pins = advertPinsList.querySelectorAll('button[type = "button"]');
pins.forEach(function (item) {
  item.classList.add('hidden');
});

var AccommodationTypes = {
  BUNGALO: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  FLAT: 'Квартира'
};

var getAdvertCard = function (advert) {
  var advertCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var advertCardElement = advertCardTemplate.cloneNode(true);
  var advertCardTitle = advertCardElement.querySelector('.popup__title');
  var advertCardAddress = advertCardElement.querySelector('.popup__text--address');
  var advertCardPrice = advertCardElement.querySelector('.popup__text--price');
  var advertCardType = advertCardElement.querySelector('.popup__type');
  var advertCardCapacity = advertCardElement.querySelector('.popup__text--capacity');
  var advertCardCheck = advertCardElement.querySelector('.popup__text--time');
  var advertCardFeatures = advertCardElement.querySelector('.popup__features');
  var advertCardDescription = advertCardElement.querySelector('.popup__description');
  var advertCardPhotos = advertCardElement.querySelector('.popup__photos');
  var advertCardPhoto = advertCardPhotos.querySelector('.popup__photo');
  var advertCardAvatar = advertCardElement.querySelector('.popup__avatar');

  advertCardTitle.textContent = advert.offer.title;
  advertCardAddress.textContent = advert.offer.address;
  advertCardPrice.textContent = advert.offer.price + '\u20bd' + '/ночь';
  advertCardType.textContent = AccommodationTypes[advert.offer.type.toUpperCase()];
  advertCardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  advertCardCheck.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  advertCardDescription.textContent = advert.offer.description;
  advertCardPhotos.removeChild(advertCardPhoto);
  advertCardAvatar.src = advert.author.avatar;

  advertCardFeatures.textContent = '';

  advert.offer.features.forEach(function (item) {
    var fragment = document.createDocumentFragment();
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + item);
    fragment.appendChild(li);
    advertCardFeatures.appendChild(fragment);
  });

  advert.offer.photos.forEach(function (item) {
    var addPhoto = advertCardPhoto.cloneNode(true);
    advertCardPhotos.appendChild(addPhoto);
    addPhoto.src = item;
  });
  return advertCardElement;
};

// var advertCardsFragment = document.createDocumentFragment();
// adverts.forEach(function (element) {
//   advertCardsFragment.appendChild(getAdvertCard(element));
// });
// mapAdverts.insertBefore(advertCardsFragment, filters);

var advertCards = mapAdverts.querySelectorAll('.popup');
advertCards.forEach(function (item) {
  item.classList.add('hidden');
});

var insertSelectedAdvertCard = function (pin) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(getAdvertCard(adverts[pin]));
  mapAdverts.insertBefore(fragment, filters);
};

insertSelectedAdvertCard(1);

var getAdvertAddress = function (evt) {
  addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetLeft + MAIN_PIN_HEIGHT);
};

var setActivePage = function (isActivePage) {
  advertFormFields.forEach(function (item) {
    item.disabled = !isActivePage;
  });

  filtersFormFields.forEach(function (item) {
    item.disabled = !isActivePage;
  });

  if (isActivePage) {
    mapAdverts.classList.remove('map--faded');

    advertForm.classList.remove('ad-form--disabled');

    pins.forEach(function (item) {
      item.classList.remove('hidden');
    });
  } else {
    mapAdverts.classList.add('map--faded');

    advertForm.classList.add('ad-form--disabled');
  }
};

setActivePage(false);

mapPinActivation.addEventListener('mousedown', function (evt) {
  setActivePage(true);
  getAdvertAddress(evt);
});

mapPinActivation.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setActivePage(true);
    getAdvertAddress(evt);
  }
});

var checkForm = function () {
  if (+roomNumber.value < +capacity.value && capacity.value !== '0') {
    roomNumber.setCustomValidity('Не хватит места для гостей');
  } else if (roomNumber.value.length > capacity.value.length && capacity.value !== '0') {
    capacity.setCustomValidity('Без гостей, ради бога!');
  } else if (roomNumber.value > capacity.value && capacity.value === '0' && +roomNumber.value !== 100) {
    roomNumber.setCustomValidity('Без гостей только 100 комнат');
  }
};

advertForm.addEventListener('click', checkForm);
advertForm.addEventListener('change', function () {
  roomNumber.setCustomValidity('');
  capacity.setCustomValidity('');
});

// var popupCloseButtonClassName = 'popup__close';

// var addPinClickHandler = function (pin, advertCard) {
//   var documentKeyDownHandler = function (evt) {
//     if (evt.keyCode === ESC_KEYCODE) {
//       closePopup();
//     }
//   };

//   var documentClickHandler = function (evt) {
//     if (evt.target.className === popupCloseButtonClassName) {
//       closePopup();
//     }
//   };

//   var closePopup = function () {
//     advertCard.classList.add('hidden');
//     document.removeEventListener('keydown', documentKeyDownHandler);
//     document.removeEventListener('click', documentClickHandler);
//   };

//   var openPopup = function () {
//     advertCard.classList.remove('hidden');
//     document.addEventListener('keydown', documentKeyDownHandler);
//     document.addEventListener('click', documentClickHandler);
//   };

//   pin.addEventListener('click', function () {
//     openPopup();
//   });
// };

// for (var i = 0; i < pins.length; i++) {
//   addPinClickHandler(pins[i], advertCards[i]);
// }
