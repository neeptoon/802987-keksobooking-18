'use strict';

(function () {
  var AccommodationTypes = {
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    FLAT: 'Квартира'
  };

  window.getAdvertCard = function (advert) {
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
    advertCardAvatar.textContent = ' ';

    advertCardFeatures.textContent = ' ';

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
    Array.from(advertCardElement.children).forEach(function (item) {
      if (!item.textContent) {
        item.remove();
      }
    });
    return advertCardElement;
  };
})();
