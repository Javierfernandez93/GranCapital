$(document).ready(function(){
	 let diseases = new Diseases;

	 window.saveDisease = function(suffering,description,cause,sign_symptoms) {
	 	if (!$("#suffering").val()||!$("#description").val()||!$("#cause").val()||!$("#sign_symptoms").val()){
			alert ("Ingrese todos los campos");
		}
		else{
			diseases.saveDisease((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{suffering:$("#suffering").val(),description:$("#description").val(),cause:$("#cause").val(),sign_symptoms:$("#sign_symptoms").val()});			
				}
	}

	function verifyFields(){


		//var suffering,description,cause,sign_symptoms;
		//suffering  = $("#suffering").val();
		//description  = $("#description").val();
		//cause  = $("#cause").val();
		//sign_symptoms  = $("#sign_symptoms").val();

		//if(suffering.lenght==0 ||description.lenght==0 ||cause.lenght==0 ||sign_symptoms.lenght==0){
		//	alert("campos vacíos");
		//}
	}
});

class Diseases extends Http{

	saveDisease(callback,data){
		return this.call("../../app/application/save_disease.php",data,callback,false);
	}
	
}