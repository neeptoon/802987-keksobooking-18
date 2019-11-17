'use strict';
(function () {
  window.util.mainPin.addEventListener('mousedown', function () {
    window.pageActivation(true);
  });

  window.util.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.pageActivation(true);
    }
  });
})();
