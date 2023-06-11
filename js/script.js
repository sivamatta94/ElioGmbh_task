$(document).ready(function () {


    var HeadH = $('#header').outerHeight();
 

    var scrollWindow = function() {
        $(window).on('load scroll',function() {
            var navbar = $('#header');
          
            if ($(this).scrollTop() > 50) {
                if (!navbar.hasClass('is-sticky')) {
                    navbar.addClass('is-sticky');
                
                }
            }
         
            if ($(this).scrollTop() < 50) {
                if (navbar.hasClass('is-sticky')) {
                    navbar.removeClass('is-sticky');
                    $('body').css('padding-top', 0);
                }
            }
           
            if ($(this).scrollTop() > 40*2) {
                if (!navbar.hasClass('awake')) {
                    navbar.addClass('awake');
                }
            }
         
            if ($(this).scrollTop() < 40*2) {
                if (navbar.hasClass('awake')) {
                    navbar.removeClass('awake');
                }
            }
            
        });
    };
    scrollWindow();


    var btn = $('#top-button');

    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });
    
    btn.on('click', function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });

  
    $(".navbar-toggler").click(function () {
        $(this).toggleClass("menu-opened");
        $("#header .collapse:not(.show)").toggleClass("menu-show");
        $("body").toggleClass("scroll-off");
        $(".overlay").fadeToggle();
    });

    $(".overlay").click(function () {
        $(this).fadeToggle();
        $("#header .collapse:not(.show)").toggleClass("menu-show");
        $("body").toggleClass("scroll-off");
        $(".navbar-toggler").toggleClass("menu-opened");
    });


    $(window).on("resize", function (e) {
        checkScreenSize();
    });
    var logo = $(".navbar-brand img").attr("src");

    checkScreenSize();
    function checkScreenSize() {
        var newWindowWidth = $(window).width();
        if (newWindowWidth <= 991) {
            $("#header .collapse:not(.show)").find(".mobile_logo").remove();
            $("#header .collapse:not(.show)").append("<div class='mobile_logo'>" + "<img src=" + logo + " alt=''>" + "</div>");
        }
    }


    //Dashboard Menu
    $(function() {
          var $nav = $('nav.greedy');
          var $btn = $('nav.greedy button');
          var $vlinks = $('nav.greedy .links');
          var $hlinks = $('nav.greedy .hidden-links');

          var numOfItems = 0;
          var totalSpace = 0;
          var breakWidths = [];

          // Get initial state
          $vlinks.children().outerWidth(function(i, w) {
            totalSpace += w;
            numOfItems += 1;
            breakWidths.push(totalSpace);
          });

          var availableSpace, numOfVisibleItems, requiredSpace;

          function check() {

            // Get instant state
            availableSpace = $vlinks.width() - 10;
            numOfVisibleItems = $vlinks.children().length;
            requiredSpace = breakWidths[numOfVisibleItems - 1];

            // There is not enought space
            if (requiredSpace > availableSpace) {
              $vlinks.children().last().prependTo($hlinks);
              numOfVisibleItems -= 1;
              check();
              // There is more than enough space
            } else if (availableSpace > breakWidths[numOfVisibleItems]) {
              $hlinks.children().first().appendTo($vlinks);
              numOfVisibleItems += 1;
            }
            // Update the button accordingly
            $btn.attr("count", numOfItems - numOfVisibleItems);
            if (numOfVisibleItems === numOfItems) {
              $btn.addClass('hidden');
            } else $btn.removeClass('hidden');
          }

          // Window listeners
          $(window).resize(function() {
            check();
          });

          $btn.on('click', function() {
            $hlinks.toggleClass('hidden');
          });

          check();

        }); 
});