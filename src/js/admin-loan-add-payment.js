$(document).ready(function(){
	let loan = new Loan;

	if(getParam("lpuid"))
	{
		getFormToAddPayment($("#default-loader"));
	} 

	function getFormToAddPayment(element)
	{
		dinamicLoader.showLoader(element);

		loan.getFormToAddPayment((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				addListeners();

				$("#ammount").val(response.payment)

				setAmmount($("#ammount"));
			}
		},{loan_per_user_id:getParam("lpuid")});
	}

	function addListeners()
	{
		// $('.money').mask('#,##0.00', {reverse: true});

		loan.setPeriod($("#period").val());
	}

	window.setCatalogPaymentMethodId = function(element)
	{
		let catalog_payment_method_id = $(element).val();

		loan.setCatalogPaymentMethodId(catalog_payment_method_id);

		if(catalog_payment_method_id)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setPeriod = function(element)
	{
		let period = $(element).val();

		loan.setPeriod(period);

		if(period)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setPaymentReference = function(element)
	{
		let payment_reference = $(element).val();
		
		loan.setPaymentReference(payment_reference);

		if(payment_reference)
		{
			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setAmmount = function(element)
	{
		setAmmount(element);
	}

	function checkFields()
	{
		$("#save-payment").attr("disabled");

		if(!loan.getAmmount())
		{
			return;
		}
		
		$("#save-payment").removeAttr("disabled");
	}

	function setAmmount(element)
	{	
		let ammount = $(element).val();

		console.log([ammount,$(element).attr("min")])
		
		if(parseFloat(ammount) >= parseFloat($(element).attr("min")) && ammount)
		{
			loan.setAmmount(ammount);

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}

		checkFields();
	}

	window.savePaymentPerLoan = function(element)
	{
		loan.savePaymentPerLoan((response)=>{
			if(response.s == 1)
			{
				$("#response").html(response.html);
			} else if(response.r == "NOT_AMMOUNT") {
				alertmesage("Ingresa un monto. Intenta de nuevo");
			} else if(response.r == "NOT_PAYMENT_REFERENCE") {
				alertmesage("Ingresa una referencia de pago. Intenta de nuevo");
			}
		},{period:loan.getPeriod(),approve:loan.getApprove(),payment_reference:loan.getPaymentReference(),ammount:loan.getAmmount(),catalog_payment_method_id:loan.getCatalogPaymentMethodId(),image:loan.getImage(),loan_per_user_id:getParam("lpuid")});
	}

	window.setApprove = function(element)
	{
		loan.setApprove($(element).is(":checked"));
	}

	window.uploadTicketLoan = function(loan_per_user_id)
	{
		let card = $(".card[data-loan_per_user_id='"+loan_per_user_id+"']");
		let files = $(card).find("input[type='file']").prop('files');
		
		if(files.length > 0)
		{
			let form_data = new FormData();

			form_data.append("file", files[0]);
			form_data.append("loan_per_user_id", loan_per_user_id);

			$(card).find('.card-footer').removeClass("d-none");

			loan.uploadTicketLoan((response)=>{
				if(response.s == 1)
				{
					loan.setImage(response.image);
					    
					$(card).css('background-image',"url("+response.image+")");
					$(card).find('.info').addClass("d-none");
				}
			},form_data,$(card).find(".progress-bar"));
		}
	}
});

class Loan extends Http
{
	constructor()
	{
		super();
		this.catalog_payment_method_id = 1;
		this.payment_reference = null;
		this.period = null;
		this.image = null;
		this.ammount = null;
		this.approve = false;
	}
	setPeriod(period)
	{
		this.period = period;
	}
	getPeriod()
	{
		return this.period;
	}
	setAmmount(ammount)
	{
		this.ammount = ammount;
	}
	getAmmount()
	{
		return this.ammount;
	}
	setPaymentReference(payment_reference)
	{
		this.payment_reference = payment_reference;
	}
	getPaymentReference()
	{
		return this.payment_reference;
	}
	setImage(image)
	{
		this.image = image;
	}
	getImage()
	{
		return this.image;
	}
	setCatalogPaymentMethodId(catalog_payment_method_id)
	{
		this.catalog_payment_method_id = catalog_payment_method_id;
	}
	getCatalogPaymentMethodId()
	{
		return this.catalog_payment_method_id;
	}
	setApprove(approve)
	{
		this.approve = approve;
	}
	getApprove()
	{
		return this.approve;
	}
  	getFormToAddPayment(callback,data){
    	return this.call('../../app/application/get_form_to_add_payment.php',data,callback,false);
  	}
  	savePaymentPerLoan(callback,data){
    	return this.call('../../app/application/save_payment_per_loan.php',data,callback,false);
  	}
  	uploadTicketLoan(callback,data,progress){
	    return this.callFile('../../app/application/upload_ticket_loan.php',data,callback,progress);
	}  
}