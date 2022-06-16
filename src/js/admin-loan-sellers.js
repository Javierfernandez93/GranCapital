$(document).ready(function(){
	let loan = new Loan;

	getLoanListSeller($("#default-loader"));

	window.getLoanListSellerFilter = function() 
	{
	  if($("#start_date").val() && $("#end_date").val())
	  {
		getLoanListSeller($("#default-loader"));
	  }
	}

	function getLoanListSeller(element)
	{
		dinamicLoader.show(element);

		loan.getLoanListSeller((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				
				runDataTable();
			}
		},{start_date:$("#start_date").val(),end_date:$("#end_date").val()});
	}

	window.approbePayments = function(element,user_support_id)
	{
		let alert = alertCtrl.create({
			title: "Aviso",
			subTitle: "¿Estás seguro de verificar éstos pagos?",
			buttons: [
			  { 
				  text: 'Sí, verificar',
				  role: 'cancel', 
				  class: 'btn-primary',
				  handler: data => {
					  	alert.modal.dismiss();

						loan.approbePayments((response)=>{
							if(response.s == 1)
							{
								getLoanListSeller($("#default-loader"));
							}
						},{user_support_id:user_support_id,start_date:$("#start_date").val(),end_date:$("#end_date").val()});
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

});

class Loan extends Http
{
	constructor()
	{
		super();
	}
	getLoanListSeller(callback,data){
    	return this.call('../../app/application/get_loan_list_seller.php',data,callback,false);
	}
	approbePayments(callback,data){
    	return this.call('../../app/application/approbe_payments.php',data,callback,false);
	}
}