//----------- Global letiables ---------------
let prev = 0;
let count = countFunc();
let require=false;
let itemWidth;
let navWidth;
let screenWidth = window.innerWidth;
let itemDefault = false;

//-------------------- Editable JS letiables for External Use ---------------------------
let navItemWidth = 80;
let carouselInterval = 10000;
let navDuration = 600;
let navShrink = 2.5;
let carouselDirection = 'right';
let carouselFade = 200;
let dropSpeed = 400;
let small = 436;
let medium = 768;
let large = 1024;

//------------ Navbar ---------
function countFunc() {
  let x = $('.item').length;
  return (x)/2;
};

//--------------- Test for if the user is on a mobile device -----------
function isMobile() {
  if(/webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || (/Android/i.test(navigator.userAgent) && screenWidth <= medium)) {
    return true;
  } else {
    return false;
  };
};

//------------ Calculate Navbar Width ---------
function calcNavWidth() {
  $('.dropdown').show();
  $('.fa-caret-down').css('width', parseInt($('.fa-caret-down').css('width')) * 2 + 1);
  navWidth = $('.nav-items').outerWidth();
  $('.fa-caret-down').css('width', 'auto');
  $('.nav-items').css('width', navWidth);
  $('.dropdown').hide();
};

//Nav Open and Close
let navTransition = navDuration/1000 + 's';
function navClose() {
  if(screenWidth < medium) {
    let navWidth = $('.nav-items').width();
    $('.nav-items').css('right', -navWidth);
    $('body').removeClass('noScroll');
    $('.overlay').fadeOut(navTransition)
  } else {
    $('.overlay').fadeOut(navTransition);
    $('body').removeClass('noScroll');
  };
};

function navOpen() {
  $('.nav-items').css('right', '0');
  $('.overlay').fadeIn(navTransition);
  $('body').addClass('noScroll');
};
//TODO: FINSIH THE STUFF WITH DROPCLOSE AND SCROLLING BELOW
//Nav Scroll Function
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

//Nav Logo Controller
function logoMove() {
  //Test Width
  if(screenWidth > large) {
    require=true;
  } else {
    require=false;
  };
  let brandPos = 0;
  if ($('.brand').hasClass('brand-left')) {
    brandPos = 1;
    if (screenWidth > large) {
      $('.brand').css('marginRight', 'auto');
      $('.item').css('width', 'auto');
      itemDefault = true;
    } else {
      $('.brand').css('marginRight', '0');
    };
  } else if ($('.brand').hasClass('brand-right')) {
    brandPos = $('.nav-items > li').length;
    if (screenWidth > large) {
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
    $('.nav-items > ul > li:nth-child('+ brandPos + ')').after($('.nav > .brand'));
  } else if(require===false) {
    $('.nav > li:first-child').before($('.nav-items > ul > .brand'));
  };
};

//--------- Resize Function ---------
function resize() {
  let navHeight = $('.nav').height()+$('.nav-items').height();
  itemCount = count*2;
  navWidth = $('.nav-items').width();
  if (screenWidth > large) {
    navHeight = $('.nav-items').height();
  };
  if(screenWidth < small) {
    $('.close i').addClass('fa-2x');
  } else {
    $('.close i').removeClass('fa-2x');
  };
  //436 is mobile margin
  if (screenWidth < medium) {
    $('.item-dropdown a').css('transform', 'none');
    $('.carousel > li > i.fa').removeClass('fa-4x').addClass('fa-3x')
    $('.nav-items').css('right', -navWidth);
    $('.content').css('marginTop', $('.nav').height());
    $('body').removeClass('noScroll');
    $('.brand').css('height', '100%');
  } else {
    $('.carousel > li > i.fa').removeClass('fa-3x').addClass('fa-4x')
    $('.nav-items').css('right', '0');
    $('.content').css('marginTop', navHeight);
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

//---------- Carousel--------------------

//slider for carousel
function slide(dir) {
  let active_index = $('.active-img').index();
  let new_index;
  if (dir == 'right') {
    new_index = active_index + 1;
    if (new_index == $('.carousel').children('li').length - 1) {
      new_index = 0;
    };
  } else if (dir == 'left') {
    new_index = active_index - 1;
    if (new_index == 0) {
      new_index = $('.carousel').children('li').length - 1;
    };
  };
  slideTo(new_index);
};

function slideTo(index) {
  switchIndicator(index);
  $('.active-img').fadeOut(carouselFade, function() {
    $('.active-img').removeClass('active-img');
    let new_active = $('.carousel').children().get(index);
    $(new_active).addClass('active-img').hide();
    $(new_active).fadeIn(carouselFade);
  });
};

function switchIndicator(index) {
  $('.active-indicator i').removeClass('fa-circle').addClass('fa-circle-o');
  $('.active-indicator').removeClass('active-indicator');
  let new_active_indicator = $('.indicators').children().get(index);
  let indicator = $(new_active_indicator).children().get(0);
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
  if(screenWidth < medium) {
    calcNavWidth();
  };
};

function dropdown(element) {
  let clicked = $(element).parent().children('.dropdown');
  let clickedChildren = clicked.find('.dropdown');
  let siblings = clicked.parent().siblings().find('.dropdown');
  let mainDrop;
  if(screenWidth > medium) {
    mainDrop = 0;
  } else {
    mainDrop = dropSpeed;
  };
  siblings.slideUp(mainDrop);
  clicked.slideToggle(mainDrop, function() {
    clickedChildren.slideUp();
  });
};

//------------- Landing Page --------------
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

//------------------- Parallax --------------
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

//---------------- Navbar change on scroll ----------
function navChange(id, src, src2) {
  let scroll = $(window).scrollTop();
  if(scroll > 0) {
    $(id).prop('disabled', false);
    $('.brand img').attr('src', src2);
  } else {
    $(id).prop('disabled', true);
    $('.brand img').attr('src', src);
  };
};

//------------------- Navbar Active Switch -------------------
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

//------------- Fade when entering viewport ------------------
function fade() {
  $('.fade').each(function() {
    let top = $(window).scrollTop() + $(window).height();
    let offset = $(this).offset().top;
    if(top > (offset + 1)) {
      $(this).css('opacity', '1');
    };
  });
};

//---------- Disable Transitions -------------
function disableTransitions() {
  $('*').addClass('disabletransition');
  setTimeout(function () {
    $('*').removeClass('disabletransition');
  }, 1);
};

//---------------- On Ready ----------------
$(document).ready(function() {
  isMobile();
  dropClose();
  resize();
  logoMove();
  landing();
  parallax();
  active();
  fade();
  $('.overlay').hide();

  $('.item-dropdown > a, .subitem > a').click(function() {
    dropdown(this);
  });

  window.addEventListener('orientationchange', function() {}, false);
  $(window).on('orientationchange', function() {
    screenWidth = window.innerWidth;
    resize();
    logoMove();
    landing();
    dropClose();
  });

  $(window).resize(function() {
    screenWidth = window.innerWidth;
    resize();
    logoMove();
    landing();
    dropClose();
    disableTransitions();
  });
  if (screenWidth < medium) {
    calcNavWidth();
  }

  //Clicking on burger function
  $('.burger').click(function() {
    disableButton($('.close'), 600);
    disableButton($('.burger'), 600);
    disableButton($('.overlay'), 600);
    navOpen();
  });

  //Close burger navbar function
  $('.close').click(function() {
    disableButton($('.burger'), 600);
    disableButton($('.close'), 600);
    disableButton($('.overlay'), 600);
    dropClose();
    navClose();
  });

  //Close by clicking Overlay
  $('.overlay').click(function() {
    disableButton($('.close'), 600);
    disableButton($('.burger'), 600);
    disableButton($('.overlay'), 600);
    dropClose();
    navClose();
  });

  //Indicator for Carousel
  $('.indicator').click(function() {
    let index = $(this).index();
    slideTo(index);
  });

  //Navbar Slides up or down on scroll
  $(window).scroll(function() {
    prev = hideNavbar(prev);
    parallax();
    fade();
  });

  //Carousel Slider interval
  setInterval(function(){
    slide(carouselDirection);
  }, carouselInterval);

  $('.item-dropdown > a').keydown(function(event){
    console.log(this);
    let keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      dropdown(this);
    }
  });

});
