'use strict';

(function () {

  var URL = 'https://js.dump.academy/keksobooking/dat4a';

  window.download = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var GOOD_ANSWER_SERVER = 200;
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === GOOD_ANSWER_SERVER) {
        onSuccess(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
