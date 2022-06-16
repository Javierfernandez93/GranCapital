load(()=>{
	let login = new Login;

	login.getCookieSessions((response)=>{
		if(response.s == 1)
		{
			$("#sessions-response").html(response.html);
		}
	});

	$("#password").keyup(function(e) 
	{	    
	    e.preventDefault();

	    login.checkFields();
	    
	    var code = (e.keyCode ? e.keyCode : e.which);

	    if(code == 13) 
	    {
			loginUser($("#login-user"),$("#email").val(),$("#password").val());
	    }
	   
	});

	$("#email").keyup(function(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		
		login.checkFields();

	    if (code==13) 
	    {
	    	e.preventDefault();
	    	$("#password").focus();
	    }
	});

	window.loginWithSession = function(element,email,password) 
	{
		loginUser(element,email,password)	
	}

	function loginUser(element,email,password)
	{	
		dinamicLoader.show($(element));

		login.loginUser((response)=>{
			dinamicLoader.close();

 			if(response.s == 1) 
 			{
 				$(element).text("Redireccionado a backoffice...");

 				setTimeout(()=>{
 					window.location.href = "../backoffice/";
 				},LONG_TIME);

 			} else if(response.s == 0) {
				if(response.r == "NOT_FIELD_SESSION_DATA")
				{
					$("#email").focus().select();

					_alert($("#feedback"),DANGER,"Debes de ungresar un correo. Intentalo de nuevo.");
				} else if(response.r == "NOT_PASSWORD") {
					$("#password").focus().select();

					_alert($("#feedback"),DANGER,"Debes de ingresar una contraseña. Intentalo de nuevo.");
				} else if(response.r == "INVALID_PASSWORD") {
					$("#password").focus().select();

					_alert($("#feedback"),DANGER,"Ingresaste una contraseña inválida. Intentalo de nuevo.");
				} else if(response.r == "NOT_FOUND_EMAIL") {
					$("#email").focus().select();

					_alert($("#feedback"),DANGER,"El correo que ingresaste es incorrecto. Intentalo de nuevo.");
				}
				 
 				$(element).text("Iniciar sesión").removeAttr("disabled");
 				
 				$("#email").removeClass("inputSuccess").addClass("inputError");
 				$("#password").removeClass("inputSuccess").addClass("inputError");
 			}

 		},{remember:$("#remember").prop("checked"),email:email,password:password});
	}

	window.loginUser = function(element)
	{
		loginUser(element,$("#email").val(),$("#password").val());
	 }
});

class Login extends Http {
	constructor()
	{
		super();
	}
	checkFields()
	{
		if($("#email").val())
		{
			if($("#password").val())
			{
				$("#login-user").removeAttr("disabled");
				return false;
			}
		} 
		
		$("#login-user").attr("disabled",true);
	}
	setHasEmail(has_email)
	{
		this.has_email = has_email;
	}
	setHasPassword(has_password)
	{
		this.has_password = has_password;
	}
	loginUser(callback,data){
		return this.call("../../apps/login/subcore/application/login_user.php",data,callback,false);
	}
	getCookieSessions(callback,data){
		return this.call("../../apps/login/subcore/application/get_cookie_sessions.php",data,callback,false);
	}
}