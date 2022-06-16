$(document).ready(function(){
	let videoConsulting = new VideoConsulting;

	videoConsulting.init();

	window.cancelVideoConsulting = function(video_consulting_per_user_id){
		videoConsulting.BUSY = true;
	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de cancelar esta video consulta?",
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	alert.modal.dismiss();

	            	videoConsulting.cancelVideoConsulting((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{video_consulting_per_user_id:video_consulting_per_user_id});
	            }              
	        },
	        { 
	            text: "Cancelar",
	            role: 'cancel', 
	            handler: data => {
	            	videoConsulting.BUSY = false;
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);	}

	window.doneVideoConsulting = function(video_consulting_per_user_id){
		videoConsulting.BUSY = true;

	    alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de finalizar esta video consulta?",
	      inputs: [
		      {	
		      	name:'note',
		      	placeholder:'Agregar notas...',
		      	type:'text',
		      	id:'note'

		      }
	      ],
	      size: 'modal-lg',
	      buttons: [
	        { 
	            text: translate('Aceptar'),
	            role: 'cancel', 
	            handler: data => {
	            	console.log(data);

	            	alert.modal.dismiss();

	            	videoConsulting.doneVideoConsulting((response)=>{
				 		if(response.s == 1)
				 		{
				 			location.reload();
				 		}
				 	},{note:data.note,video_consulting_per_user_id:video_consulting_per_user_id});
	            }              
	        },
	        { 
	            text: "Cancelar",
	            role: 'cancel', 
	            handler: data => {
	            	videoConsulting.BUSY = false;
	            }              
	        },
	      ]
	    });

	    alertCtrl.present(alert.modal);
	}
});

class VideoConsulting extends Http {
	constructor()
	{
		super();
		this.BUSY = false;
		this.INTERVAL_TIME = 1000*60*5; // 5 MINUTES
		this.interval = false;
	}
	init()
	{
		this._getPendingVideoCalls();
		this.interval = setInterval(()=>{
			console.log("INTO");
			if(this.BUSY == false)
			{
				this._getPendingVideoCalls();
			}
		}, this.INTERVAL_TIME); 
	}
	_getPendingVideoCalls()
	{
		this.getPendingVideoCalls((response)=>{
			if(response.s == 1)
			{
				if(this.BUSY == false)
				{
					$(".box-content").html(response.html);
				}
			}
		});
	}
	cancelVideoConsulting(callback,data){
		return this.call("../../app/application/cancel_video_consulting.php",data,callback,false);
	}
	doneVideoConsulting(callback,data){
		return this.call("../../app/application/done_video_consulting.php",data,callback,false);
	}
	getPendingVideoCalls(callback,data){
		return this.call("../../app/application/get_pending_video_calls.php",data,callback,false);
	}
}