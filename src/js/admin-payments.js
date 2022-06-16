$(document).ready(function(){
  let payments = new Payments;
  let comision_per_user_ids = [];
  window.saveComissions = function(commerce_id,state){   
    $(".form-check-input").each((key,_this)=>{
       if (_this.checked) {
           comision_per_user_ids.push($(_this).attr("id"));
       }
    });

    payments.saveComissions((response)=>{
      if(response.s == 1) {
        location.reload();
      } else if(response.s == 0) {
        showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
      }
    },{comision_per_user_ids:comision_per_user_ids});
  }
});

class Payments extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  saveComissions(callback,data){
    return this.call('../../app/application/save_comissions.php',data,callback);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};