$(document).ready(function(){
	let loan = new Loan;

	getLoanListSellerLoans($("#default-loader"));

	function getLoanListSellerLoans(element)
	{
		dinamicLoader.showLoader(element);

		loan.getLoanListSellerLoans((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				
				runDataTable();

				// exportLoanListTable($("#export"));
			}
		},{user_support_id:getParam("usid"),start_date:getParam("start_date"),end_date:getParam("end_date")});
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
	getLoanListSellerLoans(callback,data){
    	return this.call('../../app/application/get_loan_list_seller_loans.php',data,callback,false);
	}
}