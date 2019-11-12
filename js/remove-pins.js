'use strict';
(function () {
  window.removePins = function () {
    var pins = window.util.mapAdverts.querySelectorAll('button[type = "button"]');
    pins.forEach(function (item) {
      item.remove();
    });
  };
})();
