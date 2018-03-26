//----------- Global variables ---------------
var prev = 0;
var count = countFunc();
var enabled=false;
var require=false;
var itemWidth;
var itemDefault = false;
var navWidth;

//-------------------- Editable JS Variables for External Use ---------------------------
var navItemWidth = 80;
var carouselInterval = 10000;
var navDuration = 600;
var navShrink = 2.5;
var carouselDirection = 'right';
var carouselFade = 200;

//------------ Navbar ---------
function countFunc() {
  var w = window.innerWidth;
  var x = $('.item').length;
  return (x)/2;
};

//Nav Open and Close
function navClose() {
  var navTransition = String(navDuration/1000) + 's';
  $('.nav-c').css('transition', 'right ' + navTransition).css('right', -$('.nav-c').width());
  $('.overlay').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  $('body').removeClass('noScroll');
  setTimeout(function() {
    $('.overlay').hide().css('transition', 'background-color ' + navTransition);
    $('.nav-c').css('transition', 'none');
  }, navDuration);
};

function navOpen() {
  var navTransition = String(navDuration/1000) + 's';
  $('.nav-c').css('transition', 'right ' + navTransition).css('right', '0');
  $('.overlay').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
  $('body').addClass('noScroll');
  setTimeout(function() {
    $('.nav-c').css('transition', 'none');
    $('.overlay').css('transition', 'background-color ' + navTransition);
  }, navDuration);
};

//Nav Scroll Function
function navScroll(scroll) {
  var w = window.innerWidth;
  var current = $(window).scrollTop();
  var navHeight = $('.nav').height()+1;
  if (w >= 435) {
    var navHeight = navHeight+$('.nav-c').height();
  };
  if(w<1024) {
    if (current > prev) {//Scrolling Down
      if (current < navHeight) {
        $('.nav').css('top', -current + 'px');
      } else {
        $('.nav').css('top', -navHeight + 'px');
      };
    } else {//Scrolling Up
      $('.nav').css('top', 0 + 'px');
    };
  };
  return current;
};

//Nav Logo Controller
function logoMove() {
  //Test Width
  var w = window.innerWidth;
  if(w > 1023) {
    require=true;
  } else {
    require=false;
  };
  var brandPos = 0;
  if ($('.brand').hasClass('brand-left')) {
    brandPos = 1;
    if (w > 1023) {
      $('.brand').css('marginRight', 'auto');
      $('.item').css('width', 'auto');
      itemDefault = true;
    } else {
      $('.brand').css('marginRight', '0');
    };
  } else if ($('.brand').hasClass('brand-right')) {
    brandPos = $('.nav-c > li').length;
    if (w > 1023) {
      itemDefault = true;
      $('.item').css('width', 'auto');
      $('.brand').css('marginLeft', 'auto');
    } else {
      $('.brand').css('marginLeft', '0');
    };
  } else {
    brandPos = count+1;
  };

  //Enable/Disable
  if(require===true && enabled===false) {
    enabled=true;
    $('.nav-c > li:nth-child('+ brandPos + ')').after($('.nav > .brand'));
  } else if(require===false && enabled===true) {
    enabled=false;
    $('.nav > li').before($('.nav-c > .brand'));
  };
};

//--------- Resize Function ---------
function resize() {
  var w = window.innerWidth;
  var navHeight = $('.nav').height()+$('.nav-c').height();
  var itemCount = count*2;
  if (w > 1023) {
    navHeight = $('.nav-c').height();
  };
  //436 is mobile margin
  if (w < 436) {
    $('.item-dropdown a').css('transform', 'none');
    $('.carousel > li > i.fa').removeClass('fa-4x').addClass('fa-3x')
    $('.nav-c').css('right', -$('.nav-c').width());
    $('.content').css('marginTop', $('.nav').height());
    $('body').removeClass('noScroll');
    $('.overlay').hide().css('backgroundColor', 'rgba(255, 255, 255, 0)');
  } else {
    $('.carousel > li > i.fa').removeClass('fa-3x').addClass('fa-4x')
    $('.nav-c').css('right', 0);
    $('.content').css('marginTop', navHeight);
  };
  if (w > 436 && w < 620) {
    itemWidth = 100/itemCount;
  } else if(w > 620 && w < 1024) {
    itemWidth = navItemWidth/itemCount;
  } else if(w > 1023) {
    itemWidth=(navItemWidth-(navItemWidth/navShrink))/itemCount;
    if(itemDefault == true) {
      $('.item').css('width', 'auto');
    }
  } else {
    itemWidth = 100;
  };
  $('.item').css('width', itemWidth + '%');
};


//---------- Carousel--------------------

//slider for carousel
function slide(dir) {
  var active_index = $('.active-img').index();
  if (dir == 'right') {
    var new_index = active_index + 1;
    if (new_index == $('.carousel').children('li').length) {
      new_index = 0;
    }
  }
  else if (dir == 'left') {
    var new_index = active_index - 1;
    if (new_index == 0) {
      new_index = $('.carousel').children('li').length;
    }
  }
  slideTo(new_index);
}

function slideTo(index) {
  switchIndicator(index);
  $('.active-img').fadeOut(carouselFade, function() {
    $('.active-img').removeClass('active-img');
    var new_active = $('.carousel').children().get(index);
    $(new_active).addClass('active-img').hide();
    $(new_active).fadeIn(carouselFade);
  });
};

function switchIndicator(index) {
  $('.active-indicator i').removeClass('fa-circle').addClass('fa-circle-o');
  $('.active-indicator').removeClass('active-indicator');
  var new_active_indicator = $('.indicators').children().get(index);
  var indicator = $(new_active_indicator).children().get(0);
  $(indicator).removeClass('fa-circle-o').addClass('fa-circle');
  $(new_active_indicator).addClass('active-indicator');
};

function disableButton(ele, dur) { //Two arguments are the element to disable (ele) and duration (dur)
  ele.addClass('disabled');
  setTimeout(function(){
    ele.removeClass('disabled');
  },dur);
};


//---------------- Drop-drown -----------
function dropClose() {
  $('.item-dropdown > a').css('transform', 'scale(1)');
  navWidth = $('.nav-c').width();
  $('.nav-c').css('width', navWidth);
  $('.dropdown').slideUp();
};

function dropdown() {
  $('.item-dropdown > a').click(function() {
    var clicked = $(this).parent('.item-dropdown').children('.dropdown');
    var clickedChildren = clicked.find('.dropdown');
    $('.dropdown').slideUp(400);
    clicked.slideToggle(400, function() {
      clickedChildren.slideUp();
    });
  });
  $('.subitem > a').click(function() {
    var clicked = $(this).parent('.subitem').children('.dropdown');
    var clickedChildren = clicked.find('.dropdown');
    var parent = $(this).closest('.dropdown').find('.dropdown');
    parent.slideUp(400);
    clicked.slideToggle(400, function() {
      clickedChildren.slideUp();
    });
  });
};


//---------------- On Ready ----------------
$(document).ready(function() {
  window.addEventListener('orientationchange', function() {}, false);
  dropClose();
  //Essentially hits right slider every 10 seconds
  setInterval(function(){
    slide(carouselDirection);
  }, carouselInterval);
  $('.overlay').hide();
  resize();
  logoMove();
  //Dropdown
  dropdown();
  //On Resize
  $(window).resize(function() {
    resize();
    logoMove();
    dropClose();
  });

  //On Orientation Change
  $(window).on( 'orientationchange', function() {
    resize();
  });

  //Clicking on burger function
  $('.nav-t').click(function() {
    disableButton($('.close'), 600);
    disableButton($('.nav-t'), 600);
    disableButton($('.overlay'), 600);
    navOpen();
  });

  //Close burger navbar function
  $('.close').click(function() {
    disableButton($('.nav-t'), 600);
    disableButton($('.close'), 600);
    disableButton($('.overlay'), 600);
    dropClose();
    navClose();
  });

  //Close by clicking Overlay
  $('.overlay').click(function() {
    disableButton($('.close'), 600);
    disableButton($('.nav-t'), 600);
    disableButton($('.overlay'), 600);
    dropClose();
    navClose();
  });

  //Indicator for Carousel
  $('.indicator').click(function() {
    var index = $(this).index();
    slideTo(index);
  });

  //Navbar Slides up or down on scroll
  $(window).scroll(function() {
    prev = navScroll(prev);
  });
});
