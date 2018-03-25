//----------- Global variables ---------------
var prev = 0;
var count = countFunc();
var enabled=false;
var require=false;

//-------------------- Editable JS Variables for External Use ---------------------------
var navItemWidth = 80;
var carouselInterval = 10000;
var navDuration = 600;
var navShrink = 2.5;
var carouselDirection = 'right';

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
    } else {
      $('.brand').css('marginRight', '0');
    };
  } else if ($('.brand').hasClass('brand-right')) {
    brandPos = $('.nav-c > li').length;
    if (w > 1023) {
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
  var itemWidth;
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
  } else {
    itemWidth = 100;
  };
  $('.item').css('width', itemWidth + '%');
};


//---------- Carousel--------------------
var changeWidth = false;
function carouselResize() {
  var carouselImg = $('.carousel img');
  var carousel = $('.carousel');
  var indicators = $('.indicators').height()+5;
  if(carouselImg.height() > carousel.height() && changeWidth == false) {
    carouselImg.css('maxHeight', carousel.height()-indicators).css('width', 'auto');
    changeWidth = true;
  } else if(carouselImg.height() < carousel.height() && changeWidth == true){
    var width = carouselImg.css('width');
    carouselImg.css('width', '100%');
    var fullWidth = carouselImg.css('width');
    if(parseInt(width) < parseInt(fullWidth)) {
      carouselImg.css('width', 'auto');
    } else {
      changeWidth = false;
      carouselImg.css('maxHeight', 'none');
    };
  };
};
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
  $('.active-img').fadeOut(200, function() {
    $('.active-img').removeClass('active-img');
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

function disableButton(ele, dur) { //Two arguments are the element to disable (ele) and duration (dur)
  ele.addClass('disabled');
  setTimeout(function(){
    ele.removeClass('disabled');
  },dur);
};


//---------------- Drop-drown -----------
function dropClose() {
    $('.item-dropdown > a').css('transform', 'scale(1)');
  $('.dropdown').css('max-height', '0px');
};

function adjustExpand(linkHeight, amount) {
  $('.dropdown').each(function() {
    if (parseInt($(this).css('maxHeight')) != 0) {
      var addHeight = parseInt($(this).css('maxHeight')) + linkHeight * amount;
      $(this).css('maxHeight', addHeight);
    }
  });
};

function dropdown() {
  var linkHeight = $('.item-dropdown').height();
  $('.item-dropdown > a').click(function() {
    var clicked = $(this).parent('.item-dropdown').children('.dropdown');
    if(parseInt(clicked.css('maxHeight')) == 0) {
      $('.item-dropdown > a').css('transform', 'scale(1)');
      $('.dropdown').css('max-height', '0px');
      var dropHeight = linkHeight * (clicked.children('li').length);
      clicked.css('max-height', dropHeight);
      $(this).css('transform', 'scale(1.1)');
    } else {
      dropClose();
    };
  });
  $('.subitem > a').click(function() {
    var clicked = $(this).parent('.subitem').children('.dropdown'); //Gets the dropdown that was clicked on
    var closest = $(this).closest('.dropdown'); //Gets the dropdown
    var amount = clicked.children('li').length; //Number of children in dropdown
    var adjust = 0;
    if(parseInt(clicked.css('maxHeight')) == 0) {
      clicked.css('maxHeight', linkHeight * amount);
      adjustExpand(linkHeight, amount);
    } else {
      clicked.css('max-height', '0px');
      clicked.find('.dropdown').css('max-height', '0px');
      clicked.parents('.dropdown').each(function() {
        amount = $(this).children('li').length;
        $(this).find('.dropdown').not(clicked).each(function() { //adjusts amount to equal total number of expanded items
          if ( (parseInt($(this).css('maxHeight')) > 0) && (clicked.has($(this)).length == 0) ) {
            amount += $(this).children('li').length;
          };
        });
        $(this).css('maxHeight', amount * linkHeight);
      });
    };
  });
};


//---------------- On Ready ----------------
$(document).ready(function() {
  window.addEventListener('orientationchange', function() {}, false);

  //Essentially hits right slider every 10 seconds
  setInterval(function(){
    slide(carouselDirection);
  }, carouselInterval);
  $('.overlay').hide();
  resize();
  logoMove();
  carouselResize();
  //Dropdown
  dropdown();
  //On Resize
  $(window).resize(function() {
    resize();
    carouselResize();
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
