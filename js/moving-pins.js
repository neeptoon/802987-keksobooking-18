'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 72;
  var MAIN_PIN_WIDTH = 84;

  var dragged = null;

  var getAdvertAddress = function (evt) {
    if (dragged) {
      window.util.addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetTop + MAIN_PIN_HEIGHT);
    }
    window.util.addressField.value = (window.util.mainPin.offsetLeft) + MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetTop) + MAIN_PIN_HEIGHT);
  };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    dragged = false;

    getAdvertAddress(evt);

    var startCoords = {
      x: evt.clientX - window.util.mainPin.getBoundingClientRect().left,
      y: evt.clientY - window.util.mainPin.getBoundingClientRect().top
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      getAdvertAddress(moveEvt);

      var newCoords = {
        x: moveEvt.clientX - startCoords.x - window.util.mapAdverts.getBoundingClientRect().left,
        y: moveEvt.clientY - startCoords.y - window.util.mapAdverts.getBoundingClientRect().top
      };

      if (newCoords.y < window.util.MIN_Y - MAIN_PIN_HEIGHT) {
        newCoords.y = window.util.MIN_Y - MAIN_PIN_HEIGHT;
      } else if (newCoords.y > window.util.MAX_Y) {
        newCoords.y = window.util.MAX_Y;
      } else if (newCoords.x < window.util.MIN_X) {
        newCoords.x = window.util.MIN_X;
      } else if (newCoords.x > window.util.mapAdverts.clientWidth - MAIN_PIN_WIDTH) {
        newCoords.x = window.util.mapAdverts.clientWidth - MAIN_PIN_WIDTH;
      }


      window.util.mainPin.style.left = newCoords.x + 'px';
      window.util.mainPin.style.top = newCoords.y + 'px';
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
