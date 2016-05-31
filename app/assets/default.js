 var module = {
  init: function () {
    this.scrollToTop();
    this.loadContent();
    this.parallax();
    this.responsive();
  },

  responsive: function (){
 
    var $window = $(window);
    var $pane = $('.video-wrap');

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize > 1400) {

            //if the window is greater than 1440px..
            $pane.addClass('bigscreen');
        } else{
          $('.bigscreen').removeClass('bigscreen');
        }
    }

    checkWidth();
    $(window).resize(checkWidth);
 
  

  },
 



  
  loadContent: function (){
    $('#header').load('components/nav-header.html', function(){

      module.slideMenuNavigation();
       
      function headerHiddenPannel (){
 
        $('.cta a').on('click', function (e){
          e.preventDefault();

            if ($(this).hasClass('Contact-form')) {

              var cloner = $('#clonethis').clone();
              $('.Contact-div').html(cloner);
              $('.Contact-div .close-form').addClass('header-close').removeClass('close-form');

              
                // if already selected
                if ($(this).hasClass('selected')) {
                  $('.Contact-div').removeClass('open');
                  $(this).removeClass('selected');
                }
                // if not already selected
                else {
                  // remove selected and open classes from all others
                  $('.cta a').removeClass('selected');
                  $('.section').removeClass('open');
                  // apply selected and open classes to this
                  $('.Contact-div').addClass('open');
                  $(this).addClass('selected');
                }

                $('.header-close').bind('click', function(e) {
                  e.preventDefault();
                  $('.Contact-div').removeClass('open');
                    
                  $('body').find('a.Contact-form.selected').removeClass('selected');
                });
            } 
            else if ($(this).hasClass('Search')) {
 
                if ($(this).hasClass('selected')) {
                  $('.Search-div').removeClass('open');
                  $(this).removeClass('selected');
                 }
                else {
                  $('.cta a').removeClass('selected');
                  $('.section').removeClass('open');
                  $('.Search-div').addClass('open');
                  $(this).addClass('selected');
                }
                $('.header-close').bind('click', function(e) {
                  e.preventDefault();
                  $('.Search-div').removeClass('open');
                    
                  $('body').find('a.Search.selected').removeClass('selected');
                });
            }
        });
  
      }
      headerHiddenPannel();

      if ($(window).width() <= 320) {


         $('a.Contact-form').click(function (){
          if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('html,body').animate({scrollTop: $('#contact-form').offset().top }, 800);
          }
          return false;
        });

      } 

    });

    $('#contact-form').load('contact-form.html', function(){
      module.accordianContactForm();
 
    });

    $('#footer').load('footer.html',function(){
      module.scrollToTop();
    });
  },

  scrollToTop: function (){

    var body = $("body,html");
    var scrollToTop = $("a.scrolltotop");

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
          //do something
        } else {
          //do something otherwise
        }
      });
      
    // scroll body to 0px on click
    scrollToTop.click(function () {
      body.animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  },

  whatwedoVideo: function (){

    if ($('#whatwedo').is(':visible')) {
      $('.video-content').on('click', function(){
      $('html,body').animate({scrollTop: $(this).offset().top -63 }, 800);
      
      $('video').get(0).play();

        $(this).parent().toggleClass('active');
             
 

      });
      $('video').bind('ended', function() {
         $('.active').removeClass('active');
         this.currentTime = 0;
         $('video')[0].loop = false;
         this.pause();
      });
 
    }
  },

  accordianContactForm: function (){

    var allPanels = $('form.form');
    var content = $(this).find('.form');
    var buttonH2 = $(this).find('.close-form');
    var buttonIcon = $(this).find('h2.contact');

    $('.close-form').on('click', function () {

        allPanels.slideUp();
        $(this).toggleClass('on');
        return false;
    });
    


    if ($('#home').is(':visible')) {
      $('h2.contact').removeClass('contact').addClass('contacthome');
    };
    if ($('#contact-us').is(':visible')) {
      $('h2.contact').removeClass('contact').addClass('contacthome');
    };

    $('h2.contact').on('click', function (){
      $('html,body').animate({scrollTop: $(this).offset().top -138 }, 800);
      allPanels.slideToggle();
      $('.close-form').toggleClass('on');
      $('.contact-container').toggleClass('toggled');
    });

  
      $('#home #form').css({
        display: 'block'
      });

       $('#contact-us #form').css({
        display: 'block'
      });
  },

  parallax: function (){
    $(window).bind('scroll', function (e) {
      parallaxScroll();
    });

    function parallaxScroll() {
      var scrolled = $(window).scrollTop();
        $('.theme > img').css('top', (0 - (scrolled * .2)) + 'px');
      }
  },

  slideMenuNavigation: function() {
  
    var $window = $(window);
    var $pane = $('#menu');

    function checkHeight() {
      var height = parseInt($("#menu").height());
        var windowsize = $window.height();
    
          $("#menu").height($(".navigation").height());
          
    }
    checkHeight();
    $(window).resize(checkHeight);
 
          
      $('#sidebar-toggle').on('click', function() {
 
        $(this).toggleClass('active');
        var toggle_el = $(this).data('toggle');
        $(toggle_el).toggleClass('open-sidebar');
        $('body').toggleClass('open-sidebar');


        if ($('.open-sidebar').is(':visible')) {
          $('.close-menu').bind('click', function () {
            $('body').removeClass('open-sidebar');
          });
        }
      });
  }

};

$(document).ready(function () {
  module.init();
});
 