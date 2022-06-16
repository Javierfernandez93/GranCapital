$(document).ready(function(){
	mdc.autoInit();

	let files;
	let aIPhonet = new AIPhonet;
	let extraContent = new ExtraContent;
	let boxLoader = new BoxLoader;
	let checkField = new CheckField;
	let timeout = null;
	let choices = {};

	if(document.getElementById("init")) {
		document.getElementById("init").onload = getMySingleNetwork(false);
	}

	window.checkField = function(element,type,event,nextField) {
    checkField.init(element,type,event,nextField);
	}

	window.sendCodeToSeller = function(element,code_per_user_id) {
		aIPhonet.sendCodeToSeller((response)=>{
			if(response.s == 1) {
				getCodes();
			}
		},{code_per_user_id:code_per_user_id,seller_per_user_agency_id:$(element).parent().parent().find("#seller_per_user_agency_id :selected").val()});
	}

	window.sendMail = function(element,code_per_user_id) {

		if($("#"+code_per_user_id).hasClass("hiden"))
		{
			$(element).html("Listo enviar").removeClass("btn-primary").addClass("btn-success");
			$("#"+code_per_user_id).removeClass("hiden");
		} else {
			aIPhonet.sendCode((response)=>{
				if(response.s == 1)
				{
					getCodes();
				}
			},{code_per_user_id:code_per_user_id,email:$("#email-"+code_per_user_id).val()});
		}
	}

	window.getPaymentTab = function(buy_per_user_login_id) {
		aIPhonet.getPaymentTab((response)=>{
			if(response.s == 1) {
				switch(response.payment_method) {
					case 1:
						$(".box-container-inner").html(response.paypal_data);
					break;
					case 2:
						$(".box-container-inner").html(response.payment_html);
					break;
					case 3:
						$(".box-container-inner").html(response.payment_html);
						aIPhonet.makeBill((response)=>{
							if(response.success = 1) {
								$(".box-making-oxxo-payment").html(response.html);
							}
						},response.oxxo_response);
					break;
				} 
				// $(".box-container-inner").html(response.html);
			}
		},{buy_per_user_login_id:buy_per_user_login_id})
	}
	
	window.saveBankData = function(element) {
		saveBankData(element);
	}

	window.getMyBankAccount = function(element) {
		getMyBankAccount(element);
	}

	window.getGamers = function(element) {
		getGamers(element);
	}

	window.saveSeller = function(element) {
		saveSeller(element);
	}

	window.deleteSeller = function(element,seller_per_user_agency_id) {
		deleteSeller(element,seller_per_user_agency_id);
	}

	window.addSeller = function(element) {
		addSeller(element);
	}

	window.getMyNetwork = function(element) {
		getMyNetwork(element);
	}
	
	window.getSellers = function(element) {
		getSellers(element);
	}

	window.getMySingleNetwork = function(element) {
		getMySingleNetwork(element);
	}

	window.getSales = function(element) {
		getSales(element);
	}
	window.getCodes = function(element) {
		getCodes(element);
	}

	window.getTools = function(element) {
		getTools(element);
	}

	window.reloadPage = function() {
		location.reload();
	}

	window.registerBuy = function(buy_per_user_id) {
		let alert = alertCtrl.create({
	      title: "Registrar Fólio o Movimiento", 
	      subTitle: 'Ingresa el número de fólio o movimiento de la compra número <b>'+buy_per_user_id+'</b>',
          inputs: [
		        {
		          type: 'number',
		          name: 'payment_reference',
		          placeholder: 'Fólio o movimiento'
		        },
		        {
		          type: 'datetime-local',
		          name: 'date_reg',
		        },
		  ],
          buttons: [
        	{ 
            	text: "Registrar", 
            	handler: data => { 
            		aIPhonet.registerBuy((response)=>{
            			if(response.s == 1) {
            				getGamers();
            			}
            		},{date_reg:data.date_reg,buy_per_user_id:buy_per_user_id,payment_reference:data.payment_reference});
            	} 
        	},
        	{ 
            	text: "Cancelar", 
            	role: 'cancel', 
            	handler: data => { 
            	} 
        	},
        ]
	  });

	  alertCtrl.present(alert.modal);	
	}

	window.doRecharge = function() {
		if(!$(".package_per_user_login_id:checked").val()) {
			showMessage("Error","Debes de seleccionar un paquete. Intenta de nuevo");
			return false;
		}

		if(!$(".payment_method:checked").val()) {
			showMessage("Error","Debes de seleccionar un método de pago. Intenta de nuevo");
			return false;
		}

		if($(".package_per_user_login_id:checked").val() == 5 && !$("#recharge_amount").val()) {
			showMessage("Error","Debes ingresar un monto en dolares válido. Intenta de nuevo");
			return false;
		}

		let alert = alertCtrl.create({
	      title: "Aviso", 
	      subTitle: '¿Estás seguro de hacer esta compra?',
        	buttons: [
        	{ 
            	text: "Continuar", 
            	handler: data => { 
            		aIPhonet.doRecharge((response)=>{
            			if(response.s == 1) { 

            				switch(response.payment_method) {
            					case "1":
            						$(".box-container-inner").html(response.paypal_data);
            					break;
            					case "2":
            						$(".box-container-inner").html(response.payment_html);
            					break;
            					case "3":
            						$(".box-container-inner").html(response.payment_html);
            						aIPhonet.makeBill((response)=>{
            							if(response.success = 1) {
            								$(".box-making-oxxo-payment").html(response.html);
            							}
            						},response.oxxo_response);
            					break;
            				} 
            			}
            		},{amount:$("#recharge_amount").val(),payment_method:$(".payment_method:checked").val(),package_per_user_login_id:$(".package_per_user_login_id:checked").val()});
            	} 
        	},
        	{ 
            	text: "Cancelar", 
            	role: 'cancel', 
            	handler: data => { 
            	} 
        	},
        ]
	  });

	  alertCtrl.present(alert.modal);	
	}

	function getCodes(element) {
		aIPhonet.getCodes((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		});
	}	

	function getSales(element) {
		aIPhonet.getSales((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		});
	}

	function getMyBankAccount(element) {
		aIPhonet.getMyBankAccount((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		});
	}

	function saveBankData(element) {

		if(!$("#account").val())
		{
			showMessage("Error","Es necesario ingresar tu cuenta de banco.");
			return false;
		}
		if(!$("#bank").val())
		{
			showMessage("Error","Es necesario ingresar el nombre de tu banco.");
			return false;
		}
		// if(!$("#paypal_email").val())
		// {
		// 	showMessage("Error","Es necesario ingresar .");
		// 	return false;
		// }
		if(!$("#clabe").val())
		{
			showMessage("Error","Es necesario ingresar la CLABE de tu cuenta.");
			return false;
		}
		aIPhonet.saveBankData((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		},{account:$("#account").val(),bank:$("#bank").val(),paypal_email:$("#paypal_email").val(),clabe:$("#clabe").val()});
	}

	function getTools(element) {
		aIPhonet.getTools((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		},{});
	}

	function getGamers(element) {
		aIPhonet.getGamers((response)=>{
			if(response.s == 1)
			{
				$('.box-container').html(response.html)
			}
		},{});
	}

	window.getRecharge = function() {
		aIPhonet.getRecharge((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html)
			}
		});
	}

	window.saveChoiceSelection = function(choice_id,element) {
		aIPhonet.saveChoiceSelection((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html)
			}
		},{choices:choices});
	}

	window.selectChoice = function(choice_id,element) {
		$(element).html("Seleccionado").removeClass("btn-success").addClass("btn-info").attr("disabled");
		$(element).parent().parent().parent().parent().addClass("box-select-choice");

		choices[choice_id] = true;

		$("#save-participation").removeAttr("disabled");
	}

	window.showChoices = function() {
		aIPhonet.showChoices((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html);
			}
		});
	}

	function getMyNetwork(element) {
		aIPhonet.getMyNetwork((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html)
			} else if(response.r == "NOT_SUSCRIPTION") {
				getRecharge();
			} else if(response.r == "NEED_CHOICE") {
				showChoices();
			} else if(response.r == "NOT_FUT_EXPERTO_FREE") {
				showChoices();
			}
		});
	}

	function getSellers(element) {
		aIPhonet.getSellers((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html);
			}
		});
	}

	function deleteSeller(element,seller_per_user_agency_id) {
		$(element).html("Espere...");
		aIPhonet.deleteSeller((response)=>{
			if(response.s == 1) {
				getSellers(element);
			}
		},{seller_per_user_agency_id:seller_per_user_agency_id});
	}

	function addSeller(element) {
		$(element).html("Espere...");
		aIPhonet.addSeller((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html);
			}
		});
	}

	function saveSeller(element) {
		$(element).attr("disabled");
		aIPhonet.saveSeller((response)=>{
			$(element).removeAttr("disabled");
			if(response.s == 1) {
				getSellers(element);
			} else if(response.r == "INVALID_MAIL") {
				showMessage("Error","El correo proporcionado es incorrecto, intente otra vez.");
			} else if(response.r == "MAIL_ALREADY_EXIST") {
				showMessage("Error","El correo proporcionado ya está en uso.");
			}
		},{names:$("#names").val(),email:$("#email").val()});
	}

	function getMySingleNetwork(element) {
		aIPhonet.getMySingleNetwork((response)=>{
			if(response.s == 1) {
				$('.box-container').html(response.html)
			} else if(response.r == "NOT_SUSCRIPTION") {
				getRecharge();
			} else if(response.r == "NEED_CHOICE") {
				showChoices();
			} else if(response.r == "NOT_FUT_EXPERTO_GOLD") {
				getMyNetwork();
			}
		});
	}

	function showMessage(title,subTitle,_function) {
		let alert = alertCtrl.create({
	      title: title, 
	      subTitle: subTitle,
          buttons: [
        	{ 
            	text: translate('Aceptar'), 
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

class AIPhonet extends Http {
	constructor()
	{
		super();
		this.cost_per_marketing = false;
		this.cost_per_marketing_usd = false;
		this.offer = false;	
		// this.offer = {
		// 	title :false,
		// 	offer :false,
		// 	image :false,
		// };
		this.col_container_classes = null;
		this.options = {};
	}
	getTools(callback,data){
		return this.call('../../app/application/get_tools_agency.php',data,callback);
	}
	getGamers(callback,data){
		return this.call('../../app/application/get_gamers.php',data,callback);
	}
	sendCode(callback,data){
		return this.call('../../app/application/send_code_agency.php',data,callback);
	}
	registerBuy(callback,data){
		return this.call('../../app/application/register_buy.php',data,callback);
	}
	getPaymentTab(callback,data){
		return this.call('../../app/application/regenerate_saved_reload.php',data,callback);
	}
	makeBill(callback,data){
		return this.call('../../subcore/bcode/makeBill.php',data,callback,null,null,"GET");
	}
	doRecharge(callback,data){
		return this.call('../../app/application/save_buy.php',data,callback);
	}
	getCodes(callback,data){
		return this.call('../../app/application/get_codes_agency.php',data,callback);
	}
	getSales(callback,data){
		return this.call('../../app/application/get_sales_agency.php',data,callback);
	}
	getMyBankAccount(callback,data){
		return this.call('../../app/application/get_my_bank_account_agency.php',data,callback);
	}
	saveBankData(callback,data){
		return this.call('../../app/application/save_bank_data_agency.php',data,callback);
	}
	getRecharge(callback,data){
		return this.call('../../app/application/get_recharge.php',data,callback);
	}
	getMyNetwork(callback,data){
		return this.call('../../app/application/get_my_network.php',data,callback);
	}
	deleteSeller(callback,data){
		return this.call('../../app/application/delete_seller.php',data,callback);
	}
	sendCodeToSeller(callback,data){
		return this.call('../../app/application/send_code_to_seller.php',data,callback);
	}
	getSellers(callback,data){
		return this.call('../../app/application/get_sellers.php',data,callback);
	}
	saveSeller(callback,data){
		return this.call('../../app/application/save_seller.php',data,callback);
	}
	addSeller(callback,data){
		return this.call('../../app/application/add_sellers.php',data,callback);
	}
	getMySingleNetwork(callback,data){
		return this.call('../../app/application/get_my_single_network_agency.php',data,callback);
	}
	showChoices(callback,data){
		return this.call('../../app/application/show_choices.php',data,callback);
	}
	saveChoiceSelection(callback,data){
		return this.call('../../app/application/save_choice_selection.php',data,callback);
	}
	init(options){
		this.options = $.extend({}, this.defaults, options);
	}
};

class ExtraContent {
	constructor()
	{
		this.parent = false;
		this.element = false;
		this.time = 400;
	}
	setElements(element,parent){
		this.parent = parent;
		this.element = element;
	}
	toggle(callback){
		if($(this.element).hasClass('box-user-extra-content-hide'))
		{
			$(this.element).css({'display': 'inline-block'});
			$(this.element).removeClass('box-user-extra-content-hide').addClass('box-user-extra-content-show');
			$(this.element).animate({'position':'absolute','height':'200px','opacity':'1'},this.time)
		} else {
			$(this.element).removeClass('box-user-extra-content-show').addClass('box-user-extra-content-hide');
		}
		if(callback) callback();
	}
}