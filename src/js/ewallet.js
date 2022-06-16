$(document).ready(function(){
	let ewallet = new Ewallet;

	getEwallet();

	function getEwallet()
	{
		ewallet.getEwallet((response)=>{
			if(response.s == 1)
			{
				$(".box-response").html(response.html);
			}
		},{url:window.location.href});
	}

	window.makeEwallet = function(element)
	{
		$(element).text("Obteniendo cartera...").attr("disabled",true);
		ewallet.makeEwallet((response)=>{
			if(response.s == 1)
			{
				$(element).text("Espere...").attr("disabled",true);
				getEwallet();
			}
		});
	}
});

class Ewallet extends Http {
	getEwallet(callback,data){
		return this.call("../../app/application/get_ewallet.php",data,callback);
	}
	makeEwallet(callback,data){
		return this.call("../../app/application/make_ewallet.php",data,callback);
	}
}