//----------- Global variables ---------------
var prev = 0;
var count = countFunc();
var require=false;
var itemWidth;
var navWidth;
var w;
var itemDefault = false;

//-------------------- Editable JS Variables for External Use ---------------------------
var navItemWidth = 80;
var carouselInterval = 10000;
var navDuration = 600;
var navShrink = 2.5;
var carouselDirection = 'right';
var carouselFade = 200;
var dropSpeed = 400;

//------------ Navbar ---------
function countFunc() {
  var x = $('.item').length;
  return (x)/2;
};

//------------ Calculate Navbar Width ---------
function calcNavWidth() {
  $('.dropdown').show();
  $('.fa-caret-down').css('width', parseInt($('.fa-caret-down').css('width')) * 2 + 1);
  navWidth = $('.nav-c').outerWidth();
  $('.fa-caret-down').css('width', 'auto');
  $('.nav-c').css('width', navWidth);
  $('.dropdown').hide();
};

//Nav Open and Close
var navTransition = navDuration/1000 + 's';
function navClose() {
  navWidth = $('.nav-c').width();
  $('.nav-c').css({'transition':'right ' + navTransition, 'right':-navWidth});
  $('.overlay').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  $('body').removeClass('noScroll');
  setTimeout(function() {
    $('.overlay').hide().css('transition', 'background-color ' + navTransition);
    $('.nav-c').css('transition', 'none');
  }, navDuration);
};

function navOpen() {
  $('.nav-c').css({'transition':'right ' + navTransition, 'right':'0'});
  $('.overlay').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
  $('body').addClass('noScroll');
  setTimeout(function() {
    $('.nav-c').css('transition', 'none');
    $('.overlay').css('transition', 'background-color ' + navTransition);
  }, navDuration);
};

//Nav Scroll Function
function navScroll(scroll) {
  w = window.innerWidth;
  if($('.nav').hasClass('hide')) {
    var current = $(window).scrollTop();
    var navHeight = $('.nav').height()+1;
    if (w >= 768) {
      navHeight = navHeight+$('.nav-c').height();
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
};

//Nav Logo Controller
function logoMove() {
  w = window.innerWidth;
  //Test Width
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
  if(require===true) {
    $('.nav-c > li:nth-child('+ brandPos + ')').after($('.nav > .brand'));
  } else if(require===false) {
    $('.nav > li').before($('.nav-c > .brand'));
  };
};

//--------- Resize Function ---------
function resize() {
  w = window.innerWidth;
  var navHeight = $('.nav').height()+$('.nav-c').height();
  itemCount = count*2;
  navWidth = $('.nav-c').width();
  if (w > 1023) {
    navHeight = $('.nav-c').height();
  };
  if(w < 436) {
    $('.close i').addClass('fa-2x');
  } else {
    $('.close i').removeClass('fa-2x');
  };
  //436 is mobile margin
  if (w < 768) {
    $('.item-dropdown a').css('transform', 'none');
    $('.carousel > li > i.fa').removeClass('fa-4x').addClass('fa-3x')
    $('.nav-c').css('right', -navWidth);
    $('.content').css('marginTop', $('.nav').height());
    $('body').removeClass('noScroll');
    $('.overlay').hide().css('backgroundColor', 'rgba(255, 255, 255, 0)');
  } else {
    $('.carousel > li > i.fa').removeClass('fa-3x').addClass('fa-4x')
    $('.nav-c').css('right', 0);
    $('.content').css('marginTop', navHeight);
  };
  if(w >= 768 && w < 1024) {
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

function disableButton(ele, dur) {
  ele.addClass('disabled');
  setTimeout(function(){
    ele.removeClass('disabled');
  },dur);
};

//---------------- Drop-drown -----------
function dropClose() {
  w = window.innerWidth;
  if(w < 768) {
    calcNavWidth();
  };
};

function dropdown() {
  w = window.innerWidth;
  $('.item-dropdown > a, .subitem > a').click(function() {
    var clicked = $(this).parent().children('.dropdown');
    var clickedChildren = clicked.find('.dropdown');
    var siblings = clicked.parent().siblings().find('.dropdown');
    if(w < 768) {
      siblings.slideUp(dropSpeed);
      clicked.slideToggle(dropSpeed, function() {
        clickedChildren.slideUp();
      });
    };
  });
};

//------------- Landing Page --------------
function landing() {
  w = window.innerWidth;
  var winW = window.innerWidth;
  var winH = $(window).height();
  if($('.landing').hasClass('noMargin')) {
    $('.content').has('.landing').css('marginTop', '0');
  } else {
    winH = winH - $('.nav').height();
    if(w > 768 && w < 1024) {
      winH = winH - $('.nav-c').height();
    }
  }
  $('.landing').css('height', winH);
};

//------------------- Parallax --------------
function parallax() {
  $('.parallax').each(function() {
    var top = $(window).scrollTop();
    var offset = $(this).offset().top;
    $(this).css('backgroundPosition', 'center ' + -((top - offset) / 5) + 'px');
  });
}

//---------------- Navbar change on scroll ----------
function navChange(id, src, src2) {
  var scroll = $(window).scrollTop();
  if(scroll > 0) {
    $(id).prop('disabled', false);
    $('.brand img').attr('src', src2);
  } else {
    $(id).prop('disabled', true);
    $('.brand img').attr('src', src);
  }
}

//------------------- Navbar Active Switch -------------------
function active() {
  var element = $('.item.active');
  $('.item').hover(function() {
    if(($(this).hasClass('nav-btn'))) {
      $(this).addClass('active');
    } else if(!($(this).hasClass('active'))) {
      element.removeClass('active');
      $(this).addClass('active');
    }
  }, function() {
      $(this).removeClass('active');
      element.addClass('active');
  });
}

//---------------- On Ready ----------------
$(document).ready(function() {
  $('body').removeClass('fade');
  window.addEventListener('orientationchange', function() {}, false);
  $(window).on( 'orientationchange', function() {
    resize();
  });
  active();
  $(window).resize(function() {
    resize();
    logoMove();
    landing();
    dropClose();
  });
  if (w < 768) {
    calcNavWidth();
  }
  dropClose();
  resize();
  logoMove();
  landing();
  parallax();
  dropdown();
  $('.overlay').hide();

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
    parallax();
  });

  //Carousel Slider interval
  setInterval(function(){
    slide(carouselDirection);
  }, carouselInterval);
});
