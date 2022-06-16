$(document).ready(function(){
	let seller = new Seller;
	let searchable = new Searchable;

	getSellerList($("#response"));

	window.search = function(element)
	{
		let query = $(element).val().toLowerCase();

		searchable.filterData(query);
	}

	window.deleteSeller = function(element,user_support_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de eliminar éste vendedor?",
	      buttons: [
	        { 
	            text: 'Sí, eliminar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	seller.deleteSeller((response)=>{
						if(response.s == 1)
						{
							getSellerList($("#response"));
						}
					},{user_support_id:user_support_id});
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

	function getSellerList(element)
	{
		dinamicLoader.showLoader(element);

		seller.getSellerList((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				searchable.setData($('.searchable .card'));
			}
		});
	}
});

class Seller extends Http
{
	constructor()
	{
		super();
	}
	getSellerList(callback,data){
    	return this.call('../../app/application/get_seller_list.php',data,callback,false);
  	}
  	deleteSeller(callback,data){
    	return this.call('../../app/application/delete_seller.php',data,callback,false);
  	}
}