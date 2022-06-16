$(document).ready(function(){
	new WOW().init();
	Language.init();

	$("body").on('click','.box-language-list',function(){
		Language.setLanguage({language:$(this).data('language')},function(){ Language.init() });
    });

	$("body").on('click','.box-language-content-change',function(){
		Language.getLanguages();
    });
});


var Language = {
	urlProvider : {
		0 : {
		  object : "body .box-language",
		  async : true,
		  callback : false,
		  delay : 0,
		  method : 'POST',
		  url : 'translate',
		  message : "<div class='box-message wow bounceIn' data-wow-duration='1200ms' data-wow-delay='0s'> <img style='width:22px;' src='../../src/img/status-gray.gif'></div>",
		},
		1 : {
		  object : "body .box-language",
		  async : true,
		  callback : false,
		  delay : 0,
		  url : 'set_language',
		  message : "<div class='box-message wow bounceIn' data-wow-duration='1200ms' data-wow-delay='0s'> <img style='width:22px;' src='../../src/img/status-gray.gif'></div>",
		},
		2 : {
		  object : "body .box-language",
		  async : true,
		  callback : false,
		  delay : 0,
		  url : 'get_languages',
		  message : "<div class='box-message wow bounceIn' data-wow-duration='1200ms' data-wow-delay='0s'> <img style='width:22px;' src='../../src/img/status-gray.gif'></div>",
		},
	},
	init : function(data,callback){
		var _words = new Array();
		$('t').each(function(index, value) {
			_words.push($(value).text());
		});

		this.getProvider(0,{words:_words},function(response){
			if(response.success == 1)
			{
				$('t').each(function(index, value) {
					$(value).text(response.words_translated[index]);
				});

				if(callback) callback();
			}
	    });
	},
	getLanguages : function(callback){
		this.getProvider(2,false,callback);
	},
	translatePopUp : function(callback){
		let words = new Array();
		$('#__overlayContent t').each(function(index, value) {
			words.push($(value).text());
		});

		console.log(words)

		this.getProvider(0,{words:words},function(response){
			if(response.success == 1)
			{
				$('#__overlayContent t').each(function(index, value) {
					$(value).text(response.words_translated[index]);
				});

				if(callback) callback();
			}
	    });
	},
	setLanguage : function(data,callback){
		this.getProvider(1,data,callback);
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
			method : data.method,
			timeOut : data.delay,
			async : data.async,
			loadOldObject : false,
			url : '../../apps/home/subcore/application/'+data.url+'.php',
		};

		if(data.data != undefined) returnData.data = data.data;

		var OldObject = $(data.object).html();
			parent = this;

		__getJSONRequestNAsync(returnData,function(response){
			if(response.success == 1)
			{
				$(data.object).html(response.html);

				if(data.callback !== false) parent.getProvider(data.callback);
			} else {
				if(response.html) $(data.object).html(response.html);
			}

			if(callback) callback(response);
		});
	}
};