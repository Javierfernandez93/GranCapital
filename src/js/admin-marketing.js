$(document).ready(function(){
  let marketing = new Marketing;

  window.deleteCampaing = function(marketing_email_id) {

    let alert = alertCtrl.create({
        title: "Aviso", 
        subTitle: '¿Estás seguro de eliminar esta campaña?',
          buttons: [
          { 
              text: "Sí, continuar", 
              handler: data => { 
                deleteCampaing(marketing_email_id);
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

  function deleteCampaing(marketing_email_id)
  {
    marketing.deleteCampaing((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }
    },{marketing_email_id:marketing_email_id});
  }

  window.sendCampaing = function(element) {
    marketing.sendCampaing((response)=>{
      if(response.s == 1)
      {
        $(".box-main-content").html(response.html);

        if(response.users_per_marketing_list) {
          response.users_per_marketing_list.forEach((user,key)=>{
            marketing.sendCampaingMail((response)=>{
              if(response.s == 1)
              {
                let email_sent = parseInt($(".number-marketing-send").html());
                $(".number-marketing-send").html(email_sent+1);
              }
            },{title:response.title,body:response.body,marketing_email_id:response.marketing_email_id,email:user.email});
          });
        }
      }
    },{marketing_template_id:$("#marketing_template_id").val(),marketing_list_id:$("#marketing_list_id").val(),title:$("#title").val(),body:$("#body").val()});
  }

  window.getList = function(element) {
    marketing.getList((response)=>{
      if(response.s == 1)
      {
        $(".box-content-list").html(response.html);
      }
    },{marketing_list_id:$("#marketing_list_id").val()});
  }

  window.getTemplate = function(element) {
    marketing.getTemplate((response)=>{
      if(response.s == 1)
      {
        $(".box-content-template").html(response.html);
      }
    },{marketing_template_id:$("#marketing_template_id").val()});
  }

  window.saveList = function(element) {
    marketing.saveList((response)=>{
      if(response.s == 1)
      {
        $(".box-content").html(response.html);
      }
    },{title:$("#title").val(),contacts:$("#contacts").val()});
  }

  window.saveTemplate = function(element) {
    marketing.saveTemplate((response)=>{
      if(response.s == 1)
      {
        $(".box-content").html(response.html);
      }
    },{title:$("#title").val(),body:$("#body").val()});
  }
});

class Marketing extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  getList(callback,data){
    return this.call('../../app/application/get_list.php',data,callback,false);
  } 
  sendCampaingMail(callback,data){
    return this.call('../../app/application/send_campaing_mail.php',data,callback,false);
  }
  sendCampaing(callback,data){
    return this.call('../../app/application/send_campaing.php',data,callback,false);
  }
  deleteCampaing(callback,data){
    return this.call('../../app/application/delete_campaing.php',data,callback,false);
  }
  getTemplate(callback,data){
    return this.call('../../app/application/get_template.php',data,callback,false);
  }
  saveList(callback,data){
    return this.call('../../app/application/save_list.php',data,callback,false);
  }
  saveTemplate(callback,data){
    return this.call('../../app/application/save_template.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};