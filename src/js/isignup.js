 $(document).ready(function() {
	let signup = new Signup;
	let checkField = new CheckField;
	var typingTimer;
	var doneTypingInterval = 2500;

	if($("#sponsor").val()) checkSponsorAgency();

	$("#names").focus();

	window.checkField = function(element,type,event,nextField) {
    checkField.init(element,type,event,nextField);
	}

	$('#auth_code').on("input",()=>{    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(()=>{
      signup.checkMarketingDigitalCode((response)=>{
      	if(response.s == 1)
      	{
      		$(".box-auth-code").html(response.html);
      		$("#auth_code").removeClass("text-danger").addClass("text-success");
      	} else {
      		$("#auth_code").removeClass("text-success").addClass("text-danger");
      	}

      	if(response.r == "NOT_VALID_AUTH_CODE") {
      		$("#auth_code").focus();
      		showMessage("Error","El código proporcionado es incorrecto.");
      	}
      },{auth_code:$("#auth_code").val()});
    },doneTypingInterval);
	});

	$('body').on('click', '#names', function(e){
		if(e.keyCode == 13) {
	    $("#address").focus();
			return false;
	  }
	});
	$('body').on('click', '#address', function(e){
		if(e.keyCode == 13) {
	    $("#zip_code").focus();
			return false;
	  }
	});
	$('body').on('click', '#zip_code', function(e){
		if(e.keyCode == 13) {
	    $("#state").focus();
			return false;
	  }
	});
	$('body').on('click', '#state', function(e){
		if(e.keyCode == 13) {
	    $("#country_id").focus();
			return false;
	  }
	});
	$('body').on('click', '#country_id', function(e){
		if(e.keyCode == 13) {
	    $("#phone").focus();
			return false;
	  }
	});
	$('body').on('click', '#phone', function(e){
		if(e.keyCode == 13) {
    	$("#address").focus();
			return false;
    }
	});
	$('body').on('click', '#names', function(e){
		if(e.keyCode == 13) {
	    $("#email").focus();
			return false;
	  }
	});
	$('body').on('click', '#email', function(e){
		if(e.keyCode == 13) {
	    $("#paypal").focus();
			return false;
	  }
	});
	$('body').on('click', '#paypal', function(e){
		if(e.keyCode == 13) {
	    doSignup();
			return false;
	  }
	});

	// pre signup
	$('body').on('click', '#field_type', function(e){
    if(e.keyCode == 13) {
    	$("#password").focus();
			return false;
    }
	});

	$('body').on('keyup', '#password', function(e){
    if(e.keyCode == 13) {
    	$("#re_password").focus();
			return false;
    }
	});

	$('body').on('keyup', '#re_password', function(e){
    if(e.keyCode == 13) {
    	doAgencyPreSignup();
			return false;
    }
	});

	$('#sponsor').on("input",()=>{    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(()=>{
      checkSponsorAgency();
    },doneTypingInterval);
	});

	function checkSponsorAgency()
	{
		signup.checkSponsorAgency((response)=>{
			if(response.s == 1) {
				$(".box-sponsor").html(response.html)
			} else if(response.s == 0) {
				showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
			}
		},{sponsor:$("#sponsor").val()});
	}

	$('#email').on("input",()=>{    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(()=>{
      signup.emailAgencyExist((response)=>{
				if(response.s == 1) {
					let alert = alertCtrl.create({
			      	title: "Aviso", 
			      	subTitle: "El correo electrónico proporcionado ya está en uso, ingrese a su cuenta o recupere su contraseña.",
			        buttons: [
			        	{ 
			            	text: "Cerrar", 
			            	role: 'cancel', 
			            	handler: data => { 
			            		// do stuff
			            	} 
			        	},
			        	{
			            	text: "Recuperar contraseña", 
			            	role: 'cancel', 
			            	handler: data => { 
			            		window.location = "../../apps/login/forgot_password.php?email="+$("#email").val();
			            	} 
			        	},
			        	{
			            	text: "Ingresar", 
			            	role: 'cancel', 
			            	handler: data => { 
			            		window.location = "../../apps/ilogin/?email="+$("#email").val();
			            	} 
			        	},
			        ]
				  });

				  alertCtrl.present(alert.modal);	
				}
			},{email:$("#email").val()});
    },doneTypingInterval);
	});

	window.doAgencyPreSignup = function(kind) {
		if(!$("#terms").is(':checked')) {
			showMessage("Aviso",__Translate("Es necesario aceptar los términos para continuar."));
			return false;
		}

		if($("body #names").val() == "") {
			showMessage("Aviso",__Translate("Ingresa un nombre válido. Por favor intenta de nuevo"));
			return false;
		}

		if($("body #email").val() == "")
		{
			showMessage("Aviso",__Translate("El correo es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #password").val() == "") {
			showMessage("Aviso",__Translate("Enter the password. Please try again"));
			return false;
		}

		if($("body #re_password").val() == "") {
			showMessage("Aviso",__Translate("Ingrese de nuevo su contraseña. Por favor Intente de nuevo"));
			return false;
		}

		if($("body #password").val() != $("body #re_password").val()) {
			showMessage("Aviso",__Translate("Las contraseñas no coinciden. Por favor Intente de nuevo"));
			return false;
		}
		let sponsor_id = $("#sponsor_id").val() == undefined ? false : $("#sponsor_id").val();
		
		signup.doAgencyPreSignup((response)=>{
			if(response.s == 1) {
				__loadDictionaryInStorage("spanish");
				
				window.location.href = "../ibackoffice";

			} else if(response.r == "MAIL_ALREADY_EXIST") {
				showMessage("Aviso",__Translate("El correo electrónico ya esta registrado. Intenta ingresar a tu cuenta ó con un correo electrónico nuevo. <a href='../../apps/login/?seller=true&mail="+$("body #field_type").val()+"'>Ingresar a mi cuenta</a> "));
			} else if(response.r == "PASSWORD_DO_NOT_MATCH") {
				showMessage("Aviso",__Translate("The password is incorrect. Please try again")+' .Si olvidaste tu contraseña da click aquí para continuar <a href="../../apps/login/forgot_password.php">Recuperar contraseña</a>');
			} else if(response.r == "NOT_USER") {
				showMessage("Aviso",__Translate("El ID de asociado no existe o no es válido"));
			} else if(response.r == "NOT_VALID_AUTH_CODE") {
				$("#auth_code").focus();
				showMessage("Error","El código proporcionado es incorrecto.");
			} else if(response.s == 0) {
				showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
			}
		},{auth_code:$("#auth_code").val(),login:true,sponsor_id:sponsor_id,names:$("#names").val(),password:$("body #password").val(),email:$("body #email").val()});
	}

	window.doSignup = function(kind) {

		if($("body #names").val() == "") {
			showMessage("Aviso",__Translate("El nombre introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #address").val() == "")
		{
			showMessage("Aviso",__Translate("La dirección introducida es incorrecta. Por favor intente de nuevo"));
			return false;
		}

		if($("body #zip_code").val() == "")
		{
			showMessage("Aviso",__Translate("El código postal introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #city").val() == "")
		{
			showMessage("Aviso",__Translate("La ciudad introducida es incorrecta. Por favor intente de nuevo"));
			return false;
		}

		if($("body #state").val() == "")
		{
			showMessage("Aviso",__Translate("El estado o departamento introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #country_id").val() == "")
		{
			showMessage("Aviso",__Translate("El país introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #phone").val() == "")
		{
			showMessage("Aviso",__Translate("El teléfono introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if($("body #email").val() == "")
		{
			showMessage("Aviso",__Translate("El correo electrónico introducido es incorrecto. Por favor intente de nuevo"));
			return false;
		}

		if(!$("body #terms").is(":checked"))
		{
			showMessage("Aviso",__Translate("Debes de aceptar los términos para continuar"));
			return false;
		}

		signup.doSignup((response)=>{
			if(response.s == 1) {

				if($("body #paypal").val() == "")
				{
					let alert = alertCtrl.create({
				      	title: "Aviso", 
				      	subTitle: "Te recordamos que tu cuenta de PayPal es importante para pagarte las comisiones",
				        buttons: [
				        	{ 
				            	text: translate('Aceptar'), 
				            	role: 'cancel', 
				            	handler: data => { 
				            		__loadDictionaryInStorage("spanish");
									if(kind == "seller") {
										window.location.href = "../home/seller.php";
									} else {
										window.location.href = "../home/aiphonet.php";
									}
				            	} 
				        	},
				        ]
					});

					alertCtrl.present(alert.modal);	
					
				} else {
					__loadDictionaryInStorage("spanish");
					if(kind == "seller") {
						window.location.href = "../home/seller.php";
					} else {
						window.location.href = "../home/aiphonet.php";
					}
				}
			} else if(response.r == "MAIL_ALREADY_EXIST") {
				showMessage("Aviso",__Translate("El correo electrónico ya esta registrado. Intenta ingresar a tu cuenta ó con un correo electrónico nuevo."));
			} else if(response.r == "PASSWORD_DO_NOT_MATCH") {
				showMessage("Aviso",__Translate("The password is incorrect. Please try again")+' .Si olvidaste tu contraseña da click aquí para continuar <a href="../../apps/login/forgot_password.php">Recuperar contraseña</a>');
			} else if(response.r == "NOT_USER") {
				showMessage("Aviso",__Translate("El ID de asociado no existe o no es válido"));
			} else if(response.r == "FAIL_LOGGED") {
				showMessage("Aviso",__Translate("Parece que no estas en el lugar correcto, intenta ingresar como comerciante."));
			} else if(response.s == 0) {
				showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
			}
		},{names:$("#names").val(),address:$("#address").val(),zip_code:$("#zip_code").val(),city:$("#city").val(),state:$("#state").val(),country_id:$("#country_id").val(),phone:$("#phone").val(),email:$("#email").val(),paypal:$("#paypal").val()});
	}

	function showMessage(title,subTitle) {
		let alert = alertCtrl.create({
      	title: title, 
      	subTitle: subTitle,
        buttons: [
        	{ 
            	text: translate('Aceptar'), 
            	role: 'cancel', 
            	handler: data => { 
            		// do stuff
            	} 
        	},
        ]
	  });

	  alertCtrl.present(alert.modal);	
	}
});

class Signup extends Http {
	constructor()
	{
		super();
		this.options = {};
	}
	checkSponsorAgency(callback,data){
		return this.call('../../app/application/check_sponsor_agency.php',data,callback);
	}
	emailAgencyExist(callback,data){
		return this.call('../../app/application/email_agency_exist.php',data,callback);
	}
	doAgencyPreSignup(callback,data){
		return this.call('../../app/application/save_user_agency.php',data,callback);
	}
	checkMarketingDigitalCode(callback,data){
		return this.call('../../app/application/check_marketing_digital_code.php',data,callback);
	}
	doSignup(callback,data){
		return this.call('../../apps/login/subcore/application/do_signup.php',data,callback);
	}
	init(options){
		this.options = $.extend({}, this.defaults, options);
	}
};