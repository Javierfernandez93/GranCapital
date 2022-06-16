$(document).ready(function(){
	let lead = new Lead;
  
  $("body").tooltip({ selector:'[data-toggle=tooltip]'});

  window.getCRMForLead = function(element,proyect_id,prospect_id)
  {
    dinamicLoader.show(element,'preloader-sm-primary');

    lead.getCRMForLead((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").append(response.html);
        specialAlert.pushData($("#card-main"),$("#card-submain"));
      }
    },{prospect_id:prospect_id,proyect_id:proyect_id});
  }

  window.getLinkForLead = function(element)
  {
    lead.getLinkForLead((response)=>{
      if(response.s == 1)
      {

      }
    });
  }

  if(getParam("sppid"))
  {
    dinamicLoader.show($(".response"));
    lead.getLeadsSheetPerProyect((response)=>{
      dinamicLoader.close();
      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{sheet_per_proyect_id:getParam("sppid")});
  }
});

class Lead extends Http {
  constructor()
  {
    super();
  }
  getLinkForLead(callback,data){
    return this.call("../../app/application/get_link_for_lead.php",data,callback);
  }
  getLeadsSheetPerProyect(callback,data){
    return this.call("../../app/application/get_leads_sheet_per_proyect.php",data,callback);
  }
  getCRMForLead(callback,data){
    return this.call("../../app/application/get_crm_for_lead.php",data,callback);
  }
};