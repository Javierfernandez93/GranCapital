$(document).ready(function(){
    $(".nav-link").click(function(){
      $('html, body').animate({
        scrollTop: $("#main").offset().top-140
    }, 1000);
    });
});
