var unique_id = false;
$(document).ready(function(){
	// Country.init();
	$('body').on('change','#country_id',function() {
		Country.getProvider(2,{country_id:$('#country_id').val()},function(){
			location.reload();
		});
	});
	$(function () { $('[data-toggle="tooltip"]').tooltip() });
	Buy.getProvider(1,function(){
		$('.box-package-buy').eq(2).click();
	});
	$('#email').focusout(function() {
		if($('#email').val())
		{
			var returnData = {
				async : true,
				timeOut : 0,
				data : {
					email : $('#email').val()
				},
				loader : {
					object : $('.loader'),
					message : '<img style="width:16px;" src="../../src/img/status-green.gif">',
				},
				"url": "../../apps/home/subcore/application/valid_mail.php"
			};
			$('.loader').removeClass('hidden');
			__getJSONRequestNAsync(returnData, function(response){
				if(response.success == 1)
				{
					var returnData = {
						async : true,
						timeOut : 0,
						data : {
							email : $('#email').val()
						},
						loader : {
							object : $('.loader'),
							message : '<img src="../../src/img/loader_red.gif">',
						},
						"url": "../../apps/home/subcore/application/get_user_to_signup.php"
					};
					$('.loader').removeClass('hidden');
					__getJSONRequestNAsync(returnData, function(response){
						if(response.success == 1)
						{
							$('.loader').addClass('hidden');
							// $('#name').val(response.data.name);
						}
					});
				} else if(response.reason == 'ALREADY_EXIST') {
					$('#email').val('');
					$('.loader').addClass('hidden');
					var options = {
						'Ingresar' : function(){
							login(response.html);
						},
						'Intentar con otro correo' : function(){
							$('#email').val('').focus();__closeMessage();
						}
					};
					__showMessage({message:'El correo electrónico no esta disponible, ¿Quieres ingresar con este correo electrónico?',options:options});
				}
			});
		}
	});
	$('.btn-login-with-mail').click(function() {
		var returnData = {
			async : true,
			timeOut : 0,
			url: "../../apps/home/subcore/application/get_login_for_small.php"
		};
		__getJSONRequestNAsync(returnData, function(response){
			login(response.html);
		});
	});

	function login(html)
	{
		__closeMessage();
		var options = {
			'Aceptar' : function(){
				login_tool();
			},
			'Cancelar' : function(){
				__closeMessage();
			}
		};
		__showMessage({message:html,options:options});
	}
	$('body').on('click','.box-astropay-button',function() {
		if($('.box-astropay-method-selected').length > 0)
		{
			Checkout.getAstroPayPayment({bank_code:$('.box-astropay-method-selected').data('code')});
		} else {
			__showMessage('Seleccione un banco o tienda de conveniencia.');
		}
	});
	$('body').on('click','.box-astropay-method',function() {
		$('.box-astropay-method').removeClass('box-astropay-method-selected');
		$(this).addClass('box-astropay-method-selected');
	});
	$('.box-package-buy').click(function() {
		$('.box-package-buy').parent().removeClass('box-package-selected');
		$(this).parent().addClass('box-package-selected');
		Buy.add({id:$(this).data('id'),type:$(this).data('type'),ammount:1,offer:$(this).data('offer')});
	});

	function saveUser(callback)
	{
		if(!$('.method-selected').length)
		{
			__closeMessage();
			__showMessage('Selecciona que método de pago deseas');
			return false;
		}
		if(!$("#payment_agreement").is(":checked"))
		{
			 __closeMessage();
			__showMessage('Para continuar con tu compra, acepta los acuerdos de pago');
			return false;
		}

		if(!$('#email').val())
		{
			__showMessage('El correo electrónico es inválido');
			return false;
		}
		if(!$('#password').val())
		{
			__showMessage('El password es inválido');
			return false;
		}
		// if(!$('#phone').val())
		// {
		// 	__showMessage('El teléfono es inválido');
		// 	return false;
		// }
		if(!$('#name').val())
		{
			__showMessage('El nombre es inválido');
			return false;
		}
		// if(!$('#address').val())
		// {
		// 	__showMessage('La dirección es inválida');
		// 	return false;
		// }
		if(!$('#country_id').val())
		{
			__showMessage('El país es inválido');
			return false;
		}
		// if(!$('#zip_code').val())
		// {
		// 	__showMessage('El código postal es inválido');
		// 	return false;
		// }
		// if(!$('#colony').val())
		// {
		// 	__showMessage('La colonia es inválida');
		// 	return false;
		// }

		// if(!$('#city').val())
		// {
		// 	__showMessage('La ciudad es inválida');
		// 	return false;
		// }

		// if(!$('#state').val())
		// {
		// 	__showMessage('El estado es inválido');
		// 	return false;
		// }

		var sponsor_id = 2;

		if($('#sponsor_id').length) if($('#sponsor_id').val())
			sponsor_id = $('#sponsor_id').val();

		var returnData = {
			async : true,
			timeOut : 0,
			data : {
				email : $('#email').val(),
				password : $('#password').val(),
				phone : $('#phone').val(),
				name : $('#name').val(),
				address : $('#address').val(),
				zip_code : $('#zip_code').val(),
				colony : $('#colony').val(),
				city : $('#city').val(),
				state : $('#state').val(),
				country_id : $('#country_id').val(),
				sponsor_id : sponsor_id,
			},
			loader : {
				object : $('.loader'),
				message : 'Cargando',
			},
			"url": "../../apps/home/subcore/application/signuser_by_joinus.php"
		};
		$('.loader').removeClass('hidden');
		__getJSONRequestNAsync(returnData, function(response){
			if(response.success == 1)
			{
				callback();
			} else if(response.reason = 'NOT_EMAIL') {
				__showMessage('El correo electrónico es inválido');
			} else if(response.reason = 'INVALID_MAIL') {
				__showMessage('El correo electrónico esta repetido');
			}
		});
	}
	// });

	$('body').on('click','.box-payment-button',function(){
		$('.box-payment-button').removeClass('method-selected');
		$(this).addClass('method-selected');
		Buy.setPayMentMethodOnCheckout({payment_method:$(this).data('payment_method')},function(){
			$('.box-package-selected').find('.box-package-buy').click();
		});
	});
	$('body').on('click','.box-shipping-button',function(){
		$('.box-shipping-button').removeClass('box-shipping-button-selected');
		$(this).addClass('box-shipping-button-selected');
		Buy.setShippingOnCheckout({shipping:$(this).data('shipping')},function(){});
	});
	$('body').on('click','.button-pay-direct',function(){
		setBuyOrder();
	});
	$('body').on('click','.button-pay',function(){
		saveUser(function(){
			setBuyOrder();
		});
	});

	$('.delete').click(function(){
		var buy_per_user_login = $(this).data('buy_per_user_login');
		var options = {
			'Aceptar' : function()
			{
				deleteBuyPerUserLoginId(buy_per_user_login);
				__closeMessage();
			},
			'Cancelar' : function()
			{
				__closeMessage();
			}
		};
		__showMessage({message: '¿Desea cancelar la compra número <b>' + buy_per_user_login + '</b>?', options: options});
	});

	function setBuyOrder()
	{
		if(!$('.box-package-selected').length)
		{
			__closeMessage();
			__showMessage('Selecciona una suscripción');
			return;
		}
		if(!$('.method-selected').length)
		{
			__closeMessage();
			__showMessage('Selecciona que método de pago deseas');
			return;
		}
		if(!$("#payment_agreement").is(":checked"))
		{
			 __closeMessage();
			__showMessage('Para continuar con tu compra, acepta los acuerdos de pago');
			return;
		}
		Checkout.pay(function(response){
			$('.box-checkout').append(response.payment_html);
			$('.box-title-buy').html(response.header_html);

			if(response.payment_method == 3)
			{
				// Checkout.getOxxoBarCode(response.oxxo_data,function(data){});
				
				if(isMobile()){
					// solo creo el codigo 
					Checkout.getOxxoBarCode(response.oxxo_data,function(data){});
				}
				else{
					//viene de web 
					Checkout.getOxxoTicket(response.oxxo_data,function(data){});
					
				}



			} else if(response.payment_method == 6) {
				Checkout.getMerchatStoresTicket(response,function(data){
					$('.box-checkout').html(data.html);
				});
			}
		});
	}

	function isMobile() {try{ document.createEvent("TouchEvent"); return true; }catch(e){ return false; }}

	function getExpirationOffer(_this)
	{
		if(_this != undefined)
		{
			var days, hours, minutes, seconds;
			window["offer_" + $(_this).data('offer_id')] = setInterval($.proxy(function() {
				var current_date = new Date().getTime();
				var seconds_left = ($(_this).data('expire_date') - current_date) / 1000;

				if (seconds_left >= 0 )
				{
					seconds = Math.floor( (seconds_left) % 60 );
				    minutes = Math.floor( (seconds_left/60) % 60 );
				    hours = Math.floor( (seconds_left / (60*60)) % 24 );
				    days = Math.floor( seconds_left / (60*60*24) );

					$('.box-offer').html(
						'<div class="box-offer-days">' + ((days < 10 ) ? "0" + days : days) + '</div>' +
						'<div class="box-offer-hours">' + ((hours < 10 ) ? "0" + hours : hours) + '</div>' +
						'<div class="box-offer-minutes">' + ((minutes < 10) ? "0" + minutes : minutes) + '</div>' +
						'<div class="box-offer-seconds">' + ((seconds < 10) ? "0" + seconds : seconds) + '</div>'
					);
				} else {
					// this.StopCountdown();
					// this.ExpiredInvitation();
				}
			},this), 1000);
		}
	}
	function login_tool()
	{
		if($("body #field_type").val() == "")
		{
			var options = {"Ok": function(){ __closeMessage(); $("body #field_type").focus(); } };
			if($("body #field_type").attr('type') == 'email')
			__showMessage({"message": __Translate("The mail is incorrect. Please try again"), "options": options});
			else
			__showMessage({"message": __Translate("El número de socio es incorrecto. Por favor intente de nuevo"), "options": options});
			return false;
		}

		if($("body #password_box").val() == "")
		{
			var options = {"Ok": function(){ __closeMessage(); $("body #password_box").focus(); } };
			__showMessage({"message": __Translate("Enter the password. Please try again"), "options": options });
			return false;
		}

		var returnData = {
			data : {
				"password": $("body #password_box").val()
			},
			loader : {
				object : $("body .box-login"),
				message : "<di class='col-md-12' style='margin-top:20px'> <img width='32px' src='../../src/img/status.gif'><h3>Accediendo a su cuenta</h1></div>",
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

		var OldObject = $("body .box-login").html();

		__getJSONRequestNAsync(returnData,function(returnData){
			if(returnData.success == "1") {
				__loadDictionaryInStorage("spanish");
				location.reload();
			} else if(returnData.reason == "INACTIVE") {
				$("body #login_content").html(OldObject);
				var options = {"Ok": function(){ __closeMessage(); } };
				__showMessage({"message": __Translate("Sorry. This user is inactive. Please contact your sponsor"), "options": options });
			} else if(returnData.reason == "PASSWORD_NOT_MATCH") {
				$("body #login_content").html(OldObject);
				var options = {"Ok": function(){ __closeMessage(); $("body #password_box").val(""); $("body #password_box").focus(); } };
				__showMessage({"message": __Translate("The password is incorrect. Please try again"), "options": options });
			} else if(returnData.reason == "NOT_USER") {
				$("body #login_content").html(OldObject);
				var options = {"Ok": function(){ __closeMessage(); $("body #password_box").val(""); $("body #mail").focus(); } };
				__showMessage({"message": __Translate("El ID de asociado no existe o no es válido"), "options": options });
			} else if(returnData.success == "0") {
				$("body #login_content").html(OldObject);
				var options = {"Ok": function(){ __closeMessage(); $("body #password_box").val(""); $("body #password_box").focus(); } };
				__showMessage({"message": __Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"), "options": options });
			}
		});
	}

	function deleteBuyPerUserLoginId(buy_per_user_login)
	{

		var returnData = {
			data : {
				buy_per_user_login : buy_per_user_login,
			},
			url : '../../subcore/application/delete_purchase_by_user.php'
		};

		__getJSONRequestAsync(returnData, function(returnData) {
			if(returnData.success == 1)
			{
				document.location.reload(true);
			}
		});

		return false;
	}
});

var Buy = {
	urlProvider : {
		1 : {
		  object : "body .box-cart-detail",
		  callback : false,
		  delay : 600,
		  url : 'get_total_pay',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Tomando compra <br> <img style='width:22px;' src='../../src/img/status-white.gif'></div>",
		},
		2 : {
		  object : "body .box-cart-detail",
		  callback : 1,
		  delay : 600,
		  url : 'get_add_package',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Añadiendo item <br> <img style='width:22px;' src='../../src/img/status-white.gif'></div>",
		},
		5 : {
		  object : "body .box-cart-detail",
		  callback : 1,
		  delay : 600,
		  url : 'get_payment_method',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Modificando tipo de pago <br> <img style='width:22px;' src='../../src/img/status-white.gif'></div>",
		},
		6 : {
		  object : "body .box-cart-detail",
		  callback : 1,
		  delay : 600,
		  url : 'get_shipping',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Modificando envio <br> <img style='width:22px;' src='../../src/img/status-white.gif'></div>",
		},
		10 : {
		  object : "body .box-cart-detail",
		  callback : 1,
		  delay : 600,
		  url : 'get_payment_method',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='1200ms' data-wow-delay='0s'>Modificando tipo de pago <br> <img style='width:32px;' src='../../src/img/status-white.gif'></div>",
		},
		11 : {
		  object : "body .box-cart-detail",
		  callback : 1,
		  delay : 600,
		  url : 'get_shipping',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='1200ms' data-wow-delay='0s'>Modificando envio <br> <img style='width:32px;' src='../../src/img/status-white.gif'></div>",
		},
	},
	init : function(callback){
		this.start(callback);
	},
	add : function(data){
		var urlProvider = this.urlProvider[2];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	search : function(data){
		var urlProvider = this.urlProvider[12];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	del : function(data){
		var urlProvider = this.urlProvider[4];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	delOnCheckout : function(data,callback){
		var urlProvider = this.urlProvider[9];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	setPayMentMethodOnCheckout : function(data,callback){
		var urlProvider = this.urlProvider[10];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	setPayMentMethod : function(data){
		var urlProvider = this.urlProvider[5];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	setShipping : function(data){
		var urlProvider = this.urlProvider[6];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	setShippingOnCheckout : function(data,callback){
		var urlProvider = this.urlProvider[11];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	getProvider : function(urlProviderId,callback){
		if(urlProviderId != undefined)
			this.call(this.urlProvider[urlProviderId],callback);
	},
	start : function(callback){
		this.getProvider(0,callback);
	},
	call : function(data,callback){
		var returnData = {
			loader : {
				object : $(data.object),
				message : data.message,
			},
			timeOut : data.delay,
			async : false,
			loadOldObject : false,
			url : '../../apps/ewallet/subcore/application/'+data.url+'.php',
		};

		if(data.data != undefined) returnData.data = data.data;

		var OldObject = $(data.object).html();
			parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(response.success == 1)
			{
				$(data.object).html(response.html);

				if(data.callback !== false)
					parent.getProvider(data.callback);
			} else {
				if(response.html) $(data.object).html(response.html);
			}
			if(callback) callback();
		});
	}
};


var Checkout = {
	urlProvider : {
		1 : {
		  object : "body .box-checkout",
		  async : true,
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 0,
		  method : 'POST',
		  url : 'save_buy',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Generando Compra <br> <img style='width:32px;' src='../../src/img/status-gray.gif'></div>",
		},
		3 : {
		  object : "body .box-waiting-oxxo-ticket",
		  async : true,
		  callback : false,
		  path : '../../subcore/bcode/',
		  delay : 1000,
		  method : 'GET',
		  url : 'makeBill',
		  message : "Espera un momento estamos generando tu ticket<br><img style='width:32px' src='../../src/img/status-red.gif'>",
		},
		4 : {
		  async : true,
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 1000,
		  method : 'GET',
		  url : 'get_banwire',
		},
		5 : {
		  async : true,
		  object : "body .box-payment-card",
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 0,
		  method : 'POST',
		  url : 'get_openpay_charge',
		  message : "<div class='box-message wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'>Verificando datos <br> <img style='width:32px;' src='../../src/img/status-white.gif'></div>",
		},
		6 : {
		  async : true,
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 0,
		  method : 'POST',
		  url : 'get_merchat_stores_ticket',
		},
		7 : {
		  async : true,
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 0,
		  method : 'POST',
		  url : 'get_astropay_banks',
		},
		8 : {
		  async : false,
		  callback : false,
		  object : "body .box-astropay",
		  path : '../../apps/ewallet/subcore/application/',
		  message : "<div class='box-message-astropay wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'> Espere un momento estamos generando su enlace seguro <br> <img style='width:32px;' src='../../src/img/status-red-wine.gif'></div>",
		  delay : 2000,
		  method : 'POST',
		  url : 'make_astropay_payment',
		},
		9 : {
		  object : "body .box-waiting-oxxo-ticket",
		  async : true,
		  callback : false,
		  path : '../../apps/ewallet/subcore/application/',
		  delay : 1000,
		  method : 'GET',
		  url : 'make_code_oxxo',
		  message : "Espera un momento estamos generando tu ticket<br><img style='width:32px' src='../../src/img/status-red.gif'>",
		},
	},
	pay : function(callback){
		this.getProvider(1,callback);
	},
	checkUniqueId : function(data){
		var urlProvider = this.urlProvider[2];
		    urlProvider.data = data;

		this.call(urlProvider);
	},
	getOpenPayCharge : function(data,callback){
		var urlProvider = this.urlProvider[5];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getAstroPayPayment : function(data,callback){
		var urlProvider = this.urlProvider[8];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getAstroPayPaymentMethods : function(data,callback){
		var urlProvider = this.urlProvider[7];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getBanwireTicket : function(data,callback){
		var urlProvider = this.urlProvider[4];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getMerchatStoresTicket : function(data,callback){
		var urlProvider = this.urlProvider[6];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getOxxoTicket : function(data,callback){
		var urlProvider = this.urlProvider[3];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getOxxoBarCode : function(data,callback){
		var urlProvider = this.urlProvider[9];
		    urlProvider.data = data;

		this.call(urlProvider,callback);
	},
	getProvider : function(urlProviderId,callback){
		if(urlProviderId != undefined)
			this.call(this.urlProvider[urlProviderId],callback);
	},
	call : function(data,callback){
		var returnData = {
			loader : {
				object : $(data.object),
				message : data.message,
			},
			timeOut : data.delay,
			method : data.method,
			async : data.async,
			loadOldObject : false,
			url : data.path+data.url+'.php',
		};

		if(data.data != undefined) returnData.data = data.data;

		var OldObject = $(data.object).html();
			parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(response.success == 1)
			{
				if(response.unique_id != undefined) unique_id = response.unique_id;

				$(data.object).html(response.html);

				if(data.callback !== false)
					parent.getProvider(data.callback);
			} else {
				if(response.html) $(data.object).html(response.html);
			}
			if(callback) callback(response);
		});
	}
};


var Country = {
	urlProvider : {
		0 : {
		  object : "body .box-country",
		  async : false,
		  callback : false,
		  delay : 0,
		  url : 'get_all_countries',
		  message : "<div class='box-saving-country'>Cargando los paises</h3> <img style='width:22px;' src='../../src/img/status.gif'></div>",
		},
		1 : {
		  object : "body .box-country-data",
		  async : false,
		  callback : false,
		  delay : 2000,
		  url : 'get_country_by_country_id',
		  message : "<div class='box-saving-country'>Cargando su país <img style='width:12px;' src='../../src/img/status-gray.gif'></div>",
		},
		2 : {
		  object : "body .box-country",
		  async : false,
		  callback : false,
		  delay : 0,
		  url : 'save_country_id_cookie',
		  message : "<div class='box-saving-country'>Guardando su país <img style='width:12px;' src='../../src/img/status-gray.gif'></div>",
		},
	},
	init : function(callback){
		this.getProvider(0,false,callback);
	},
	getProvider : function(urlProviderId,data,callback){
		if(urlProviderId != undefined)
		{
			var urlProvider = this.urlProvider[urlProviderId];
			if(data != undefined) urlProvider.data = data;
			this.call(urlProvider,callback);
		}
	},
	call : function(data,callback){
		var returnData = {
			loader : {
				object : $(data.object),
				message : data.message,
			},
			timeOut : data.delay,
			async : data.async,
			loadOldObject : false,
			url : '../../apps/ewallet/subcore/application/'+data.url+'.php',
		};

		if(data.data != undefined) returnData.data = data.data;

		var OldObject = $(data.object).html();
			parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(response.success == 1)
			{
				if(response.unique_id != undefined) unique_id = response.unique_id;

				$(data.object).html(response.html);

				if(data.callback !== false) parent.getProvider(data.callback);
			} else {
				if(response.html) $(data.object).html(response.html);
			}
			if(callback) callback(response);
		});
	}
};