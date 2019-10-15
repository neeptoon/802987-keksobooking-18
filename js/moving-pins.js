'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 72;
  var MAIN_PIN_WIDTH = 84;

  var dragged = null;

  var shift = {
    x: 0,
    y: 0
  };

  var getAdvertAddress = function (evt) {
    if (dragged) {
      window.util.addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetTop + MAIN_PIN_HEIGHT);
    }
    window.util.addressField.value = (window.util.mainPin.offsetTop - shift.y) + MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetLeft - shift.x) + MAIN_PIN_HEIGHT);
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    dragged = false;

    getAdvertAddress(evt);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
      window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';
      getAdvertAddress(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
