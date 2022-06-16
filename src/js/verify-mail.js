$(document).ready(function(){
	let verify_mail = new VerifyMail;

	window.sendMail = function(element){
		dinamicLoader.show(element);
		
		verify_mail.sendMail((response)=>{
			dinamicLoader.hide();

			if(response.s == 1) 
			{		 				
				$(element).attr("disabled",true).text(translate("Correo envíado"));
			} else {
				
			}
		});
	}

	window.resendMail = function(element){
		$(element).text(translate('Enviando...')).attr("disabled",true);
		Loader.showLoader();
		verify_mail.sendMail((response)=>{
			if(response.s == 1) 
			{		 				
				alertMessage(translate('Correo enviado con éxito'));
				Loader.closeLoader();
				$(element).text(translate('Reenviar código')).attr("disabled",false);
				setTimeout(()=>{
					$(".send-mail").addClass("d-none");
					$(".verify-code").removeClass("d-none");
				},2000);

			} else {
				$(element).text(translate('Reenviar código')).attr("disabled",false);
				alertMessage(translate('Error al envíar correo'));
				Loader.closeLoader();
			}

		},{email:$("#email").text()});
	}

	window.verifyCode = function(element){
		$(element).text(translate('Verificando...')).attr("disabled",true);
		Loader.showLoader();
		verify_mail.verifyCode((response)=>{
			if(response.s == 1) 
			{		 				
				alertMessage(translate('Su cuenta ha sido verificada con éxito'));

				setTimeout(()=>{
					Loader.closeLoader();
					window.location.href = "../backoffice/";
				},3000);

			} else {
				alertMessage(translate('Código incorrecto'));
				Loader.closeLoader();
				$(element).text(translate('Verificar código')).attr("disabled",false);
			}

		},{code:$("#code").val()});
	}

});

class VerifyMail extends Http {
	sendMail(callback,data){
		return this.call("../../apps/verify-mail/subcore/application/send_verify_mail",data,callback,false);
	}
	verifyCode(callback,data){
		return this.call("../../apps/verify-mail/subcore/application/verify_code.php",data,callback,false);
	}
}