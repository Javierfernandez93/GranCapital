$(document).ready(function(){
	let commissions = new Commissions;

	getCommissions($("#default-loader"));

	window.getCommissionsFilter = function() 
	{
		if($("#start_date").val() && $("#end_date").val())
		{
			getCommissions($("#default-loader"));
		}
	}

	function runDataTable()
	{
		if($('#table').length)
		{
			$('#table').DataTable({
				dom: 'Bfrtip',
				buttons: [
					// 'excel', 'pdf'
				],
				"language": {
	          	"search": "Buscar:",
	         	"paginate": {
					"previous": "Anterior",
					"next": "Siguiente"
				},
				"lengthMenu": "Mostrando _MENU_ registros por página",
				"zeroRecords": "No encontramos información - lo sentimos",
				"info": "Mostrando página _PAGE_ de _PAGES_",
				"infoEmpty": "No hay registros disponibles",
				"infoFiltered": "(filtrado desde _MAX_ total de registros)"
				}
			});
		}
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

	            	commissions.deleteSeller((response)=>{
						if(response.s == 1)
						{
							getCommissions($("#response"));
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

	function getCommissions(element)
	{
		dinamicLoader.showLoader(element);

		commissions.getCommissions((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				runDataTable();
			}
		},{start_date:$("#start_date").val(),end_date:$("#end_date").val()});
	}
});

class Commissions extends Http
{
	constructor()
	{
		super();
	}
	getCommissions(callback,data){
    	return this.call('../../app/application/get_commissions.php',data,callback,false);
  	}
}