$(document).ready(function(){

let Recovery=new recovery;
	
	window.recoveryPassword=function(){
		console.log($("#mail").val());
		if(!verifyall($("#mail"),$("#mail").data("type"),$("#mail").data("minlenght"),$("#mail").data("message")))
 			return false; 
 		else{
 			Loader.showLoader();
 			Recovery.mailExist((response)=>{
	 			Loader.closeLoader();
	 			if(response.s==1){
	 				Loader.showLoader();
	 				Recovery.recoveryPasswordByMail((response)=>{
	 					Loader.closeLoader();
	 					alertmesage(response.r);	
	 				},{mail:$("#mail").val()});
	 			}else{
	 				alertmesage(response.r);
	 			}
	 			
	 			},{mail:$("#mail").val()}
	 		);

 		}

	};

	$("#mail").keyup(function(e) {	    
	    e.preventDefault();
	    var code = (e.keyCode ? e.keyCode : e.which);
	    if (code==13) {
	        $(".btn-primary").click();
	    }
	   
	});

	window.validateToken=function(){

		if($("#token").val()!=''){
			Loader.showLoader();
			Recovery.validateToken((response)=>{
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

	window.setNewPassword=function(){

		if($('body #password').val()!=''){
			if($('body #reafirm_password').val()!=''){
				if($('body #password').val() == $('body #reafirm_password').val()){
					Loader.showLoader();
					Recovery.changePasswordByToken((response)=>{
						Loader.closeLoader();
						if(response.s==0)
							alertmesage(response.r);
						else{
							Loader.showLoader();
							Recovery.loginUser((response)=>{
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

class recovery extends Http{
	mailExist(callback,data){
		return this.call("../../apps/loginClient/subcore/application/mail_exist.php",data,callback,false);
	}
	recoveryPasswordByMail(callback,data){
		return this.call("../../apps/loginClient/subcore/application/recovery_password.php",data,callback,false);
	}
	validateToken(callback,data){
		return this.call("../../apps/loginClient/subcore/application/validate_token.php",data,callback,false);
	}
	changePasswordByToken(callback,data){
		return this.call("../../apps/loginClient/subcore/application/change_password_by_token.php",data,callback,false);
	}
	loginUser(callback,data){
		return this.call("../../apps/loginClient/subcore/application/login_user.php",data,callback,false);
	}

}