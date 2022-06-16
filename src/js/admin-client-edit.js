$(document).ready(function(){
	getClientFormEdit($("#default-loader"));

	function getClientFormEdit(element)
	{
		dinamicLoader.showLoader(element);

		client.getClientFormEdit((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				console.log({response:response,client:client});

				client.loadClient(response.client,0);

				response.avals.forEach((aval,key)=>{
					client.loadClient(aval,key+1);
				});

				response.beneficiaries.forEach((beneficiary,key)=>{
					client.loadClient(beneficiary,key+3);
				});
				addListeners();
			}
		},{user_login_id:getParam("ulid"),renovation:getParam("renovation")});
	}
});