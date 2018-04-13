//-------------------- ProjectA Dynamic Variables ---------------------------
var navItemWidth = 60;
var carouselInterval = 10000;
var carouselFade = 200;
var navDuration = 600;
var navShrink = 2.2;
var carouselDirection = 'right'; //Accepts 'right' or 'left'

function scrollSpy() {
  var $scroll = $(window).scrollTop(),
  $height = ($('.nav').height()+1),
  $about = ($('#about').offset().top)-$height,
  $apply = ($('#apply').offset().top)-$height,
  $resume = ($('#resume').offset().top-$height),
  $interview = ($('#interview').offset().top)-$height,
  $winH = $(window).height(),
  $winW = $(window).innerWidth,
  $end = $('.footer').offset().top;
  if($winW > 435 && $winW < 1024) {
    $height = (($('.nav').height() + $('.nav-c').height())+1);
  }
  if($scroll > $about && $scroll < $apply) {
    $('.nav-c li').removeClass('active');
    $('.a').addClass('active');
  } else if($scroll > $apply && $scroll < $resume) {
    $('.nav-c li').removeClass('active');
    $('.b').addClass('active');
  } else if($scroll > $resume && $scroll < $interview) {
    $('.nav-c li').removeClass('active');
    $('.c').addClass('active');
  } else if($scroll > $interview && $scroll < $end) {
    $('.nav-c li').removeClass('active');
    $('.d').addClass('active');
  } else {
    $('.nav-c li').removeClass('active');
  }
};
