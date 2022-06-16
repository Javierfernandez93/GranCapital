$(document).ready(function(){
	Country.init();

	$('.date').datepicker({
	    maxViewMode: 3,
	    language: "es",
	    todayHighlight: true,
	    orientation: "bottom auto",
	    autoclose: true
	});

	$('body').on('click','.button-delete-file',function(e){
		Campaign.deleteCampaignFile({},function(){
			location.reload();
		});
	});
	
	$('body').on('click','[data-anclain_id]',function(e){
		var target_id = $(this).data('anclain_id');

		if($('[data-target_id="'+target_id+'"]').hasClass('hidden'))
			$('[data-target_id="'+target_id+'"]').removeClass('hidden');
	    else
			$('[data-target_id="'+target_id+'"]').addClass('hidden');

	});

	$('body').on('click','.save-campaign-country-data',function(){
		if(!$('#country_id').val())
		{
			__showMessage('Por favor seleccione un país');
			$('#country_id').focus();
			return false;
		}

		if(!$('#city').val())
		{
			__showMessage('Por favor llene el campo de ciudad');
			$('#city').focus();
			return false;
		}

		if(!$('#street').val())
		{
			__showMessage('Por favor llene el campo de dirección');
			$('#street').focus();
			return false;
		}
		var data = {
            'country_id' : $('#country_id').val(),
            'city' : $('#city').val(),
            'street' : $('#street').val(),
		};

		Campaign.saveUpload(data,function(){
		});

	});

	$('body').on('click','.save-campaign',function(){
		if(!$('#business_name').val())
		{
			__showMessage('Por favor llene el campo de nombre del negocio');
			$('#business_name').focus();
			return false;
		}
		if(!$('#reason_social').val())
		{
			__showMessage('Por favor llene el campo de razón social');
			$('#reason_social').focus();
			return false;
		}
		if(!$('#contact_name').val())
		{
			__showMessage('Por favor llene el campo de nombre del contacto');
			$('#contact_name').focus();
			return false;
		}
		if(!$('#contact_phone').val())
		{
			__showMessage('Por favor llene el campo de teléfono del contacto');
			$('#contact_phone').focus();
			return false;
		}
		if(!$('#contact_email').val())
		{
			__showMessage('Por favor llene el campo de correo electrónico del contacto');
			$('#contact_email').focus();
			return false;
		}
		if(!$('#campaign_gift').val())
		{
			__showMessage('Por favor seleccione los regalos para la campaña');
			$('#campaign_gift').focus();
			return false;
		}
		if(!$('#campaign_gift_description').val())
		{
			__showMessage('Por favor llene el campo de descripción de regalo(s)');
			$('#campaign_gift_description').focus();
			return false;
		}
		if(!$('#campaign_visit_point').val())
		{
			__showMessage('Por favor llene el campo de puntos por visitar');
			$('#campaign_visit_point').focus();
			return false;
		}
		if(!$('#campaign_signup').val())
		{
			__showMessage('Por favor llene el campo de puntos por registrarse');
			$('#campaign_signup').focus();
			return false;
		}
		if(!$('#campaign_share_signup').val())
		{
			__showMessage('Por favor llene el campo de puntos por compartir');
			$('#campaign_share_signup').focus();
			return false;
		}
		if(!$('#campaign_facebook').val())
		{
			__showMessage('Por favor llene el campo de puntos por compartir en facebook');
			$('#campaign_facebook').focus();
			return false;
		}
		if(!$('#campaign_social_network').val())
		{
			__showMessage('Por favor llene el campo de puntos por compartir en redes sociales');
			$('#campaign_social_network').focus();
			return false;
		}
		// if(!$('#campaign_link_prospect').val())
		// {
		// 	__showMessage('Por favor llene el campo de ');
			// $('#campaign_link_prospect').focus();
		// 	return false;
		// }
		// if(!$('#campaign_mail_offer').val())
		// {
		// 	__showMessage('Por favor llene el campo de ');
			// $('#campaign_mail_offer').focus();
		// 	return false;
		// }
		// if(!$('#campaign_mail_promo').val())
		// {
		// 	__showMessage('Por favor llene el campo de ');
			// $('#campaign_mail_promo').focus();
		// 	return false;
		// }
		// if(!$('#campaign_mail_coupon').val())
		// {
		// 	__showMessage('Por favor llene el campo de ');
			// $('#campaign_mail_coupon').focus();
		// 	return false;
		// }
		// if(!$('#campaign_link_coupon_promo').val())
		// {
		// 	__showMessage('Por favor llene el campo de ');
			// $('#campaign_link_coupon_promo').focus();
		// 	return false;
		// }
		if(!$('#campaign_start').val())
		{
			__showMessage('Por favor llene el campo de la fecha de inicio de campaña');
			$('#campaign_start').focus();
			return false;
		}
		if(!$('#campaign_end').val())
		{
			__showMessage('Por favor llene el campo de la fecha de fin de campaña');
			$('#campaign_end').focus();
			return false;
		}
		if(!$('#create_date').val())
		{
			__showMessage('Por favor llene el campo de la fecha de creación de campaña');
			$('#create_date').focus();
			return false;
		}
		if(!$('#autorization_name').val())
		{
			__showMessage('Por favor llene el campo de nombre de autorización');
			$('#autorization_name').focus();
			return false;
		}
		if(!$('#autorization_job_position').val())
		{
			__showMessage('Por favor llene el campo de puesto de autorización');
			$('#autorization_job_position').focus();
			return false;
		}

		if(!$('#country_id').val())
		{
			__showMessage('Por favor seleccione un país');
			$('#country_id').focus();
			return false;
		}

		if(!$('#city').val())
		{
			__showMessage('Por favor llene el campo de ciudad');
			$('#city').focus();
			return false;
		}

		if(!$('#street').val())
		{
			__showMessage('Por favor llene el campo de dirección');
			$('#street').focus();
			return false;
		}
		var data = {
            'business_name' : $('#business_name').val(),
            'reason_social' : $('#reason_social').val(),
            'contact_name' : $('#contact_name').val(),
            'contact_phone' : $('#contact_phone').val(),
            'contact_email' : $('#contact_email').val(),
            'campaign_gift' : $('#campaign_gift').val(),
            'campaign_gift_description' : $('#campaign_gift_description').val(),
            'campaign_visit_point' : $('#campaign_visit_point').val(),
            'campaign_signup' : $('#campaign_signup').val(),
            'campaign_share_signup' : $('#campaign_share_signup').val(),
            'campaign_facebook' : $('#campaign_facebook').val(),
            'campaign_social_network' : $('#campaign_social_network').val(),
            'campaign_link_prospect' : $('#campaign_link_prospect').val(),
            'campaign_mail_offer' : $('#campaign_mail_offer').val(),
            'campaign_mail_promo' : $('#campaign_mail_promo').val(),
            'campaign_mail_coupon' : $('#campaign_mail_coupon').val(),
            'campaign_link_coupon_promo' : $('#campaign_link_coupon_promo').val(),
            'campaign_start' : $('#campaign_start').val(),
            'campaign_end' : $('#campaign_end').val(),
            'create_date' : $('#create_date').val(),
            'street' : $('#street').val(),
            'autorization_name' : $('#autorization_name').val(),
            'autorization_job_position' : $('#autorization_job_position').val(),
            'country_id' : $('#country_id').val(),
            'city' : $('#city').val(),
		};

		Campaign.save(data,function(){
		});
	});

	$(".upload-file-campaign").click(function(){
		$("#file-campaign").click();
	});

	$(".upload-image-product-campaign").click(function(){
		$("#image-product-campaign").click();
	});

	$(".upload-image-gift-campaign").click(function(){
		$("#image-gift-campaign").click();
	});

	$("#image-gift-campaign").on("change", function(){
		upload_file_image(this,{kind:1,max_images_files: 3,upload_path:"../../apps/backoffice/subcore/media/campaing/img_gift/",url:"../../apps/backoffice/subcore/application/upload_images_campaing_file.php"});
	});

	$("#image-product-campaign").on("change", function(){
		upload_file_image(this,{kind:0,max_images_files: 10,upload_path:"../../apps/backoffice/subcore/media/campaing/img_product/",url:"../../apps/backoffice/subcore/application/upload_images_campaing_file.php"});
	});

	$("#file-campaign").on("change", function(){
		upload_file_image(this,{upload_path : "../../apps/backoffice/subcore/media/campaing/files/"});
	});

	function upload_file_image(input,options)
	{
		$(input).parent().find('.box-upload').html('<div class="">Espere mientras subimos los archivos <img width="22px" src="../../src/img/status-gray.gif">');

		setTimeout(function(){
			var size = true;
			var data = {
				width : 250,
				thumbnail : true,
				files : input.files,
				image_path : "../../subcore/css/images/loader.gif",
			};

			if(options != undefined) var data = $.extend(data, options);

			$.each(data.files, function(index, val) {
				if(val.size > 5000000) size = false;
			});

			if(size)
			{
				upload_file_campaign_by_ajax(data,function(response){
					if(response.success == 1)
					{
						$('.box-container-address').removeClass('hidden');
						$(input).parent().find('.box-upload').html(response.html)
					} else {
						$(input).parent().find('.box-upload').html(response.html)
					}
				});
			} else {
				__showMessage(__Translate("Invalid image size. Select a small image"));
			}
		},100);
	}

});

var Campaign = {
	urlProvider : {
		0 : {
		  object : "body .box-campaign-fill",
		  async : false,
		  method : 'POST',
		  callback : false,
		  delay : 0,
		  url : 'fill_campaign',
		  message : "Guardando datos </h3> <img style='width:22px;' src='../../src/img/status.gif'>",
		},
		1 : {
		  object : "body .box-campaign-fill",
		  async : false,
		  method : 'POST',
		  callback : false,
		  delay : 0,
		  url : 'save_campaign_upload',
		  message : "Guardando datos </h3> <img style='width:22px;' src='../../src/img/status.gif'>",
		},
		2 : {
		  object : "body .box-need-delete-file",
		  async : false,
		  method : 'POST',
		  callback : false,
		  delay : 0,
		  url : 'delete_campaign_file',
		  message : "Eliminando archivo </h3> <img style='width:22px;' src='../../src/img/status.gif'>",
		},
	},
	init : function(callback){
		this.getProvider(0,false,callback);
	},
	deleteCampaignFile : function(data,callback){
		this.getProvider(2,data,callback);
	},
	saveUpload : function(data,callback){
		this.getProvider(1,data,callback);
	},
	save : function(data,callback){
		this.getProvider(0,data,callback);
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
			method : data.method,
			loadOldObject : false,
			url : '../../apps/backoffice/subcore/application/'+data.url+'.php',
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

var Country = {
	urlProvider : {
		0 : {
		  object : "body .box-country",
		  async : false,
		  callback : false,
		  delay : 0,
		  url : 'get_all_countries_for_campaign',
		  message : "<div class='box-saving-country'>Cargando los paises</h3> <img style='width:22px;' src='../../src/img/status.gif'></div>",
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