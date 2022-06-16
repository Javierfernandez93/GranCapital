$(document).ready(function(){
	let user = new User;

	window.setEmail = function(element,event,next_element) 
	{
		setTimeout(()=>{
			let email = $(element).val();
			
			console.log([element,event,next_element,email])

			if(email)
			{
				user.setEmail(email);

				$(element).addClass("is-valid").removeClass("is-invalid");
			} else {
				$(element).addClass("is-invalid").removeClass("is-valid");
			}

			checkFields();

			nextElement(event,next_element);
		},100);
	}

	window.setPassword = function(element,event,next_element) 
	{
		setTimeout(()=>{
			let password = $(element).val();

			if(password)
			{
				user.setPassword(password);

				$(element).addClass("is-valid").removeClass("is-invalid");
			} else {
				$(element).addClass("is-invalid").removeClass("is-valid");
			}

			checkFields();

			nextElement(event,next_element,"login");
		});
	}

	function checkFields()
	{
		console.error(1)
		$("#login").attr("disabled",true);

		if(!user.getEmail())
		{
			console.error(2)
			return false;
		}

		if(!user.getPassword())
		{
			console.error(3)
			return false;
		}
		console.error(4)

		$("#login").removeAttr("disabled");
	} 

	function nextElement(event,next_element,_function) 
	{
		if(event.which == 13)
		{
			$(next_element).focus();

			if(_function == "login") {
				login($("#login"));
			}
		}
	}

	window.login = function(element) 
	{
		login(element);
	}

	function login(element) 
	{
		dinamicLoader.showLoader(element);

		user.login((response)=>{
			dinamicLoader.closeLoader(element);

			if(response.s == 1) 
			{
				location.reload();
			} else if(response.r == "INVALID_CREDENTIALS") {
				$("#password").focus();
				showMessage("Aviso","El correo o la contraseña son incorrectos. Intente de nuevo.");
			}

		},{password:user.getPassword(),email:user.getEmail()});
	}

	function showMessage(title,subTitle,_function) 
	{
		let alert = alertCtrl.create({
	      title: title, 
	      subTitle: subTitle,
          buttons: [
        	{ 
            	text: 'Aceptar', 
            	role: 'cancel', 
            	handler: data => { 
            		if(_function != undefined) _function();
            	} 
        	},
        ]
	  });

	  alertCtrl.present(alert.modal);
	}
});

class User extends Http {
	constructor()
	{
		super();
		this.email = null;
		this.password = null;
	}
	setEmail(email)
	{
		this.email = email;
	}
	getEmail()
	{
		return this.email;
	}
	setPassword(password)
	{
		this.password = password;
	}
	getPassword()
	{
		return this.password;
	}
	login(callback,data) {
		return this.call('../../app/application/admin_login.php',data,callback,false);
	}
}