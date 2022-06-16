$(document).ready(function(){
  let streaming = new Streaming;
  var user_id = [];

  window.addAutoReplay = function(element,game_live_id) {
    $(element).html("Espere...");
    streaming.addReplay((response)=>{
      if(response.s == 1) {
        $(element).html("Listo");
        setTimeout(()=>{
          location.reload();
        },500);
      }
    },{game_live_id:game_live_id,replay:"http://www.s3.mtkcloud.club/video/resumes/"+game_live_id+".mp4"});
  }

  window.addReplay = function(game_live_id,game) {
    let alert = alertCtrl.create({
        title: "Añadir resumen para " + game + " ID " + game_live_id, 
        subTitle: 'Ingresa link del resumen',
          inputs: [
            {
              type: 'text',
              name: 'replay',
              placeholder: 'http:/....'
            },
          ],
          buttons: [
          { 
              text: "Guardar", 
              handler: data => { 
                streaming.addReplay((response)=>{
                  if(response.s == 1) {
                    location.reload();
                  }
                },{game_live_id:game_live_id,replay:data.replay});
              } 
          },
          { 
              text: "Cancelar", 
              role: 'cancel', 
              handler: data => { 
              } 
          },
        ]
    });

    alertCtrl.present(alert.modal);  
  }

  window.goLiveStreaming = function(streaming_per_game_live_id) {
    streaming.goLiveStreaming((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{streaming_per_game_live_id:streaming_per_game_live_id});
  }

  window.sendMessage = function(element,streaming_connection_id) {
    $(element).html("Enviado mensaje");
    streaming.sendMessage((response)=>{
      if(response.s == 1)
      {
        $(element).html("Mensaje enviado").removeClass("btn-primary").addClass("btn-success");
      }
    },{message:$("#message").val(),company_id_from:$("#company_id_from :selected").val(),streaming_connection_id:streaming_connection_id});
  }

  window.deleteStreaming = function(streaming_per_game_live_id) {
    streaming.deleteStreaming((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{streaming_per_game_live_id:streaming_per_game_live_id});
  }

  window.changeScore = function(game_live_id) {
    let alert = alertCtrl.create({
        title: "Cambiar el marcador para " + game_live_id, 
        subTitle: 'Ingresa el marcador',
          inputs: [
            {
              type: 'number',
              name: 'home_score',
              placeholder: '0'
            },
            {
              type: 'number',
              name: 'visitor_score',
              placeholder: '0'
            },
          ],
          buttons: [
          { 
              text: "Guardar", 
              handler: data => { 
                streaming.changeScore((response)=>{
                  if(response.s == 1)
                  {
                    location.reload();
                  }
                },{game_live_id:game_live_id,home_score:data.home_score,visitor_score:data.visitor_score});
              } 
          },
          { 
              text: "Cancelar", 
              role: 'cancel', 
              handler: data => { 
              } 
          },
        ]
    });

    alertCtrl.present(alert.modal);  

  }

  window.stopStreaming = function(streaming_per_game_live_id) {
    streaming.stopStreaming((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{streaming_per_game_live_id:streaming_per_game_live_id});
  }

  window.endStreaming = function(streaming_per_game_live_id) {
    streaming.endStreaming((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{streaming_per_game_live_id:streaming_per_game_live_id});
  }

  if($("#name").val()) findbyuser($("#name"));

  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  $('#name').keyup(delay(function (e) {
    findbyuser();
  }, 1000));

  function findbyuser(element){
    if($("#name").val()!=""){
       streaming.findByUser((response)=>{
        if(response.s == 1) {
          $("#response").html(response.html);
        } 
        else{
          
        }

      },{name:$("#name").val()});
    }  
  }

  window.findbyuser = function(element){
    findbyuser(element);
  }

  window.adduser = function(names,company_id,element){
   if(company_id){
       var user = $('<span/>', {
        'html': '<h5>'+names +'</h5>',
        'class': 'badge px-2 my-1 badge-primary mx-2',
        'id' : company_id
      });
       user_id[user_id.length]=company_id;
       $("#user").append(user);
     }  
   }

});

class Streaming extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  deleteStreaming(callback,data){
    return this.call('../../app/application/delete_streaming.php',data,callback,false);
  }
  sendMessage(callback,data){
    return this.call('../../app/application/send_message.php',data,callback,false);
  }
  goLiveStreaming(callback,data){
    return this.call('../../app/application/go_live_streaming.php',data,callback,false);
  }
  stopStreaming(callback,data){
    return this.call('../../app/application/stop_streaming.php',data,callback,false);
  } 
  addReplay(callback,data){
    return this.call('../../app/application/add_replay.php',data,callback,false);
  }
  endStreaming(callback,data){
    return this.call('../../app/application/end_streaming.php',data,callback,false);
  } 
  findByUser(callback,data){ 
    return this.call('../../app/application/find_user_by_quiz.php',data,callback,false);
  }
  changeScore(callback,data){
    return this.call('../../app/application/change_score.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};