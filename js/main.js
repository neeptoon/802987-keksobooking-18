'use strict';

var AMOUNT_ADVERT = 8;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TIME = ['12:00', '13:00', '14:00'];
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var mapAdverts = document.querySelector('.map');
var filters = mapAdverts.querySelector('.map__filters-container');
var advertPinsList = mapAdverts.querySelector('.map__pins');
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

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (item) {
    fragment.appendChild(getPin(item));
  });

  return advertPinsList.appendChild(fragment);
};
renderPins();

mapAdverts.classList.remove('map--faded');

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

var firstAdvertCard = getAdvertCard(adverts[0]);

var renderCards = function () {
  mapAdverts.insertBefore(firstAdvertCard, filters);
  return mapAdverts;
};
renderCards();
