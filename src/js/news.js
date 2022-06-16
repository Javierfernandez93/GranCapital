$(document).ready(function(){
  let news = new News;

  function sendPushToUsers(package,percentaje,element,users,title,body,click_action,file) {
    let i = 1;

    users.forEach((user,key)=>{
        news.sendPushNew((response)=>{
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
    
    news.sendPushNew((response)=>{
      if(response.s == 1) {

        $("#progressbar-"+package).css({'width':  '100%'});
        
        $(element).html("Listo").removeClass("btn-danger").addClass("btn-success");
      }
    },{title:title,body:body,click_action:click_action,file:file,tokens:users});
  }

  window.sendPackage = function(element,package,package_start,package_end,title,body,click_action,file) {
    $(element).html("Espere...").attr("disabled",true).removeClass("btn-success").addClass("btn-danger");
    let quickly = $("#quickly-"+package).is(':checked');

    news.getUsersByRange((response)=>{
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

  window.saveNew = function(element) {
    
    $.each($("input[type=file]"),(k,input)=>{
      let data = new FormData();
      let files = input.files;

      if(files.length) {
        $.each(files, (key, value)=>{
            data.append(key, value);
            data.append("title",$("#title").val());
            data.append("push",$("#push").is(':checked'));
            data.append("test",$("#test").is(':checked'));
            data.append("publicate",$("#publicate").is(':checked'));
            data.append("package_per_users",$("#package_per_users").val());
            data.append("packages",$("#packages").is(':checked'));
            data.append("body",$("#body").val());
            data.append("video",$("#video").val());
            data.append("message",$("#message").val());
        });

        news.saveNew((response)=>{
          if(response.s == 1) {
            $(".box-push-sending").html(response.html);

            // $(".box-push-sending").removeClass("hide");

            // $(".item-users").html(response.users.length);

            // response.users.forEach((user,key)=>{
            //   news.sendPushNew((response)=>{
            //     if(response.s == 1) {
            //       $(".item-push-send").html(parseInt($(".item-push-send").html())+1);
            //     }
            //   },{
            //     message_per_user_id:response.message_per_user_id,
            //     title:response.title,
            //     body:response.body,
            //     click_action:response.click_action,
            //     file:response.file,
            //     user_token:user.token
            //   });
            // })

            // window.location.href = '../../apps/news/';
          }
        },data);
      }
    });
  };

  window.sendNotification = function(message_per_user_id) {
    news.sendNotification((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{message_per_user_id:message_per_user_id});
  };
 window.deleteNews = function(message_per_user_id) {
    news.deleteNews((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{message_per_user_id:message_per_user_id});
  };

  window.setPin = function(message_per_user_id,ctr=false) {
    news.setPin((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{message_per_user_id:message_per_user_id,ctr:ctr});
  }
});

class News extends Http {
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
  saveNew(callback,data){
    return this.callFile('../../app/application/save_new.php',data,callback,false);
  }
  deleteNews(callback,data){
    return this.call('../../app/application/delete_news.php',data,callback,false);
  }
  setPin(callback,data){
    return this.call('../../app/application/set_pin.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
}