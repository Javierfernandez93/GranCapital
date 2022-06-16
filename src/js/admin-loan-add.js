$(document).ready(function(){
	let loan = new Loan;
	let dataLoan = new DataLoan;

	if(getParam("ulid"))
	{
		getLoanFormAdd($("#default-loader"));
	} else {
		getSearchClientForm($("#default-loader"));
	}

	function listenerFunctions()
	{
		$('#names').keyup(delay(function (e) {
			  searchClient(this.value);
		}, 500));
	}

	window.setStatus = function(element)
	{	
		if($(element).is(':checked')) 
		{
			dataLoan.setStatus(dataLoan.APPROVED)
		} else {
			dataLoan.setStatus(dataLoan.PENDING_FOR_APPROVAL)
		}
	}

	window.setResourceDestination = function(element)
	{	
		let resource_destination = $(element).val();

		if(resource_destination) 
		{
			dataLoan.setResourceDestination(resource_destination)

			$(element).addClass("is-valid").removeClass("is-invalid");
		} else {
			$(element).addClass("is-invalid").removeClass("is-valid");
		}
	}

	window.setCatalogLoanId = function(element)
	{
		dataLoan.setCatalogLoanId($(element).val());

		checkFields();
	}

	window.saveLoan = function(element)
	{
		dinamicLoader.showLoader(element);

		loan.saveLoan((response)=>{
			dinamicLoader.close();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{resource_destination:dataLoan.getResourceDestination(),user_login_id:dataLoan.getUserLoginId(),catalog_loan_id:dataLoan.getCatalogLoanId(),status:dataLoan.getStatus()});
	}

	function getLoanFormAdd(element)
	{
		dinamicLoader.showLoader(element);

		loan.getLoanFormAdd((response)=>{
			dinamicLoader.close();

			if(response.s === 1)
			{
				$("#response").html(response.html);

				dataLoan.setUserLoginId(getParam("ulid"));
			}
		},{user_login_id:getParam("ulid")});
	}

	function getSearchClientForm(element)
	{
		dinamicLoader.showLoader(element);

		loan.getSearchClientForm((response)=>{
			dinamicLoader.close();

			if(response.s === 1)
			{
				$("#response").html(response.html);

				listenerFunctions();
			}
		});
	}

	window.searchClient = function()
	{
		searchClient($("#names").val())
	}

	function searchClient(names)
	{
		dinamicLoader.showLoader($("#default-loader"));

		loan.searchClient((response)=>{
			dinamicLoader.close();

			if(response.s === 1)
			{
				$("#response-client-list").html(response.html);
			}
		},{names:names});
	}
	
	function checkFields()
	{
		$("#save").attr("disabled",true);

		if(!dataLoan.getUserLoginId())
		{
			return false;
		}

		if(!dataLoan.getCatalogLoanId())
		{
			return false;
		}
		
		$("#save").removeAttr("disabled");
	}
});

class Loan extends Http
{
	constructor()
	{
		super();
	}
	getLoanFormAdd(callback,data){
    	return this.call('../../app/application/get_loan_form_add.php',data,callback,false);
  	}
  	getSearchClientForm(callback,data){
    	return this.call('../../app/application/get_search_client_form.php',data,callback,false);
  	}
  	searchClient(callback,data){
    	return this.call('../../app/application/search_client.php',data,callback,false);
  	}
  	saveLoan(callback,data){
    	return this.call('../../app/application/save_loan.php',data,callback,false);
  	}
}

class DataLoan 
{
	constructor()
	{
		this.PENDING_FOR_APPROVAL = 0;
		this.APPROVED = 1;

		this.user_login_id = null;
		this.catalog_loan_id = null;
		this.resource_destination = null;
		this.status = null;

		this.setStatus(this.PENDING_FOR_APPROVAL);
	}
	setUserLoginId(user_login_id)
	{
		this.user_login_id = user_login_id;
	}
	setResourceDestination(resource_destination)
	{
		this.resource_destination = resource_destination;
	}
	getResourceDestination()
	{
		return this.resource_destination;
	}
	setCatalogLoanId(catalog_loan_id)
	{
		this.catalog_loan_id = catalog_loan_id;
	}
	setStatus(status)
	{
		this.status = status;
	}
	getUserLoginId()
	{
		return this.user_login_id;
	}
	getCatalogLoanId()
	{
		return this.catalog_loan_id;
	}
	getStatus()
	{
		return this.status;
	}
}