$(document).ready(function(){
  window.showVideo = function(title,video) {
    let alert = alertCtrl.create({
        title: title, 
        subTitle: '<video id="vid" width="100%" loop autoplay autobuffer controls muted><source type="video/mp4" src="'+video+'"></source></video>',
        buttons: [
          { 
              text: "Cerrar video", 
              role: 'cancel', 
              handler: data => { 
                
              } 
          },
        ],
        size: 'modal-lg'
    });

    alertCtrl.present(alert.modal); 
  }
  wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
  });
  wow.init();

    $('body').on('click','[data-link]',function(){
      var _this = $(this);
      $('nav ul a').removeClass('anclain-selected');
      $(_this).addClass('anclain-selected');
      setTimeout(function(){
       $('html, body').animate({ scrollTop: $("[data-anclain='"+$(_this).data('link')+"']").offset().top - $(_this).data('offset') } , $(_this).data('duration'));
      },$(_this).data('delay'));
    });
});
