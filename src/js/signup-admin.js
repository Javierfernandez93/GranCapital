$(document).ready(function(){
	 let singup=new Singup;
 	
	function verifyFirstStep(){
 		if(!verifyall($("#mail"),$("#mail").data("type"),$("#mail").data("minlenght"),$("#mail").data("message")))
 			return false; 		

 		if(!verifyall($("#password"),$("password").data("type"),$("#password").data("minlenght"),$("#password").data("message")))
 			return false; 		
 		
 		if(!verifyall($("#reafirm_password"),$("#reafirm_password").data("type"),$("#reafirm_password").data("minlenght"),$("#reafirm_password").data("message")))
 			return false;
 		if(!verifyall($("#cedula"),$("#cedula").data("type"),$("#cedula").data("minlenght"),$("#cedula").data("message")))
 			return false;

 		if($("#reafirm_password").val() != $("#password").val() ){
 			alertmesage("La contraseña no coincide");
 			$("#reafirm_password").removeClass("inputSuccess");
			$("#reafirm_password").addClass("inputError");
 			return false;
 		}else{
 			$("#reafirm_password").removeClass("inputError");
			$("#reafirm_password").addClass("inputSuccess");
 		}

 		return true;
	 }
	 
	 

 	function verifySecontStep(){
 		if(!verifyall($("#name"),$("#name").data("type"),$("#name").data("minlenght"),$("#name").data("message")))
 			return false;
 		
 		if(!verifyall($("#last_name"),$("last_name").data("type"),$("#last_name").data("minlenght"),$("#last_name").data("message")))
 			return false;
		  
			 
 	 	if(!verifyall($("#second_last_name"),$("#second_last_name").data("type"),$("#second_last_name").data("minlenght"),$("#second_last_name").data("message")))
 			return false;
 		
 		 // if(!verifyall($("#phone"),$("#phone").data("type"),$("#mail").data("minlenght"),$("#phone").data("message")))
 			// return false;
 		
 		 // if(!verifyall($("#cellular"),$("#cellular").data("type"),$("#cellular").data("minlenght"),$("#cellular").data("message")))
 		 // 	return false;

		 // verifico el nombre
		 

 		if(!verifyNames($("#name").val(),$("#last_name").val(),$("#second_last_name").val()))
 			return false;

		return true;
 	}

	function verifyThirtStep () {
		 if(!verifyall($("#street"),$("#street").data("type"),$("#street").data("minlenght"),$("#street").data("message")))
		 	return false;

		 // if(!verifyall($("#colony"),$("#colony").data("type"),$("#colony").data("minlenght"),$("#colony").data("message")))
		 // 	return false;

		// if(!verifyall($("#zip_code"),$("#zip_code").data("type"),$("#zip_code").data("minlenght"),$("#zip_code").data("message")))
		// 	return false; 		

	 	if(!verifyall($("#city"),$("#city").data("type"),$("#city").data("minlenght"),$("#city").data("message")))
	 		return false;

		 if(!verifyall($("#state"),$("#state").data("type"),$("#state").data("minlenght"),$("#state").data("message")))
			return false;
			console.log($("#country").val());	

    return true;
  }

	function verifyFhithStep(){
		
		if(!verifyall($("#sponsor_id"),$("#sponsor_id").data("type"),$("#sponsor_id").data("minlenght"),$("#sponsor_id").data("message"))){
			return false;	
		}

		if(!verifyall($("#colocation_id"),$("#colocation_id").data("type"),$("#colocation_id").data("minlenght"),$("#colocation_id").data("message"))){
			return false;
		}
	}

	window.createNewUser=function(){
	  	errors=0;
  		if(errors==0){
		let sponsor_id;
  		if(!$("#terms").is(':checked')){
	  		alertmesage("Antes de continuar acepta los Términos y servicios.");
	  	}else{
	 		var data={
	  			"user_support":{
	  				'names':$("#name").val(),
		  			'email':$("#mail").val(),
		  			'password':$('#password').val(),
		  			'phone':$('#phone').val(),
		  			"country_id":$("#country").val(),
		  			"cedula":$("#cedula").val()
		  			
		  		}
			};

			if(!$('#mail').val())
			{
				alertmesage("Es necesario que ingreses un correo electrónico válido.");
				return;
			}

			if(!$('#phone').val())
			{
				alertmesage("Es necesario que ingreses un número teléfonico válido.");
				return;
			}
		  	Loader.showLoader();	
	  		singup.saveUser((response)=>{
	  			if(response.s=="1"){
	  				response_signup=response.r;
	  				singup.loginUser((response)=>{		  				
				  			if(response.s=="1"){
				  				Loader.closeLoader();
				  				alertmesage(response_signup);
					 			
					 			setTimeout(function(){
					 				window.location.href = "../medical/";
					 			}, 6000);
				
					 		}								
				 		},{email:$("#mail").val(),password:$('#password').val()}
				 	);
		 		}else{
		 			Loader.closeLoader();
		 			alertmesage(response.r);	
		 		}
		 	},{data:data});
	  	}
	}

}

	function verifyNames(names,last_name,second_last_name){
		
		Loader.showLoader()
		singup.verifyNames((response)=>{
			Loader.closeLoader();
				if(response.s!=1){	 			
	 			alertmesage(response.r);
	 			setTimeout(function(){
	 				window.location.href = "../login/";
	 			}, 8000);
	 		}
				
			},{names:names,last_name:last_name,second_last_name:second_last_name,}			
		);

		return true;
	}

	function validarSponsorid(sponsor_id,colocation_id=false){

		if(colocation_id){

			if(!sponsor_id){
				alertmesage("Si deseas ser colocado indica quien es tu patrocinador.");
				$("#colocation_id").val('');
				$("#colocation_id").removeClass("inputSuccess");
			}else{

				Loader.showLoader();				
						
				singup.verifyColocation((response)=>{
			 			if(response.s=="1"){
			 				Loader.closeLoader();
			 				alertmesage(response.r);
			 				$("#colocation_name").html("<strong>"+response.colocation_name+"</strong>");
			 				
			 			}else{
			 				Loader.closeLoader();
			 				alertmesage(response.r);
							$("#colocation_id").removeClass("inputSuccess");
							$("#colocation_id").removeClass("inputError");
							$("#colocation_id").val("");
							$("#colocation_name").html('');
			 			}
					},{sponsor_id:sponsor_id,colocation_id:colocation_id},
		 		);
			}
		}else{
			Loader.showLoader();
				let sponsor_id=$("#sponsor_id").val();
			

			singup.verifyId((response)=>{
					if(response.s==0){
						Loader.closeLoader();
						alertmesage(response.r);
						$("#sponsor_id").removeClass("inputSuccess");
						$("#sponsor_id").addClass("inputError");
						$("#sponsor_id").val("");
						$("#sponsor_name").html(translate("ID no encontrado"));
					}else{
						Loader.closeLoader();
					$("#sponsor_name").html("<strong>"+response.sponsor_name+"<strong>");
					}
				},{sponsor_id:sponsor_id}
				);
		}
	}

	window.stepOne=function(param){

		if(param==1){
			if(verifyFirstStep()){
			 	$(".first_step").addClass("d-none");
			 	$(".second_step").removeClass("d-none");
			}
		}else if(param==2){
			if(verifySecontStep()){
				$(".second_step").addClass("d-none");
		 		$(".third_step").removeClass("d-none");
			}
		}else if(param==0){
			$(".third_step").addClass("d-none");
			$(".second_step").removeClass("d-none");
		}else if(param==-1){
			$(".second_step").addClass("d-none");
			$(".first_step").removeClass("d-none"); 
		}else if(param==3){
			$(".third_step").addClass("d-none");
			$(".fourth_step").removeClass("d-none");
		}else if(param==4){
			if(verifyThirtStep()){
				$(".third_step").addClass("d-none");
				$(".fifth_step").removeClass("d-none");
			}
		}else{
			$(".third_step").addClass("d-none");
			$(".second_step").removeClass("d-none")
		}
	};

	$('#reafirm_password').focusout(function(){
		verifyall($("#reafirm_password"),$("#reafirm_password").data("type"),$("#reafirm_password").data("minlenght"),$("#reafirm_password").data("message"));
	}); 

	$('#name').focusout(function(){
		verifyall($("#name"),$("#name").data("type"),$("#name").data("minlenght"),$("#name").data("message"));
	}); 		

	$('#mail').focusout(function(){
		if(verifyall($("#mail"),$("#mail").data("type"),$("#mail").data("minlenght"),$("#mail").data("message"))){
			Loader.showLoader();
			singup.verifyMailExist((response)=>{
				Loader.closeLoader();
				if(response.s=="1"){
					
				} else if (response.r == "ALREADY_TAKEN") {
					$("#mail").removeClass("inputSuccess");
					$("#mail").addClass("inputError");
					$("#mail").val("");
					showEmailAlreadyTaken();
				} else if (response.r == "NOT_EMAIL") {
					$("#mail").removeClass("inputSuccess");
					$("#mail").addClass("inputError");
					$("#mail").val("");

				}

			},{mail:$("#mail").val()});
		}
	});

	function showEmailAlreadyTaken() {
		let alert = alertCtrl.create({
	        title: "Aviso", 
	        subTitle: 'El correo electrónico proporcionado ya está en uso. Por favor de <a href="../../apps/login/">clic aquí</a> para ingresar a su cuenta con su ID y password.',
	        buttons: [
	          { 
	              text: "Cerrar", 
	              role: 'cancel', 
	              handler: data => { 
	                
	              } 
	          },
	        ],
	    });

	    alertCtrl.present(alert.modal); 
	}

	$('#password').focusout(function(){
		verifyall($("#password"),$("#password").data("type"),$("#password").data("minlenght"),$("#password").data("message"));
	});

	$('#last_name').focusout(function(){
		verifyall($("#last_name"),$("#last_name").data("type"),$("#last_name").data("minlenght"),$("#last_name").data("message")); 		
	});

	// $('#second_last_name').focusout(function(){
	// 	verifyall($("#second_last_name"),$("#second_last_name").data("type"),$("#second_last_name").data("minlenght"),$("#second_last_name").data("message"));
	// });
	 	
	$('#last_name').focusout(function(){
		verifyall($("#last_name"),$("#last_name").data("type"),$("#last_name").data("minlenght"),$("#last_name").data("message"));
	});

	// $('#phone').focusout(function(){
	// 	verifyall($("#phone"),$("#phone").data("type"),$("#phone").data("minlenght"),$("#phone").data("message"));
	// });

	// $('#celular').focusout(function(){
	// 	verifyall($("#celular"),$("#celular").data("type"),$("#celular").data("minlenght"),$("#celular").data("message"));
	// });
	// $('#cellular').focusout(function(){
	// 	verifyall($("#cellular"),$("#cellular").data("type"),$("#cellular").data("minlenght"),$("#cellular").data("message"));
	// });

	 $('#street').focusout(function(){	
		verifyall($("#street"),$("#street").data("type"),$("#street").data("minlenght"),$("#street").data("message"));
	});

	 $('#colony').focusout(function(){
	 	verifyall($("#colony"),$("#colony").data("type"),$("#colony").data("minlenght"),$("#colony").data("message"));
	 });


	 $('#city').focusout(function(){
	 	verifyall($("#city"),$("#city").data("type"),$("#city").data("minlenght"),$("#city").data("message"));
	 });

	// $('#contry').focusout(function(){
	// 	verifyall($("#contry"),$("#contry").data("type"),$("#contry").data("minlenght"),$("#contry").data("message"));
	// });

	// $('#colcation_id').focusout(function(){
	// 	verifyall($("#colcation_id"),$("#colcation_id").data("type"),$("#colcation_id").data("minlenght"),$("#colcation_id").data("message"));
	// });
	 			
	// $('#country').focusout(function(){
	// 	verifyall($("#country"),$("#country").data("type"),$("#country").data("minlenght"),$("#country").data("message"));
	// });
	 			
	// $('#state').focusout(function(){
	// 	verifyall($("#state"),$("#state").data("type"),$("#state").data("minlenght"),$("#state").data("message"));
	// });

	$('#sponsor_id').focusout(function(){
	 	if(verifyall($("#sponsor_id"),$("#sponsor_id").data("type"),$("#sponsor_id").data("minlenght"),$("#sponsor_id").data("message")))
			
		/*  if(isNaN($("#sponsor_id").val())){
			 
				  validarSponsorid($("#sponsor_id").val());
			}else if($("#sponsor_id").val().length>3){
				validarSponsorid($("#sponsor_id").val());
			} */

			if(isNaN($("#sponsor_id").val())){
				console.log($("#sponsor_id").val().length)
			if($("#sponsor_id").val().length>=3){
					// console.log("aqui")
					validarSponsorid($("#sponsor_id").val());
				}
		  }else{
			validarSponsorid($("#sponsor_id").val());
		  }

		 
	});

	$('#colocation_id').focusout(function(){
		if($("#colocation_id").val()!=''){

			if(verifyall($("#colocation_id"),$("#colocation_id").data("type"),$("#colocation_id").data("minlenght"),$("#colocation_id").data("message")))
				validarSponsorid($("#sponsor_id").val(),$("#colocation_id").val());		
		}
	});
});

class Singup extends Http{
	verifyMailExist(callback,data){
		return this.call("../../apps/signup-admin/subcore/application/verify_mail.php",data,callback,false);
	}
	verifyId(callback,data){
		return this.call("../../apps/signup-admin/subcore/application/verify_id.php",data,callback,false);
	}
	saveUser(callback,data){
		return this.call("../../apps/signup-admin/subcore/application/save_user.php",data,callback,false);
	}
	verifyColocation(callback,data){
		return this.call("../../apps/signup-admin/subcore/application/verify_colocation_id.php",data,callback,false);
	}
	verifyNames(callback,data){
		return this.call("../../apps/signup-admin/subcore/application/verify_names.php",data,callback,false);
	}
	loginUser(callback,data){
		return this.call("../../app/application/admin_login.php",data,callback,false);
	}
}