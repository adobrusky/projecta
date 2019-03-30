// Global Variables
const small = 436;
const medium = 768;
const large = 1024;
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

//------------ Navbar Functions
let navbarWidth = $('.nav-items').width();
let navbarHeight;
let navbarTransitionSpeed = 500;
let navbarItemCount = ($('.item').length) / 2;
let prev = 0;

function toggleNavbar() {
  $('.overlay').fadeToggle(navbarTransitionSpeed);
  $('body').toggleClass('noScroll');
  if(screenWidth < medium && $('.nav-items').css('right') === '0px') {
    $('.nav-items').css('right', -navbarWidth);
  } else {
    $('.nav-items').css('right', '0px');
  };
};

function brandPosition() {
  let brandOffset = 0;
  if ($('.brand').hasClass('brand-left')) {
    brandOffset = 1;
    if (screenWidth >= large) {
      $('.brand').css('marginRight', 'auto');
      $('.item').css('width', 'auto');
    } else {
      $('.brand').css('marginRight', '0');
    };
  } else if ($('.brand').hasClass('brand-right')) {
    brandOffset = $('.nav-items > li').length;
    if (screenWidth >= large) {
      $('.item').css('width', 'auto');
      $('.brand').css('marginLeft', 'auto');
    } else {
      $('.brand').css('marginLeft', '0');
    };
  } else {
    brandOffset = navbarItemCount + 1;
  };

  if(screenWidth >= large) {
    $('.nav-items > ul > li:nth-child('+ brandOffset + ')').after($('.nav > .brand'));
  } else {
    $('.nav > li:first-child').before($('.nav-items > ul > .brand'));
  };
};


function hideNavbar(element) {
  if($('.nav').hasClass('hide')) {
    let current = $(element).scrollTop();
    if(screenWidth < large) {
      if (current > prev && current > navbarHeight) {// If Scrolling Down
        $('.nav').css('top', -navbarHeight + 'px');
        closeDropdowns();
      } else {// If Scrolling Up
        $('.nav').css('top', 0 + 'px');
      };
    };
    return current;
  };
};

function setItemWidth() {
  let itemWidths = [];

  $('.item').each(function() {
    $(this).css('width', 'auto');
    itemWidths.push($(this).width());
  });

  let maxWidth = Math.max.apply(Math, itemWidths);
  $('.item').css('width', maxWidth + 'px');
};

function navbarResize() {
  navbarItemCount = $('.item').length / 2;
  navbarWidth = $('.nav-items').width();
  navbarHeight = $('.nav').height();

  if (screenWidth > medium && screenWidth < large) {
    navbarHeight = $('.nav').height() + $('.nav-items').height();
  };

  if(screenWidth < small) {
    $('.close i').addClass('fa-2x');
  } else {
    $('.close i').removeClass('fa-2x');
  };

  if (screenWidth < medium) {
    $('.item-dropdown a').css('transform', 'none');
    $('.nav-items').css('right', -navbarWidth);
  } else {
    $('.nav-items').css('right', '0px');
  };

  $('.nav').css('top', 0 + 'px');
  $('.brand').css('height', $('.nav').height());
  $('.content').css('marginTop', navbarHeight);
  $('.overlay').hide();

  brandPosition();
  setItemWidth();
  closeDropdowns();
};

function active() {
  let element = $('.item.active');
  $('.item').hover(function() {
    if(($(this).hasClass('nav-btn'))) {
      $(this).addClass('active');
    } else if(!($(this).hasClass('active'))) {
      element.removeClass('active');
      $(this).addClass('active');
    };
  }, function() {
    $(this).removeClass('active');
    element.addClass('active');
  });
};

//Dropdown functions
function dropdown(element) {
  let clicked = $(element).parent().children('.dropdown');
  let clickedChildren = clicked.find('.dropdown');
  let siblings = clicked.parent().siblings().find('.dropdown');
  siblings.slideUp(400);
  clicked.slideToggle(400, function() {
    clickedChildren.slideUp();
  });
};

//Closes dropdowns and calculates the necessary width
function closeDropdowns() {
  if(screenWidth < medium) {
    $('.dropdown').show();
    $('.fa-caret-down').css('width', parseInt($('.fa-caret-down').css('width')) * 2 + 1);
    let tempWidth = $('.nav-items').outerWidth();
    $('.fa-caret-down').css('width', 'auto');
    $('.nav-items').css('width', tempWidth);
  };
  $('.dropdown').hide();
};

//Items with fade class fade in when entering viewport
function fade() {
  $('.fade').each(function() {
    let elementTop = $(this).offset().top + 1;
    let viewport = $(window).scrollTop() + screenHeight;
    if(viewport > elementTop) {
      $(this).css('opacity', '1');
    };
  });
};

//Sets the height of the landing an adds a margin if necessary
function landing() {
  if($('.content').has('.landing')) {
    $('.content').has('.landing').css({'marginTop':'0', 'height':'100vh', 'perspective':'1px', 'overflowY':'auto'});
  };
  $('.landing').css('minHeight', screenHeight);
};

//Carousel functions
function carousel() {
  $('.carousel-images .active img').css('display', 'block');
};

//Disabled all transitions while resizing to prevent weird resize animations
function disableTransitions() {
  $('*').addClass('disabletransition');
  setTimeout(function () {
    $('*').removeClass('disabletransition');
  }, 200);
};

//Resizing Function
function windowResize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  navbarResize();
  landing();
};

//Main setup Function
function setup() {
  $('.close').click(function() {
    toggleNavbar();
    closeDropdowns();
  });
  $('.overlay').click(function() {
    toggleNavbar();
    closeDropdowns();
  });
  $('.burger').click(function() {
    toggleNavbar();
  });
  $('.item-dropdown > a, .subitem > a').click(function() {
    dropdown(this);
  });

  active();
  landing();
  fade();
  carousel();

  $('.overlay').hide();

  window.addEventListener('orientationchange', function() {}, false);
  $(window).on('orientationchange', function() {
    windowResize();
    disableTransitions();
  });

  $(window).resize(function() {
    windowResize();
    disableTransitions();
  });

  $('.content').scroll(function() {
    prev = hideNavbar($(this));
    fade();
  });

  $(window).scroll(function() {
    prev = hideNavbar($(this));
    fade();
  });

};

$(document).ready(function() {
  setup();
  windowResize();
});
