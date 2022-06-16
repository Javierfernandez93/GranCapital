$(document).ready(function(){
	let login = new Login;

	$("#password").keyup(function(e) {	    
	    e.preventDefault();
	    var code = (e.keyCode ? e.keyCode : e.which);
	    if (code==13) {
	        if(verifyall($("#user_login_id"),$("#user_login_id").data("type"),$("#user_login_id").data("minlenght"),$("#user_login_id").data("message"))){
				if(verifyall($("#password"),$("#password").data("type"),$("#password").data("minlenght"),$("#password").data("message"))){
					
					let user_login_id=$("#user_login_id").val();
					let password=$("#password").val();
					
					Loader.showLoader();
					login.verifyLogin((response)=>{
			 			Loader.closeLoader();
			 			if(response.s==1){
			 				window.location.href = "../backofficeClient/";
			 			}else if(response.s==0){
			 				alertmesage(response.r);
			 				$("#user_login_id").removeClass("inputSuccess").addClass("inputError").val("");
			 				$("#password").removeClass("inputSuccess").addClass("inputError").val("");
			 			}

			 			},{company_id:user_login_id,password:password}
			 		);
				}
			}
	    }
	   
	});

	$("#user_login_id").keyup(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
	    if (code==13) {
	    	e.preventDefault();
	    	$("#password").focus();
	    }
	});

	window.loginUser=function(){
		console.log("entre");
		if(verifyall($("#user_login_id"),$("#user_login_id").data("type"),$("#user_login_id").data("minlenght"),$("#user_login_id").data("message"))){
			if(verifyall($("#password"),$("#password").data("type"),$("#password").data("minlenght"),$("#password").data("message"))){
				
				let user_login_id=$("#user_login_id").val();
				let password=$("#password").val();
				
				Loader.showLoader();
				login.verifyLogin((response)=>{
		 			Loader.closeLoader();
		 			if(response.s==1){
			 			window.location.href = "../backofficeClient/";
		 			}else if(response.s==0){
		 				alertmesage(response.r);
		 				$("#user_login_id").removeClass("inputSuccess").addClass("inputError").val("");
		 				$("#password").removeClass("inputSuccess").addClass("inputError").val("");
		 			}

		 			},{company_id:user_login_id,password:password}
		 		);
			}
		}
	
	 }

});

class Login extends Http{
	verifyLogin(callback,data){
		return this.call("../../app/application/login_user_premium.php",data,callback,false);
	}
}