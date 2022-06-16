$(document).ready(function(){
	let admin = new Admin;

	getAdminForm($("#response"));

	admin.setAdmin(new DataAdmin);

	function getAdminForm(element)
	{
		dinamicLoader.showLoader(element);

		admin.getAdminForm((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				addListeners();
			}
		});
	}

	function addListeners(argument) 
	{
		var options =  {
			placeholder: "(+00) 0000-0000",
		}
	    
	    $('.phone').mask('(+00) 0000-0000', options);
	}

	window.setNames = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setNames($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setLastName = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setLastName($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPassword = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setPassword($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setSurName = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setSurName($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setAddress = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setAddress($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setColony = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setColony($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setZipCode = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setZipCode($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCity = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setCity($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setState = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setState($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setGender = function(element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setGender($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setEmail = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();
		let email = $(element).val();

		if(email && isValidMail(email))
		{
			dataAdmin.setEmail(email);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPhone = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setPhone($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCellular = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setCellular($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCountryId = function(element,event,next_element)
	{
		let dataAdmin = admin.getAdmin();

		dataAdmin.setCountryId($(element).val());

		if(dataAdmin)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.saveAdmin = function(element)
	{
		let catalog_permissions = [];

		$(".catalog-permission").each((key,element)=>{
			if($(element).is(":checked"))
			{
				catalog_permissions.push($(element).val());
			}
		});

		dinamicLoader.showLoader(element);

		admin.saveAdmin((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{catalog_permissions:catalog_permissions,seller:admin.getAdmin()});
	}
});

class Admin extends Http
{
	constructor()
	{
		super();
		this.admin = null;
	}
	setAdmin(admin)
	{
		this.admin = admin;
	}
	getAdmin()
	{
		return this.admin;
	}
	getAdminForm(callback,data){
    	return this.call('../../app/application/get_admin_form_add.php',data,callback,false);
  	}
  	saveAdmin(callback,data){
    	return this.call('../../app/application/save_admin.php',data,callback,false);
  	}
}