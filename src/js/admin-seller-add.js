$(document).ready(function(){
	let seller = new Seller;

	getSellerForm($("#response"));

	seller.setSeller(new DataSeller);

	function getSellerForm(element)
	{
		dinamicLoader.showLoader(element);

		seller.getSellerForm((response)=>{
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
		let dataSeller = seller.getSeller();
		let names = $(element).val();

		if(names)
		{
			dataSeller.setNames(names);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setLastName = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let last_name = $(element).val();

		dataSeller.setLastName($(element).val());

		if(last_name)
		{
			dataSeller.setLastName(last_name);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPassword = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let password = $(element).val();

		if(password)
		{
			dataSeller.setPassword(password);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setSurName = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let sur_name = $(element).val();

		if(sur_name)
		{
			dataSeller.setSurName(sur_name);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setAddress = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let address = $(element).val();

		if(address)
		{
			dataSeller.setAddress(address);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setColony = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let colony = $(element).val();

		if(colony)
		{
			dataSeller.setColony(colony);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setZipCode = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let zip_code = $(element).val();

		if(zip_code)
		{
			dataSeller.setZipCode(zip_code);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCity = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let city = $(element).val();

		if(city)
		{
			dataSeller.setCity(city);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setState = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let state = $(element).val();

		if(state)
		{
			dataSeller.setState(state);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setGender = function(element)
	{
		let dataSeller = seller.getSeller();
		let gender = $(element).val();

		if(gender)
		{
			dataSeller.setGender(gender);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setEmail = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let email = $(element).val();

		if(email && isValidMail(email))
		{
			dataSeller.setEmail(email);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setPhone = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let phone = $(element).val();

		if(phone)
		{
			dataSeller.setPhone(phone);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCellular = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let cellular = $(element).val();

		if(cellular)
		{
			dataSeller.setCellular(cellular);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.setCountryId = function(element,event,next_element)
	{
		let dataSeller = seller.getSeller();
		let country_id = $(element).val();

		if(country_id)
		{
			dataSeller.setCountryId(country_id);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		nextElement(element,event,next_element);
	}

	window.saveSeller = function(element)
	{
		let catalog_permissions = [];

		$(".catalog-permission").each((key,element)=>{
			if($(element).is(":checked"))
			{
				catalog_permissions.push($(element).val());
			}
		});

		dinamicLoader.showLoader(element);

		seller.saveSeller((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{catalog_permissions:catalog_permissions,seller:seller.getSeller()});
	}
});

class Seller extends Http
{
	constructor()
	{
		super();
		this.seller = null;
	}
	setSeller(seller)
	{
		this.seller = seller;
	}
	getSeller()
	{
		return this.seller;
	}
	getSellerForm(callback,data){
    	return this.call('../../app/application/get_seller_form_add.php',data,callback,false);
  	}
  	saveSeller(callback,data){
    	return this.call('../../app/application/save_seller.php',data,callback,false);
  	}
}