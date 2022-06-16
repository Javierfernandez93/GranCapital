$(document).ready(function(){
	 let save = new Save

	 window.SaveDataBank = function(user_support_id) 
	 {
		save.SaveDataBank((response)=>{
	 		if(response.s == 1)
	 		{
	 			location.reload();
	 		}
	 	},{user_support_id:user_support_id,bank:$("#bank").val(),account:$("#account").val(),clabe:$("#clabe").val(),paypal:$("#paypal").val(),airtm:$("#airtm").val()});			
	}
});

class Save extends Http{

	SaveDataBank(callback,data){
		return this.call("../../app/application/save_data_bank.php",data,callback,false);
	}
	
}