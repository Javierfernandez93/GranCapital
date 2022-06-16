$(document).ready(function(){    
  (function(title,video){
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
  })("Bienvenido a Fut Experto","../../src/files/video/video.mp4");
});
