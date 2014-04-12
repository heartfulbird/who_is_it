$(function () {

  var iam = $('#' + gon.user.id_vk);

  var ind = '';

  if (iam.length > 0) {
    iam.addClass('iam');
    ind = iam.data('i');
    $('.position').text(ind);
  } else {
    $('.rating_info .text').text('Вы пока не вошли в топ 100').nextAll().hide();
  }



  $('.post').on('click', function() {

    var APP_ID = '4072724';

    var owner_id = gon.user.id_vk;

    VK.init({
      apiId: APP_ID
    });

    console.log(owner_id);

    var post = {
      owner_id: owner_id,
      message: 'Я на '+ind+' месте в приложении TOP100!',
      // у меня угадано .. групп в категории Hot, .. групп в ..
      // у меня бронзовый статус в категории ..
      // message: club + '\n' + date + '\n' + artist / /,
      attachments: 'photo-68411319_323993354,http://vk.com/app4072724'
      // < type > < owner_id > _ < media_id >
    }

    VK.api('wall.post', post, function (r) {
      if (r.response) {
        var resp = JSON.stringify(r.response);
        console.log(resp)
      }
    });


  });


});
