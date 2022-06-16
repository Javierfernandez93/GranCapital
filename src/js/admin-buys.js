$(document).ready(function(){
  let buys = new Buys;

  $('.dropdown-toggle').dropdown();

  window.validateBuy = function(element,buy_per_user_login_id){   
    $(element).parent().parent().find("button").html("Espere...");
    buys.validateBuy((response)=>{
      if(response.s == 1) {
        $(element).parent().parent().find("button").html("Listo").addClasS("btn-success");
        setTimeout(()=>{
          location.reload();
        },500);
      } else if(response.s == 0) {
        showMessage("Aviso",__Translate("Hubo un error al validar la compra, por favor contacte a soporte técnico."));
      }
    },{buy_per_user_login_id:buy_per_user_login_id});
  }

  window.cancelBuy = function(buy_per_user_login_id){   
    buys.cancelBuy((response)=>{
      if(response.s == 1) {
        location.reload();
      } else if(response.s == 0) {
        showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
      }
    },{buy_per_user_login_id:buy_per_user_login_id});
  }
});

class Buys extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  validateBuy(callback,data){
    return this.call('../../app/application/validate_buy.php',data,callback);
  }
  cancelBuy(callback,data){
    return this.call('../../app/application/cancel_buy.php',data,callback);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};