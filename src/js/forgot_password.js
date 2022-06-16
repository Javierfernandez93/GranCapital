$(document).ready(function(){
	let recovery = new Recovery;
	
	window.recoveryPassword = function(element) {
		dinamicLoader.showLoader(element);

		recovery.mailExist((response)=>{

			if(response.s == 1)
			{
				recovery.sendRecoveryMail((response)=>{
				
				},{email:$("#email").val()});
			} else {
				
			}
		},{email:$("#email").val()});
	};

	$("#email").keyup(function(e) {	    
	    e.preventDefault();
	    var code = (e.keyCode ? e.keyCode : e.which);
	    if (code==13) {
	        $(".btn-primary").click();
	    }
	});

	window.validateToken = function()
	{
		if($("#token").val()!=''){
			Loader.showLoader();
			recovery.validateToken((response)=>{
				Loader.closeLoader();
				if(response.s==0)
					alertmesage(response.r);
				else{
					$("#recovery-box").html(response.html);
				}
			},{token:$("#token").val()});
		}else{
			alertmesage("Ingresa el Token que enviamos a tu correo.");
		}

	};

	window.setNewPassword = function()
	{
		if($('body #password').val()!=''){
			if($('body #reafirm_password').val()!=''){
				if($('body #password').val() == $('body #reafirm_password').val()){
					Loader.showLoader();
					recovery.changePasswordByToken((response)=>{
						Loader.closeLoader();
						if(response.s==0)
							alertmesage(response.r);
						else{
							Loader.showLoader();
							recovery.loginUser((response)=>{
								Loader.closeLoader();
								window.location.href = "../backoffice/index.php";
								
							},{mail:response.mail,company_id:response.company_id,password:response.password});							
						}
					},{token:$("#token").val(),password:$('body #password').val()});
				}else{
					alertmesage("Las contraseñas no coinciden. Por favor intente de nuevo");	
				}
			}else{
				alertmesage("Confirma la contraseña. Por favor intente de nuevo");
			}
		}else{
			alertmesage("Ingresa una contraseña. Por favor intente de nuevo");
		}
	};
});

class Recovery extends Http {
	mailExist(callback,data){
		return this.call("../../apps/login/subcore/application/mail_exist.php",data,callback,false);
	}
	sendRecoveryMail(callback,data){
		return this.call("../../apps/login/subcore/application/send_recovery_mail.php",data,callback,false);
	}
	validateToken(callback,data){
		return this.call("../../apps/login/subcore/application/validate_token.php",data,callback,false);
	}
	changePasswordByToken(callback,data){
		return this.call("../../apps/login/subcore/application/change_password_by_token.php",data,callback,false);
	}
	loginUser(callback,data){
		return this.call("../../apps/login/subcore/application/login_user.php",data,callback,false);
	}
}