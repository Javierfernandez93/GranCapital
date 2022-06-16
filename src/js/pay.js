$(document).ready(function(){
  let pay = new Pay;

  function anim()
  {
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('bm-1'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '../../src/files/json/done-cool.json'
    });
  }
  
  window.payPendingMoneyWalletWeb = function(element) {
    $("#alert").addClass("d-none");
    $(element).attr("disabled",true).text("Espere...");

    alertPinCode(element,(success)=>{
      if(success == true)
      {
        pay.payPendingMoneyWalletWeb((response)=>{
          
          if (response.s == 1) {
            $("#payment").addClass("d-none");
            $("#done").removeClass("d-none");
            anim();
            $(element).html("¡Listo la factura ha sido pagada!");
          } else if(response.r == "SAME_ADDRESS") {
            alertDanger("Estás tratando de enviar dinero a tu dirección.");
          } else if(response.r == "NOT_WALLET_FOUNDS") {
            alertDanger("No tienes fondos suficientes.");
          } else {
            alertDanger("Hubo un error.");
          }
          
          $(element).removeAttr("disabled");

        },{token:getParam("token")});
      } else {
        $(element).removeAttr("disabled").text("Pagar factura ahora");
      }
    });
  }

  function alertPinCode(element,callback)
  {
    let alert = alertCtrl.create({
      title: "Pagar factura pendiente", 
      size: 'model-md',
      // subTitle: 'Ingresa tu código Pin',
        inputs: [
          {
            label: 'Ingresa tu código Pin',
            type: 'password',
            name: 'pin',
            min: 0,
            maxLenght: 4,
            placeholder: 'Código de 4 dígitos'
          },
        ],
        buttons: [
        { 
          class: 'btn-primary',
          text: "Aceptar y pagar con talentos", 
          handler: data => { 
            $(element).text("Verificando PIN espere...");

            pay.checkPin((response)=>{
              if(response.s == 1)
              {
                $(element).text("PIN válido");
                pay.setPin(data.pin);
                
                if(callback != undefined) callback(true);
              } else {
                alertDanger("El PIN es incorrecto");
              }
              
              if(callback != undefined) callback(false);
            },{pin:data.pin});
          } 
        },
        { 
          text: "Cancelar", 
          role: 'cancel', 
          handler: data => { 
            if(callback != undefined) callback(false);
          } 
        },
      ]
    });

    alertCtrl.present(alert.modal);  
  }
});

class Pay extends Http {
  constructor()
  {
    super();
    this.pin = false;
  }
  getPin() {
    return this.pin;
  }
  setPin(pin) {
    this.pin = pin;
  }
  payPendingMoneyWalletWeb(callback,data) {
    return this.call("../../app/application/pay_pending_money_wallet_web.php",data,callback);
  }
  checkPin(callback,data){
    return this.call("../../app/application/check_pin.php",data,callback);
  }
};