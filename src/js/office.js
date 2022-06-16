$(document).ready(function(){
    let buy = new Buy;

    $('[data-toggle="tooltip"]').tooltip();   

    window.showFullReference = function(full_reference = false) {
        showNormalAlert(full_reference);
    }

    

    window.registerBuyTransactionPayU = function(buy_per_user_login_id = false) {
        if(buy_per_user_login_id)
        {
            let alert = alertCtrl.create({
              title: translate("Agregue el número de transacción de su compra PayU"),
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe el número de transacción PayU')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {
                        if(data.payment_reference == "" ){                        
                            showNormalAlert("Ingresa la referencia de pago.");                          
                        } else {
                            Loader.showLoader();
                            
                            buy.registerPaymentTransaction((response)=>{
                                Loader.closeLoader();
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);

                                },{buy_id:buy_per_user_login_id,payment_reference:data['payment_reference']}
                            );
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }

    window.registerBuyTransactionAirtm = function(buy_per_user_login_id = false) {
        if(buy_per_user_login_id)
        {
            let alert = alertCtrl.create({
              title: translate("Agregue el número de transacción de su compra Airtm"),
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe el número de transacción Airtm')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {
                        if(data.payment_reference == "" ){                        
                            showNormalAlert("Ingresa la referencia de pago.");                          
                        } else {
                            Loader.showLoader();
                            buy.registerPaymentTransaction((response)=>{
                                Loader.closeLoader();
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);

                                },{buy_id:buy_per_user_login_id,payment_reference:data['payment_reference']}
                            );
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }

    window.registerBuyTransactionCapitalika = function(buy_per_user_login_id = false) {
        if(buy_per_user_login_id)
        {
            let alert = alertCtrl.create({
              title: translate("Agregue el hash de transacción de su compra Capitalika (TXID)"),
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe el hash de transacción Capitalika')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {
                        if(data.payment_reference == ""){                        
                            showNormalAlert("Ingresa la referencia de pago.");                          
                        } else {
                            Loader.showLoader();
                            buy.registerPaymentTransaction((response)=>{
                              Loader.closeLoader();
                              if(response.s == 1)
                              {
                                alertmesage(response.r);
                              } else {
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);
                              }
                            },{buy_id:buy_per_user_login_id,payment_reference:data['payment_reference']});
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }

    window.registerBuyTransactionLocalBitcoins = function(buy_per_user_login_id = false) {
        if(buy_per_user_login_id)
        {
            let alert = alertCtrl.create({
              title: translate("Agregue el hash de transacción de su compra LocalBitcoin (TXID)"),
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe el hash de transacción LocalBitcoin')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {
                        if(data.payment_reference == ""){                        
                            showNormalAlert("Ingresa la referencia de pago.");                          
                        } else {
                            Loader.showLoader();
                            buy.registerPaymentTransaction((response)=>{
                              Loader.closeLoader();
                              if(response.s == 1)
                              {
                                alertmesage(response.r);
                              } else {
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);
                              }
                          },{buy_id:buy_per_user_login_id,payment_reference:data['payment_reference']});
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }

    window.registerBuyTransactionBitso = function(buy_per_user_login_id = false) {
        if(buy_per_user_login_id)
        {
            let alert = alertCtrl.create({
              title: translate("Agregue el hash de transacción de su compra Bitso (TXID)"),
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe el hash de transacción Bitso')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {
                        if(data.payment_reference == ""){                        
                          showNormalAlert("Ingresa la referencia de pago.");                          
                        } else {
                          Loader.showLoader();
                          buy.registerPaymentTransaction((response)=>{
                            Loader.closeLoader();
                            if(response.s == 1)
                            {
                              alertmesage(response.r);
                            } else {
                              alertmesage(response.r);
                              setTimeout('document.location.reload()',2500);
                            }
                          },{buy_id:buy_per_user_login_id,payment_reference:data['payment_reference']});
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }

    window.NewMessage=function(buy_per_user_login_id=false){
        if(buy_per_user_login_id){
            let alert = alertCtrl.create({
              title: translate("Agregue sus datos para registrar la compra número")+buy_per_user_login_id,
              subTitle: translate("Ingrese los datos correspondientes para validar la compra"),
              inputs: [
                {
                  type: 'date',
                  name: 'user_date'

                },
                {
                  type: 'text',
                  name: 'pay_referens',
                  placeholder: translate('Escribe la referencia de Pago')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {

                        if(data["user_date"]== "" ){
                            showNormalAlert("Ingresa la fecha de pago.");
                        }else if(data.pay_referens == "" ){                        
                            showNormalAlert("Ingresa la referencia de pago.");                          
                        }else{
                            Loader.showLoader();
                            buy.registerPaymentDate((response)=>{
                                
                                Loader.closeLoader();
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);

                                },{buy_id:buy_per_user_login_id,payment_date:data['user_date'],refrencia:data['pay_referens']}
                            );
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }
    }
    
    function showNormalAlert(message=false){
        if(message){
            alert(message);
        }
    }

    window.registrateShared=function(buy_per_user_login_id=false){
        let buy= new Buy;
        if(buy_per_user_login_id){
            title=translate("Agregue los datos para registrar la compra numero")+" "+buy_per_user_login_id;
            let alert = alertCtrl.create({
              title: title,
              subTitle: translate("Ingrese los datos correspondientes para valida la compra"),
              inputs: [
                {
                  type: 'date',
                  name: 'payment_date'

                },
                {
                  type: 'text',
                  name: 'payment_reference',
                  placeholder: translate('Escribe la Referencia de Pago')
                } 
              ],
              buttons: [
                { 
                    text: translate("Cancelar"),
                    role: 'cancel', 
                    handler: data => { },
                    
                },{                
                    text: translate("Registrar"),
                    role: 'cancel', 
                    handler: data => {

                        if(data.buy_shared_date== "" ){
                            showNormalAlert("Ingresa la fecha de pago");
                        }else if(data.payment_reference == "" ){                        
                            showNormalAlert("Ingresa la referencia de pago");                          
                        }else{                            
                            Loader.showLoader();
                            buy.registerBuyShared((response)=>{                                
                                Loader.closeLoader();
                                alertmesage(response.m);
                                setTimeout('document.location.reload()',2500);                               
                                },{buy_per_user_login_id:buy_per_user_login_id,payment_date:data['payment_date'],payment_reference:data['payment_reference']}
                            );
                        }
                    },
                },
              ]
            });
            alertCtrl.present(alert.modal);
        }        
    }



    window.deleteShared=function(buy_per_user_login_id,send_with_order){

        let add_message =""
        let buy= new Buy;

        if(buy_per_user_login_id){
            add_message= (buy_per_user_login_id==send_with_order) ? "<h3 style='color:black;'>Al eliminar esta compra principal se cancelaran todos los pedidos </h3>" : "Esta acción no puede ser desecha";

            title=translate("¿Estas seguro de eliminar la compra numero")+" "+buy_per_user_login_id+"?";
            let alert = alertCtrl.create({
              title: title,
              subTitle: add_message,
              buttons: [
                    {
                        text:translate("NO"),
                        role:'cancel',
                        handler: data => {}, 
                    },             
                    { 
                        text: translate("SI"),
                        role: 'cancel', 
                        handler: data => {
                            Loader.showLoader();
                            buy.deleteBuyShared((response)=>{

                                    Loader.closeLoader();
                                    alertmesage(response.m);
                                    setTimeout('document.location.reload()',2500);

                                },{buy_per_user_login_id:buy_per_user_login_id,send_with_order:send_with_order}
                            );
                        }, 
                    },
              ]
            });
            alertCtrl.present(alert.modal);
        }            
    }   


   window.getInformationByBuy = function(buy_per_user_login_id)
   {
        if(buy_per_user_login_id)
        {
           popupOpenClose($(".popup"),buy_per_user_login_id);
        }
    } 
    

     window.closePopup=function(){
    if ($(".popup").is(':visible')) {
      $(".popup").hide();
    }
  } 
 
});

$(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();

function deletebuy(buy_per_user_login_id=false,products=false){
    let buy= new Buy;
    if(buy_per_user_login_id){
        title=translate("¿Estas seguro de eliminar la compra numero")+" "+buy_per_user_login_id+"?";
        let alert = alertCtrl.create({
          title: title,
          subTitle: products,
          buttons: [
                {
                    text:translate("NO"),
                    role:'cancel',
                    handler: data => {

                    
                    }, 
                },             
                { 
                    text: translate("SI"),
                    role: 'cancel', 
                    handler: data => {
                        Loader.showLoader();
                        buy.deleteBuy((response)=>{                                    
                                Loader.closeLoader();
                                alertmesage(response.r);
                                setTimeout('document.location.reload()',2500);
                            },{buy_id:buy_per_user_login_id}
                        );                        
                    }, 
                },
          ]
        });
        alertCtrl.present(alert.modal);
    }
   
}

function popupOpenClose(popup,sponsor_id,coordenadas) {
  let buy = new Buy;
  Loader.showLoader(false);
  buy.getInformationByBuy((response)=>{
    if(response.s == 1){
        let alert = alertCtrl.create({
          title: "Información de la compra", 
          size : 'modal-lg',
          subTitle: response.html,
          buttons: [
            { 
                text: translate("Cerrar"),
                role: 'cancel', 
                handler: data => {
                  alert.modal.dismiss();
                }              
            },
          ]
        });

        alertCtrl.present(alert.modal);  
        Loader.closeLoader();
    } else {
      alertmesage(response.r);
    }
  },{sponsor_id:sponsor_id});

  /* Close popup if user clicks on background */
  $(popup).click(function(e) {
    if ( e.target == this ) {
      if ($(popup).is(':visible')) {
        $(popup).hide();
      }
    }
  
  });
}

class Buy extends Http{  
  registerPaymentDate(callback,data){
      return this.call("../../apps/backoffice/subcore/application/registerPaymentDate.php",data,callback,false);
  }
  registerPaymentTransaction(callback,data){
      return this.call("../../apps/backoffice/subcore/application/register_payment_transaction.php",data,callback,false);
  }
  registerBuyShared(callback,data){
      return this.call("../../apps/backoffice/subcore/application/register_buy_shared_per_user_login_id.php",data,callback,false);
  }
  deleteBuy(callback,data){
      return this.call("../../apps/backoffice/subcore/application/deletebuy.php",data,callback,false);
  }
  deleteBuyShared(callback,data){
      return this.call("../../apps/backoffice/subcore/application/delete_buy_shared_per_user_login_id.php",data,callback,false);
  }
  getInformationByBuy(callback,data){
      return this.call("../../apps/backoffice/subcore/application/get_information_by_buy.php",data,callback,false);
  }
}