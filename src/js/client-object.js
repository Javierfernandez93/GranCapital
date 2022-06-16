/* constants */
const user_address = 'user_address';
const user_address_work = 'user_address_work';

const CLIENT = 1;
const REFERENCE = 2;
const AVAL = 5;

const MALE = 'male';
const FEMALE = 'female';

class Client extends Http
{
	constructor()
	{
		super();
		this.clients = [];
	}
	loadClient(client_attr,id)
	{
		let dataClient = this.getClient(id);

		dataClient.setUserLoginId(client_attr.user_login_id);
		dataClient.setNames(client_attr.names);
		dataClient.setLastName(client_attr.last_name);
		dataClient.setSurName(client_attr.sur_name);
		dataClient.setGender(client_attr.gender);
		dataClient.setBirthday(client_attr.birthday);
		dataClient.setEmail(client_attr.email);
		dataClient.setGender(client_attr.gender);
		dataClient.setPhone(client_attr.phone);
		dataClient.setCellular(client_attr.cellular);

		if(dataClient.getCatalogUserTypeId() == CLIENT)
		{
			dataClient.getAddressTable(user_address_work).setAddress(client_attr.user_address_work.address);
			dataClient.getAddressTable(user_address_work).setCountryId(client_attr.user_address_work.country_id);
			dataClient.getAddressTable(user_address_work).setCity(client_attr.user_address_work.city);
			dataClient.getAddressTable(user_address_work).setColony(client_attr.user_address_work.colony);
			dataClient.getAddressTable(user_address_work).setZipCode(client_attr.user_address_work.zip_code);
			dataClient.getAddressTable(user_address_work).setState(client_attr.user_address_work.state);
		}

		if(client_attr.requirement_files_per_user.length > 0)
		{
			client_attr.requirement_files_per_user.forEach((requirement_file_per_user,key)=>{
				let requirementFilePerUser = new RequirementFilePerUser(requirement_file_per_user.catalog_requirement_file_id);
				
				requirementFilePerUser.setRequirementFilePerUserId(requirement_file_per_user.requirement_file_per_user_id);
				requirementFilePerUser.setDescription(requirement_file_per_user.description);
				requirementFilePerUser.setImage(requirement_file_per_user.image);

				dataClient.requirement_files_per_user.add(requirementFilePerUser);
			});	
		}
		
		dataClient.getAddressTable(user_address).setAddress(client_attr.user_address.address);
		dataClient.getAddressTable(user_address).setCountryId(client_attr.user_address.country_id);
		dataClient.getAddressTable(user_address).setCity(client_attr.user_address.city);
		dataClient.getAddressTable(user_address).setColony(client_attr.user_address.colony);
		dataClient.getAddressTable(user_address).setZipCode(client_attr.user_address.zip_code);
		dataClient.getAddressTable(user_address).setState(client_attr.user_address.state);
	}
	getClients()
	{
		return this.clients;
	}
	getClient(id)
	{
		if(this.clients[id] != undefined)
		{
			return this.clients[id];
		}
	}
	addClient(DataClient)
	{
		this.clients.push(DataClient);
	}
	getClientFormAdd(callback,data){
    	return this.call('../../app/application/get_client_form_add.php',data,callback,false);
  	}
  	saveClient(callback,data){
    	return this.call('../../app/application/save_client.php',data,callback,false,0,POST);
  	}
  	editClient(callback,data){
    	return this.call('../../app/application/edit_client.php',data,callback,false,0,POST);
  	}
  	uploadImageRequirementFile(callback,data,progress){
    	return this.callFile('../../app/application/upload_image_requirement_file.php',data,callback,progress);
  	}
  	getClientFormEdit(callback,data){
    	return this.call('../../app/application/get_client_form_edit.php',data,callback,false);
  	}
}

class RequirementFilesPerUser
{
	constructor()
	{
		this.requirement_files_per_user = [];
	}
	getRequirementFilePerUser(catalog_requirement_file_id)
	{
		let key = this.getRequirementFilePerUserKey(catalog_requirement_file_id);
		let requirementFilePerUser = null;
		
		if(key != null)
		{
			requirementFilePerUser = this.requirement_files_per_user[key];
		} else {
			requirementFilePerUser = new RequirementFilePerUser(catalog_requirement_file_id);

			this.add(requirementFilePerUser);
		}

		return requirementFilePerUser;
	}
	add(requirementFilePerUser)
	{
		this.requirement_files_per_user.push(requirementFilePerUser);
	}
	getRequirementFilePerUserKey(catalog_requirement_file_id)
	{
		let key = null;

		this.requirement_files_per_user.forEach((requirement_file_per_user,_key)=>{
			if(requirement_file_per_user.catalog_requirement_file_id == catalog_requirement_file_id)
			{
				key = _key;
			}
		});

		return key;
	}
}

class RequirementFilePerUser
{
	constructor(catalog_requirement_file_id)
	{
		this.requirement_file_per_user_id = null
		this.catalog_requirement_file_id = null
		this.image = null
		this.description = null

		this.setCatalogRequirementFileId(catalog_requirement_file_id);
	}
	setRequirementFilePerUserId(requirement_file_per_user_id)
	{
		this.requirement_file_per_user_id = requirement_file_per_user_id;
	}
	setCatalogRequirementFileId(catalog_requirement_file_id)
	{
		this.catalog_requirement_file_id = catalog_requirement_file_id;
	}
	getCatalogRequirementFileId()
	{
		return this.catalog_requirement_file_id;
	}
	setImage(image)
	{
		this.image = image;
	}
	getRequirementFilePerUserId()
	{
		return this.requirement_file_per_user_id;
	}
	getImage()
	{
		return this.image;
	}
	setDescription(description)
	{
		this.description = description;
	}
	getDescription()
	{
		return this.description;
	}
}

class UserAddress {
	constructor()
	{
		this.address = null;
		this.city = null;
		this.zip_code = null;
		this.colony = null;
		this.state = null;
		this.country_id = 159; // DEFAULT MX
	}
	setAddress(address)
	{
		this.address = address;
	}
	setCity(city)
	{
		this.city = city;
	}
	setZipCode(zip_code)
	{
		this.zip_code = zip_code;
	}
	setColony(colony)
	{
		this.colony = colony;
	}
	setState(state)
	{
		this.state = state;
	}
	setCountryId(country_id)
	{
		this.country_id = country_id;
	}
	getAddress()
	{
		return this.address;
	}
	getCity()
	{
		return this.city;
	}
	getZipCode()
	{
		return this.zip_code;
	}
	getColony()
	{
		return this.colony;
	}
	getState()
	{
		return this.state;
	}
	getCountryId()
	{
		return this.country_id;
	}
}

class DataClient
{
	constructor(catalog_user_type_id)
	{
		this.user_login_id = null;
		this.names = null;
		this.last_name = null;
		this.sur_name = null;
		this.gender = null;
		this.email = null;
		this.phone = null;
		this.birthday = null;
		this.cellular = null;
		
		this.catalog_user_type_id = null;

		this.requirement_files_per_user = new RequirementFilesPerUser;
		this.user_address = new UserAddress;

		if(catalog_user_type_id == CLIENT)
		{
			this.user_address_work = new UserAddress;
		}

		this.setGender(MALE);
		this.setCatalogUserTypeId(catalog_user_type_id);
	}
	getAddressTable(table)
	{
		if(table == user_address)
		{
			return this.user_address;
		} else if(table == user_address_work) {
			return this.user_address_work;
		}
	}
	getUserLoginId()
	{
		return this.user_login_id;
	}
	getNames()
	{
		return this.names;
	}
	getLastName()
	{
		return this.last_name;
	}
	getSurName()
	{
		return this.sur_name;
	}
	getGender()
	{
		return this.gender;
	}
	getPhone()
	{
		return this.phone;
	}
	getCellular()
	{
		return this.cellular;
	}
	getEmail()
	{
		return this.email;
	}
	getBirthday()
	{
		return this.birthday;
	}
	getCatalogUserTypeId()
	{
		return this.catalog_user_type_id;
	}
	setUserLoginId(user_login_id)
	{
		this.user_login_id = user_login_id;
	}
	setNames(names)
	{
		this.names = names;
	}
	setLastName(last_name)
	{
		this.last_name = last_name;
	}
	setSurName(sur_name)
	{
		this.sur_name = sur_name;
	}
	setCatalogUserTypeId(catalog_user_type_id)
	{
		this.catalog_user_type_id = catalog_user_type_id;
	}
	setBirthday(birthday)
	{
		this.birthday = birthday;
	}
	setGender(gender)
	{
		this.gender = gender;
	}
	setEmail(email)
	{
		this.email = email;
	}
	setPhone(phone)
	{
		this.phone = phone;
	}
	setCellular(cellular)
	{
		this.cellular = cellular;
	}
}

class Singature extends Http
{
	constructor()
	{
		super();
		this.id = null;
		this.catalog_requirement_file_id = null;
	}
	getId()
	{
		return this.id;
	}
	getCatalogRequirementFileId()
	{
		return this.catalog_requirement_file_id;
	}
	setId(id)
	{
		this.id = id;
	}
	setCatalogRequirementFileId(catalog_requirement_file_id)
	{
		this.catalog_requirement_file_id = catalog_requirement_file_id;
	}
	getSignatureForm(callback,data){
    	return this.call('../../app/application/get_signature_form.php',data,callback,false);
    }
	saveSignature(callback,data){
    	return this.call('../../app/application/save_signature.php',data,callback,false,null,POST);
    }
}

let client = new Client;
let signature = new Singature;
let canvas = null;
let signaturePad = null;

client.addClient(new DataClient(CLIENT));

client.addClient(new DataClient(AVAL));
client.addClient(new DataClient(AVAL));

client.addClient(new DataClient(REFERENCE));
client.addClient(new DataClient(REFERENCE));

function addListeners(argument) 
{   
    $('.phone').mask('(+00) 0000-0000', {
		placeholder: "(+00) 0000-0000",
	});
}

window.setDescription = function(element,id,catalog_requirement_file_id)
{
	let dataClient = client.getClient(id);

	let requirementFilePerUser = dataClient.requirement_files_per_user.getRequirementFilePerUser(catalog_requirement_file_id);

	requirementFilePerUser.setDescription($(element).val());
}

window.uploadFile = function(id,catalog_requirement_file_id)
{
	let dataClient = client.getClient(id);
	let card = $(".card[data-catalog_requirement_file_id='"+catalog_requirement_file_id+"'][data-id='"+id+"']");
	let files = $(card).find("input[type='file']").prop('files');

	var form_data = new FormData();

	form_data.append("file", files[0]);
	form_data.append("catalog_requirement_file_id", catalog_requirement_file_id);

	$(card).find('.card-footer').removeClass("d-none");

	client.uploadImageRequirementFile((response)=>{
		if(response.s == 1)
		{
			let requirementFilePerUser = dataClient.requirement_files_per_user.getRequirementFilePerUser(catalog_requirement_file_id);
			requirementFilePerUser.setImage(response.target_path);
			    
			$(card).css('background-image',"url("+response.target_path+")");
			$(card).find('.info').addClass("d-none");
		}
	},form_data,$(card).find(".progress-bar"));
}

window.setNames = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setNames($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setLastName = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setLastName($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setSurName = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setSurName($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setAddress = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setAddress($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setColony = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setColony($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setZipCode = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setZipCode($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setCity = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setCity($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setState = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setState($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setGender = function(element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setGender($(element).val());
}

window.setBirthday = function(element,next_element,id)
{
	let dataClient = client.getClient(id);
	let birthday = $(element).val();

	dataClient.setBirthday(birthday);

	$(element).removeClass("is-invalid").addClass("is-valid");

	nextElement(element,event,next_element);
}

window.setEmail = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);
	let email = $(element).val();

	if(isValidMail(email))
	{
		dataClient.setEmail(email);

		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		dataClient.setEmail(null);

		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setPhone = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setPhone($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setCellular = function(element,event,next_element,id)
{
	let dataClient = client.getClient(id);

	dataClient.setCellular($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

window.setCountryId = function(element,event,next_element,id,table)
{
	let dataClient = client.getClient(id);

	dataClient.getAddressTable(table).setCountryId($(element).val());

	if($(element).val())
	{
		$(element).removeClass("is-invalid").addClass("is-valid");
	} else {
		$(element).removeClass("is-valid").addClass("is-invalid");
	}

	nextElement(element,event,next_element);
}

/* signature methods */

function getSignatureForm(id,catalog_requirement_file_id)
{
	$(".overlay").removeClass("d-none");

	signature.getSignatureForm((response) => {
		signature.setId(id);
		signature.setCatalogRequirementFileId(catalog_requirement_file_id);

		if(response.s == 1)
		{
			$("#response-signature").html(response.html);

			initSignaturePad();
		}
	},{user_login_id:getParam('user_login_id')});
}

function initSignaturePad()
{
	canvas = document.querySelector("canvas");
	
	signaturePad = new SignaturePad(canvas, {
		backgroundColor: 'rgb(255, 255, 255)'
	}); 

	function resizeCanvas() {
		var ratio =  Math.max(window.devicePixelRatio || 1, 1);

		canvas.width = canvas.offsetWidth * ratio;
		canvas.height = canvas.offsetHeight * ratio;
		canvas.getContext("2d").scale(ratio, ratio);
		// signaturePad.clear();
	}

	window.onresize = resizeCanvas;

	resizeCanvas();

	window.clearSignature = function()
	{
		signaturePad.clear();
	}

	window.saveSignature = function()
	{
		let dataClient = client.getClient(signature.getId());

		let card = $(".card[data-catalog_requirement_file_id='"+signature.getCatalogRequirementFileId()+"'][data-id='"+signature.getId()+"']");

		if (signaturePad.isEmpty() == false) 
		{
			signature.saveSignature((response)=>{

				$(".overlay").addClass("d-none");

				if(response.s == 1)
				{
					let requirementFilePerUser = dataClient.requirement_files_per_user.getRequirementFilePerUser(signature.getCatalogRequirementFileId());
					requirementFilePerUser.setImage(response.target_path);
						
					$(card).css('background-image',"url("+response.target_path+")");
					$(card).find('.info').addClass("d-none");
				}
			},{singature:signaturePad.toDataURL()});
		}
	}

	window.undoSignature = function()
	{
		var data = signaturePad.toData();

		if (data) {
			data.pop(); // remove the last dot or line
			signaturePad.fromData(data);
		}
	}	
}

// getClientFormEdit($("#response"));

// function getClientFormEdit(element)
// {
// 	dinamicLoader.showLoader(element);

// 	client.getClientFormEdit((response)=>{
// 		dinamicLoader.closeLoader();

// 		if(response.s == 1)
// 		{
// 			$("#response").html(response.html);

// 			console.log({response:response,client:client});

// 			client.loadClient(response.client,0);

// 			response.avals.forEach((aval,key)=>{
// 				client.loadClient(aval,key+1);
// 			});

// 			response.beneficiaries.forEach((beneficiary,key)=>{
// 				client.loadClient(beneficiary,key+3);
// 			});
// 			addListeners();
// 		}
// 	},{user_login_id:getParam("ulid")});
// }

window.openSignatureForm = function()
{
	console.log(1)
}

window.editClient = function(element,rediction_to_loan)
{
	client.editClient((response)=>{
		if(response.s == 1)
		{
			$("#response").html(response.html);

			if(rediction_to_loan)
			{
				window.location.href = "../../apps/admin-loan/add?ulid="+getParam("ulid");
			}
		}
	},{clients:client.getClients()});
}