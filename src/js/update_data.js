$(document).ready(function(){
  let update = new Update;
  
  window.changeNotification = function(element,catalog_notification_id)
  {
    console.log($(element));

    update.changeNotification((response)=>{
      if(response.s == 1)
      {
        
      }
    },{value:$(element).is(':checked'),catalog_notification_id:catalog_notification_id});
  }

  window.selectImageFile = function()
  {
    $("#uploadFile").click();
  }

  $("#uploadFile").on('change',()=>{
    $("#uploadSubmit").removeAttr("disabled").removeClass("d-none");
    $("#text-image").text("Imagen seleccionada");
  });

  $('#uploadImage').submit(function(event){
    if($('#uploadFile').val())
    {
      $("#uploadSubmit").text("Subiendo, espere...");
      $(".progress").removeClass("d-none");
      
      event.preventDefault();

      $('#loader-icon').show();
      $('#targetLayer').hide();

      $(this).ajaxSubmit({
        target: '#targetLayer',
        dataType : "json",
        beforeSubmit:function(){
          $('.progress-bar').width('0%');
        },
        uploadProgress: function(event, position, total, percentageComplete)
        {
          $(".progress-bar").animate({
              width: percentageComplete+'%'
          },{duration: 0});

          if(percentageComplete == 100)
          {

          }
        },
        success: function(data, textStatus, jqXHR) 
        {
          if(data.s == 1)
          {
            $("#uploadSubmit").addClass("d-none")
            $("#text-image").text("Imagen de perfil actualizada correctamente");
            $('.box-user-upload-picture').css('background-image','url('+data.target_path+')');
          }
        },
        resetForm: true
      });
    }
    return false;
  });

  $('#myTab a[href="#profile"]').tab('show') // Select tab by name
  $('#myTab li:first-child a').tab('show') // Select first tab
  $('#myTab li:last-child a').tab('show') // Select last tab
  $('#myTab li:nth-child(3) a').tab('show')

  $('#tabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  window.UpdateUser=function(data_update){
    errors=0;
    // $("body :input").each(function(){
      
    //   if($(this).data("field")==true){            
    //     if(!verifyall($(this),$(this).data("type"),$(this).data("minlength"),$(this).data("message"))){
    //       errors++;
    //       return false;         
    //     }
    //   }


    // });

    if(errors==0){
      var data={
          "user_address":{
            "street":$("#street").val(),
            "colony":$("#colony").val(),
            "zip_code":$("#zip_code").val(),
            "city":$("#city").val(),
            "state":$("#state").val(),
            "country_id":$("#country_id").val()
          },
          "user_address_alternative":{
            "street":$("#alternative_street").val(),
            "colony":$("#alternative_colony").val(),
            "zip_code":$("#alternative_zip_code").val(),
            "city":$("#alternative_city").val(),
            "state":$("#alternative_state").val(),
            "country_id":$("#alternative_country_id").val()
          },
          "user_contact":{
            "telephone":$("#phone").val(),
            "cellular":$("#cellular").val(),
          },
          "user_account":{
            "colocation_id":$("#colocation_id").val(),
            "sponsor_id":$("#sponsor_id").val(),
          },
          "user_bank":{
            "bitso":$("#bitso").val(),
            "capitalika":$("#capitalika").val(),
            "edenred":$("#edenred").val(),
            "localbitcoin":$("#localbitcoin").val(),
            "paypal":$("#paypal").val(),
            "airtm":$("#airtm").val(),
            "account":$("#account").val(),
            "clabe":$("#clabe").val(),
            "bank":$("#bank").val(),
          },
          "user_data":{
            "names": ($("#names")) ? $("#names").val() : "",
            "second_last_name": ($("#second_last_name")) ? $("#second_last_name").val() : "",
            "last_name": ($("#last_name")) ? $("#last_name").val() : "",
            "last_name": ($("#last_name")) ? $("#last_name").val() : "",
            "beneficiary": ($("#beneficiary")) ? $("#beneficiary").val() : "",
            "id_number": ($("#id_number") != null) ? $("#id_number").val() : "",
          },            
          data_update: data_update,
      }

        
      Loader.showLoader();
      update.updateUser((response)=>{
        Loader.closeLoader();
        if(response.s=="1"){
          alertmesage(response.r);
        }else{
          alertmesage(response.r);  
        }
      },{data:data});
    }

  }

$("#clabe").focusout(function(event) {
  event.preventDefault();
  let this_ =$("#clabe");
  if(this_.val()!=''){
    if(verifyall(this_,this_.data("type"),this_.data("minlength"),this_.data("message"))){
      Loader.showLoader();
      update.verifyClabe((response)=>{
        Loader.closeLoader();
        if(response.s=='0'){
          alertmesage(response.m);
          this_.val("").addClass("inputError");        
        }
      },{clabe:this_.val()});
    }
    
  }
});
window.ctrlview=function(val){
  if(val==1){
      

  }else if(val==2){

  }else if(val==3){

  }else if(val==4){

  }

}
window.foundReport=function(){
  var mes  = $("#mes").val();
  var year = $("#year").val();
  if(mes == 0){
    alertmesage("Selecciona el Mes!");
  }else if(year == 0){
    alertmesage("Selecciona el Año !");
  }else{
    Loader.showLoader();
    update.foundCommisionPerMonth((response)=>{
      Loader.closeLoader();
      if(response.s=="1"){
        Loader.showLoader();
        update.createReportCommisionPerMonth((response)=>{
          if(response.s=="1"){
            Loader.closeLoader();
            let message = translate('Reporte generado correctamente');
                message += '<a class="btn btn-primary" style="margin-bottom: 20px; margin-top: 13px; margin-left: 15%;" download href="../../pdf/files/' + response.file_location + '">'+translate('Descargar')+'</a>';
                message += '<a class="btn btn-primary" style="margin-bottom: 20px; margin-top: 13px; margin-left: 15%;" target="_blank" href="../../pdf/files/' + response.file_location + '">'+translate('Visualizar')+'</a>';            
            alertmesage(message);
          }else{
            alertmesage("Algo salio mal intenta de nuevo mas tarde");
          }
        },{data:response});
      }else{
        alertmesage(response.m);  
      }
    },{mes:mes,year:year}); 
  }
}


window.UpdatePassword=function(){
  if(!verifyall($("#current_password"),$("#current_password").data("type"),$("#current_password").data("minlength"),$("#current_password").data("message")))
    return false;
  else if(!verifyall($("#new_password"),$("#new_password").data("type"),$("#new_password").data("minlength"),$("#new_password").data("message")))
    return false;
  else if(!verifyall($("#confirm_new_password"),$("#confirm_new_password").data("type"),$("#confirm_new_password").data("minlength"),$("#confirm_new_password").data("message")))
    return false;
  else if($("#confirm_new_password").val() != $("#new_password").val()){
    alertmesage("Las contraseñas no coinciden");
    $("#confirm_new_password").val("").focus().addClass("inputError");
  }else{
    Loader.showLoader();
    update.UpdatePassword((response)=>{
      Loader.closeLoader();
      if(response.s=='1'){
        Loader.showLoader();
        update.loginUser((response)=>{
          Loader.closeLoader();
          if(response.s=='1'){
            alertmesage("CONTRASEÑA ACTUALIZADA");
            setTimeout('window.location.href="../backoffice/"',2000);      
          }
        },{email:response.email,password:response.password});
      }else{
        alertmesage(response.m);
        setTimeout('document.location.reload()',2000);      
        
      }

    },{current_password:$("#current_password").val(),password:$("#new_password").val(),confirm_password:$("#confirm_new_password").val()});
  }

}

window.saveUserEwallet=function(){
  if(!verifyall($("#ewallet_number"),$("#ewallet_number").data("type"),$("#ewallet_number").data("minlength"),$("#ewallet_number").data("message")))
    return false;
  else{
    Loader.showLoader();
    update.saveUserNumberEwallet((response)=>{
      Loader.closeLoader();
      if(response.s=='1'){
        alertmesage("Monedero Actualizado");
        setTimeout('document.location.reload()',2000);           
      }else{
        alertmesage(response.m);
      }
    },{ewallet_number:$("#ewallet_number").val()});
  }
}


window.updateCimiento=function(user_login_id,element){
  let alert = alertCtrl.create({
    title: "Agrega el ID de tu directo", 
    subTitle: '<p>Ingresa El ID de tu pilar.</p>',
    inputs: [
      {
        type: 'number',
        name: 'user_found',
        placeholder: 'Escribe El Id'
      },
    ],
    buttons: [
      { 
          text: "Buscar Usuario",
          handler: data => {
            let pilares= data['user_found'];
            Loader.showLoader();
            update.getPilars((response)=>{
              Loader.closeLoader();
              if(response.s==1){
                let alert = alertCtrl.create({
                  title: "Importante", 
                  subTitle: '<p>Estas Seguro de agregar  a <b>'+response.instanceName+'?</b>. como uno de tus Pilares</p>',     
                  buttons:[
                    { 
                      text: "Si", 
                      role: 'cancel',
                      handler: data => { 
                        Loader.showLoader();
                        update.savepilar((response)=>{
                          Loader.closeLoader();
                          if(response.s=="1"){
                            alertmesage(response.r);
                            setTimeout('document.location.reload()',2000);
                          }else{
                            alertmesage(response.r);
                          }

                        },{user_login_id:user_login_id,pilares:pilares});
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
              }else{
                alertmesage(response.m);
              }
            },{user_login_id:data['user_found']});
          }
      },
      {
        text: "Cancelar", 
        role: 'cancel', 
        handler: data => { 

        } 
      }
    ]

  });
  alertCtrl.present(alert.modal);
}

});

class Update extends Http{  
  updateUser(callback,data){
    return this.call("../../apps/backoffice/subcore/application/update_user.php",data,callback,false);
  }
  foundCommisionPerMonth(callback,data){
    return this.call("../../apps/backoffice/subcore/application/found_commision_per_month.php",data,callback,false);
  }
  createReportCommisionPerMonth(callback,data){
    return this.call("../../apps/pdf/create_report_commision_per_month.php",data,callback,false);
  }
  getPilars(callback,data){
    return this.call("../../apps/backoffice/subcore/application/get_first_level.php",data,callback,false);
  }
  savepilar(callback,data){
    return this.call("../../apps/backoffice/subcore/application/save_pilar.php",data,callback,false);
  }
  UpdatePassword(callback,data){
    return this.call("../../apps/backoffice/subcore/application/update_password.php",data,callback,false);
  }
  saveUserNumberEwallet(callback,data){
    return this.call("../../apps/backoffice/subcore/application/edit_user_ewallet.php",data,callback,false);
  }
  loginUser(callback,data){
    return this.call("../../apps/login/subcore/application/login_user.php",data,callback,false);
  }
  verifyClabe(callback,data){
    return this.call("../../apps/backoffice/subcore/application/verify_clabe.php",data,callback,false);
  }
  changeNotification(callback,data){
    return this.call("../../apps/backoffice/subcore/application/change_notification.php",data,callback,false);
  }
  
}