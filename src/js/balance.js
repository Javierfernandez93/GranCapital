$(document).ready(function() {
	loadBalance();
	setInterval(function(){ 
		loadBalance();
	}, 5000);
});

function loadBalance(){
	Welcome.getBalance((response)=>{
		if(response.s == 1)
		{
			$("#partial_balance").html('$'+response.partial_balance);
			$("#full_balance").html('$'+response.full_balance);
			$("#partial_sales").html(response.partial_sales);
			$("#full_sales").html(response.full_sales);
		}
	});
}