const ALL = 2;
const VERIFIED = 1;
const PENDING = 0;
const REJECTED = -1;

$(document).ready(function(){
	let client = new Client;
	let comment = new Comment;
	let searchable = new Searchable;

	client.setVerified(VERIFIED);

	getClientList($("#default-loader"));
	
	window.setVerified = function(verified)
	{
		client.setVerified(verified);

		getClientList($("#default-loader"));
	}

	window.search = function(element)
	{
		let query = $(element).val().toLowerCase();

		searchable.filterData(query);
	}

	window.verifyUser = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de verificar éste usuario?",
	      buttons: [
	        { 
	            text: 'Sí, verificar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	client.verifyUser((response)=>{
	            		if(response.s == 1)
						{
							getClientList($("#response"));
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

	window.rejectUser = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de rechazar éste usuario?",
	      buttons: [
	        { 
	            text: 'Sí, rechazar',
	            role: 'cancel', 
	            class: 'btn-danger',
	            handler: data => {
	            	alert.modal.dismiss();

	            	client.rejectUser((response)=>{
	            		if(response.s == 1)
						{
							getClientList($("#response"));
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

	window.saveComment = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Ingresa el comentario",
	      subTitle: "",
	      inputs : [
	      	{
	      		'type' : 'text', 
	      		'name' : 'comment', 
	      		'id' : 'comment', 
	      		'placeholder' : 'Comentario', 
	      	}
	      ],
	      buttons: [
	        { 
	            text: 'Guardar comentario',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	comment.saveComment((response)=>{
						if(response.s == 1)
						{
							getClientList($("#response"));
						}
					},{user_login_id:user_login_id,comment:data.comment});
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

	window.deleteClient = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de eliminar éste cliente?",
	      buttons: [
	        { 
	            text: 'Sí, eliminar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	client.deleteClient((response)=>{
						if(response.s == 1)
						{
							getClientList($("#response"));
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

	window.setInBlackList = function(user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de enviar éste cliente al buró de crédito? (no será apto para préstamos)",
	      buttons: [
	        { 
	            text: 'Sí',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	client.setInBlackList((response)=>{
						if(response.s == 1)
						{
							getClientList($("#response"));
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
	      subTitle: "¿Estás seguro de eliminar del buró de crédito a éste cliente? (será apto para préstamos)",
	      buttons: [
	        { 
	            text: 'Sí',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	client.deleteFromBlackList((response)=>{
						if(response.s == 1)
						{
							getClientList($("#response"));
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

	function getClientList(element)
	{
		dinamicLoader.showLoader(element);

		client.getClientList((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				searchable.setData($('.searchable .card'));
			}
		},{user_support_id:getParam('usid'),user_login_id:getParam("ulid"),verified:client.getVerified()});
	}
});

class Client extends Http
{
	constructor()
	{
		super();
		this.verified = ALL;
	}
	setVerified(verified)
	{
		this.verified = verified;
	}
	getVerified() {
		return this.verified;
	}
	verifyUser(callback,data){
    	return this.call('../../app/application/verify_user.php',data,callback,false);
    }
	rejectUser(callback,data){
    	return this.call('../../app/application/reject_user.php',data,callback,false);
    }
	getClientList(callback,data){
    	return this.call('../../app/application/get_client_list.php',data,callback,false);
  	}
  	deleteClient(callback,data){
    	return this.call('../../app/application/delete_client.php',data,callback,false);
  	}
  	setInBlackList(callback,data){
    	return this.call('../../app/application/set_in_blacklist.php',data,callback,false);
  	}
  	deleteFromBlackList(callback,data){
    	return this.call('../../app/application/delete_from_blacklist.php',data,callback,false);
  	}
}