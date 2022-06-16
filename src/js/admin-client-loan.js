$(document).ready(function(){
	let loan = new Loan;

	getLoanForm($("#response"));

	window.saveLoan = function(element,user_login_id)
	{
		let alert = alertCtrl.create({
	      title: "Aviso",
	      subTitle: "¿Estás seguro de dar de alta éste préstamo?",
	      buttons: [
	        { 
	            text: translate('Sí, dar de alta'),
	            role: 'cancel', 
	            class: 'btn-primary',
	            handler: data => {
	            	alert.modal.dismiss();

	            	loan.saveLoan((response)=>{
						if(response.s == 1)
						{
							$("#response").html(response.html)
						}
					},{user_login_id:user_login_id,catalog_loan_id:$("#catalog_loan_id").val()});
	            }              
	        },
	        { 
	            text: translate('Cancelar')	,
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

	function getLoanForm(element)
	{
		dinamicLoader.showLoader(element);

		loan.getLoanForm((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{user_login_id:getParam("ulid")});
	}
});

class Loan extends Http
{
	constructor()
	{
		super();
	}
	getLoanForm(callback,data){
    	return this.call('../../app/application/get_loan_form.php',data,callback,false);
  	}
  	saveLoan(callback,data){
    	return this.call('../../app/application/save_loan.php',data,callback,false);
  	}
}