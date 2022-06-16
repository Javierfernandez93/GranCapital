$(document).ready(function(){
	getClientFormAdd($("#response"));

	function getClientFormAdd(element)
	{
		dinamicLoader.showLoader(element);

		client.getClientFormAdd((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);

				addListeners();
			}
		});
	}

	function hasFilledData(user)
	{
		return true;
		
		if(user.names == null)
		{
			return false;
		}

		if(user.last_name == null)
		{
			return false;
		}

		if(user.sur_name == null)
		{
			return false;
		}
		
		if(user.requirement_files_per_user.requirement_files_per_user.length < 3)
		{
			return false;
		}

		return true;
	}

	window.saveClient = function()
	{
		let user = client.getClients().filter((client)=>{
			return client.catalog_user_type_id == CLIENT;
		})[0]

		if(hasFilledData(user))
		{
			client.saveClient((response)=>{
				if(response.s == 1)
				{
					$("#response").html(response.html);
				}
			},{clients:client.getClients()});
		} else {
			alertMessage("Los campos marcados con * son requeridos");
		}

	}
});