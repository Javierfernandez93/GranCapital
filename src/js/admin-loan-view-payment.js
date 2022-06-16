$(document).ready(function(){
	let loan = new Loan;

	if(getParam("lpuid"))
	{
		getAllPaymentLoan($("#response"));
	} 

	window.approbeLoanPayment = function(payment_per_loan_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro aprobar éste pago del préstamo?",
	      buttons: [
	        { 
	            text: 'Sí, aprobar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	loan.approbeLoanPayment((response)=>{
						if(response.s == 1)
						{
							getAllPaymentLoan($("#response"));
						}
					},{payment_per_loan_id:payment_per_loan_id});
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

	function getAllPaymentLoan(element)
	{
		dinamicLoader.showLoader(element);

		loan.getAllPaymentLoan((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				runDataTable();
			}
		},{loan_per_user_id:getParam("lpuid")});
	}

	function runDataTable()
	{
		if($('#table').length)
		{
			$('#table').DataTable({
				dom: 'Bfrtip',
			    buttons: [
			        'excel', 'pdf'
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
  	getAllPaymentLoan(callback,data){
    	return this.call('../../app/application/get_all_payment_loan.php',data,callback,false);
  	}
  	approbeLoanPayment(callback,data){
    	return this.call('../../app/application/approbe_loan_payment.php',data,callback,false);
  	}
}