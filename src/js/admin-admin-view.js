$(document).ready(function(){
	let admin = new Admin;

	getAdmin($("#response"));

	function getAdmin(element)
	{
		dinamicLoader.showLoader(element);

		admin.getAdmin((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response").html(response.html);
			}
		},{user_support_id:getParam("usid")});
	}

	window.getAdminPdf = function(element)
	{
		getAdminPdf(element);
	}

	function getAdminPdf(element)
	{
		dinamicLoader.showLoader(element);

		admin.getAdminPdf((response)=>{
			dinamicLoader.closeLoader();

			if(response.s == 1)
			{
				$("#response-pdf").html(response.html);
			}
		},{user_support_id:getParam("usid")});
	}
});

class Admin extends Http
{
	constructor()
	{
		super();
	}
	getAdmin(callback,data){
    	return this.call('../../app/application/get_admin.php',data,callback,false);
  	}
  	getAdminPdf(callback,data){
    	return this.call('../../app/application/get_admin_pdf.php',data,callback,false);
  	}
}