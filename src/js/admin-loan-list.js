$(document).ready(function(){
	let loan = new Loan;

	getLoanList($("#default-loader"));

	window.toggleChecks = function(element)
	{
		let check_boxes = $("tbody").find(".form-check-input");

		$(check_boxes).attr("checked",$(element).is(":checked"));

		checkButton();
		checkButtonForPayment();
		checkTotalCapital();
		checkTotalDisbursment();
	}

	function exportLoanListTable(element) 
	{
		loan.exportLoanListTable((response)=>{
			if(response.s == 1)
			{
				$(element).attr("href",response.href);
			}
		},{status:getParam("s")});
	}

	window.checkButton = function()
	{
		checkButton();
		checkTotalCapital();
		checkTotalDisbursment();
	}
	
	window.checkButtonForPayment = function()
	{
		checkButtonForPayment();
		checkTotalToPay();
	}

	function checkTotalDisbursment()
	{
		let total = 0;
		
		$("table tbody").find(".form-check-input").each((key,element)=>{
			
			if($(element).is(":checked"))
			{
				let payment = $(element).parent().parent().parent().parent().parent().data('disbursement');

				total+= parseFloat(payment);
			}
		});

		$("#disbursement").text("$ "+number_format(total,2));
	}
	
	function checkTotalCapital()
	{
		let total = 0;
		
		$("table tbody").find(".form-check-input").each((key,element)=>{
			
			if($(element).is(":checked"))
			{
				let payment = $(element).parent().parent().parent().parent().parent().data('capital');

				total+= parseFloat(payment);
			}
		});

		$("#capital").text("$ "+number_format(total,2));
	}
	
	function checkTotalToPay()
	{
		let total = 0;
		
		$("table tbody").find(".form-check-input").each((key,element)=>{
			
			if($(element).is(":checked"))
			{
				let payment = $(element).parent().parent().parent().parent().parent().data('payment');

				total+= parseFloat(payment);
			}
		});

		$("#payment").text("$ "+number_format(total,2));
	}

	function checkButton()
	{
		if($("table tbody .form-check-input:checked").length > 0)
		{
			$("#set-as-disbursement").removeAttr("disabled");
		} else {
			$("#set-as-disbursement").attr("disabled",true);
			$("#all").prop("checked",false);
		}
	}

	function checkButtonForPayment()
	{
		if($("table tbody .form-check-input:checked").length > 0)
		{
			$("#set-as-payed").removeAttr("disabled");
		} else {
			$("#set-as-payed").attr("disabled",true);
			$("#all").prop("checked",false);
		}
	}

	window.setAsDisbursement = function(element)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de desembolsar éstos préstamos?",
	      buttons: [
	        { 
	            text: 'Sí, ingresar como desembolsados',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	_setAsDisbursement(element);
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

	window.setAsPayed = function(element)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de ingresar como pagados éstos préstamos? <br><div class='text-success mt-3'>Una vez envies los préstamos como pagados calcularemos las comisiones</div>",
	      buttons: [
	        { 
	            text: 'Sí, ingresar como pagados',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	_setAsPayed(element);
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

	function _setAsDisbursement(element)
	{
		let check_boxes = $("table").find(".form-check-input");
		let loans_per_user = [];

		$("table").find(".form-check-input").each((index,element)=>{
			if($(element).is(":checked") && $(element).val())
			{
				loans_per_user.push({
					loan_per_user_id : $(element).val()
				});
			}
		})

		dinamicLoader.showLoader(element);

		loan.setAsDisbursement((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				getLoanList($("#default-loader"));
			}
		},{loans_per_user:loans_per_user});
	}
	
	function _setAsPayed(element)
	{
		let check_boxes = $("table").find(".form-check-input");
		let loans_per_user = [];

		$("table").find(".form-check-input").each((index,element)=>{
			if($(element).is(":checked") && $(element).val())
			{
				loans_per_user.push({
					loan_per_user_id : $(element).val(),
					ammount : $(element).data('ammount'),
					period : $(element).data('period')
				});
			}
		})

		dinamicLoader.showLoader(element);

		loan.setAsPayed((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				getLoanList($("#default-loader"));

				alertMessage("Hemos enviado la información. No es necesario enviarla dos veces.")
			}
		},{loans_per_user:loans_per_user});
	}

	window.getAggregamentForLoan = function(element,loan_per_user_id)
	{
		// dinamicLoader.showLoader(element);

		loan.getAggregamentForLoan((response)=>{
			// dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				fetch(response.html.target)
			  .then(resp => resp.blob())
			  .then(blob => {
			    const url = window.URL.createObjectURL(blob);
			    const a = document.createElement('a');
			    a.style.display = 'none';
			    a.href = url;
			    // the filename you want
			    a.download = response.html.file_name;
			    document.body.appendChild(a);
			    a.click();
			    window.URL.revokeObjectURL(url);
			  }).catch(() => { });
			}
		},{loan_per_user_id:loan_per_user_id});
	}

	window.rejectLoan = function(loan_per_user_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de rechazar éste préstamo?",
	      buttons: [
	        { 
	            text: 'Sí, rechazar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	rejectLoan($("#default-loader"),loan_per_user_id);
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


	window.exportXLS = function(element,id)
	{
		_exportXLS(id,'xlsx','Reporte-prestamos');
	}

	function _exportXLS(id, type, filename, fn, dl) {
       var elt = document.getElementById(id);
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         XLSX.writeFile(wb, fn || (filename+'.' + (type || 'xlsx')));
    }

	window.aprobeLoan = function(loan_per_user_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de aprobar éste préstamo?",
	      buttons: [
	        { 
	            text: 'Sí, aprobar',
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	aprobeLoan($("#default-loader"),loan_per_user_id);
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

	            	loan.deleteClient((response)=>{
						if(response.s == 1)
						{
							getLoanList($("#response"));
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

	function getLoanList(element)
	{
		dinamicLoader.show(element);

		loan.getLoanList((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
				
				runDataTable(getParam("s"));

				exportLoanListTable($("#export"));
			}
		},{status:getParam("s"),loan_per_user_id:getParam("lpuid"),user_support_id:getParam("usid")});
	}

	function runDataTable(status)
	{
		if($('#table').length && ['1','2'].includes(status))
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

	function rejectLoan(element,loan_per_user_id)
	{
		dinamicLoader.showLoader(element);

		loan.rejectLoan((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				alertmesage("El préstamo fue rechazado exitosamente.");
				
				getLoanList($("#default-loader"));
			}
		},{loan_per_user_id:loan_per_user_id});
	}

	function aprobeLoan(element,loan_per_user_id)
	{
		dinamicLoader.showLoader(element);

		loan.aprobeLoan((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{loan_per_user_id:loan_per_user_id});
	}

	window.getLoanListPDF = function(element)
	{
		getLoanListPDF(element);
	}

	function getLoanListPDF(element)
	{
		dinamicLoader.showLoader(element);

		loan.getLoanListPDF((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response-pdf").html(response.html);
			}
		},{status:getParam("s")});
	}
});

class Loan extends Http
{
	constructor()
	{
		super();
	}
	getLoanList(callback,data){
    	return this.call('../../app/application/get_loan_list.php',data,callback,false);
	}
	exportLoanListTable(callback,data) {
		return this.call('../../app/application/export_loan_list_table.php',data,callback,false);
	}
	setAsDisbursement(callback,data){
		return this.call('../../app/application/set_as_disbursement.php',data,callback,false);
	}
	setAsPayed(callback,data){
		return this.call('../../app/application/set_as_payed.php',data,callback,false);
	}
	getAggregamentForLoan(callback,data){
    	return this.call('../../app/application/get_aggregament_for_loan.php',data,callback,false);
	}
	getLoanListPDF(callback,data){
  		return this.call('../../app/application/get_loan_list_pdf.php',data,callback,false);
	}
	deleteClient(callback,data){
  		return this.call('../../app/application/delete_client.php',data,callback,false);
	}
	rejectLoan(callback,data){
  		return this.call('../../app/application/reject_loan.php',data,callback,false);
	}
	aprobeLoan(callback,data){
  		return this.call('../../app/application/aprobe_loan.php',data,callback,false);
	}
}