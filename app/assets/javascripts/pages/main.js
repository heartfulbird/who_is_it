/**
 * Created with JetBrains PhpStorm.
 * User: stas
 * Date: 22.12.13
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */


// РЕАЛЬНЫЕ РАЗМЕРЫ КАРТИНКИ
// http://anton.shevchuk.name/javascript/ger-real-image-size-with-jquery/


/*
 *  Исходные данные
 * */


/*
 * Фиксированные переменные
 */

var apiUrl = 'http://developer.echonest.com/api/v4/artist/top_hottt?api_key=EK9JVX6IBJB4ZDEJ3&format=jsonp&results=100&start=0&bucket=images&callback=?';
var phoneH = 339;
var phoneW = 192;
var H_max_width = 275;
var vkID



/*
 * Динамически изменяемые переменные актуальные для 'здесь и сейчас'
 */
var User = null;

var Groups = null;
// ID текущей угадываемой группы
var indexG = -1;
// ЕЕ параметры - объект (внутри пока только name)
var TrueGroup = {};
// ЕЕ ID еще раз
var TrueGroupId;
// Номер фото взятой фотки
var fotoNum;

// Counter , listId
var  counter = 0;
var listId = [];

var orientPhone = 'V';
var orientFoto;

var errorGroups = 0;

/*
 * Основные ф-ии
 */

function scanCase (src, fotoH, fotoW) {
console.log('scanCase ');
    /*
     *  Телефон стоит вертикально
     * */
    var $foto = $('.foto');
    if (orientPhone == 'V') {
        //$foto.css({top: '0px', left: '0px'});

        /* фото - горизонтальное
         * */

        // фото горизонтальное - надо повернуть телефон
        if (orientFoto == 'H') {

            // если при повороте ширина фото будет равна или больше ширины телефона(высоты на самом деле)

            if (fotoW >= phoneH) {
                // Вставляем фото в телефон
                //$foto.attr('src', src);
                bgPaste(src);

                // Поворачиваем горизонтально
                rotateH();


            } else {
                // фото в ширину маленькое - берем другое фото
                console.log('фото маленькое по ширине для гориз-й ориентации при том что оно все же горизонтальное и в верт ориентации не стоит показывать');
                otherFoto ();
            }


        }

        if (orientFoto == 'V') {
            // Вставляем фото в телефон
            bgPaste(src);
            $foto.css('background-position', 'center');
        }

        if (orientFoto == 'square') {

            // если при повороте ширина фото будет равна или больше ширины телефона(высоты на самом деле)

            if (fotoW >= phoneH) {
                // Вставляем фото в телефон
                bgPaste(src);

                // Поворачиваем горизонтально
                rotateH();

            } else {
                // фото в ширину маленькое - берем другое фото
                console.log('фото маленькое по ширине для гориз-й ориентации при том что оно все же горизонтальное и в верт ориентации не стоит показывать');
                otherFoto ();
            }


        }


    } else {
        /*
         *  Телефон уже повернут горизонтально
         * */

        /*
         / orientPhone = 'H'
         */

        // фото тоже горизонтальное
        if (orientFoto == 'H') {

            // если  ширина фото будет не меньше ширины повернутого телефона(высоты на самом деле)

            if (fotoW >= phoneH) {
                rotateH();
                // Вставляем фото в телефон
                bgPaste(src);
            } else {
                // фото в ширину маленькое - берем другое фото
                console.log('фото маленькое по ширине для гориз-й ориентации при том что оно все же горизонтальное и в верт ориентации не стоит показывать');
                otherFoto ();
            }


        }

        if (orientFoto == 'V'){
            // фото вертикальное

            // Вставляем фото в телефон
            bgPaste(src);
            // Поворачиваем вертикально
            rotateV();

        }

        if (orientFoto == 'square') {

            // если при повороте ширина фото будет равна или больше ширины телефона(высоты на самом деле)

            if (fotoW >= phoneH) {
                // Вставляем фото в телефон
                bgPaste(src);

            } else {
                // фото в ширину маленькое - берем другое фото
                console.log('фото маленькое по ширине для гориз-й ориентации при том что оно все же горизонтальное и в верт ориентации не стоит показывать');
                otherFoto ();
            }


        }

    }
 hidePreloader();
}

function PasteNewPhoto (src) {
    console.log('PasteNewPhoto ');

    /*
     *  Вставляем фотку для определения размеров
     * */


    $('.hide_foto').attr('src', src);

    var $foto = $('.hide_foto');

    $foto.off('load');

    preloader();

    $foto.on('load',function(){

        var h = $('.hide_foto').height();
        var w = $('.hide_foto').width();

        if (w > h) {
            orientFoto = 'H';
        }

        if (h > w) {
            orientFoto = 'V';
        }

        if (h == w) {
            orientFoto = 'square';
            //надо будет только отцентрировать по вертикали
        }

         //console.log(h, w);
        scanCase(src, h, w);

    });

    //onerror
}

function nextFoto () {
    // Определяем номер новой группы и перезаписываем глоб. переменную
    indexG = indexG + 1;

    if (indexG > Groups.count) {
        console.log('перебрали все группы в этой категории');    // todo!!!
        return false;
    } else {

        if (Groups.hasOwnProperty('artists')) {


            // Слудующая группа которую угадываем
            var a = Groups.artists[indexG];
            // ЕЕ название и id
            TrueGroup = a.name;
            TrueGroupId = a.id;

            console.log(TrueGroup);



            // + 3 Рандомных шруппы для вариантов угадывания
            var b = Groups.artists[random(0, 99)];
            var c = Groups.artists[random(0, 99)];
            var d = Groups.artists[random(0, 99)];

            // Все группы в массиве
            var arr = [a,b,c,d];


            // Перемешиваем все группы
            var groups = asort(arr);

            console.log(groups);

            // чистим предыдущие названия
            //$('#g1,#g2,#g3,#g4').attr('value','');
            $('#g1,#g2,#g3,#g4').text('');
            // Подставляем названия групп в разном порядке для выбора
            for (var z = 0; z<=3; z++) {
                if (arr[z].hasOwnProperty('name')){
                    //$('#g' + (z+1)).val(arr[z].name);
                    //$('.g' + (z+1)).text(arr[z].name);
                    $('#g' + (z+1)).text(arr[z].name);
                } else {
                    console.log("arr[z] has not Property('name') , z=" + z);
                }
            }


            // Фото артиста a
            if (a.hasOwnProperty('images')) {

                // Случайная фотка из всех что есть у группы//TODO стоит определять фотку не меньше чем... в последующих ф-ях перед вставкой фото
                fotoNum = random(1, (a.images.length - 1) );
                console.log('номер фото ' + fotoNum);


              if (a.images.hasOwnProperty(fotoNum)) {

                if (a.images[fotoNum].hasOwnProperty('url')) {
                  var src = a.images[fotoNum].url;

                  // Вставляю фотку  (очистить предыдущее фото)

                  PasteNewPhoto(src);

                } else {

                  otherFoto();

                }


              } else {

                otherFoto();

              }


            } else {
                console.log('У этой группы нет фоток попробуем следующую');
                nextFoto();

            }


        } else {
            console.log('Groups no property artists')
          indexG = -1;

          setTimeout(function () {

             if (Groups.hasOwnProperty('artists') == false) {
              getGroupsApi();
             }


          }, 5000);



        }
    }

}

function otherFoto () {

  console.log('берем другое фото той же группы');

  if (indexG < 0) {

    indexG = 0;
  }


  var a = Groups.artists[indexG];

  fotoNum = random(0, (a.images.length - 1) );
  console.log('номер другого случайного фото ' + fotoNum);


  var src = a.images[fotoNum].url;
  PasteNewPhoto(src);


}


var groupstoglobal = function (response) {

    // Независимо откуда получили группы - пишем их в глб объект для дальнейшей работы
    Groups = response;

    // И запускаем ф-ю
    nextFoto();

};


var groupsToCache = function (data) {

  console.log(data);
  var response = data.response;

  // Здесь надо отправить запрос для записи групп полученных по Апи в кэш
  console.log('записать в кэш группы из Апи');

  if (response.hasOwnProperty('status') && response.status.message == 'Success') {

    updateCache('hot', response);


    // и отдать их в работу
    groupstoglobal(response);

  } else {
    console.log('api error');
    console.log(data.status.message);

  }


}

// Запрос групп по API
function getGroupsApi() {
    $.ajax({
        url: apiUrl,
        dataType: 'jsonp',
        jsonpCallback: 'groupsToCache',
        jsonp: 'jsonp'
    });
}




$(function () {

    /*
     * ON LOAD
     */

    /*
     * Инициализируем События
     */
         initEvents();





    /*
    * Начало такое - получить 'Группы' и 'Данные по юзеру'
    * и взять это желательно из кэша
    */

    // Запрос групп через кэш
    //getGroupsCache();

    // loadImg вместо загрузки в hidden для опре-я размеров!

    //getGroupsApi();




    //{"response": {"status": {"version": "4.2", "code": 0, "message": "Success"}, "artists": [{"name": "Avicii", "images": [{"url": "http://userserve-ak.last.fm/serve/500/24172303/Avicii.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Avicii/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/45128063/Avicii+tim.jpg", "tags": [], "width": 480, "height": 720, "aspect_ratio": 0.66666666666666663, "verified": false, "license": {"type": "cc-by-sa", "attribution": "AllenSchweitzer", "url": "www.last.fm/user/AllenSchweitzer"}}, {"url": "http://userserve-ak.last.fm/serve/_/20897221/Avicii+house.jpg", "tags": [], "width": 170, "height": 254, "aspect_ratio": 0.6692913385826772, "verified": false, "license": {"type": "cc-by-sa", "attribution": "J_Luke", "url": "www.last.fm/user/J_Luke"}}, {"url": "http://userserve-ak.last.fm/serve/500/53903161/Avicii+IMG_3319+381.jpg", "tags": [], "width": 500, "height": 750, "aspect_ratio": 0.66666666666666663, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Maxber", "url": "www.last.fm/user/Maxber"}}, {"url": "http://userserve-ak.last.fm/serve/_/35072399/Avicii+_1.jpg", "tags": [], "width": 306, "height": 320, "aspect_ratio": 0.95625000000000004, "verified": false, "license": {"type": "cc-by-sa", "attribution": "AllenSchweitzer", "url": "www.last.fm/user/AllenSchweitzer"}}, {"url": "http://userserve-ak.last.fm/serve/_/45128069/Avicii+tim1.jpg", "tags": [], "width": 471, "height": 632, "aspect_ratio": 0.745253164556962, "verified": false, "license": {"type": "cc-by-sa", "attribution": "AllenSchweitzer", "url": "www.last.fm/user/AllenSchweitzer"}}, {"url": "http://userserve-ak.last.fm/serve/500/34686243/Avicii+l_bc6d81fe9f0a42dbb7896a1685af.jpg", "tags": [], "width": 500, "height": 332, "aspect_ratio": 1.5060240963855422, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Deyan4o", "url": "www.last.fm/user/Deyan4o"}}, {"url": "http://userserve-ak.last.fm/serve/_/41156349/Avicii.png", "tags": [], "width": 450, "height": 450, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "last.fm", "url": "www.last.fm/"}}, {"url": "http://userserve-ak.last.fm/serve/500/51413393/Avicii.jpg", "tags": [], "width": 500, "height": 333, "aspect_ratio": 1.5015015015015014, "verified": false, "license": {"type": "cc-by-sa", "attribution": "last.fm", "url": "www.last.fm/"}}, {"url": "http://userserve-ak.last.fm/serve/_/37538823/Avicii+1.jpg", "tags": [], "width": 401, "height": 604, "aspect_ratio": 0.66390728476821192, "verified": false, "license": {"type": "cc-by-sa", "attribution": "AllenSchweitzer", "url": "www.last.fm/user/AllenSchweitzer"}}, {"url": "http://userserve-ak.last.fm/serve/500/63153201/Avicii+_MG_7499.jpg", "tags": [], "width": 500, "height": 333, "aspect_ratio": 1.5015015015015014, "verified": false, "license": {"type": "cc-by-sa", "attribution": "velvet_syndrome", "url": "www.last.fm/user/velvet_syndrome"}}, {"url": "http://userserve-ak.last.fm/serve/500/63568827/Avicii+249882_218729094818195_1158653.jpg", "tags": [], "width": 500, "height": 277, "aspect_ratio": 1.8050541516245486, "verified": false, "license": {"type": "cc-by-sa", "attribution": "last.fm", "url": "www.last.fm/"}}, {"url": "http://userserve-ak.last.fm/serve/_/64627471/Avicii++1.jpg", "tags": [], "width": 500, "height": 647, "aspect_ratio": 0.77279752704791349, "verified": false, "license": {"type": "cc-by-sa", "attribution": "WDuhen", "url": "www.last.fm/user/WDuhen"}}, {"url": "http://userserve-ak.last.fm/serve/500/70336368/Avicii+TimB.jpg", "tags": [], "width": 500, "height": 299, "aspect_ratio": 1.6722408026755853, "verified": false, "license": {"type": "cc-by-sa", "attribution": "rmtheone", "url": "www.last.fm/user/rmtheone"}}, {"url": "http://userserve-ak.last.fm/serve/_/67159142/Avicii.png", "tags": [], "width": 465, "height": 700, "aspect_ratio": 0.66428571428571426, "verified": false, "license": {"type": "cc-by-sa", "attribution": "velvet_syndrome", "url": "www.last.fm/user/velvet_syndrome"}}], "id": "ARWLAEE122BCFCA245"}, {"name": "Katy Perry", "images": [{"url": "http://upload.wikimedia.org/wikipedia/commons/f/f6/Katy_Perry_YouTube.jpg", "tags": [], "width": 2272, "height": 1704, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by-sa", "attribution": "magerleagues", "url": "http://commons.wikimedia.org/wiki/File:Katy_Perry_YouTube.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/2/2c/Life_Ball_2009_Katy_Perry_3.jpg", "tags": [], "width": 1005, "height": 981, "aspect_ratio": 1.0244648318042813, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Manfred Werner - Tsui", "url": "http://en.wikipedia.org/wiki/File:Life_Ball_2009_Katy_Perry_3.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/a/af/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1978.jpg", "tags": [], "width": 3534, "height": 5244, "aspect_ratio": 0.67391304347826086, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Quibik", "url": "http://upload.wikimedia.org/wikipedia/commons/a/af/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1978.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/367685.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/367685.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/f/f3/Katy_Perry_warped_tour.jpg", "tags": [], "width": 600, "height": 800, "aspect_ratio": 0.75, "verified": false, "license": {"type": "public-domain", "attribution": "n/a", "url": "http://en.wikipedia.org/wiki/File:Katy_Perry_warped_tour.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/7/76/Katy_Perry_performing.jpg", "tags": [], "width": 2592, "height": 3888, "aspect_ratio": 0.66666666666666663, "verified": false, "license": {"type": "cc-by", "attribution": "BritandBeyonce", "url": "http://upload.wikimedia.org/wikipedia/commons/7/76/Katy_Perry_performing.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/e/e0/Life_Ball_2009_Katy_Perry_4.jpg", "tags": [], "width": 893, "height": 1002, "aspect_ratio": 0.89121756487025949, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Manfred Werner - Tsui", "url": "http://en.wikipedia.org/wiki/File%3ALife_Ball_2009_Katy_Perry_4.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/8/87/Katy_Perry_Michigan_%281%29.jpg", "tags": [], "width": 683, "height": 1024, "aspect_ratio": 0.6669921875, "verified": false, "license": {"type": "cc-by", "attribution": "File Upload Bot (Magnus Manske)", "url": "http://en.wikipedia.org/wiki/File:Katy_Perry_Michigan_(1).jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/1/11/Katy_perry_live_berlin_postbahnhof.JPG", "tags": [], "width": 3072, "height": 2304, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "public-domain", "attribution": "n/a", "url": "http://en.wikipedia.org/wiki/File:Katy_perry_live_berlin_postbahnhof.JPG"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/1/1d/Katy_Perry_singing_2%2C_by_medigirol.jpg", "tags": [], "width": 3648, "height": 2736, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "Matt DiGirolamo", "url": "http://en.wikipedia.org/wiki/File%3AKaty_Perry_singing_2%2C_by_medigirol.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/c/cd/Katy_Perry.jpg", "tags": [], "width": 2104, "height": 2225, "aspect_ratio": 0.94561797752808985, "verified": false, "license": {"type": "cc-by", "attribution": "Matt DiGirolamo", "url": "http://en.wikipedia.org/wiki/File%3AKaty_Perry.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/6/6e/Katy_Perry_%40_MuchMusic_Video_Awards_2010_Soundcheck_05.jpg", "tags": [], "width": 2835, "height": 1883, "aspect_ratio": 1.5055762081784387, "verified": false, "license": {"type": "cc-by", "attribution": "Jeff Denberg from Canada", "url": "http://en.wikipedia.org/wiki/File%3AKaty_Perry_%40_MuchMusic_Video_Awards_2010_Soundcheck_05.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/9/93/Katy_Perry_%40_Campo_Pequeno_01.jpg", "tags": [], "width": 681, "height": 1000, "aspect_ratio": 0.68100000000000005, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Tm", "url": "http://en.wikipedia.org/wiki/File:Katy_Perry_@_Campo_Pequeno_01.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/1/18/KatyPerry_%28Michigan%29_edit.JPG", "tags": [], "width": 513, "height": 666, "aspect_ratio": 0.77027027027027029, "verified": false, "license": {"type": "cc-by", "attribution": "samborowski", "url": "http://en.wikipedia.org/wiki/File:KatyPerry_(Michigan)_edit.JPG"}}, {"url": "http://userserve-ak.last.fm/serve/500/57865891/Katy+Perry+ET+Single+Promo+Photoshoot+PNG.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Katy+Perry/+images"}}], "id": "AR0IVTL1187B9AD520"}, {"name": "Miley Cyrus", "images": [{"url": "http://userserve-ak.last.fm/serve/_/3147436.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3147436.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/e/e5/Miley_Cyrus_%40_2010_Academy_Awards_%28cropped%29.jpg", "tags": [], "width": 2514, "height": 2592, "aspect_ratio": 0.96990740740740744, "verified": false, "license": {"type": "public-domain", "attribution": "wikipedia", "url": "http://en.wikipedia.org/wiki/File%3AMiley_Cyrus_%40_2010_Academy_Awards_%28cropped%29.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3964065.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3964065.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3147424.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3147424.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/3/3c/Miley_Cyrus_-_Wonder_World_Tour_-_Party_in_the_U.S.A._cropped.jpg", "tags": [], "width": 1656, "height": 2189, "aspect_ratio": 0.75650982183645499, "verified": false, "license": {"type": "cc-by", "attribution": "calmdownlove", "url": "http://en.wikipedia.org/wiki/File%3AMiley_Cyrus_-_Wonder_World_Tour_-_Party_in_the_U.S.A._cropped.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/7/74/82nd_Academy_Awards%2C_Miley_Cyrus_-_army_mil-66456-2010-03-09-180301.jpg", "tags": [], "width": 1380, "height": 2136, "aspect_ratio": 0.6460674157303371, "verified": false, "license": {"type": "public-domain", "attribution": "n/a", "url": "http://commons.wikimedia.org/wiki/File:82nd_Academy_Awards,_Miley_Cyrus_-_army_mil-66456-2010-03-09-180301.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2125805.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2125805.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3147394.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3147394.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3147408.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3147408.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2157205.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2157205.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/123422.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/123422.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/2/22/Miley_Cyrus_Concert.jpg", "tags": [], "width": 2594, "height": 2301, "aspect_ratio": 1.127335940895263, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Mike Schmid from Hollywood, CA, USA.", "url": "http://en.wikipedia.org/wiki/File:Miley_Cyrus_Concert.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2816062.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2816062.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2174012.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2174012.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/153734.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/153734.jpg"}}], "id": "ARYAVBS1187FB5B46C"}, {"name": "One Direction", "images": [{"url": "http://userserve-ak.last.fm/serve/_/67385488/One+Direction+What+makes+you+beautiful.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/52999003/One+Direction+995.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/53156667/One+Direction+png.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/52848749/One+Direction+png.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/66907264/One+Direction+page236.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/52907757/One+Direction+vlcsnap2010100419h13m59s501.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/53879767/One+Direction+15839e3a.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/63785057/One+Direction+png.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/54328499/One+Direction+OneDirection21.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/68164750/One+Direction.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/68165022/One+Direction+33.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/53878891/One+Direction+OneDirectionSonyRecordDeal.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/54103487/One+Direction+png.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/56731133/One+Direction+tumblr_lebifmHTvF1qeon67.gif", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/68164922/One+Direction+1Direction.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/One+Direction/+images"}}], "id": "ARZHFAY130708EE366"}, {"name": "Eminem", "images": [{"url": "http://userserve-ak.last.fm/serve/_/2146729.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2146729.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/2/28/Eminem_Live.jpg", "tags": [], "width": 460, "height": 620, "aspect_ratio": 0.74193548387096775, "verified": false, "license": {"type": "cc-by", "attribution": "Husky", "url": "http://upload.wikimedia.org/wikipedia/commons/2/28/Eminem_Live.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/180317.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/180317.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/423106.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/423106.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/112083.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/112083.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/407033.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/407033.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/101851.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/101851.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/271547.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/271547.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/296500.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/296500.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/166796.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/166796.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/63351.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/63351.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/326041.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/326041.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/105953.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/105953.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2146214.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2146214.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/2147444.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2147444.jpg"}}], "id": "ARTH9041187FB43E1F"}, {"name": "Lorde", "images": [{"url": "http://userserve-ak.last.fm/serve/500/85797025/Lorde+theloveclubcover.jpg", "tags": [], "width": 500, "height": 500, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "wwwathlete", "url": "www.last.fm/user/wwwathlete"}}, {"url": "http://userserve-ak.last.fm/serve/500/86888965/Lorde++PNG.png", "tags": [], "width": 500, "height": 500, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "estfer", "url": "www.last.fm/user/estfer"}}, {"url": "http://userserve-ak.last.fm/serve/500/87360787/Lorde++instagram+photo.jpg", "tags": [], "width": 500, "height": 500, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "matandm", "url": "www.last.fm/user/matandm"}}, {"url": "http://userserve-ak.last.fm/serve/500/87480395/Lorde+295636_567001359984255_6070464.jpg", "tags": [], "width": 500, "height": 750, "aspect_ratio": 0.66666666666666663, "verified": false, "license": {"type": "cc-by-sa", "attribution": "sweetpsychosis", "url": "www.last.fm/user/sweetpsychosis"}}, {"url": "http://userserve-ak.last.fm/serve/500/87482097/Lorde++PNG.png", "tags": [], "width": 500, "height": 500, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "estfer", "url": "www.last.fm/user/estfer"}}, {"url": "http://userserve-ak.last.fm/serve/500/87663021/Lorde.png", "tags": [], "width": 500, "height": 750, "aspect_ratio": 0.66666666666666663, "verified": false, "license": {"type": "cc-by-sa", "attribution": "energyneverdies", "url": "www.last.fm/user/energyneverdies"}}, {"url": "http://userserve-ak.last.fm/serve/_/86908237/Lorde.jpg", "tags": [], "width": 300, "height": 250, "aspect_ratio": 1.2, "verified": false, "license": {"type": "cc-by-sa", "attribution": "sweetpsychosis", "url": "www.last.fm/user/sweetpsychosis"}}, {"url": "http://userserve-ak.last.fm/serve/_/86911187/Lorde++PNG.png", "tags": [], "width": 290, "height": 290, "aspect_ratio": 1.0, "verified": false, "license": {"type": "cc-by-sa", "attribution": "estfer", "url": "www.last.fm/user/estfer"}}, {"url": "http://ecx.images-amazon.com/images/I/81gaPIUq%2BuL._SL290_.jpg", "tags": [], "width": 290, "height": 193, "aspect_ratio": 1.5025906735751295, "verified": false, "license": {"type": "unknown", "attribution": "Provided by the artist or their representative", "url": "http://www.amazon.com/Lorde/e/B00ELK5KF0/"}}, {"url": "http://upload.wikimedia.org/wikipedia/en/1/10/Lorde_Tennis_Court.png", "tags": [], "width": 300, "height": 300, "aspect_ratio": 1.0, "verified": false, "license": {"type": "all-rights-reserved", "attribution": "Kiki360  (talk | contribs)", "url": "http://upload.wikimedia.org/wikipedia/en/1/10/Lorde_Tennis_Court.png"}}, {"url": "http://ecx.images-amazon.com/images/I/71uBVYPMk4L._SL290_.jpg", "tags": [], "width": 290, "height": 193, "aspect_ratio": 1.5025906735751295, "verified": false, "license": {"type": "unknown", "attribution": "Provided by the artist or their representative", "url": "http://www.amazon.com/Lorde/e/B00ELK5KF0/"}}, {"url": "http://ecx.images-amazon.com/images/I/71znT%2BWxQdL._SL290_.jpg", "tags": [], "width": 290, "height": 193, "aspect_ratio": 1.5025906735751295, "verified": false, "license": {"type": "unknown", "attribution": "Provided by the artist or their representative", "url": "http://www.amazon.com/Lorde/e/B00ELK5KF0/"}}, {"url": "http://ecx.images-amazon.com/images/I/A1Z%2BcNL7c2L._SL290_.jpg", "tags": [], "width": 193, "height": 290, "aspect_ratio": 0.66551724137931034, "verified": false, "license": {"type": "unknown", "attribution": "Provided by the artist or their representative", "url": "http://www.amazon.com/Lorde/e/B00ELK5KF0/"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/3/33/Lorde_in_Seattle_2013_-1.jpg", "tags": [], "width": 4928, "height": 3280, "aspect_ratio": 1.5024390243902439, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Kirkstauffer", "url": "http://upload.wikimedia.org/wikipedia/commons/3/33/Lorde_in_Seattle_2013_-1.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/f/f6/Lorde_in_Seattle_2013_-_2.jpg", "tags": [], "width": 4399, "height": 2889, "aspect_ratio": 1.5226722049151955, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Kirkstauffer", "url": "http://upload.wikimedia.org/wikipedia/commons/f/f6/Lorde_in_Seattle_2013_-_2.jpg"}}], "id": "ARUXAKW13D610B0A9B"}, {"name": "Lady Gaga", "images": [{"url": "http://upload.wikimedia.org/wikipedia/commons/b/bd/Lady_Gaga_covered_in_blood.jpg", "tags": [], "width": 564, "height": 735, "aspect_ratio": 0.76734693877551019, "verified": false, "license": {"type": "cc-by", "attribution": "Sricsi91", "url": "http://upload.wikimedia.org/wikipedia/commons/b/bd/Lady_Gaga_covered_in_blood.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/7/7e/Gaga-monster_ball_UK_DITD.jpg", "tags": [], "width": 1689, "height": 1796, "aspect_ratio": 0.94042316258351888, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Legolas2186", "url": "http://upload.wikimedia.org/wikipedia/commons/7/7e/Gaga-monster_ball_UK_DITD.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/0/0c/Gaga_at_bazaar.jpg", "tags": [], "width": 1113, "height": 1387, "aspect_ratio": 0.80245133381398703, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Legolas2186", "url": "http://upload.wikimedia.org/wikipedia/commons/0/0c/Gaga_at_bazaar.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/b/b4/The_Monster_Ball_-_Poker_Face_revamped2-tweak.jpg", "tags": [], "width": 416, "height": 491, "aspect_ratio": 0.84725050916496947, "verified": false, "license": {"type": "cc-by", "attribution": "Chasewc91", "url": "http://en.wikipedia.org/wiki/File:The_Monster_Ball_-_Poker_Face_revamped2-tweak.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/a/ab/DADT_rally_Lady_Gaga.jpg", "tags": [], "width": 1600, "height": 1062, "aspect_ratio": 1.5065913370998116, "verified": false, "license": {"type": "cc-by", "attribution": "Joshiku", "url": "http://upload.wikimedia.org/wikipedia/commons/a/ab/DADT_rally_Lady_Gaga.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/3/30/Monster_ball_uk_dance_in_the_dark_cropped_to_face.jpg", "tags": [], "width": 772, "height": 636, "aspect_ratio": 1.2138364779874213, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Cirt", "url": "http://en.wikipedia.org/wiki/File:Monster_ball_uk_dance_in_the_dark_cropped_to_face.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/a/a7/Lady_GaGa_at_2009_MTV_VMA%27s.jpg", "tags": [], "width": 354, "height": 474, "aspect_ratio": 0.74683544303797467, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Philip Nelson", "url": "http://en.wikipedia.org/wiki/File:Lady_GaGa_at_2009_MTV_VMA%27s.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/5/58/Lady_Gaga_Hair_GMA.jpg", "tags": [], "width": 1024, "height": 725, "aspect_ratio": 1.4124137931034482, "verified": false, "license": {"type": "cc-by", "attribution": "Sricsi", "url": "http://upload.wikimedia.org/wikipedia/commons/5/58/Lady_Gaga_Hair_GMA.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/3/32/LadyGaga-EqualityMarch-Crop.jpg/475px-LadyGaga-EqualityMarch-Crop.jpg", "tags": [], "width": 475, "height": 600, "aspect_ratio": 0.79166666666666663, "verified": false, "license": {"type": "cc-by", "attribution": "DynaBlast", "url": "http://en.wikipedia.org/wiki/File:LadyGaga-EqualityMarch-Crop.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Lady_Gaga_at_Lollapalooza_2007.jpg/800px-Lady_Gaga_at_Lollapalooza_2007.jpg", "tags": [], "width": 800, "height": 600, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "flugger", "url": "http://en.wikipedia.org/wiki/File:Lady_Gaga_at_Lollapalooza_2007.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Gaga_at_bazaar.jpg/481px-Gaga_at_bazaar.jpg", "tags": [], "width": 481, "height": 599, "aspect_ratio": 0.80300500834724542, "verified": false, "license": {"type": "cc-by-sa", "attribution": "docjohnboy", "url": "http://en.wikipedia.org/wiki/File:Gaga_at_bazaar.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gaga-monster_ball_UK_DITD.jpg/564px-Gaga-monster_ball_UK_DITD.jpg", "tags": [], "width": 564, "height": 600, "aspect_ratio": 0.93999999999999995, "verified": false, "license": {"type": "cc-by-sa", "attribution": "nellyfus", "url": "http://en.wikipedia.org/wiki/File:Gaga-monster_ball_UK_DITD.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Gagafameball.jpg/593px-Gagafameball.jpg", "tags": [], "width": 593, "height": 600, "aspect_ratio": 0.98833333333333329, "verified": false, "license": {"type": "cc-by", "attribution": "http://www.flickr.com/photos/stephencarlile/", "url": "http://en.wikipedia.org/wiki/File:Gagafameball.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/5/55/Gaga_at_monster_booth2.jpg", "tags": [], "width": 1319, "height": 1599, "aspect_ratio": 0.82489055659787369, "verified": false, "license": {"type": "cc-by", "attribution": "Domain Barnyard", "url": "http://en.wikipedia.org/wiki/File:Gaga_at_monster_booth2.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/d/dc/Gaga_front_profile.jpg", "tags": [], "width": 2161, "height": 2682, "aspect_ratio": 0.80574198359433258, "verified": false, "license": {"type": "cc-by", "attribution": "Michael Spencer", "url": "http://en.wikipedia.org/wiki/File%3AGaga_front_profile.jpg"}}], "id": "ARX6TAQ11C8A415850"}, {"name": "Beyonc\u00e9", "images": [{"url": "http://upload.wikimedia.org/wikipedia/commons/6/69/Say_My_Name_Live.jpg", "tags": [], "width": 1280, "height": 960, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "BritandBeyonce", "url": "http://upload.wikimedia.org/wikipedia/commons/6/69/Say_My_Name_Live.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Beyonc%C3%A9_e_Jay-Z.jpg/800px-Beyonc%C3%A9_e_Jay-Z.jpg", "tags": [], "width": 800, "height": 600, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "idrewuk", "url": "http://en.wikipedia.org/wiki/File%3ABeyonc%C3%A9_e_Jay-Z.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/1/11/Beyonce_Independent.jpg", "tags": [], "width": 2576, "height": 1932, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "BritandBeyonce", "url": "http://upload.wikimedia.org/wikipedia/commons/1/11/Beyonce_Independent.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/2/20/Star_of_Destiny%27s_Child.jpg", "tags": [], "width": 2816, "height": 2112, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "Flickr upload bot", "url": "http://upload.wikimedia.org/wikipedia/commons/2/20/Star_of_Destiny%27s_Child.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Say_My_Name_Live.jpg/800px-Say_My_Name_Live.jpg", "tags": [], "width": 800, "height": 600, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "Misocrazy", "url": "http://en.wikipedia.org/wiki/File:Say_My_Name_Live.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beyonce_Independent.jpg/800px-Beyonce_Independent.jpg", "tags": [], "width": 800, "height": 600, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "Cornel Pex from La Senia, Spain", "url": "http://en.wikipedia.org/wiki/File:Beyonce_Independent.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Star_of_Destiny%27s_Child.jpg/800px-Star_of_Destiny%27s_Child.jpg", "tags": [], "width": 800, "height": 600, "aspect_ratio": 1.3333333333333333, "verified": false, "license": {"type": "cc-by", "attribution": "melika", "url": "http://en.wikipedia.org/wiki/File:Star_of_Destiny%27s_Child.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/c/c0/Beyonce_during_the_inaugural_opening_ceremonies.JPG", "tags": [], "width": 3216, "height": 2136, "aspect_ratio": 1.5056179775280898, "verified": false, "license": {"type": "unknown", "attribution": "Donna Lou Morgan, U.S. Navy", "url": "http://en.wikipedia.org/wiki/File%3ABeyonce_during_the_inaugural_opening_ceremonies.JPG"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/1/14/Beyonc%C3%A9_Cosmetology_Center.jpg", "tags": [], "width": 1800, "height": 1797, "aspect_ratio": 1.001669449081803, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Truu", "url": "http://upload.wikimedia.org/wikipedia/commons/1/14/Beyonc%C3%A9_Cosmetology_Center.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/8/84/Beyonce_Green_Light2.JPG", "tags": [], "width": 2560, "height": 1156, "aspect_ratio": 2.2145328719723185, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Sandra Johansson; Sweden (Given with permission)", "url": "http://en.wikipedia.org/wiki/File%3ABeyonce_Green_Light2.JPG"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/9/97/Beyonce.jpg", "tags": [], "width": 531, "height": 768, "aspect_ratio": 0.69140625, "verified": false, "license": {"type": "public-domain", "attribution": "n/a", "url": "http://en.wikipedia.org/wiki/File:Beyonce.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/5/52/Beyonc%C3%A9_Knowles_at_2009_MTV_VMA%27s_2.jpg", "tags": [], "width": 768, "height": 1024, "aspect_ratio": 0.75, "verified": false, "license": {"type": "cc-by-sa", "attribution": "Philip Nelson", "url": "http://en.wikipedia.org/wiki/File%3ABeyonc%C3%A9_Knowles_at_2009_MTV_VMA%27s_2.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/6/6b/Baby_Boy_Live.jpg", "tags": [], "width": 1280, "height": 579, "aspect_ratio": 2.2107081174438687, "verified": false, "license": {"type": "cc-by", "attribution": "misocrazy", "url": "http://en.wikipedia.org/wiki/File%3ABaby_Boy_Live.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/2/29/Beyonce_cropped2.jpg", "tags": [], "width": 351, "height": 291, "aspect_ratio": 1.2061855670103092, "verified": false, "license": {"type": "public-domain", "attribution": "Beao", "url": "http://upload.wikimedia.org/wikipedia/commons/2/29/Beyonce_cropped2.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/6/69/Beyonce_sings_Listen.jpg", "tags": [], "width": 768, "height": 1024, "aspect_ratio": 0.75, "verified": false, "license": {"type": "cc-by-sa", "attribution": "BritandBeyonce", "url": "http://upload.wikimedia.org/wikipedia/commons/6/69/Beyonce_sings_Listen.jpg"}}], "id": "AR65K7A1187FB4DAA4"}, {"name": "Ellie Goulding", "images": [{"url": "http://userserve-ak.last.fm/serve/500/54701531/Ellie+Goulding+ellie++png.png", "tags": [], "width": 500, "height": 627, "aspect_ratio": 0.79744816586921852, "verified": false, "license": {"type": "cc-by-sa", "attribution": "shame-on-you", "url": "www.last.fm/user/shame-on-you"}}, {"url": "http://userserve-ak.last.fm/serve/_/59948311/Ellie+Goulding+egpng.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/57610657/Ellie+Goulding+ellielive++png.png", "tags": [], "width": 500, "height": 355, "aspect_ratio": 1.408450704225352, "verified": false, "license": {"type": "cc-by-sa", "attribution": "shame-on-you", "url": "www.last.fm/user/shame-on-you"}}, {"url": "http://userserve-ak.last.fm/serve/_/59947843/Ellie+Goulding+egpng.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/57741213/Ellie+Goulding+Ellie+Interview+PNG.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/54723841/Ellie+Goulding+Ellie+333.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/27081513/Ellie+Goulding+cuteellie.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/57605477/Ellie+Goulding+ellie++png.png", "tags": [], "width": 422, "height": 281, "aspect_ratio": 1.501779359430605, "verified": false, "license": {"type": "cc-by-sa", "attribution": "shame-on-you", "url": "www.last.fm/user/shame-on-you"}}, {"url": "http://userserve-ak.last.fm/serve/_/43855625/Ellie+Goulding.png", "tags": [], "width": 500, "height": 333, "aspect_ratio": 1.5015015015015014, "verified": false, "license": {"type": "cc-by-sa", "attribution": "rescue__me__", "url": "www.last.fm/user/rescue__me__"}}, {"url": "http://userserve-ak.last.fm/serve/500/44998015/Ellie+Goulding+Ellie.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/43855331/Ellie+Goulding+The+most+beautiful+woman+in+th.png", "tags": [], "width": 468, "height": 594, "aspect_ratio": 0.78787878787878785, "verified": false, "license": {"type": "cc-by-sa", "attribution": "rescue__me__", "url": "www.last.fm/user/rescue__me__"}}, {"url": "http://userserve-ak.last.fm/serve/_/44907471/Ellie+Goulding+ELLIEPNG.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/43925773/Ellie+Goulding+ellie.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/43269565/Ellie+Goulding+Ellie.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}, {"url": "http://userserve-ak.last.fm/serve/500/51095237/Ellie+Goulding+PNG2.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Ellie+Goulding/+images"}}], "id": "ARKTTJV12592CDA07F"}, {"name": "Pitbull", "images": [{"url": "http://userserve-ak.last.fm/serve/_/3241192.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3241192.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/16156.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/16156.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3658228.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3658228.jpg"}}, {"url": "http://a457.ac-images.myspacecdn.com/images01/50/m_548464162ab8e5f906f1e28d44ebdd38.gif", "tags": [], "width": 90, "height": 90, "aspect_ratio": 1.0, "verified": false, "license": {"type": "unknown", "attribution": "myspace", "url": "http://a457.ac-images.myspacecdn.com/images01/50/m_548464162ab8e5f906f1e28d44ebdd38.gif"}}, {"url": "http://userserve-ak.last.fm/serve/_/146966.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/146966.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/28110.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/28110.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3241201.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3241201.jpg"}}, {"url": "http://upload.wikimedia.org/wikipedia/commons/8/86/Pitbullrapper.jpg", "tags": [], "width": 480, "height": 640, "aspect_ratio": 0.75, "verified": false, "license": {"type": "public-domain", "attribution": "n/a", "url": "http://en.wikipedia.org/wiki/File:Pitbullrapper.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/3241197.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/3241197.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/16134.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/16134.jpg"}}, {"url": "http://userserve-ak.last.fm/serve/_/59682547/Pitbull+++TPain.png", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Pitbull/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/59682631/Pitbull+dl_tpain.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Pitbull/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/3241192/Pitbull+_boatlift.jpg", "tags": [], "width": 427, "height": 322, "aspect_ratio": 1.326086956521739, "verified": false, "license": {"type": "cc-by-sa", "attribution": "last.fm", "url": "www.last.fm/"}}, {"url": "http://userserve-ak.last.fm/serve/_/33678065/Pitbull++concert.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Pitbull/+images"}}, {"url": "http://userserve-ak.last.fm/serve/_/42369681/Pitbull+Pearly+Gates.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "n/a", "url": "http://www.last.fm/music/Pitbull/+images"}}], "id": "ARK9BHE1187FB3AC9D"}, {"name": "OneRepublic", "images": [{"url": "http://userserve-ak.last.fm/serve/_/2865541.jpg", "tags": [], "verified": false, "license": {"type": "unknown", "attribution": "last.fm", "url": "http://userserve-ak.last.fm/serve/_/2865541.jpg"}}, {"url": "http://a546.ac-images.myspacecdn.com/images01/10/m_fd70a00b64f14c66a302cdf8a8f98e01.jpg", "tags": [], "width": 90, "height": 90, "aspect_ratio": 1.0, "verified": false, "license": {"type": "unknown", "attribution": "myspace", "url": "http://a546.ac-images.myspacecdn.com/images01/10/m_fd70a00b64f14c66a302cdf8a8f98e01.jpg"}} ]}





// auto 192px !important
// url(http://upload.wikimedia.org/wikipedia/commons/6/6b/Baby_Boy_Live.jpg)
// try

// фотки одного артиста берутся разные, поэтому надо дать возможность угадывать заново без учета просмотренных
    console.log('после загрузки фото лучше загрузить в хидден или скрипт следующее фото сразу и определить что сможем его точно показать');
  console.log('при загрузке более 2 сек останавливать цепочку и брать другое фото');


});























// ниже не верно данные по юзеру будут получены в экшне при загрузке страницы. Уже будут закэшированы если их в кэшэ не было
// Также при загрузке сразу проверяем кэш групп
// Если его нет то присылаем переменную в gon js и по ней решаем апи запрос или сразу в работу


// На самом деле здесь надо запрашивать все данные из кэша - и по юзеру тоже
// на стороне сервера по юзеру данные получим из кэша, а если в кэше их нет, то из базы - и там же сразу они запишутся в кэш
// если  по группам данных нет, то придет ответ что в кэше групп нет

// в рез-те либо имеем данные и по юзеру и по группе и отправляем в работу, начиная с присвоения в глобальные переменные
//!!!! в этом случае в глоб-е переменные оба типа данных загоняем прямо в этой ф-ии и отдаем сразу в работу

// либо есть данные только по юзеру - тогда его данные сразу в глоб пер-ю а далее getGroupsApi
// getGroupsApi получит группы, отправит их в кэш и на присвоение в глоб пер-ю и запустит работу - а юзер уже будет в переменной


/*
 *  Описание
 */

    // При загрузке страницы.

        // ф-ии:

        // Беру угаданное и id-ки из кэша если есть
        // если нет беру из базы
        // сохраняю в кэш и в глобальную переменную

        // Беру данные топ100 из кэша если есть
        // Если нет делаю запрос и
        // сохраняю в кэш и в глобальную переменную





    // В процессе

        //ф-ии:

        // Я запускаю ф-ю nextFoto

        // Она вставляет фотку
        // Подставляет случайные названия групп и одно верное


        // Человек делает выбор
        // Его результат проверяется, если угадано верно я добавляю к его угаданным +1 и дополняю список id угаданных
        // пишу это и в глобальный объект и в кэш


