$(document).ready(function(){
  let cart = new Cart;

  getPackages();

  window.saveBuy = function(element)
  {
    $(element).text("Espere...").attr("disabled");
    
    selectPaymentMethod(cart.getPaymentId(),(done)=>{
      if(done)
      {
        cart.saveBuy((response)=>{
          if(response.s == 1)
          {
            $(".box-response").html(response.html);
          }
        });
      }
    });
  }

  window.getPaymentMethods = function(element)
  {
    $(element).text("Espere...").attr("disabled");

    getPaymentMethods();
  }

  window.selectPaymentMethod = function(payment_id,element)
  {
    $(element).attr("disabled");
    cart.setPaymentId(payment_id);
    $(element).addClass("payment-method-selected").removeAttr("disabled");
  }

  window.selectPackage = function(package_id,element)
  {
    $(element).text("Espere...").attr("disabled");

    cart.selectPackage((response)=>{
      if(response.s == 1)
      {
        $(".btn-package").text("Comprar").removeClass("btn-primary").addClass("btn-light");
        $(element).text("Seleccionado").addClass("btn-primary").removeClass("btn-light");
        $(".box-response").html(response.html);
      }
    },{package_id:package_id});
  }

  function getPackages()
  {
    cart.getPackages((response)=>{
      if(response.s == 1)
      {
        $(".box-response").html(response.html);
      }
    });
  }

  function selectPaymentMethod(payment_id,_callback)
  {
    cart.selectPaymentMethod((response)=>{
      if(response.s == 1)
      {
        if(_callback != undefined) _callback(true);
      } else {
        if(_callback != undefined) _callback(false);
      }
    },{payment_id:payment_id});
  }

  function getPaymentMethods()
  {
    cart.getPaymentMethods((response)=>{
      if(response.s == 1)
      {
        $(".box-response").html(response.html);
      }
    });
  }
});

class Cart extends Http {
  constructor() {
    super();
    this.payment_id = 0;
  }
  setPaymentId(payment_id)
  {
    this.payment_id = payment_id;
  }
  getPaymentId()
  {
    return this.payment_id;
  }
  getPackages(callback,data) {
    return this.call("../../app/application/get_packages.php",data,callback,false);
  }
  selectPackage(callback,data) {
    return this.call("../../app/application/set_package.php",data,callback,false);
  }
  selectPaymentMethod(callback,data) {
    return this.call("../../app/application/select_payment_method.php",data,callback,false);
  }
  getPaymentMethods(callback,data) {
    return this.call("../../app/application/get_payment_methods.php",data,callback,false);
  }
  saveBuy(callback,data) {
    return this.call("../../app/application/save_buy.php",data,callback,false);
  }
}