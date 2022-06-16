$(document).ready(function(){
  consultings = new Consultings;

  window.makeQrFreeVideoconsulting = function(element) {
    $(element).text("Espere...");
    
    consultings.makeQrFreeVideoconsulting((response)=>{
      if(response.s == 1)
      {
        $(element).text("Listo");

        $("#qr-response").html(response.html);
      }
    });
  }

  window.addFreeConsultings = function(user_support_id) {
    if (!$("#quantity").val())
    {       
      alert = alertCtrl.create({
          title: "Aviso",
          subTitle: "Ingresa una cantidad", 
          buttons: [
            { 
                text: translate('Aceptar') ,
                role: 'cancel', 
                handler: data => {
                  alert.modal.dismiss();  
                }              
            },
          ]
        });

      alertCtrl.present(alert.modal);
        
    } else if($("#quantity").val() == 0 || $("#quantity").val() <= 0){
          alert = alertCtrl.create({
            title: "Aviso",
            subTitle: "Ingrese un valor mayor a 0", 
            buttons: [
              { 
                  text: translate('Aceptar') ,
                  role: 'cancel', 
                  handler: data => {
                    alert.modal.dismiss();  
                  }              
              },
            ]
          }); 

          alertCtrl.present(alert.modal);
        } else{
          consultings.getFreeConsultings((response)=>{
            if(response.s == 1)
            {
              location.reload();
            }
          },{user_support_id:user_support_id,quantity:$("#quantity").val()});     
        }
  }

});

class Consultings extends Http {
  getFreeConsultings(callback,data){
    return this.call('../../app/application/get_free_consultings.php',data,callback,false);
  }
  makeQrFreeVideoconsulting(callback,data){
    return this.call('../../app/application/make_qr_free_videoconsulting.php',data,callback,false);
  }
};