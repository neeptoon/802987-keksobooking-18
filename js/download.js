'use strict';

(function () {

  // var onError = function (message) {
  //   var main = document.querySelector('main');
  //   var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  //   var errorElement = errorTemplate.cloneNode(true);
  //   var errorDescription = errorElement.querySelector('.error__message');
  //   errorDescription.textContent = message;
  //   main.appendChild(errorElement);
  // };

  var URL = 'https://js.dump.academy/keksobooking/data';


  window.download = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      // var error;
      // switch (xhr.status) {
      //   case 200:
      onSuccess(xhr.response);
      //     break;

      //   case 400:
      //     error = 'Неверный запрос';
      //     break;
      //   case 401:
      //     error = 'Пользователь не авторизован';
      //     break;
      //   case 404:
      //     error = 'Ничего не найдено';
      //     break;

      //   default:
      //     error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      // }

      // if (error) {
      //   onError(error);
      // }
    });

    // xhr.addEventListener('error', function () {
    //   onError('Произошла ошибка соединения');
    // });

    // xhr.addEventListener('timeout', function () {
    //   onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    // });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
