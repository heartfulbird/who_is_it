/**
 * Created with JetBrains RubyMine.
 * User: stas
 * Date: 16.12.13
 * Time: 18:49
 * To change this template use File | Settings | File Templates.
 */



//function getCache (key) {
//
//
//    $.ajax({
//        url: '/get_cache' + '/' + key,
//        type: 'get',
//        success: function (data) {
//
//            console.log('CACHE: ');
//            console.log(data)
//
//        }
//    });
//
//}


function justRead (key) {


    $.ajax({
        url: '/only_read' + '/' + key,
        type: 'get',
        success: function (data) {

            console.log('CACHE: ');
            console.log(data)

        }
    });

}


function enterUsers(vk_id) {


  $.ajax({
    url: '/enter_users' + '/' + vk_id,
    type: 'get',
    success: function (data) {

      console.log('CACHE enter_u: ');
      console.log(data)

    }
  });

}


function updateCache (key, value) {

    var send_data = {
        key: key,
        value: value
    };

    $.ajax({
        url: '/write_data',
        type: 'post',
        data: send_data,

        success: function (data) {

            console.log('CACHE: ');
            console.log(data)

        }
    });

}

//getCache('user_1209');
//
//updateCache('user_1209',
//    {user: 'aaa', ids: [2,2,3], count: 16}
//);




//$(function () {
//
//    console.log('user_info:');
//    console.log(gon.user_info);
//});
