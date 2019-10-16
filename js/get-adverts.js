'use strict';

(function () {
  var AMOUNT_ADVERT = 8;
  var TIME = ['12:00', '13:00', '14:00'];

  var maxPrice = 10000;
  var minPrice = 50000;
  var minRooms = 1;
  var maxRooms = 3;
  var minGuests = 1;
  var maxGuests = 7;

  var getAdverts = function () {

    var advertList = [];

    for (var i = 0; i < AMOUNT_ADVERT; i++) {
      var location = {
        x: window.util.getRandomNumber(window.util.MIN_X, window.util.MAX_X),
        y: window.util.getRandomNumber(window.util.MIN_Y, window.util.MAX_Y)
      };

      var advertData = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.util.titleList[window.util.getRandomNumber(0, window.util.titleList.length - 1)],
          address: location.x + ' ' + location.y,
          price: window.util.getRandomNumber(minPrice, maxPrice),
          type: window.util.typeList[window.util.getRandomNumber(0, window.util.typeList.length - 1)],
          rooms: window.util.getRandomNumber(minRooms, maxRooms),
          guests: window.util.getRandomNumber(minGuests, maxGuests),
          checkin: TIME[window.util.getRandomNumber(0, TIME.length - 1)],
          checkout: TIME[window.util.getRandomNumber(0, TIME.length - 1)],
          features: window.util.getRandomArray(window.util.features),
          description: window.util.descriptionList[window.util.getRandomNumber(0, window.util.descriptionList.length - 1)],
          photos: window.util.getRandomArray(window.util.photos)
        },
        location: location
      };
      advertList.push(advertData);
    }
    return advertList;
  };

  window.adverts = getAdverts();
})();

