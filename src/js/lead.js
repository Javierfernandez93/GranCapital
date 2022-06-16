$(document).ready(function(){
	let leads = new Leads;

  if(getParam("sppid"))
  {
    dinamicLoader.show($(".response"));

    leads.getLeadsSheetPerProyect((response)=>{

      dinamicLoader.close();
      
      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{sheet_per_proyect_id:getParam("sppid")});
  }
});

class Leads extends Http {
  constructor()
  {
    super();
  }
  getLeadsSheetPerProyect(callback,data){
    return this.call("../../app/application/get_leads_sheet_per_proyect.php",data,callback);
  }
};