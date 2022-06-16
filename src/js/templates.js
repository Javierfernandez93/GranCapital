$(document).ready(function(){
  let templates = new Templates;

  getTemplates($("#response"),getParam("pid"));

  function getTemplates(element,proyect_id)
  {
    dinamicLoader.showLoader(element);

    templates.getTemplates((response)=>{
      if(response.s == 1)
      {
        $("#response").html(response.html);
      }
    },{proyect_id:proyect_id});
  }

  window.getTemplates = function(element,proyect_id)
  {
    getTemplates(element,proyect_id);
  }

  window.getTemplate = function(element,template_id,proyect_id)
  {
  	$(element).attr("disabled",true).text("Espere...");
    
    templates.getTemplates((response)=>{
    	if(response.s == 1)
    	{
      		console.log(response);
    	}
    },{template_id:template_id,proyect_id:proyect_id});
  }

  window.assingTemplateToSheet = function(element,template_id,proyect_id)
  {
  	$(element).attr("disabled",true).text("Espere...");
    templates.assingTemplateToSheet((response)=>{
    	if(response.s == 1)
    	{
    		$(element).attr("disabled",true).text("Redireccionando en 3 segundos...");

    		setTimeout(()=>{
    			location.href = response.url;
    		},3000);
      		console.log(response);
    	}
    },{template_id:template_id,proyect_id:proyect_id});
  }
});