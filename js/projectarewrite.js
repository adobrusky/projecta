// Global Variables
let small = 436;
let medium = 768;
let large = 1024;
let screenWidth = window.innerWidth;

// Check for if Device is on mobile or if less than 768px
function isMobile() {
  if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (/Android/i.test(navigator.userAgent) && screenWidth <= medium)) {
    return true;
  } else {
    return false;
  };
};

//------------ Navbar Functions
let navbarWidth = $('.nav-items').width();
let navbarTransitionSpeed = 500;
let navbarItemCount = ($('.item').length) / 2;

function closeNavbar() {
  if(screenWidth < medium) {
    $('.nav-items').css('right', -navbarWidth);
    $('body').removeClass('noScroll');
    $('.overlay').fadeOut(navbarTransitionSpeed)
  } else {
    $('.overlay').fadeOut(navbarTransitionSpeed);
    $('body').removeClass('noScroll');
  };
};

function openNavbar() {
  $('.nav-items').css('right', '0');
  $('.overlay').fadeIn(navbarTransitionSpeed);
  $('body').addClass('noScroll');
};

function brandPosition() {
  let brandOffset = 0;
  if ($('.brand').hasClass('brand-left')) {
    brandOffset = 1;
    if (screenWidth > large) {
      $('.brand').css('marginRight', 'auto');
      $('.item').css('width', 'auto');
    } else {
      $('.brand').css('marginRight', '0');
    };
  } else if ($('.brand').hasClass('brand-right')) {
    brandOffset = $('.nav-items > li').length;
    if (screenWidth > large) {
      $('.item').css('width', 'auto');
      $('.brand').css('marginLeft', 'auto');
    } else {
      $('.brand').css('marginLeft', '0');
    };
  } else {
    brandOffset = navbarItemCount + 1;
  };

  if(screenWidth > large) {
    $('.nav-items > ul > li:nth-child('+ brandOffset + ')').after($('.nav > .brand'));
  } else {
    $('.nav > li:first-child').before($('.nav-items > ul > .brand'));
  };
};

function hideNavbar(scroll) {
  if($('.nav').hasClass('hide')) {
    let current = $(window).scrollTop();
    let navHeight = $('.nav').height()+1;
    if (screenWidth >= medium) {
      navHeight = navHeight+$('.nav-items').height();
    };
    if(screenWidth < large) {
      if (current > prev) {// If Scrolling Down
        $('.nav').css('top', -navHeight + 'px');
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
  console.log(maxWidth);
  $('.item').css('width', maxWidth + 'px');
};

function navbarResize() {
  let navbarHeight = $('.nav').height()+$('.nav-items').height();
  navbarItemCount = ($('.item').length) / 2;
  navbarWidth = $('.nav-items').width();
  $('.nav').css('top', 0 + 'px');

  if (screenWidth > large) {
    navbarHeight = $('.nav-items').height();
  };

  if(screenWidth < small) {
    $('.close i').addClass('fa-2x');
  } else {
    $('.close i').removeClass('fa-2x');
  };

  if (screenWidth < medium) {
    $('.content').css('marginTop', $('.nav').height());
    $('.brand').css('height', '100%');
    $('.nav-items').css('right', '0px');
  } else {
    $('.content').css('marginTop', navbarHeight);
    $('.brand').css('height', $('.nav').height());
  };

  closeNavbar();
  brandPosition();
  setItemWidth();
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

//Disabled all transitions while resizing
function disableTransitions() {
  $('*').addClass('disabletransition');
  setTimeout(function () {
    $('*').removeClass('disabletransition');
  }, 1);
};

//Resizing Function
function windowResize() {
  screenWidth = window.innerWidth;
  disableTransitions();
  navbarResize();
};

//Items with fade class fade in when entering viewport
function fade() {
  $('.fade').each(function() {
    let top = $(window).scrollTop() + $(window).height();
    let offset = $(this).offset().top;
    if(top > (offset + 1)) {
      $(this).css('opacity', '1');
    };
  });
};

//Creates the parallax effect
function parallax() {
  if(!(isMobile())) {
    $('.parallax').each(function() {
      let top = $(window).scrollTop();
      let offsetTop = $(this).offset().top;
      let offsetLeft = $(this).offset().left;
      let xPos = $(this).hasClass('landing') || $(this).hasClass('center') ? 'center ' : offsetLeft + 'px ';
      $(this).css('backgroundAttachment', 'fixed');
      $(this).css('backgroundPosition', xPos + -((top - offsetTop) / 5) + 'px');
    });
  };
};

//Sets the height of the landing an adds a margin if necessary
function landing() {
  let windowHeight = $(window).height();
  if($('.landing').hasClass('no-margin')) {
    $('.content').has('.landing').css('marginTop', '0');
  } else {
    windowHeight = windowHeight - $('.nav').height();
    if(screenWidth >= medium && screenWidth < large) {
      windowHeight = windowHeight - $('.nav-items').height();
    };
  };
  $('.landing').css('height', windowHeight);
};


//Main setup Function
function setup() {
  $('.close').click(function() {
    closeNavbar();
  });
  $('.overlay').click(function() {
    closeNavbar();
  });
  $('.burger').click(function() {
    openNavbar();
  });

  fade();
  active();

  $('.overlay').hide();

  window.addEventListener('orientationchange', function() {}, false);
  $(window).on('orientationchange', function() {
    windowResize();
  });

  $(window).resize(windowResize);

  $(window).scroll(function() {
    fade();
  });

};

$(document).ready(function() {
  setup();
  windowResize();
});
