$(document).ready(function(){
	const marketClient = new MarketClient;

	if(marketClient.isAbleToLoadProduct() == true)
	{	
		loadProduct(marketClient.target_products,getParam("sppid"),getParam("pid"));
	} else if(marketClient.isAbleToLoadProducts() == true) {
		loadProducts(marketClient.target_products,getParam("sppid"));
	}

	window.selectImage = function(element,src)
	{
		$(".image-carousel img").removeClass("img-selected");
		$(element).addClass("img-selected");
		$("#main-image").attr("src",src);
	}

	window.sendAsk = function(element,product_id)
	{
		dinamicLoader.showLoader(element);

		marketClient.sendAsk((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				marketClient.appendAsk(response.ask);
			}
		},{ask:$("#ask").val(),product_id:product_id});
	}

	window.loadProduct = function(element,sheet_per_proyect_id,product_id)
	{
		loadProduct(element,sheet_per_proyect_id,product_id);
	}

	window.loadProducts = function(element,sheet_per_proyect_id)
	{
		loadProducts(element,sheet_per_proyect_id);
	}

	function loadProduct(element,sheet_per_proyect_id,product_id)
	{
		dinamicLoader.showLoader(element);

		marketClient.getProductForClient((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$(marketClient.target_products).html(response.html);
				scrollTo(null,'#product',-25);
			}
		},{sheet_per_proyect_id:sheet_per_proyect_id,product_id:product_id});
	}

	function loadProducts(element,sheet_per_proyect_id)
	{
		dinamicLoader.showLoader(element);

		marketClient.getFullProductsForClient((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$(marketClient.target_products).html(response.html);
			}
		},{sheet_per_proyect_id:sheet_per_proyect_id});
	}
});


class MarketClient extends Http 
{
	constructor() {
		super();

		this.target_products = "[data-webflow='products']";
	}
 	isAbleToLoadProducts()
 	{
 		if($(this.target_products).length > 0)
 		{
 			return getParam("pid") == "";
 		}
 	}
 	isAbleToLoadProduct()
 	{
 		if($(this.target_products).length > 0)
 		{
 			return getParam("pid") != "";
 		}
 	}
 	getFullProductsForClient(callback,data)
 	{
    	return this.call("../../app/application/get_full_products_for_client.php",data,callback);
 	}
 	getProductsForClient(callback,data)
 	{
    	return this.call("../../app/application/get_products_for_client.php",data,callback);
 	}
 	getProductForClient(callback,data)
 	{
    	return this.call("../../app/application/get_product_for_client.php",data,callback);
 	}
 	appendAsk(ask)
 	{
 		let row = $("<div />").addClass("row px-4 py-3 mb-3");
 		let col_12 = $("<div />").addClass("col-12");
 		let bold = $("<div />").addClass("bold").text(ask);

 		col_12.append(bold);
 		row.append(col_12);

 		$("#asks").prepend(row);
 	}
 	sendAsk(callback,data)
 	{
    	return this.call("../../app/application/send_ask.php",data,callback);
 	}
}