/**
 * Created with JetBrains RubyMine.
 * User: stas
 * Date: 17.01.14
 * Time: 1:51
 * To change this template use File | Settings | File Templates.
 */
function outOne() {
  setTimeout(function () {
    $('.square').animate({left: -200}, 1000, 'easeInOutBack')
  }, 2000);
}

function outTwo() {
  // влево
  var s = 2000;
  var step = 200;
  setTimeout(function () {
    $('.sq1').animate({left: -200}, 500, 'easeInOutBack')
  }, s);

  setTimeout(function () {
    $('.sq2').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 1);
  setTimeout(function () {
    $('.sq3').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 2);
  setTimeout(function () {
    $('.sq4').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 3);
  setTimeout(function () {
    $('.sq5').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 4);
  setTimeout(function () {
    $('.sq6').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 5);

  setTimeout(function () {
    $('.sq7').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 6);
  setTimeout(function () {
    $('.sq8').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 7);


}


function outThree() {

  // вправо сначал
  setTimeout(function () {
    $('.square').animate({left: 550}, 500, 'easeInBack')
  }, 1500)

  // влево
  var s = 1500;
  var step = 200;
  setTimeout(function () {
    $('.sq1').animate({left: -200}, 500, 'easeInOutBack')
  }, s);

  setTimeout(function () {
    $('.sq2').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 1);
  setTimeout(function () {
    $('.sq3').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 2);
  setTimeout(function () {
    $('.sq4').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 3);
  setTimeout(function () {
    $('.sq5').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 4);
  setTimeout(function () {
    $('.sq6').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 5);

  setTimeout(function () {
    $('.sq7').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 6);
  setTimeout(function () {
    $('.sq8').animate({left: -200}, 1000, 'easeInOutBack')
  }, s + step * 7);


}

function rotateAngle2(g, time) {
  console.log('pp');
  $(".square").rotate({animateTo: g, duration: time});
}

function rotateAngle(g, time) {
  $(".square").rotate({animateTo: g, duration: time});

  console.log('jj');

  setTimeout(function () {
    rotateAngle2(360, 2000);
  }, 1000);


  // Сразу уезжают
  //outOne();


  // По очереди уезжают если без движ вправо то s =2000

  outTwo();
  //outThree();

}


function animateDown() {

  var y = 250;
  var move_time = 1000;

//
//  $('.sq1').animate({top: y}, move_time);
//  $('.sq2').animate({top: y}, move_time, 'easeInQuart')
//  $('.sq3').animate({top: y}, move_time, 'easeInBounce')
//  $('.sq4').animate({top: y}, move_time, 'easeOutBounce')
//  $('.sq5').animate({top: y}, move_time, 'easeOutElastic')
//  $('.sq6').animate({top: y}, move_time, 'easeInCirc')
//  $('.sq7').animate({top: y}, move_time, 'easeOutQuart')
//  $('.sq8').animate({top: y}, move_time, 'easeInOutBack')

  $('.sq1').animate({top: y}, move_time);
  $('.sq2').animate({top: y}, move_time, 'easeInQuart');
  $('.sq3').animate({top: y}, move_time, 'easeOutQuart');
  $('.sq4').animate({top: y}, move_time, 'easeInOutQuart');
  $('.sq5').animate({top: y}, move_time, 'easeOutElastic');
  $('.sq6').animate({top: y}, move_time, 'easeInCirc');
  $('.sq7').animate({top: y}, move_time, 'easeOutBounce');
  $('.sq8').animate({top: y}, move_time, 'easeInOutBounce');

  console.log('kk')

  setTimeout(function () {
    rotateAngle(45, 500);
  }, 1200);

//  $('.sq1').animate({top: y}, move_time);
//  $('.sq2').animate({top: y}, move_time, 'easeInCirc')
//  $('.sq3').animate({top: y}, move_time, 'easeOutCirc')
//  $('.sq4').animate({top: y}, move_time, 'easeInOutCirc')
//  $('.sq5').animate({top: y}, 2000, 'easeOutElastic')
//  $('.sq6').animate({top: y}, move_time, 'easeInQuart')
//  $('.sq7').animate({top: y}, 2000, 'easeOutBounce')
//  $('.sq8').animate({top: y}, 2000, 'easeInOutBounce', function () {
//    rotateAngle(45)}
//  )

  //setTimeout(rotateAngle(45), 6000)


}


function ufoFly () {

  if(!Ufo.start) {
    var el = $('.ufo_fly.ufo1');
    el.animate({left: 800}, 44000, 'easeOutElastic');
    Ufo.type = 2;
    setTimeout(function () {
      el.css({left: -240});
    }, 60000);
    Ufo.time = Date.now;
    Ufo.start = true;
  }


  if (Ufo.time + 300000 < Date.now()) {

    if (Ufo.type == 1) {
      var el = $('.ufo_fly.ufo1');
      el.animate({left: 800}, 44000, 'easeOutElastic');
      Ufo.type = 2;
      setTimeout(function () {
        el.css({left: -240});
      }, 60000);
      Ufo.time = Date.now;
    } else {

      if (Ufo.type == 2) {
        var el = $('.ufo_fly.ufo3');
        el.animate({left: -154}, 44000, 'easeOutElastic');
        Ufo.type = 3;

        setTimeout(function () {
          el.css({left: 840});
        }, 60000);
        Ufo.time = Date.now;
      } else {

        if (Ufo.type == 3) {
          var el = $('.ufo_fly.ufo2');
          el.animate({left: 840}, 44000, 'easeOutElastic');
          Ufo.type = 1;

          setTimeout(function () {
            el.css({left: -154});
          }, 60000);
        }

      }


    }




  }








}
