'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  window.load = function (onSuccess, onError, type, data) {
    var url = type === 'POST' ? URL : URL + '/dat';
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
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
