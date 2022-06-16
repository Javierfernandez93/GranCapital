$(document).ready(function(){
	 let specs = new Speciality;

	 window.add_my_speciality = function(element,speciality) {
	 	$(element).text("Espere...");

	 	if (speciality){
			specs.saveSpeciality((response)=>{
		 		if(response.s == 1)
		 		{
		 			location.reload();
		 		}
		 	},{speciality:speciality});			
		} else {
			alertmesage("Seleeciona una especialidad valida");
		}
	}
		window.remove_my_speciality = function(element,speciality) {
			$(element).text("Espere...");
	 		if (speciality)
	 		{	
				specs.removeSpeciality((response)=>{
			 		if(response.s == 1)
			 		{
			 			location.reload();
			 		}
			 	},{speciality:speciality});			
			} else {
				alertmesage("Seleeciona una especialidad valida");
			}
		}

		window.save_schedule = function() {

		 inte= parseInt($("#entrada").val(), 10);
		 inte=inte*3600;
		 out= parseInt($("#salida").val(), 10);
		 out= ((out*3600)-inte)+3600;
	 		var data ={
	  			"OpennigHoursByDoctors":{
		  			'start_day':inte,
		  			'end_day':out,
		  			'days_aviable':$("#Lunes").val()+","+$("#Martes").val()+","+$("#Miercoles").val()+","+$("#Jueves").val()+","+$("#Viernes").val()+","+$("#Sabado").val()+","+$("#Domingo").val(),
		  		}
		  	};

			specs.save_schedule((response)=>{
		 		if(response.s == 1)
		 		{
		 			location.reload();
		 		}
		 	},{data:data});		
		}

});

class Speciality extends Http{

	saveSpeciality(callback,data){
		return this.call("../../app/application/save_speciality.php",data,callback,false);
	}
	removeSpeciality(callback,data){
		return this.call("../../app/application/remove_speciality.php",data,callback,false);
	}
	save_schedule(callback,data){
		return this.call("../../app/application/save_schedule.php",data,callback,false);
	}
	
}