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

var status1 = 'Знаток',
    status2 = 'Маста',
    status3 = 'Гуру';

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

  var b = Groups[catG].artists[random(0, 99)].name;
  var c = Groups[catG].artists[random(0, 99)].name;
  var d = Groups[catG].artists[random(0, 99)].name;

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

function bigger(i) {
  var status = $('.s'+ i +' .status');


  status.addClass('bigger');

  setTimeout(function () {
    status.removeClass('bigger');

  }, 1500)
}

function statusPage(i) {

  // Показываем один текущий статус

  if (!isNaN(parseInt(i))) {

    for (var z = 1; z <= 3; z++) {

      if (z == i) {
        $('.s' + z).show();
        bigger(z);
      } else {
        $('.s' + z).hide();
      }

    }


  }

}

function congratulations(i) {

  var cat = { hot: '100 Самых актуальных артистов мира в танцевальной музыке', dance: '100 самых известн ых артистов в стиле Dance', world: '100 самых известных артистов мира' }

  if (i == 0) {
    //$('.modal .congrat').text('Неплохо!')
    console.log('на 30 нужна прикольная морда выезж-я сбоку экрана с фразой неплохо!')
  }

  if (i == 1) {
    $('.modal .congrat').text('Поздравляем! Вы угадали 50 артистов. Это уже уровень! Ваш статус "Знаток".');
  }

  if (i == 2) {
    $('.modal .congrat').text('Отличный результат! Теперь ваш статус "МАСТА".');
  }

  if (i == 3) {
    $('.modal .congrat').text('О да! 100 из 100. Вы абсолютный Гуру в категории "'+ cat[catG] + '".');
  }

  $('.modal').modal();

  $('.modal').on('hidden.bs.modal', function (e) {
    statusPage(i)
  });
}


 function checkStatus(count) {

  if (count == 30) {
    congratulations(0);
  }

  if (count == 50) {
    User.props['status_'+catG] = 1;
    congratulations(1);
//    statusPage(1);
  }

  if (count == 70) {
    User.props['status_' + catG] = 2;
    congratulations(2);
//    statusPage(2);
  }

  if (count == 100) {
    User.props['status_' + catG] = 3;
    congratulations(3);
//    statusPage(3);
  }


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

  var catCount = parseInt(User.props['count_' + catG])  + 1;

  User.props['count_'+catG] = catCount;

  updatePageCounter(catCount);

  checkStatus(catCount);


  listId.push(TrueGroupId);

  if (User.props.list.length == 0) {

    User.props.list += TrueGroupId;

  } else {

    User.props.list += ',' + TrueGroupId;

  }
      //.push(TrueGroupId);
  setTimeout(function () {
    updateCache(User.id_vk, User);
  }, 200);



  if (User.count == 100) {
    // Здесь надо поздравить и дать варианты дествий:
    // поделиться, пройтись еще раз с новыми фотками... и тд. посмотреть общий рейтинг. Рейтинг может быть тоже разный кто больше всех угадал кто быстрее всех продвигается и тп TODO
    console.log('100 из 100! Поздравляем! Вы Гуру! Можете подклиться с друзьями своим результатом. Можно начать сначала, фото будут меняться. Попробуем?')

  } else {

    // Показать следующую фотку
    setTimeout(function () {
      nextFoto();
    }, 1000);

  }

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


function groupsInfo(cat) {

  /*
   / Cache Vars
   */
  catG = cat;

  console.log('GROUPS:');
  console.log(gon[catG]);

  updatePageCounter(parseInt(User.props['count_'+catG]));

  statusPage(User.props['status_'+catG]);



  if (Groups.hasOwnProperty(catG)) {
    console.log('эта категория уже есть в Groups, начинаем');

    nextFoto();
  } else {
    // Если есть группы из кэша с сервера - запускаем в работу
    if (parseInt(gon[catG]) != 0) {

      Groups[catG] = gon[catG];
      console.log('группы есть начинаем');

      nextFoto();

    } else {
      // иначе Api
      console.log('групп нет - Api');

      getGroupsApi(catG);


    }

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

      updatePageCounter(parseInt(User.props['count_hot']));


      enterUsers(vk_id);

      groupsInfo('hot');
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


  // Получаем idVk - эта ф-ия перведет на getUser(vkID)
  getVkId();



  // TEST, dev
  vkID = '111';
  getUser(vkID);

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
