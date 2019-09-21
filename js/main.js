'use strict';
var amountAdvert = 8;

var getRandomNumber = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * max - min + 1);
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
var typeList = ['palace', 'flat', 'house', 'bungalo'];
var checkinTime = ['12:00', '13:00', '14:00'];
var checkoutTime = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getAdverts = function () {
  var advertList = [];
  for (var i = 0; i < amountAdvert; i++) {
    var advertData = {
      'author': {
        'avatar': 'img/avatars/user' + avatarNumbers[i] + '.png'
      },
      'offer': {
        'title': 'заголовок предложения',
        // значения возвращаются строкой, исправить
        'address': advertData['location'],
        'price': getRandomNumber(1000, 3000),
        'type': typeList[getRandomNumber(0, typeList.length - 1)],
        'rooms': getRandomNumber(1, 5),
        'guests': getRandomNumber(1, 7),
        'checkin': checkinTime[getRandomNumber(0, checkinTime.length - 1)],
        'checkout': checkoutTime[getRandomNumber(0, checkoutTime.length - 1)],
        // вернуть массив строк случайной длины
        'features': featuresList,
        'description': 'строка с описанием',
        // вернуть массив строк случайной длины
        'photos': photosList
      },
      'location': {
        'x': getRandomNumber(0, 768),
        'y': getRandomNumber(130, 630)
      }
    };
    advertList.push(advertData);
  }
  return advertList;
};

var adverts = getAdverts();
console.log(adverts[2]);

