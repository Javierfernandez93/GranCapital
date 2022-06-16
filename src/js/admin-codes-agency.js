$(document).ready(function(){
  let codes = new Codes;

  window.setCodes = function(company_id) {
    codes.setCodes((response)=>{
      if(response.s == 1)
      {

      }
    },{to_company_id:company_id});
  }

  window.saveCodes = function(company_id) {
    let amount_of_codes = [];

    $(".input-codes").each((key,input)=>{
      if($(input).val() > 0)
      {
        let code = {
          "catalog_code_id" : $(input).attr("id"),
          "amount" : $(input).val(),
        }
        amount_of_codes.push(code)
      }
    });

    codes.saveCodes((response)=>{
      if(response.s == 1)
      {
        showMessage("Éxito","Se guardaron los códigos.")
      }
    },{to_company_id:company_id,amount_of_codes:amount_of_codes});
  }

  window.deleteCode = function(code_per_user_id) {
    codes.deleteCode((response)=>{
      if(response.s == 1)
      {
        
      }
    },{code_per_user_id:code_per_user_id});
  }

  function showMessage(title,subTitle,_function) {
    let alert = alertCtrl.create({
        title: title, 
        subTitle: subTitle,
          buttons: [
          { 
              text: translate('Aceptar'), 
              role: 'cancel', 
              handler: data => { 
                if(_function != undefined) _function();
              } 
          },
        ]
    });

    alertCtrl.present(alert.modal);
  }
});

class Codes extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  setCodes(callback,data){
    return this.call('../../app/application/send_recognition.php',data,callback,false);
  }
  saveCodes(callback,data){
    return this.call('../../app/application/save_codes_agency.php',data,callback,false);
  }
  deleteCode(callback,data){
    return this.call('../../app/application/delete_codes_agency.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};