$(document).ready(function(){
  let reports = new Reports;

  window.sendResponse = function(element,report_per_user_id) {
    if(!$("#response").val()) {
      return false;
    }
    $(element).html("Enviando...");
    reports.sendResponse((response)=>{
      $(element).html("Listo");
      if(response.s == 1)
      {
        location.reload();
      }
    },{response:$("#response").val(),report_per_user_id:report_per_user_id});
  }
});

class Reports extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  sendResponse(callback,data){
    return this.call('../../app/application/send_response.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};