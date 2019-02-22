// Global Variables
let small = 436;
let medium = 768;
let large = 1024;

// Check for if Device is on mobile or if less than 768px
function isMobile() {
  if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (/Android/i.test(navigator.userAgent) && screenWidth <= medium)) {
    return true;
  } else {
    return false;
  };
};

// Close the navbar
function closeNavbar() {
  if(screenWidth < medium) {
    let navWidth = $('.nav-items').width();
    $('.nav-items').css('right', -navWidth);
    $('body').removeClass('noScroll');
    setTimeout(function() {
      $('.overlay').fadeOut()
      $('.nav-items').css('transition', 'all .5s, right 0s');
    }, navDuration);
  } else {
    $('.nav-items').css('transition', 'all .5s, right 0s');
    $('.overlay').fadeOut(navTransition);
    $('body').removeClass('noScroll');
  };
};

//Open the navbar
function openNavbar() {
  $('.nav-items').css({'transition':'right ' + navTransition, 'right':'0'});
  $('.overlay').fadeIn(navTransition);
  $('body').addClass('noScroll');
  setTimeout(function() {
    $('.nav-items').css('transition', 'all .5s, right 0s');
    $('.overlay').css('transition', 'background-color ' + navTransition);
  }, navDuration);
};

function burgerClickEvent() {
  openNavbar();
}
//Main setup Function
function setup() {

};

$(document).ready(function() {
  setup();
});
