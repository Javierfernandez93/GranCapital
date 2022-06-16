$(document).ready(function(){
	let code = new Code;
  let checkField = new CheckField;

	window.checkEmail = function(element) {
    checkField.init(element,"email",event,"send-code");

    if($("#email").hasClass("text-success")){
    	$("#send-code").removeAttr("disabled").removeClass("btn-outline-secondary").addClass("btn-outline-success");
    } else {
    	$("#send-code").attr("disabled").removeClass("btn-outline-success").addClass("btn-outline-secondary");
    }
	}

	window.sendCode = function(element,code_per_user_id) {
		$(element).html("Enviando código....");
		code.sendCode((response)=>{
			if(response.s == 1)
			{
				$(element).html("Código enviado").addClass("btn-primary").removeClass("btn-outline-secondary btn-outline-success");
			}
		},{code_per_user_id:code_per_user_id,email:$("#email").val()})
	}
});

class Code extends Http {
	constructor()
	{
		super();
		this.col_container_classes = null;
		this.options = {};
	}
	sendCode(callback,data){
		return this.call('../../app/application/send_code.php',data,callback,false);
	}
	init(options){
		this.options = $.extend({}, this.defaults, options);
	}
};