'use strict';

(function () {
  window.util = {
    MIN_X: 0,
    MAX_X: 1200,
    MAX_Y: 630,
    MIN_Y: 130,
    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    mapAdverts: document.querySelector('.map'),
    advertForm: document.querySelector('.ad-form'),
    addressField: document.querySelector('#address'),
    mainPin: document.querySelector('.map__pin--main'),

    getRandomNumber: function (min, max) {
      return Math.round(min - 0.5 + Math.random() * (max - min + 1));
    }
  };
})();
