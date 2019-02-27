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

function closeNavbar() {
  if(screenWidth < medium) {
    $('.nav-items').css('right', -navbarWidth);
    $('body').removeClass('noScroll');
    $('.overlay').fadeOut(navTransition)
  } else {
    $('.overlay').fadeOut(navTransition);
    $('body').removeClass('noScroll');
  };
};

function openNavbar() {
  $('.nav-items').css('right', '0');
  $('.overlay').fadeIn(navTransition);
  $('body').addClass('noScroll');
};

//TODO FINISH NAVBAR RESIZE FUNCTION
function navbarResize() {
  let navbarHeight = $('.nav').height()+$('.nav-items').height();
  let navbarItemCount = ($('.item').length) / 2;
  navbarWidth = $('.nav-items').width();
  if (screenWidth > large) {
    navbarHeight = $('.nav-items').height();
  };
  if(screenWidth < small) {
    $('.close i').addClass('fa-2x');
  } else {
    $('.close i').removeClass('fa-2x');
  };
  //436 is mobile margin
  if (screenWidth < medium) {
    $('.nav-items').css('right', -navbarWidth);
    $('.content').css('marginTop', $('.nav').height());
    $('body').removeClass('noScroll');
    $('.brand').css('height', '100%');
  } else {
    $('.nav-items').css('right', '0');
    $('.content').css('marginTop', navbarHeight);
    $('.brand').css('height', $('.nav').height());
  };
  if(screenWidth >= medium && screenWidth < large) {
    itemWidth = navItemWidth/itemCount;
  } else if(screenWidth > large) {
    itemWidth=(navItemWidth-(navItemWidth/navShrink))/itemCount;
    if(itemDefault == true) {
      $('.item').css('width', 'auto');
    };
  } else {
    itemWidth = 100;
  };
  $('.item').css('width', itemWidth + '%');
  $('.nav').css('top', 0 + 'px');
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

//Main setup Function
function setup() {
  $('.close').on('click', closeNavbar());
  $('.overlay').on('click', closeNavbar());
  $('.burger').on('click', openNavbar());


  window.addEventListener('orientationchange', function() {}, false);
  $(window).on('orientationchange', function() {
    windowResize();
  });

  $(window).resize(windowResize);

};

$(document).ready(function() {
  setup();
});
