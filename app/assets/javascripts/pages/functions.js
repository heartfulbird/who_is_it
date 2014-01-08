/**
 * Created with JetBrains PhpStorm.
 * User: stas
 * Date: 27.12.13
 * Time: 22:27
 * To change this template use File | Settings | File Templates.
 */

// ВОЗМОЖНО ЭТО ЛУЧШЕ ИНИЦИАЛИЗИРОВАТЬ ПРИ ЗАГРУЗКЕ так как в них используются селекторы элементов - верстка должна быть загружена

var oneLeft = 57;
var twoRight = 73;
var offsetH = 626;

var threeTop = 40;
var fourBottom = 46;
var offsetV = 180;
var animateEase = 'easeOutQuad';

var ani_time = 800;

function rotateH () {

  var left = (oneLeft - offsetH).toString() + 'px';
  var right = (twoRight - offsetH).toString() + 'px';

  $('#one').animate({left: left}, ani_time, animateEase);
  $('#two').animate({right: right}, ani_time, animateEase);

    $(".phone").rotate({animateTo:90});


  $('#three').animate({top: threeTop}, ani_time, animateEase);
  $('#four').animate({bottom: fourBottom}, ani_time, animateEase);

//  $('.boxes').removeClass('vertical');
//  $('.boxes').addClass('horizontal');




    setTimeout(function () {
        $(".foto").addClass('h');

        $(".foto").rotate(-90);

        orientPhone = 'H'
    }, 0);
}

function rotateV () {

  var top = (threeTop - offsetV).toString() + 'px';
  var bottom = (fourBottom - offsetV).toString() + 'px';


  $('#three').animate({top: top}, ani_time, animateEase);
  $('#four').animate({bottom: bottom}, ani_time, animateEase);

    $(".phone").rotate({animateTo: 0});

  $('#one').animate({left: oneLeft}, ani_time, animateEase);
  $('#two').animate({right: twoRight}, ani_time, animateEase);






    //$(".foto").rotate(0);

    $('.boxes').removeClass('horizontal');
    $('.boxes').addClass('vertical');

    $('.foto')
        .css('-webkit-transform', 'none')
        .css('-moz-transform', 'none')
        .css('-o-transform', 'none')
        .css('-ms-transform', 'none')
        .css('-moz-transform', 'none');




    setTimeout(function () {
        $(".foto")
            .removeClass('h')
            .css('background-position', 'center');
        orientPhone = 'V';

    }, 800);
}

// END Ф-ии с селекторами


function random (from, to) {
    var min=from,
        max=to;
    var rand = min + Math.random()*(max+1-min);
    rand = rand^0; // округление битовым оператором
    return rand;
}

function asort (arr) {
    for ( var i = arr.length; i-->0; ) {
        var t = arr[i],
            j = Math.floor(i*Math.random());
        arr[i] = arr[j];
        arr[j] = t;
    }
}

function bgPaste(src) {

    var str = "url("+ src +") no-repeat";
    console.log(str);
    $(".foto").css({background: str});

}

function loadImg (src) {
//    var $foto = $('.foto');
//
//    var img = new Image();
//
//    img.onload = function(){
//        // image  has been loaded
//        console.log('new Image() , img.onload')
//
//
//
//        $foto.off('load');
//
//        $foto.on('load', function () {
//            console.log('foto pasted');
//        });
//
//
//        $foto.attr('src', src );
//
//
//    };
//
//    img.src = src;

    console.log('PasteNewPhoto(src)- раскоментить - посмотреть - должно работать, loadImg(src) - закоментить либо читать ниже');
    console.log('можно через эту ф-ию проходить все вставки фото а что делать по онлоад фото - передавать в нее. то что сейчас в этой ф-ии - не играет роли. загружать фото в скрипт, а потом подменять src - это одно и то же, а если вставлять созданное img, то надо перенавешивать события, что не факт как в будущем может усложнить работу');
}

function imgError() {
  console.log('это делаем если картинка не загрузилась');
  otherFoto();

}


function pasteNames(orient) {
  console.log('pasteNames');
  console.log(orient);


  var a = TrueGroup;

  // + 3 Рандомных шруппы для вариантов угадывания

  var b = Groups.artists[random(0, 99)].name;
  var c = Groups.artists[random(0, 99)].name;
  var d = Groups.artists[random(0, 99)].name;

  // Все группы в массиве
  var arr = [a, b, c, d];

  console.log(arr);

  // Перемешиваем все группы
  var groups = asort(arr);



  var offset = 0;
  //  V - g 1234  ||   H, square - g 5678
  if (orient == 'V') {
    offset = 1;
  } else {
    offset = 5;
  }

  // Подставляем названия групп в разном порядке для выбора
  for (var z = 0; z <= 3; z++) {
    $('#g' + (z + offset)).text(arr[z]);
  }

}


function preloader() {

  setTimeout(function () {

    if (iLoad == 0) {
      $('#preloader').show();
    }


  }, 1000);

}

function hidePreloader() {

  $('#preloader').hide();

}



function showSuccess() {

  $('#result').text('OK');

}

function updatePageCounter(counter) {

  var dig = $('#counter .digit');


  dig
      .text(counter)
      .addClass('big');

  setTimeout(function () {
    dig.removeClass('big');

  } ,1000)


}



function success () {

  // увеличить счетчик угаданных в переменной и на  странице
  User.count = parseInt(User.count) + 1;
  updatePageCounter(User.count);


  listId.push(TrueGroupId);

  if (User.props.list.length == 0) {

    User.props.list += TrueGroupId;

  } else {

    User.props.list += ',' + TrueGroupId;

  }
      //.push(TrueGroupId);

  updateCache(User.id_vk, User);


}

function notRight () {

  $('#result').text('не угадано');

}


function approve(this_) {

  //var user_choice = $('input:checked').val();

  var user_choice = $(this_).text();
  console.log(user_choice);


  // Если группа угадана
  // - надо сообщить об этом
  // увеличить счетчик угаданных в переменной и на  странице
  // Добавить id группы в список угаданных
  // Показать следующую фотку
  // Записать в кэш данные которые изменились

  if (user_choice == TrueGroup) {
    // - надо сообщить об этом
    success();

    showSuccess();


    // Показать следующую фотку
    setTimeout(function () {
          nextFoto();
        }, 1000);

  } else {
    // Если группа НЕ угадана
    // - надо сообщить об этом
    notRight();



    // Показать следующую фотку
    setTimeout(function () {
      nextFoto();
    }, 1000);

  }

}


function groupsInfo() {

  /*
   / Cache Vars
   */


  console.log('GROUPS:');
  console.log(gon.groups_info);

  // Если есть группы из кэша - запускаем в работу

  if (parseInt(gon.groups_info) != 0) {

    Groups = gon.groups_info;
    console.log('группы есть начинаем');

    nextFoto();

  } else {
    // иначе Api
    console.log('групп нет - Api');

    getGroupsApi();


  }


}



function getUser(vk_id) {

  $.ajax({
    url: '/get_data' + '/' + vk_id,
    type: 'get',
    async: false,
    success: function (data) {

      console.log('USER CACHE: ');
      console.log(data);

      User = data;
      console.log('user ok');

      listId = User.props.list.split(',');

      updatePageCounter(User.count);


      enterUsers(vk_id);

      groupsInfo();
    }
  });

}


function initEvents() {

  /*
   * События
   * */
  $('.rotate_h').on('click', function () {
    rotateH();
  });

  $('.rotate_v').on('click', function () {
    rotateV();
  });


  // END События


  // Получаем idVk
  //vkID = '111';
  getVkId();

  // Запрашиваем данные по юзеру
  //  getUser(vkID);


}


















// Запрос групп через кэш
//function getGroupsCache() {
//
//  //данные по юзеру будут получены в экшне при загрузке страницы. Уже будут закэшированы если их в кэшэ не было
//  // Также при загрузке сразу проверяем кэш групп
//  // Если его нет то присылаем переменную в gon js и по ней решаем апи запрос или сразу в работу
//
//
//  // ajax к cache
//  var url = 'адрес моего кэша';
//
//  $.ajax({
//    url: url,
//    type: 'POST',
//    async: false,
//    success: function (data) {
//
//      // Если мне пришел из кэша объект групп - он такой же как при запросе к API
//      if (data.hasOwnProperty('status') && data.status.message == 'Success') {
//        // отдаем группы в ф-ию
//        groupstoglobal(data);
//      } else {
//        // Иначе запрашиваем по API
//        getGroupsApi();
//      }
//
//    }
//  });
//
//}
