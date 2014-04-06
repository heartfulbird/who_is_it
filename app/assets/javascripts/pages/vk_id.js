// vk_id, запускать после загрузки приложения



function getVkId () {   // когда загрузится вся страница

  if ($('#rating_page').length == 0) {

    VK.init(function () {    // инициализируем Vk API

      // узнаём flashVars, переданные приложению GET запросом. Сохраняем их в переменную flashVars
      var parts = document.location.search.substr(1).split("&");
      var flashVars = {}, curr;
      for (i = 0; i < parts.length; i++) {
        curr = parts[i].split('=');
        // записываем в массив flashVars значения. Например: flashVars['viewer_id'] = 1;
        flashVars[curr[0]] = curr[1];
      }

      // получаем viewer_id из полученных переменных
      var vkID = flashVars['viewer_id'];

      if (typeof vkID == 'undefined') {
      //      alert('Ваш id не определен. Попробуйте перезагрузить страницу или обратитесь к разработчику приложения.');

      } else {

          // фото
          VK.api("users.get", {fields: "first_name, last_name, photo"}, function (data) {

            console.log('user PROFILE:')
            console.log(data);

            var profile = data.response[0];
            var fio = profile.first_name + ' ' + profile.last_name;
            var photo = profile.photo_medium;


            getUser(vkID, fio, photo);
          });


      }


    });

  }
}
