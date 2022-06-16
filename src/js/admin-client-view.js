$(document).ready(function(){
	let client = new Client;
	let comment = new Comment;

	getClient($("#default-loader"));

	function getClient(element)
	{
		dinamicLoader.show(element);

		client.getClient((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{user_login_id:getParam("ulid")});
	}

	window.getClientPdf = function(element)
	{
		getClientPdf(element);
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
							getClient($("#response"));
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

	function getClientPdf(element)
	{
		dinamicLoader.show(element);

		client.getClientPdf((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response-pdf").html(response.html);
			}
		},{user_login_id:getParam("ulid")});
	}
});

class Client extends Http
{
	constructor()
	{
		super();
	}
	getClient(callback,data){
    	return this.call('../../app/application/get_client.php',data,callback,false);
  	}
  	getClientPdf(callback,data){
    	return this.call('../../app/application/get_client_pdf.php',data,callback,false);
  	}
}