'use strict';

var AMOUNT_ADVERT = 8;
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
var descriptionList = ['можно с детьми', 'можно с животными', 'можно с детьми животных', 'никаких детей', 'никаких животных']
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var TIME = ['12:00', '13:00', '14:00'];

var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getRandomArray = function (arr) {
  arr.sort(function () {
    return 0.5 - Math.random();
  });
  arr.splice(0, getRandomNumber(0, arr.length - 1));
  return arr;
};

var getAdverts = function () {
  var advertList = [];
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    var advertData = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titleList[getRandomNumber(0, titleList.length - 1)],
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
      location: {
        x: getRandomNumber(MIN_X, MAX_X),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    };
    advertData.offer.address = advertData.location.x + ', ' + advertData.location.y;
    advertList.push(advertData);
  }
  return advertList;
};

var adverts = getAdverts();
console.log(adverts);

var mapAdverts = document.querySelector('.map');
mapAdverts.classList.remove('map--faded');
var advertPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var advertPinsList = mapAdverts.querySelector('.map__pins');


var getPin = function (advert) {
  var advertPinElement = advertPinTemplate.cloneNode(true);
  advertPinElement.src = 'advert.author.avatar';
  advertPinElement.style = 'left: ' + advert.location.x + 'px;' + ' top: ' + advert.location.y + 'px;';
  advertPinElement.alt = advert.offer.title;
  return advertPinElement;
};


var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < AMOUNT_ADVERT; i++) {
    fragment.appendChild(getPin(adverts[i]));
  }
  return advertPinsList.appendChild(fragment);
};
renderPins();

