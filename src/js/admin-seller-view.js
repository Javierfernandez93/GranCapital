$(document).ready(function(){
	let seller = new Seller;

	getSeller($("#response"));

	function getSeller(element)
	{
		dinamicLoader.showLoader(element);

		seller.getSeller((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{user_support_id:getParam("usid")});
	}

	window.getSellerPdf = function(element)
	{
		getSellerPdf(element);
	}

	function getSellerPdf(element)
	{
		dinamicLoader.showLoader(element);

		seller.getSellerPdf((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response-pdf").html(response.html);
			}
		},{user_support_id:getParam("usid")});
	}
});

class Seller extends Http
{
	constructor()
	{
		super();
	}
	getSeller(callback,data){
    	return this.call('../../app/application/get_seller.php',data,callback,false);
  	}
  	getSellerPdf(callback,data){
    	return this.call('../../app/application/get_seller_pdf.php',data,callback,false);
  	}
}