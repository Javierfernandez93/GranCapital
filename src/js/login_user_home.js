 $(document).ready(function() {
	var path_api = "";

	if($("body #mail").val() != "")
		setTimeout(function() {$("#password").focus();})

	$('body').on('click', '#login_button_ok', function(e){
		login_tool();
		return false;
	});

	$('body').on('click', '#field_type', function(e){
	    if(e.keyCode == 13)
	    {
	    	$("#password").focus();
			return false;
	    }
	});

	$('body').on('keyup', '#password', function(e){
	    if(e.keyCode == 13)
	    {
	    	login_tool()
			return false;
	    }
	});

	$('body').on('click', '#login_button_cancel', function(e){
		history.back();
	});

	function login_tool()
	{
		if($("body #field_type").val() == "")
		{
			alert();
			var options = {"Ok": function(){ __closeMessage(); $("body #field_type").focus(); } };
			if($("body #field_type").attr('type') == 'email')
			__showMessage({"message": __Translate("The mail is incorrect. Please try again"), "options": options});
			else
			__showMessage({"message": __Translate("El número de socio es incorrecto. Por favor intente de nuevo"), "options": options});
			return false;
		}

		if($("body #password").val() == "")
		{
			var options = {"Ok": function(){ __closeMessage(); $("body #password").focus(); } };
			__showMessage({"message": __Translate("Enter the password. Please try again"), "options": options });
			return false;
		}


		var returnData = {
			data : {
				"password": $("body #password").val()
			},
			loader : {
				object : $("body #login_content"),
				message : "<div class='row text-center' style='margin-top:0px'> <img src='../../src/img/status.gif'><p>Accediendo a su cuenta</p></div>",
			},
			timeOut : 1500,
			async : false,
			loadOldObject : false,
			url : "../../apps/login/subcore/application/login_user.php",
		};

		if($("body #field_type").attr('type')=='email')
		returnData.data.mail = $("body #field_type").val();
		else
		returnData.data.company_id = $("body #field_type").val();

		var OldObject = $("body #login_content").html();

		__getJSONRequestNAsync(returnData,function(returnData){
			if(returnData.success == "1") {
				__loadDictionaryInStorage("spanish");
				window.location.href = "../backoffice/index.php";
			} else if(returnData.reason == "INACTIVE") {
				$("body #login_content").html(OldObject)
				var options = {"Ok": function(){ __closeMessage(); } };
				__showMessage({"message": __Translate("Sorry. This user is inactive. Please contact your sponsor"), "options": options });
			} else if(returnData.reason == "PASSWORD_NOT_MATCH") {
				$("body #login_content").html(OldObject)
				var options = {"Ok": function(){ __closeMessage(); $("body #password").val(""); $("body #password").focus(); } };
				__showMessage({"message": __Translate("The password is incorrect. Please try again"), "options": options });
			} else if(returnData.reason == "NOT_USER") {
				$("body #login_content").html(OldObject)
				var options = {"Ok": function(){ __closeMessage(); $("body #password").val(""); $("body #mail").focus(); } };
				__showMessage({"message": __Translate("El ID de asociado no existe o no es válido"), "options": options });
			} else if(returnData.success == "0") {
				$("body #login_content").html(OldObject)
				var options = {"Ok": function(){ __closeMessage(); $("body #password").val(""); $("body #password").focus(); } };
				__showMessage({"message": __Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"), "options": options });
			}
		});
	}
});