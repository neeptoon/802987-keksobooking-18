'use strict';
var amountAdvert = 8;

var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

var getAvatarNumberList = function () {
  var avatarNumberList = [];
  while (avatarNumberList.length < amountAdvert) {
    var avatarNumber = '0' + getRandomNumber(0, amountAdvert);
    if (avatarNumberList.indexOf(avatarNumber) === -1) {
      avatarNumberList.push(avatarNumber);
    }
  }
  return avatarNumberList;
};
var avatarNumbers = getAvatarNumberList();

var maxPrice = 10000;
var minPrice = 50000;
var minRooms = 1;
var maxRooms = 3;
var minGuests = 1;
var maxGuests = 7;
var coordMinX = 0;
var coordMaxX = 1200;
var coordMinY = 130;
var coordMaxY = 630;
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var features = {
  list: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  listRandom: function () {
    var randomList = [];
    for (var i = 0; i < getRandomNumber(0, features.list.length - 1); i++) {
      randomList[i] = features.list[i];
    }
    return randomList;
  }
};
var photos = {
  list: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  listRandom: function () {
    var randomList = [];
    for (var i = 0; i < getRandomNumber(0, photos.list.length - 1); i++) {
      randomList[i] = photos.list[i];
    }
    return randomList;
  }
};

var getAdverts = function () {
  var advertList = [];
  for (var i = 0; i < amountAdvert; i++) {
    var advertData = {
      'author': {
        'avatar': 'img/avatars/user' + avatarNumbers[i] + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        'price': getRandomNumber(minPrice, maxPrice),
        'type': typeList[getRandomNumber(0, typeList.length - 1)],
        'rooms': getRandomNumber(minRooms, maxRooms),
        'guests': getRandomNumber(minGuests, maxGuests),
        'checkin': checkinTime[getRandomNumber(0, checkinTime.length - 1)],
        'checkout': checkoutTime[getRandomNumber(0, checkoutTime.length - 1)],
        'features': features.listRandom(),
        'description': 'строка с описанием',
        'photos': photos.listRandom()
      },
      'location': {
        'x': getRandomNumber(coordMinX, coordMaxX),
        'y': getRandomNumber(coordMinY, coordMaxY)
      }
    };
    advertData.offer.address = advertData.location.x + ', ' + advertData.location.y;
    advertList.push(advertData);
  }
  return advertList;
};

var adverts = getAdverts();

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
  for (var i = 0; i < amountAdvert; i++) {
    fragment.appendChild(getPin(adverts[i]));
  }
  return advertPinsList.appendChild(fragment);
};
renderPins();

