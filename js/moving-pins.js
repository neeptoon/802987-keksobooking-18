'use strict';

(function () {

  var MAIN_PIN_HEIGHT = 72;
  var MAIN_PIN_WIDTH = 84;

  // var dragged = null;

  // var getAdvertAddress = function (evt) {
  //   if (dragged) {
  //     window.util.addressField.value = evt.currentTarget.offsetLeft + MAIN_PIN_WIDTH / 2 + ' ' + (evt.currentTarget.offsetTop + MAIN_PIN_HEIGHT);
  //   }
  //   window.util.addressField.value = (window.util.mainPin.offsetTop - shift.y) + MAIN_PIN_WIDTH / 2 + ' ' + ((window.util.mainPin.offsetLeft - shift.x) + MAIN_PIN_HEIGHT);
  // };

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX - window.util.mainPin.getBoundingClientRect().left,
      y: evt.clientY - window.util.mainPin.getBoundingClientRect().top
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var newCoords = {
        x: moveEvt.clientX - startCoords.x - window.util.mapAdverts.getBoundingClientRect().left,
        y: moveEvt.clientY - startCoords.y - window.util.mapAdverts.getBoundingClientRect().top
      };

      if (newCoords.y < 130) {
        newCoords.y = 130;
      } else if (newCoords.y > 630) {
        newCoords.y = 630;
      } else if (newCoords.x < 0) {
        newCoords.x = 0;
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
