$(document).ready(function(){
	let vars = new Vars;

	dinamicLoader.showLoader($(".response"));

  if(getParam("pid"))
  {
    getAllVars();
  }

  window.addVar = function(element,proyect_id)
  {
    _showLeftAlertWS('addVar',null,{proyect_id:proyect_id},element);
  }

  window.saveVar = function(element,proyect_id)
  {
    dinamicLoader.show(element);

    vars.saveVar((response)=>{
      dinamicLoader.close();
      
      if(response.s == 1)
      {
        location.reload();
      }
    },{proyect_id:proyect_id,catalog_var_id:$("#catalog_var_id").val(),name:$("#name").val()})
  }

  window.getAllVars = function()
  {
    getAllVars();
  }

  function getAllVars()
  {
    dinamicLoader.showLoader($(".response"));

    vars.getAllVars((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{proyect_id:getParam("pid")});
  }

});

class Vars extends Http {
  constructor()
  {
    super();
  }
  getAllVars(callback,data){
    return this.call("../../app/application/get_all_vars.php",data,callback);
  }
  saveVar(callback,data){
    return this.call("../../app/application/save_var.php",data,callback);
  } 
};