$(document).ready(function(){
	let seller = new Seller;

	getSellerFormEdit($("#response"));

	seller.setSeller(new DataSeller);

	window.deleteClient = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de eliminar éste cliente?",
	      buttons: [
	        { 
	            text: translate('Sí, eliminar'),
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	seller.deleteClient((response)=>{
						if(response.s == 1)
						{
							getClientList($("#response"));
						}
					},{user_login_id:user_login_id});
	            }              
	        },
	        { 
	            text: translate('Cancelar')	,
	            role: 'cancel', 
	            class: 'btn-light',
	            handler: data => {
	            	alert.modal.dismiss();
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}

	window.editSeller = function(element)
	{
		dinamicLoader.showLoader(element);

		let catalog_permissions = [];

		$(".catalog-permission").each((key,element)=>{
			catalog_permissions.push({
				catalog_permission_id : $(element).val(),
				enabled : $(element).is(":checked")
			});
		});


		seller.editSeller((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{seller:seller.getSeller(),catalog_permissions:catalog_permissions});
	}

	function getSellerFormEdit(element)
	{
		dinamicLoader.showLoader(element);

		seller.getSellerFormEdit((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				
				seller.loadSeller(response.seller);
			}
		},{user_support_id:getParam("usid")});
	}

	function setNames(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setNames($(element).val());

		if(dataSeller)
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
		let dataSeller = seller.getSeller();

		dataSeller.setLastName($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPassword = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setPassword($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setSurName = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setSurName($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setAddress = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setAddress($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setColony = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setColony($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setZipCode = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setZipCode($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCity = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setCity($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setState = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setState($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setGender = function(element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setGender($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setEmail = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setEmail($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPhone = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setPhone($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCellular = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setCellular($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCountryId = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();

		dataSeller.setCountryId($(element).val());

		if(dataSeller)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.saveSeller = function(element)
	{
		dinamicLoader.showLoader(element);

		seller.saveSeller((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{seller:seller.getSeller()});
	}
});

class Seller extends Http
{
	constructor()
	{
		super();
		this.seller = null;
	}
	loadSeller(seller_attr)
	{
		let dataSeller = this.getSeller();

		dataSeller.setUserSupportId(seller_attr.user_support_id);
		dataSeller.setNames(seller_attr.names);
		dataSeller.setLastName(seller_attr.last_name);
		dataSeller.setSurName(seller_attr.sur_name);
		dataSeller.setGender(seller_attr.gender);
		dataSeller.setEmail(seller_attr.email);
		dataSeller.setGender(seller_attr.gender);
		dataSeller.setPhone(seller_attr.phone);
		dataSeller.setCellular(seller_attr.cellular);
		dataSeller.setAddress(seller_attr.address);
		dataSeller.setCountryId(seller_attr.country_id);
		dataSeller.setCity(seller_attr.city);
		dataSeller.setColony(seller_attr.colony);
		dataSeller.setZipCode(seller_attr.zip_code);
		dataSeller.setState(seller_attr.state);
	}
	setSeller(seller)
	{
		this.seller = seller;
	}
	getSeller()
	{
		return this.seller;
	}
	getSellerFormEdit(callback,data){
    	return this.call('../../app/application/get_seller_form_edit.php',data,callback,false);
  	}
  	editSeller(callback,data){
    	return this.call('../../app/application/edit_seller.php',data,callback,false);
  	}
}