$(document).ready(function(){
	let admin = new Admin;

	getAdminFormEdit($("#default-loader"));

	admin.setAdmin(new DataAdmin);

	window.editAdmin = function(element)
	{
		dinamicLoader.show(element);

		let catalog_permissions = [];

		$(".catalog-permission").each((key,element)=>{
			catalog_permissions.push({
				catalog_permission_id : $(element).val(),
				enabled : $(element).is(":checked")
			});
		});

		admin.editAdmin((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{admin:admin.getAdmin(),catalog_permissions:catalog_permissions});
	}

	function getAdminFormEdit(element)
	{
		dinamicLoader.show(element);

		admin.getAdminFormEdit((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				
				admin.loadAdmin(response.admin);
			}
		},{user_support_id:getParam("usid")});
	}

	function setNames(element,event,next_element)
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

	window.setNames = function(element,event,next_element)
	{
		setNames(element,event,next_element);
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

		dataAdmin.setEmail($(element).val());

		if(dataAdmin)
		{
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

	window.saveSeller = function(element)
	{
		dinamicLoader.show(element);

		admin.saveSeller((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{seller:admin.getAdmin()});
	}
});

class Admin extends Http
{
	constructor()
	{
		super();
		this.admin = null;
	}
	loadAdmin(admin_attr)
	{
		let dataAdmin = this.getAdmin();

		dataAdmin.setUserSupportId(admin_attr.user_support_id);
		dataAdmin.setNames(admin_attr.names);
		dataAdmin.setLastName(admin_attr.last_name);
		dataAdmin.setSurName(admin_attr.sur_name);
		dataAdmin.setGender(admin_attr.gender);
		dataAdmin.setEmail(admin_attr.email);
		dataAdmin.setGender(admin_attr.gender);
		dataAdmin.setPhone(admin_attr.phone);
		dataAdmin.setCellular(admin_attr.cellular);
		dataAdmin.setAddress(admin_attr.address);
		dataAdmin.setCountryId(admin_attr.country_id);
		dataAdmin.setCity(admin_attr.city);
		dataAdmin.setColony(admin_attr.colony);
		dataAdmin.setZipCode(admin_attr.zip_code);
		dataAdmin.setState(admin_attr.state);
	}
	setAdmin(admin)
	{
		this.admin = admin;
	}
	getAdmin()
	{
		return this.admin;
	}
	getAdminFormEdit(callback,data){
    	return this.call('../../app/application/get_admin_form_edit.php',data,callback,false);
  	}
  	editAdmin(callback,data){
    	return this.call('../../app/application/edit_admin.php',data,callback,false);
  	}
}