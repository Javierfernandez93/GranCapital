$(document).ready(function(){
  let host = new Host;

  window.startUpHost = function(element) {
    $(element).html("Espere...").attr("disabled",true);
    host.startUpHost((response)=>{
      if(response.s == 1)
      {
        $(element).html("¡Listo!").removeAttr("disabled").removeClass("btn-primary").addClass("btn-success");

      }
    },);
  }
});

class Host extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  startUpHost(callback,data){
    return this.call('../../app/application/start_up_host.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};