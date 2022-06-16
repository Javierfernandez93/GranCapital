$(document).ready(function(){
	let singup = new Singup;
	let checkField = new CheckField;

	window.checkField = function(element,type,event,nextField) {
    	checkField.init(element,type,event,nextField);
	};

	window.getVerificationCode = function(element)
	{
	 	if(singup.getCodeVerified() == false)
	 	{
	 		if($(element).val())
	 		{
			 	let phone = $("#phone_area").text() + $(element).val();
			 	let alert = alertCtrl.create({
			        title: "Aviso importante", 
			        subTitle: 'Verificaremos el teléfono <b>'+ phone + "</b> enviaremos un sms con un código de verificación.",
			        buttons: [
			          { 
			              text: "Cerrar", 
			              role: 'cancel', 
			              handler: data => { 
			                
			              } 
			          },
			          { 
			              text: "Verificar ahora", 
			              class: "btn-primary", 
			              handler: data => { 
			              	alert.modal.dismiss();  

			                singup.getVerificationCode((response)=>{
			                	if(response.s == 1)
			                	{
			                		showInputVerificationCode(element,response.token,response.verification_code_lenght,phone,response.try_time);
			                	}
							},{phone:phone});
			              } 
			          },
			        ],
			    });

			    alertCtrl.present(alert.modal); 

	 		}
	 	}
	}

	function showInputVerificationCode(element,token,verification_code_lenght,phone,try_time) {
		let alert = alertCtrl.create({
	        title: "Verificación", 
	        subTitle: 'Ingresa el código de <b>'+verification_code_lenght+'</b> números que se envío a tu número teléfonico <b>'+phone+'</b>. Tienes <b>'+try_time+'</b> intentos restantes para verificar tu teléfono.',
	        inputs: [
	        	{
	        		type:'number',
	        		name:'verification_code'
	        	}
	        ],
	        buttons: [
	          { 
	              text: "Cerrar", 
	              role: 'cancel', 
	              handler: data => { 
	                
	              } 
	          },
	          { 
	              text: "Verificar ahora", 
	              class: "btn-primary", 
	              handler: data => { 
	              	console.log(data);
	                singup.verifyVerificationCode((response)=>{
	                	if(response.s == 1)
	                	{
	                		singup.setCodeVerified(true);
	                		$("#next-step").removeAttr("disabled");

	                		alertMesage("El código es correcto.");

	                		$(element).removeClass("is-invalid").addClass("is-valid");
	                		$(element).parent().find("#feedback").removeClass("invalid-feedback").addClass("valid-feedback").text("Teléfono verificado.");
	                		$(element).prop("readonly",true);
	                	} else if(response.r === "NOT_SAME_CODE") {
	                		singup.setCodeVerified(false);

	                		alertMesage("El código ingresado es incorrecto.");

	                		$(element).removeClass("is-valid").addClass("is-invalid");
	                		$(element).parent().find("#feedback").removeClass("valid-feedback").addClass("invalid-feedback").text("El teléfono no está verificado.");
	                	}
					},{token:token,verification_code:data.verification_code});
	              } 
	          },
	        ],
	    });

	    alertCtrl.present(alert.modal); 
	}
 	
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
	 
	
 	window.nextStep = function(last_step_id,next_step_id){
 		if(singup.getCodeVerified() == true)
 		{
	 		$(last_step_id).addClass("d-none");
	 		$(next_step_id).removeClass("d-none");
 		} else {
 			$("#phone").focus();
			alertMesage("Ingresa un teléfono válido.");
 		}

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

	window.setPhoneCode = function(phone_code)
	{
		let phone_area = $("#country :selected").data('phone_area');

		$("#phone_area").text("+"+phone_area);
	}

	window.createNewUser = function()
	{
	  	errors = 0;
  		if(errors==0) {
		  let sponsor_id;
  		if(!$("#terms").is(':checked')){
	  		alertmesage("Antes de continuar acepta los términos y servicios.");
	  	}else{
	 		var data = {
	 			user_login : {
					names:$("#name").val(),
		  			phone:$("#phone").val(),
		  			email:$("#mail").val(),
		  			password:$('#password').val(),
		  			country_id:$("#country").val()
				},
				user_setting : {
					gender : $("input[name='gender']:checked").val(),
					blood_type : $("input[name='blood_type']:checked").val(),
					religion : $("#religion").val(),
					age : $("#age").val(),
					weight : $("#weight").val(),
					height : $("#height").val(),
				},
				promotor_id : $("#promotor_id").val()
			};

			if(getParam("token") && getParam("key"))
			{
				data.token = getParam("token");
				data.key = getParam("key");
			}

		  	Loader.showLoader();	

	  		singup.saveUser((response)=>{
	  			if(response.s == 1)
	  			{
	  				alertmesage("Tu cuenta está siendo redirigida, espera unos segundos.");

	  				setTimeout(function(){
			  			// singup.loginUser((_response)=>{		  				
		  					if(response.redirect_url != undefined)
		  					{
					 			window.location.href = response.redirect_url;
		  					} else {
			 					window.location.href = "../schedule";						
		  					}
						// },{company_id:response.company_id,password:response.password});
		 			}, 5000);

		 		} else {
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

	$('#mail').focusout(function()
	{
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
	        subTitle: 'El correo electrónico proporcionado ya está en uso. Por favor de <a href="../../apps/loginClient/">clic aquí</a> para ingresar a su cuenta con su ID y password.',
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

	window.togglePassword = function(element,id)
	{
		console.log($(id).prop('type'))
		if($(id).prop('type') == "password")
		{
			$(id).prop('type',"text");
			$(element).text("Ocultar contraseña");
		} else {
			$(element).text("Mostrar contraseña");
			$(id).prop('type',"password");
		}
	}

	$('#colocation_id').focusout(function(){
		if($("#colocation_id").val()!=''){

			if(verifyall($("#colocation_id"),$("#colocation_id").data("type"),$("#colocation_id").data("minlenght"),$("#colocation_id").data("message")))
				validarSponsorid($("#sponsor_id").val(),$("#colocation_id").val());		
		}
	});
});

class Singup extends Http{
	constructor() {
		super();
		this.code_verified = false;
	}
	setCodeVerified(code_verified) {
		this.code_verified = code_verified;
	}
	getCodeVerified() {
		return this.code_verified;
	}
	verifyMailExist(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/verify_mail.php",data,callback,false);
	}
	verifyId(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/verify_id.php",data,callback,false);
	}
	saveUser(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/save_user.php",data,callback,false);
	} 
	verifyColocation(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/verify_colocation_id.php",data,callback,false);
	}
	verifyNames(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/verify_names.php",data,callback,false);
	}
	loginUser(callback,data){
		return this.call("../../apps/loginClient/subcore/application/login_user.php",data,callback,false);
	}
	verifyVerificationCode(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/verify_verification_code.php",data,callback,false);
	}
	getVerificationCode(callback,data){
		return this.call("../../apps/registro-videoconsulta/subcore/application/get_verification_code.php",data,callback,false);
	}
}