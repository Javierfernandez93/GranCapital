$(document).ready(function(){
  let users = new Users;

  window.goIntoBackoffice = function(element,for_company_id) {
    users.goIntoBackoffice((response)=>{
      if(response.s == 1)
      {
        $(element).html("Listo");
      }
    },{for_company_id:for_company_id});
  }
});

class Users extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  goIntoBackoffice(callback,data){
    return this.call('../../app/application/go_into_backoffice_agency.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};