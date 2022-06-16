$(document).ready(function(){
	let admin = new Admin;
	let searchable = new Searchable;

	getSupportList($("#default-loader"));

	window.search = function(element)
	{
		let query = $(element).val().toLowerCase();

		searchable.filterData(query);
	}

	window.deleteAdmin = function(user_support_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de eliminar éste administrador?",
	      buttons: [
	        { 
	            text: 'Sí, eliminar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	admin.deleteAdmin((response)=>{
						if(response.s == 1)
						{
							getSupportList($("#response"));
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

	window.setInBlackList = function(user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de enviar éste cliente a la lista negra? (no será apto para préstamos)",
	      buttons: [
	        { 
	            text: 'Sí, envíar a lista negra',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	admin.setInBlackList((response)=>{
						if(response.s == 1)
						{
							getSupportList($("#response"));
						}
					},{user_login_id:user_login_id});
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

	window.deleteFromBlackList = function(user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de savar de la lista negra a éste cliente? (será apto para préstamos)",
	      buttons: [
	        { 
	            text: 'Sí, quitar de la lista negra',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	admin.deleteFromBlackList((response)=>{
						if(response.s == 1)
						{
							getSupportList($("#response"));
						}
					},{user_login_id:user_login_id});
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

	function getSupportList(element)
	{
		dinamicLoader.show(element);

		admin.getSupportList((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				searchable.setData($('.searchable .card'));
			}
		});
	}
});

class Admin extends Http
{
	constructor()
	{
		super();
	}
	getSupportList(callback,data){
    	return this.call('../../app/application/get_support_list.php',data,callback,false);
  	}
  	deleteAdmin(callback,data){
    	return this.call('../../app/application/delete_admin.php',data,callback,false);
  	}
  	setInBlackList(callback,data){
    	return this.call('../../app/application/set_in_blacklist.php',data,callback,false);
  	}
  	deleteFromBlackList(callback,data){
    	return this.call('../../app/application/delete_from_blacklist.php',data,callback,false);
  	}
}