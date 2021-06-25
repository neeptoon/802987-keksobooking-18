'use strict';

let numbers = [1, 2, 3, 4, 5, 6, 7, 8];
let titles = [`title-1`, `title-2`, `title-3`, 'title-4'];
let addresses = ['600, 350', '453, 125', '248, 544', '359, 555', '443, 112', '54, 350'];
let prices = [100, 300, 500, 900, 1100, 1548, 651, 452, 7946, 5623];
let types = ['palace', 'bungalo', 'flat', 'house'];
let times = ['12:00', '13:00', '14:00'];
let features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
let descriptions = ['description-1', 'description-2', 'description-3', 'description-4', 'description-5', 'description-6'];
let photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
let x = [130, 150, 200, 250, 300, 350, 400, 500];
let y = [130, 150, 200, 250, 300, 350, 400, 500];

function getRandomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

    [array[i], array[j]] = [array[j], array[i]];

    return array;
  }
}

// get random uniq element from array
//realization
function makeGetRandomElement(initialArray) {
  var arr;
  function randomIndex() {
    return Math.floor(Math.random() * arr.length);
  }
  function reinitArray() {
    arr = initialArray.slice();
  }
  reinitArray();
  return function getRandomElement() {
    if(arr.length === 0) reinitArray();
    return arr.splice(randomIndex(), 1)[0];
  }
}
//uses
let getRandomElement = makeGetRandomElement(numbers);

let getAuthor = () => ({
    avatar: `img/avatars/user0${getRandomElement()}.png`
});
let getRandomValueOfArray = (arr) => arr[getRandomInteger(0, arr.length-1)];
let getSomeValuesOfArray = (arr) => shuffle(arr.slice()).splice(0, getRandomInteger(1, arr.length));

let getSomeAdvert = function () {
  return {
    author: getAuthor(),
    offer: {
      title: getRandomValueOfArray(titles),
      address: getRandomValueOfArray(addresses),
      price: getRandomValueOfArray(prices),
      type: getRandomValueOfArray(types),
      rooms: getRandomValueOfArray(numbers),
      guests: getRandomValueOfArray(numbers),
      checkin: getRandomValueOfArray(times),
      checkout: getRandomValueOfArray(times),
      features: getSomeValuesOfArray(features),
      description: getRandomValueOfArray(descriptions),
      photos: getSomeValuesOfArray(photos),
    },
    location: {
      x: getRandomValueOfArray(x),
      y: getRandomValueOfArray(y)
    }
  }
};

let getSomeAdverts = function () {
  let adverts = [];
  for (let i = 1; i <= 8; i++) {
    adverts.push(getSomeAdvert())
  }
  return adverts;
};

let pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

let getPin = function (advert) {
  let preparedPin = pinTemplate.cloneNode(true);
  preparedPin.querySelector('img').src = advert.author.avatar;
  preparedPin.querySelector('img').alt = advert.offer.title;
  preparedPin.style.left = `${advert.location.x - 25}.px`;
  preparedPin.style.top = `${advert.location.y - 70}.px`;
  return preparedPin;
}

let render = function(el, place) {
  document.querySelector(place).append(el);
}

getSomeAdverts().forEach(el => render(getPin(el), '.map__pins'));


let cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

let getCard = function (advert) {
  let preparedCard = cardTemplate.cloneNode(true);
  preparedCard.querySelector('.popup__title').textContent = advert.offer.title;
  preparedCard.querySelector('.popup__text--address').textContent = advert.offer.address;
  preparedCard.querySelector('.popup__text--price').textContent = `${advert.offer.price}&#x20bd;/ночь`;


}

document.querySelector('.map').classList.remove('map--faded');
