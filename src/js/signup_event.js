$(document).ready(function(){
	 let userSignupEvent = new UserSignupEvent;

	 window.findMailEvent = function(){

	    alert = alertCtrl.create({
	      title: "¿Olvidaste tu código de acceso?",
	      subTitle: "Ingresa el correo con el que hiciste tu registro al evento",
	      inputs : [
		      {
		      	type : "email",
		      	name : "mail"
		      }
	      ],
	      buttons: [
	        { 
	            text: translate("Aceptar"),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	userSignupEvent.findMailEvent((response)=>{
				 		if(response.s == 1)
				 		{
				 			alertmesage('Tu código de acceso es '+response.code+'.');
				 		} else if(response.r == "NOT_FOUND") {
				 			alertmesage('No pudimos encontrar tu código de acceso.');
				 		} else if(response.r == "NOT_VALID_MAIL") {
				 			alertmesage('El correo proporcionado es incorrecto.');
				 		}
				 	},{mail:data.mail});
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	 }

	 window.createNewUser = function(element){
	 	$(element).text("Espere...").attr("disabled",true);

	 	if (!$('#name').val()){
	 		alertmesage('Ingresa un nombre');
	 		return false;
	 	}
		if (!$('#phone').val()){
	 		alertmesage('Ingresa un teléfono');
			return false;
		}
		if (!$('#mail').val() || isValidMail($('#mail').val()) == false){
	 		alertmesage('Ingresa un correo electrónico');
			return false;
		}

		if (!$('#city').val()){
	 		alertmesage('Ingresa una ciudad');
			return false;
		}
		if (!$('#state').val()){
	 		alertmesage('Ingresa un estado');
			return false;
		}

		$(element).text("Registrando...");

	 	userSignupEvent.saveUserEvent((response)=>{
	 		$(element).text("¡Apartar mi lugar en el evento!").removeAttr("disabled");

	 		if(response.s == 1)
	 		{
	 			$(".box-main").html(response.html);
	 		} else if(response.r == "NOT_VALID_PHONE") {
	 			alertmesage('Ingresa un teléfono válido');
	 		} else if(response.r == "NOT_VALID_MAIL") {
	 			alertmesage('Ingresa un correo electrónico válido. Es posible que ya esté registrado el correo proporcionado.');
	 		} else if(response.r == "SMS_NOT_SENT") {
	 			alertmesage('No pudimos enviar el sms a tu teléfono. Es posible que ya esté registrado el teléfono proporcionado.');
	 		}
	 	},{name:$('#name').val(),phone:$('#phone').val(),mail:$('#mail').val(),city:$('#city').val(),state:$('#state').val()});
	 }

});

class UserSignupEvent extends Http{

	saveUserEvent(callback,data){
		return this.call("../../app/application/save_user_event.php",data,callback,false);
	}
	findMailEvent(callback,data){
		return this.call("../../app/application/find_mail_event.php",data,callback,false);
	}
}