$(document).ready(function(){
	let seller = new Seller;

	getSearchSellerForm($("#default-loader"));

	window.assignSellerToClient = function(element,seller_names,user_names,user_login_id,user_support_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de asignar a <b>"+seller_names+"</b> como vendedor de <b>"+user_names+"</b>?",
	      buttons: [
	        { 
	            text: 'Sí, asignar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	dinamicLoader.showLoader(element);

					seller.assignSellerToClient((response)=>{

						if(response.s == 1)
						{
							$("#response").html(response.html);
						} else if(response.r == "NOT_PERMISSION") {
							alertmesage("No tienes los permisos necesarios para llevar a cabo esta acción.");
						}
					},{user_login_id:user_login_id,user_support_id:user_support_id});
	            }              
	        },
	        { 
	            text: 'Cancelar',
	            role: 'cancel', 
	            class: 'btn-light',
	            handler: data => {
	            	alert.modal.dismiss();
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}


	function listenerFunctions()
	{
		$('#names').keyup(delay(function (e) {
			  searchSeller(this.value);
		}, 500));
	}

	window.searchSeller = function()
	{
		searchSeller($("#names").val())
	}

	function searchSeller(names)
	{
		dinamicLoader.show($("#default-loader"));
		
		seller.searchSeller((response)=>{
			dinamicLoader.close();

			if(response.s === 1)
			{
				$("#response-seller-list").html(response.html);
			}
		},{names:names,user_login_id:getParam("ulid")});
	}

	function getSearchSellerForm(element)
	{
		dinamicLoader.show(element);

		seller.getSearchSellerForm((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				listenerFunctions();
			}
		},{user_login_id:getParam("ulid")});
	}
});

class Seller extends Http
{
	constructor()
	{
		super();
	}
	getSearchSellerForm(callback,data){
    	return this.call('../../app/application/get_search_seller_form.php',data,callback,false);
  	}
  	assignSellerToClient(callback,data){
    	return this.call('../../app/application/assign_seller_to_client.php',data,callback,false);
  	}
  	searchSeller(callback,data){
    	return this.call('../../app/application/search_seller.php',data,callback,false);
  	}
}