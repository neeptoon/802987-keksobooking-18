'use strict';

(function () {
  window.util = {
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    mapAdverts: document.querySelector('.map'),
    advertForm: document.querySelector('.ad-form'),

    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    typeList: ['palace', 'flat', 'house', 'bungalo'],
    titleList: ['Отличная двушка по цене трешки', 'Холостяцкое гнездышко с видом на море', 'Хата с глухими соседями', 'Квартира в аренду посуточно рядом с клубом', 'Просто отличная квартира', 'Кошатницам вход запрещен'],
    descriptionList: ['можно с детьми', 'можно с животными', 'можно с детьми животных', 'никаких детей', 'никаких животных'],

    getRandomNumber: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    },

    getRandomArray: function (arr) {
      arr.sort(function () {
        return 0.5 - Math.random();
      });
      return arr.slice(1, window.util.getRandomNumber(1, arr.length));
    },
  };
})();
