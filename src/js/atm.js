$(document).ready(function(){
  let atm = new Atm;
  
  atm.getEwalletAtm((response)=>{
    if(response.s == 1)
    {
      atm.setBalance(response.balance);
      $(".box-response").html(response.html);
    }
  });

  window.transferMoneyWalletWeb = function(element) {
    $(element).attr("disabled",true).html("Espere...")
    $("body .ewallet-container").html("");

    alertPinCode((success)=>{
      if(success == true)
      {
        atm.transferMoneyWalletWeb((response)=>{
          $(element).removeAttr("disabled");

          if (response.s == 1) {
            $(element).html("Listo");
            makeWallet();
            getEwalletTransactions(()=>{
              $(element).html("Enviar");
            },true);
            $("body .ewallet-container").html(response.html);
          } else if(response.r == "SAME_ADDRESS") {
            $(element).html("Enviar");
            $("body .transaction-info").html("Estás tratando de enviar dinero a tu dirección");
          } else if(response.r == "NOT_FOUNDS") {
            $(element).html("Enviar");
            $("body .transaction-info").html("No tienes fondos suficientes");
          } else {
            $(element).html("Enviar");
          }
        },{observation:$("body #observation").val(),address:$("body #address").val(),amount:$("body #amount").val()});
      } else {
        $(element).removeAttr("disabled").html("Enviar");
      }
    });
  }

  window.getMaxAmount = function() {
    $("body #amount").val(atm.getBalance());
  }

  window.checkWalletAddress = function(element) {
    if(atm.busy === false)
    {
      if(atm.getAddress() != false)
      {
        if(atm.getAddress() == $(element).val()) {
          return false;
        }
      }

      if(atm.hasValidLenghtAddress($(element).val()) === false) {
        return false;
      }

      $(element).addClass("input-address");
      $("body #verifying-address").removeClass("d-none");
      $("body #verifying-address span").html("Verificando dirección de e-Wallet...").removeClass("bg-success bg-danger text-white");
      $("body .box-wallet-info").html("");

      
      atm.checkWalletAddress((response)=>{
        atm.busy = true;
        atm.setAddress($(element).val());
        if (response.s == 1) {
          $(element).addClass("form-control-success");
          $("body .box-wallet-info").html(response.html);
          $("body #verifying-address span").html("Dirección válida").addClass("bg-success text-white");
          $("body #send-money").removeAttr("disabled");
        } else if(response.r == "INVALID_ADDRESS_NOT_FOUND") {
          $("body #verifying-address span").html("Dirección no válida").addClass("bg-danger text-white");
        } else if(response.r == "MINE_WALLET") {
          $("body #verifying-address span").html("La dirección ingresada es tuya.").addClass("bg-danger text-white");
        } else if(response.r == "INVALID_ADDRESS_WALLET_LENGHT") {
          $("body #verifying-address span").html("Dirección no válida").addClass("bg-danger text-white");
        }
        atm.busy = false;
      },{address:$(element).val()});
    }
  }

  function alertPinCode(callback)
  {
    let alert = alertCtrl.create({
      title: "Enviar fondos", 
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
          text: "Aceptar y envíar talentos", 
          handler: data => { 
            atm.checkPin((response)=>{
              if(response.s == 1)
              {
                atm.setPin(data.pin);
                if(callback != undefined) callback(true);
              }
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

class Atm extends Http {
  constructor()
  {
    super();
    this.ADDRESS_LENGHT = 25;
    this.balance = 0;
    this.busy = false;
    this.address = false;
    this.pin = false;
  }
  getPin() {
    return this.pin;
  }
  setPin(pin) {
    this.pin = pin;
  }
  setAddress(address) {
    this.address = address;
  }
  getAddress() {
    return this.address;
  }
  getBalance() {
    return this.balance;
  }
  setBalance(balance) {
    this.balance = balance;
  }
  hasValidLenghtAddress(address) {
    return address.length === this.ADDRESS_LENGHT;
  }
  getEwalletAtm(callback,data){
    return this.call('../../app/application/get_ewallet_atm.php',data,callback);
  }
  transferMoneyWalletWeb(callback,data){
    return this.call("../../app/application/transfer_money_wallet_web.php",data,callback);
  }
  checkWalletAddress(callback,data){
    return this.call("../../app/application/check_wallet_address.php",data,callback);
  }
  checkPin(callback,data){
    return this.call("../../app/application/check_pin.php",data,callback);
  }
};