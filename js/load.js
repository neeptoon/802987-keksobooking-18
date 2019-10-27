'use strict';

(function () {

  window.load = function (url, onSuccess, onError, type, data) {
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

    xhr.open(type, url);
    xhr.send(data);
  };
})();
