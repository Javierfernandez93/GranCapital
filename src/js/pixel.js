$(document).ready(function(){
	const pixel = new Pixel;

	window.saveForm = function(element)
	{
		dinamicLoader.show(element);

		pixel.getVarsForSavePixel((response)=>{
			if(response.s == 1)
			{
				pixel.setVars(response.vars_per_proyect);

				saveForm();
			}
		},{sheet_per_proyect_id:getParam("sppid")});
	}

	window.goToSheet = function(sheet_per_proyect_id,element)
	{
		dinamicLoader.show(element);

		location.href = "../../apps/proyects/preview.php?sppid="+sheet_per_proyect_id;
	}

	function getDataFromVars()
	{
		const vars = pixel.getVars();
		let data = [];

		vars.forEach((_var,key)=>{
			if($("[name='"+_var.name_en+"']").length > 0)
			{
				data.push({var_per_proyect_id:_var.var_per_proyect_id,var:_var.name_en,value:$("[name='"+_var.name_en+"']").val()});
			}
		});

		return data;
	}
	function saveForm()
	{
		pixel.saveProspectPixel((response)=>{
			dinamicLoader.close();
			if(response.s == 1)
			{

			}
		},{data_vars:getDataFromVars()});
	}

	pixel.saveProspect((response)=>{
		if(response.s == 1)
		{
			
		}
	},{sheet_per_proyect_id:getParam('sppid')});

	$("body button").click(function(){
		if($(this).data("pixel_name") != undefined)
		{
		let pixel = $(this).data();

		console.log(pixel);

		// webFlow.setPixel((response)=>{

		// },{pixel_name:pixel.pixel_name,pixel_type:pixel.pixel_type,mode:MODE.DEBUG,proyect_id:webFlow.getProyectId()});
		}
	});
});