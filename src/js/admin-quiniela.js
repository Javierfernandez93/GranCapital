$(document).ready(function(){
  let quiniela = new Quiniela;

  window.sendRecognition = function(company_id) {
    quiniela.sendRecognition((response)=>{
      if(response.s == 1)
      {
        // alert();
      }
    },{to_company_id:company_id});
  }
});

class Quiniela extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  sendRecognition(callback,data){
    return this.call('../../app/application/send_recognition.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};