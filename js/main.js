'use strict';
(function () {
  window.util.mainPin.addEventListener('mousedown', function () {
    window.activationPage(true);
  });

  window.util.mainPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      window.activationPage(true);
    }
  });
})();
