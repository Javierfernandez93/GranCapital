$(document).ready(function(){
	$('body').on('click','.box-autocomplete li',function(){
		$(this).parent().parent().parent().find('input').val($(this).data('user_login_id'));
		$(this).parent().parent().parent().find('input').focusout();
		$(this).parent().remove();
		$('.box-autocomplete-coincidences').remove();
	});

	$('body').on('keyup','.box-autocomplete-input',function(){
		var _this = $(this);
		if($(_this).val().length > 2 || !isNaN($(_this).val()))
		{
			AutoComplete.getAutocomplete({object:$(_this).parent().find('.box-autocomplete'),data:{name:$(_this).val()}},function(response){
				if(response.success == 1)
				{
					$(_this).parent().find('.box-autocomplete').html(response.html);
				} else if(response.reason == 'NOT_FOUND_SPONSOR') {
					$(_this).parent().find('.box-autocomplete').html('<div class="box-autocomplete-no-found">No se encontró a el socio que estás buscando, intenta otra vez.</div>');
				} else if(response.reason == 'NOT_NAME') {
					$(_this).parent().find('.box-autocomplete').html('<div class="box-autocomplete-no-found">Id o nombre inválido, intenta otra vez.</div>');
				}
			});
		}
	});
});


var AutoComplete = {
	urlProvider : {
		0 : {
		  object : "body .box-autocomplete",
		  callback : false,
		  delay : 0,
		  url : 'get_sponsor_data_by_name',
		  message : "<div class='box-message-autocomplete col-md-12 text-center wow bounceInUp' data-wow-duration='200ms' data-wow-delay='0s'><img style='width:22px;' src='../../src/img/status-white.gif'></div>",
		},
	},
	init : function(callback){
		this.start(callback);
	},
	getAutocomplete : function(data,callback){
		var urlProvider = this.urlProvider[0];
		    urlProvider = $.extend(urlProvider, data);

		this.call(urlProvider,callback);
	},
	call : function(data,callback){
		var returnData = {
			loader : {
				object : $(data.object),
				message : data.message,
			},
			timeOut : data.delay,
			async : false,
			method : 'POST',
			loadOldObject : false,
			url : '../../apps/signup/subcore/application/'+data.url+'.php',
		};

		if(data.data != undefined) returnData.data = data.data;

		var OldObject = $(data.object).html();
			parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(callback) callback(response);
		});
	}
};