$(document).ready(function(){
	let selectProyects = new SelectProyects;

	dinamicLoader.showLoader($(".response"));

	selectProyects.getAllProyectsForSelect((response)=>{
		if(response.s == 1)
		{
			$(".response").html(response.html);
		}
	},{page:translate(getParam("page")),type:getParam("type"),url:getParam("url")});

	window.toggleSheets = function(element,proyect_id)
	{
		$("#card-submain").remove();
		dinamicLoader.showLoader(element,"preloader-sm-black");

		selectProyects.getAllSheetsForSelect((response)=>{
			dinamicLoader.closeLoader();
			
			if(response.s == 1)
			{
				$(".response").append(response.html);
				selectProyects.setProyectId(proyect_id);
				specialAlert.pushData($("#card-main"),$("#card-submain"));	
			}
			
		},{page:translate(getParam("page")),type:getParam("type"),url:getParam("url"),proyect_id:proyect_id});
	}
});

class SelectProyects extends Http {
  constructor()
  {
    super();
    this.proyect_id = null
  }
  getProyectId()
  {
  	return this.proyect_id;
  }
  setProyectId(proyect_id)
  {
    this.proyect_id = proyect_id;
  }
  getAllProyectsForSelect(callback,data){
    return this.call("../../app/application/get_all_proyects_for_select.php",data,callback);
  }
  getAllSheetsForSelect(callback,data){
    return this.call("../../app/application/get_all_sheets_for_select.php",data,callback);
  }
};