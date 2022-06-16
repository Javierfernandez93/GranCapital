$(document).ready(function(){
	$('#mail').focusout(function(){
		checkMail();
	});

	$('#nick_name').focusout(function(){
		checkUserName();
	});

	$("#btn-signup").click(function(){
		if (!checkMail())
			return false;
		if(!checkUserName())
			return false;
		if(!checkPassword())
			return false;
		var data = {
			'url' : '../../app/application/singup_user.php',
			'data' : {
				'mail' : $("#mail").val(),
				'user_name' : $('#nick_name').val(),
				'password' : $('#password').val(),
				'marketing' : '1'
			}
		};

		__getJSONRequestAsync(data,function(response){
			if(response.s == 1) {
				window.location.href = "../backoffice/welcome.php";

				// var data = {
				// 	'url' : '../../apps/signup/subcore/application/send_mail_to_signup.php',
				// };

				// __getJSONRequestAsync(data,function(response){

					// var returnData = {
					// 	timeOut : 0,
					// 	async : false,
					// 	url : "../../apps/backoffice/subcore/application/resend_confirmation_mail.php"
					// };

					// __getJSONRequestAsync(returnData,function(response){
						// if(response.success == 1)
						// {
						// 	var options = {"Aceptar": function(){
						// 			window.location.href = "../backoffice/";
						// 			__closeMessage();
						//  		}
						// 	};

						// 	__showMessage({message:'<div class="col-md-12"><h3>En breve recibirás un correo electrónico con la información para activar tu cuenta.</h3></div>',options:options});
						// }
					// });
				// });
			}
		});
	});

	function checkMail()
	{
		if(!isValidMail($('#mail').val()))
		{
			__showMessage('El correo proporcionado no es válido. Por favor intente de nuevo');
			$('#mail').val('');
			return false;
		}

		if(!IsUniqueMail($('#mail').val()))
		{
			__showMessage('El correo proporcionado ya está registrado. Por favor intente de nuevo');
			$('#mail').val('');
			return false;
		}
		return true;
	}
	function isValidMail(mail)
	{
	    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	    return pattern.test(mail);
	}
	function IsUniqueMail(mail)
	{
		var data = {
			'url' : 'subcore/application/verify_mail.php',
			'data' : {
				'mail' : mail,
			},
		};

		return __getJSONRequest(data)['success'];
	}
	function checkUserName()
	{
		if(!IsUniqueNickName($('#nick_name').val()))
		{
			__showMessage('El nombre de usuario ya está registrado. Por favor intente de nuevo');
			$('#nick_name').val('');
			return false;
		}
		if (!$('#nick_name').val())
		{
			__showMessage('Ingrese un nombre de usuario.');
			return false;
		}
		return true;
	}
	function checkPassword()
	{
		if (!$("#password").val())
		{
			__showMessage('Ingrese una contraseña.');
			return false;
		}
		if (!$("#reafirm_password").val())
		{
			__showMessage('Ingrese una confirmación de contraseña');
			return false;
		}
		if ($("#password").val() != $("#reafirm_password").val())
		{
			__showMessage('Las contraseñas no coinciden.');
			return false;
		}
		return true;
	}
	function IsUniqueNickName(nick_name)
	{
		var data = {
			'url' : 'subcore/application/verify_nick_name.php',
			'data' : {
				'nick_name' : nick_name,
			},
		};

		return __getJSONRequest(data)['success'];
	}
});