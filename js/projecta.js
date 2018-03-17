//----------- Global variables ---------------
var prev = 0;
var logo = $('.nav li:first-child')[0].outerHTML;
var count = countFunc();
var enabled=false;
var require=false;

//------------ Navbar ---------
function countFunc() {
  var w = window.innerWidth;
  var x = ($('.nav-c > li > a').length) + ($('.nav-c > li > p').length);
  return (x)/2;
};

//Nav Open and Close
function navClose() {
  $('.nav-c').css('transition', 'right .6s').css('right', -$('.nav-c').width());
  $('.overlay').css('backgroundColor', 'rgba(255, 255, 255, 0)');
  $('body').removeClass('noScroll');
  setTimeout(function() {
    $('.overlay').hide().css('transition', 'background-color .6s');
    $('.nav-c').css('transition', 'none');
  }, 600);
};

function navOpen() {
  $('.nav-c').css('transition', 'right .6s').css('right', '0');
  $('.overlay').show().css('backgroundColor', 'rgba(0, 0, 0, 0.5)');
  $('body').addClass('noScroll');
  setTimeout(function() {
    $('.nav-c').css('transition', 'none');
    $('.overlay').css('transition', 'background-color .6s');
  }, 600);
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
  var brand_pos = 0;
  var logo_offset = 1;
  if ($('.brand').hasClass('brand-left')) {
    logo_offset = 1;
    brand_pos = 1;
    if (w > 1023) {
      $('.first').css('marginLeft', '25%');
      $('.brand').css('marginRight', 'auto');
      $('.brand').css('marginRight', parseInt($('.brand').css('marginRight'))-10);
    } else {
      $('.first').css('marginLeft', '0');
    }
  } else if ($('.brand').hasClass('brand-right')) {
    logo_offset = 0;
    brand_pos = $('.nav-c > li').length;
    if (w > 1023) {
      $('.last').css('marginRight', '25%');
      $('.brand').css('marginLeft', 'auto');
    } else {
      $('.last').css('marginRight', '0');
    }
  } else {
    brand_pos = count+1;
    if (w < 1024) {
      $('.last').css('marginRight', '0');
      $('.first').css('marginLeft', '0');
    } else {
      $('.last').css('marginRight', '25%');
      $('.first').css('marginLeft', '25%');
    }
  };

  //Enable/Disable
  if(require===true && enabled===false) {
    enabled=true;
    $('.nav > li:first-child').remove(); //taking logo out of nav
    $('.nav-c > li:nth-child('+ (brand_pos) + ')').after(logo); //place in nav-c
  } else if(require===false && enabled===true) {
    enabled=false;
    $('.nav > li').before(logo); //place back in nav
    $('.nav-c > li:nth-child(' + (brand_pos + logo_offset) + ')').remove();
  };
};


//--------- Resize Function ---------
function resize() {
  var w = window.innerWidth;
  var navHeight = $('.nav').height()+$('.nav-c').height();
  var item_count = $('.nav-c > li > a').length;
  item_width = 100;
  if (w > 1023) {
    navHeight = $('.nav-c').height();
    item_width = 50/item_count;
  };
  if (w <= 435) { //I'm using 436 pixels as the mobile margin
  $('.dropdown').removeClass('dropdown-a');
  $('.item-dropdown a').css('transform', 'none');
  $('.carousel > li > i.fa').removeClass('fa-4x').addClass('fa-3x')
  $('.nav-c').css('right', -$('.nav-c').width());
  $('.content').css('marginTop', $('.nav').height());
  $('body').removeClass('noScroll');
  $('.overlay').hide().css('backgroundColor', 'rgba(255, 255, 255, 0)');
} else {
  if (w < 620) {
    item_width = 100/item_count;
  } else {
    item_width = 80/item_count;
  };
  $('.carousel > li > i.fa').removeClass('fa-3x').addClass('fa-4x')
  $('.nav-c').css('right', 0);
  $('.content').css('marginTop', navHeight);
};
if (w > 1023 && ($('.brand').hasClass('brand-left') === false) && ($('.brand').hasClass('brand-right') === false)) {
  $('.first').css('marginLeft', 0);
  $('.last').css('marginRight', 0);
};
$('.item').css('width', item_width + '%');
};


//---------- Carousel--------------------
function carResize() {
  var img_li = $('.active-img');
  var img = $('.active-img img');
  if (img.height() == parseInt($('.carousel').css('maxHeight'))) {
    img_li.css('maxWidth', img.width());
  };
};

//slider for carousel
function slide(dir) {
  var active_index = $(".active-img").index();
  if (dir == 'right') {
    var new_index = active_index + 1;
    if (new_index == $('.carousel').children().length -1) {
      new_index = 0;
    }
  }
  else if (dir == 'left') {
    var new_index = active_index - 1;
    if (new_index == 0) {
      new_index = $('.carousel').children().length -1;
    }
  }
  switchIndicator(new_index);
  slideTo(new_index);
}

function slideTo(index) {
  switchIndicator(index);
  $(".active-img").fadeOut(200, function() {
    $(".active-img").removeClass('active-img');
    var new_active = $('.carousel').children().get(index);
    $(new_active).addClass('active-img').hide();
    $(new_active).fadeIn(200);
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

function disableButton(ele, dur) { //Two arguments are the element to disabl (ele) and duration (dur)
  ele.addClass('disabled');
  setTimeout(function(){
    ele.removeClass('disabled');
  },dur);
};


//---------------- Drop-drown -----------
function dropdown() {
  $('.item-dropdown a').click(function() {
      var clicked = $(this).parent('.item-dropdown').children('.dropdown');
      if(clicked.height() == '0') {
        clicked.addClass('dropdown-a');
        $(this).css('transform', 'scale(1.1)');
      } else {
        $('.dropdown').removeClass('dropdown-a');
        $(this).css('transform', 'none');
      }
  });
  $('.subitem a').click(function() {
    var clicked = $(this).parent('.subitem').children('.dropdown');
    if(clicked.height() == '0') {
      clicked.addClass('dropdown-a');
    } else {
      clicked.removeClass('dropdown-a');
    }
  });
};


//---------------- On Ready ----------------
$(document).ready(function() {
  window.addEventListener("orientationchange", function() {}, false);

  //Essentially hits right slider every 10 seconds
  setInterval(function(){
    slide('right');
  }, 10000);
  $('.overlay').hide();
  resize();
  logoMove();

  //Dropdown
  dropdown();
  //On Resize
  $(window).resize(function() {
    resize();
    carResize();
    logoMove();
  });

  //On Orientation Change
  $(window).on( "orientationchange", function() {
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
    $('.item-dropdown a').css('transform', 'none');
    $('.dropdown').removeClass('dropdown-a');
    navClose();
  });

  //Close by clicking Overlay
  $('.overlay').click(function() {
    disableButton($('.close'), 600);
    disableButton($('.nav-t'), 600);
    disableButton($('.overlay'), 600);
    $('.item-dropdown a').css('transform', 'none');
    $('.dropdown').removeClass('dropdown-a');
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
