$(document).ready(function(){
	let proyects = new Proyects;

	$("body").tooltip({ selector:'[data-toggle=tooltip]'});

	window.analizeImageColors = function(element) {
		dinamicLoader.showLoader(element);
		
		proyects.analizeImageColors((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$(".response").html(response.html);
			}
		},{image:$("#image").val()});
	}

	dinamicLoader.showLoader($(".response"));

	proyects.getAllProyects((response)=>{
		if(response.s == 1)
		{
			$(".response").html(response.html);
		}
	});
});

class Proyects extends Http {
  constructor()
  {
    super();
  }
  getAllProyects(callback,data){
    return this.call("../../app/application/get_all_proyects.php",data,callback);
  }
  analizeImageColors(callback,data){
    return this.call("../../app/application/analize_image_colors.php",data,callback);
  }
};