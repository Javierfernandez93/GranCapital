$(document).ready(function(){
	let pixel = new Pixels;

	dinamicLoader.showLoader($(".response"));

  if(getParam("pid"))
  {
    getAllPixels();
  }

  window.addPixel = function(element,proyect_id)
  {
    _showLeftAlertWS('addPixel',null,{proyect_id:proyect_id},element);
  }

  window.savePixel = function(element,proyect_id)
  {
    dinamicLoader.show(element);

    pixel.savePixel((response)=>{
      dinamicLoader.close();
      
      if(response.s == 1)
      {
        location.reload();
      }
    },{proyect_id:proyect_id,catalog_pixel_id:$("#catalog_pixel_id").val(),value:$("#value").val(),title:$("#title").val()})
  }

  window.getAllPixels = function()
  {
    getAllPixels();
  }

  function getAllPixels()
  {
    dinamicLoader.showLoader($(".response"));

    pixel.getAllPixels((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{proyect_id:getParam("pid")});
  }


  window.getInputFormPerCatalogPixel = function(element)
  {
    dinamicLoader.showLoader($("#response-form-pixel"));
    
    pixel.getInputFormPerCatalogPixel((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        $("#response-form-pixel").html(response.html);
      }
    },{catalog_pixel_id:$(element).val(),proyect_id:getParam("pid")});
  }

  window.videoUrlProcessor = function(element)
  {
    dinamicLoader.showLoader($("#response-video"));
    
    pixel.videoUrlProcessor((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        $("#response-video").html(response.html);
      }
    },{url:$(element).val()});
  }
});

class Pixels extends Http {
  constructor()
  {
    super();
  }
  getAllPixels(callback,data){
    return this.call("../../app/application/get_all_pixels.php",data,callback);
  }
  savePixel(callback,data){
    return this.call("../../app/application/save_pixel.php",data,callback);
  } 
  getInputFormPerCatalogPixel(callback,data){
    return this.call("../../app/application/get_input_form_per_catalog_pixel.php",data,callback);
  } 
  videoUrlProcessor(callback,data){
    return this.call("../../app/application/video_url_processor.php",data,callback);
  } 
};