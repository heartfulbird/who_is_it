/**
 * Created with JetBrains RubyMine.
 * User: stas
 * Date: 16.12.13
 * Time: 18:49
 * To change this template use File | Settings | File Templates.
 */



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

function getCacheAndWriteInGlobal (key, var_name) {

  $.ajax({
    url: '/only_read' + '/' + key,
    type: 'get',
    success: function (data) {

      if (data == 0) {
        console.log('vide cache empty for this category - get api');
        getVideoApi();
      } else {
        window[var_name][catG] = data;

        console.log('CACHE: ');
        console.log(data);

        doVideoList();
      }

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


function clearUsers(key) {


  $.ajax({
    url: '/clear_users' + '/' + key,
    type: 'post',
    success: function (data) {

      console.log('CACHE: ');
      console.log(data)

    }
  });

}


//$(function () {
//
//    console.log('user_info:');
//    console.log(gon.user_info);
//});
