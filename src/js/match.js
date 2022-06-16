$(document).ready(function(){
  let match = new Match;
  let channels = new Channels;

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

  $('#channel').keyup(delay(function (e) {
    findChannel();
  }, 300));

  function findChannel(element){
    if($("#name").val()!=""){
       channels.findChannel((response)=>{
        if(response.s == 1) {
          $(".box-channels-list").html(response.html);
        }
      },{channel:$("#channel").val()});
    }  
  }

  window.selectChannel = function(catalog_channel_id){
    $(".box-channels-list").html("");
    channels.setCatalogChannelId(catalog_channel_id);
  };

  window.findChannel = function(element){
    findbyuser(element);
  };

  function sendPushToUsers(package,percentaje,element,users,title,body,click_action,file) {
    let i = 1;

    users.forEach((user,key)=>{
        match.sendPushNew((response)=>{
          if(response.s == 1) {
            let real_percentaje = i * percentaje;

            $("#progressbar-"+package).css({'width':  real_percentaje+'%'});
            
            if(i == count_users) $(element).html("Listo").removeClass("btn-danger").addClass("btn-success");

            i++;
          }
        },{title:title,body:body,click_action:click_action,file:file,user_token:user.token});
      });
  }

  function sendPushToUsersQuickly(package,percentaje,element,users,title,body,click_action,file) {
    
    match.sendPushNew((response)=>{
      if(response.s == 1) {

        $("#progressbar-"+package).css({'width':  '100%'});
        
        $(element).html("Listo").removeClass("btn-danger").addClass("btn-success");
      }
    },{title:title,body:body,click_action:click_action,file:file,tokens:users});
  }
    
  window.sendPackage = function(element,package,package_start,package_end,title,body,click_action,file) {
    $(element).html("Espere...").attr("disabled",true).removeClass("btn-success").addClass("btn-danger");
    let quickly = $("#quickly-"+package).is(':checked');

    match.getUsersByRange((response)=>{
      if(response.s == 1)
      {
        let percentaje = response.percentaje;
        let count_users = response.users.length;

        if(quickly)
        {
          sendPushToUsersQuickly(package,percentaje,element,response.users,title,body,click_action,file);
        } else {
          sendPushToUsers(package,percentaje,element,response.users,title,body,click_action,file);
        }
      }
    },{quickly:quickly,package_start:package_start,package_end:package_end});
  };

  window.togglePackages = function() {
    if($(".box-packages").hasClass("hide"))
    {
      $(".box-packages").removeClass("hide");
    } else {
      $(".box-packages").addClass("hide");
    }
  };

  window.addContet = function() {
    let title = $("#title").val();
    let body = $("#body").val();
    $("#message").html(title+" - "+body);
  };

  $("body").on("click","#upload-image",function(){
    $("#"+$(this).data("image")).click();
  });

  $('body').on('change',".input-image",function(){
    let _this = this;

    readMultipleFiles(this.files).then((images)=>{
      for (var i = 0; i < images.length; i++) {
        let div = $("<div/>",{
          class:"col-md-6 mt-4"
        });

        let img = $("<img/>",{
          src:images[i],
        }).css({"width":"100%"});

        div.append(img);
        
        $(".box-images").append(div);
      }
    }).catch((err)=>{
        console.error("Well that sucks:", err);
    });
    
    var file = _this.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      $("[data-image='"+$(_this).attr("id")+"']").attr("src",reader.result);
    };
    
    reader.readAsDataURL(_this.files[0]);
  });


  function readMultipleFiles(files){
    var results = [];
    
    var promises = Array.from(files, function(file){
      return readFile(file)
      .then(function(data){
          results.push(data);
          // Implicitely return undefined. Data is already in results
      });
    });
    
    return Promise.all(promises)
    .then(function(_){ // Don't care about the array of undefineds
        return results;
    });
  }

  function readFile(file){
    return new Promise(function(resolve, reject){
      var reader = new FileReader();
      reader.onloadended = function(){
        resolve(reader.result);
      };
      reader.onload = function(evt){
        resolve(evt.target.result);
      };
      reader.onerror = function(err) {
        reject(err);
      };
      reader.readAsDataURL(file);
    });
  }

  window.saveGameLive = function(element) {
    if($("#home_id :selected").val() && $("#visitor_id :selected").val() && $("#league_id :selected").val() && ($("#home_id :selected").val() != $("#visitor_id :selected").val())) {
      $(element).html("Guardando partido...");
      match.saveGameLive((response)=>{
        if(response.s == 1)
        {
          if($('#save_streaming').is(':checked'))
          {
            $(element).html("Guardando streaming...");
            match.saveStreamingPerGameLive((response)=>{
              if(response.s == 1)
              {
                if($('#send_push').is(':checked'))
                {
                  saveNew();
                }
              }
            },{catalog_channel_id:channels.getCatalogChannelId(),auto_cancel:$('#auto_cancel').is(':checked'),game_live_id:response.game_live_id,catalog_server_id:$("#catalog_server_id :selected").val()});
      
            // $(element).html("Listo").attr("disabled",true);
          }
        }
      },{programated_date:$("#programated_date").val(),actual_game_day:$("#actual_game_day").val(),home_catalog_team_id:$("#home_id :selected").val(),visitor_catalog_team_id:$("#visitor_id :selected").val(),catalog_league_id:$("#league_id :selected").val()});
    }
  };

  function saveNew() {
    let title =  $("#league_id :selected").text() + " - "+ $("#home_id :selected").text() + " vs " + $("#visitor_id :selected").text();
    let body = "Ve este partido en vivo por Fut Experto";
    let message = title + " - " + body;
    
    $.each($("input[type=file]"),(k,input)=>{
      let data = new FormData();
      let files = input.files;

      if(files.length) {
        $.each(files, (key, value)=>{
            data.append(key, value);
            data.append("title",title);
            data.append("push",true);
            data.append("packages",$("#packages").is(':checked'));
            data.append("package_per_users",$("#package_per_users").val());
            data.append("publicate",$("#publicate").is(':checked'));
            data.append("test",false);
            data.append("body",body);
            data.append("message",message);
        });

        match.saveNew((response)=>{
          if(response.s == 1) {
            $(".box-push-sending").html(response.html);
            // $(".box-push-sending").removeClass("hide");

            // $(".item-users").html(response.users.length);

            // response.users.forEach((user,key)=>{
            //   match.sendPushNew((response)=>{
            //     if(response.s == 1) {
            //       $(".item-push-send").html(parseInt($(".item-push-send").html())+1);
            //     }
            //   },{
            //     title:response.title,
            //     body:response.body,
            //     click_action:response.click_action,
            //     file:response.file,
            //     user_token:user.token
            //   });
            // });

            // window.location.href = '../../apps/news/';
          }
        },data);
      }
    });
  }


  window.sendNotification = function(message_per_user_id) {
    match.sendNotification((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{message_per_user_id:message_per_user_id});
  }

});

class Match extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  getUsersByRange(callback,data){
    return this.call('../../app/application/get_users_by_range.php',data,callback,false);
  }
  sendPushNew(callback,data){
    return this.call('../../app/application/send_push_new.php',data,callback,false);
  }
  sendNotification(callback,data){
    return this.call('../../app/application/send_notification.php',data,callback,false);
  }
  saveGameLive(callback,data){
    return this.call('../../app/application/save_game_live.php',data,callback,false);
  }
  saveStreamingPerGameLive(callback,data){
    return this.call('../../app/application/save_streaming_per_game_live.php',data,callback,false);
  }
  saveNew(callback,data){
    return this.callFile('../../app/application/save_new.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
}

class Channels extends Http {
  constructor()
  {
    super();
    this.catalog_channel_id = false;
    this.options = {};
  }
  getCatalogChannelId(){
    return this.catalog_channel_id;
  }
  setCatalogChannelId(catalog_channel_id){
    this.catalog_channel_id = catalog_channel_id;
  }
  findChannel(callback,data){
    return this.call('../../app/application/find_channel.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
}
