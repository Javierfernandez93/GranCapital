$(document).ready(function(){
	let addTeam = new AddTeam;

	window.getWhatsAppLink = function(element) {
		dinamicLoader.show($("#response-whatsapp"),"preloader-md");

		$(".item-container").addClass("d-none");
		$(element).parent().parent().removeClass("d-none").removeClass("col-xl-4").addClass("col-xl-6");
		
		addTeam.getWhatsAppLink((response)=>{
			dinamicLoader.hide();

			if(response.s == 1)
			{
				$("#response-whatsapp").html(response.html);
			}
		});
	}

	window.getEmailLink = function(element) {
		dinamicLoader.show($("#response-email"),"preloader-md");

		$(".item-container").addClass("d-none");
		$(element).parent().parent().removeClass("d-none").removeClass("col-xl-4").addClass("col-xl-6");

		addTeam.getEmailLink((response)=>{
			dinamicLoader.hide();

			if(response.s == 1)
			{
				$("#response-email").html(response.html);
			}
		});
	}

	window.getQrImage = function(element) {
		dinamicLoader.show($("#response-qr"),"preloader-md");

		$(".item-container").addClass("d-none");
		$(element).parent().parent().removeClass("d-none").removeClass("col-xl-4").addClass("col-xl-6");

		addTeam.getQrImage((response)=>{
			dinamicLoader.hide();

			if(response.s == 1)
			{
				$("#response-qr").html(response.html);
			}
		});
	}
});

class AddTeam extends Http {
  constructor()
  {
    super();
  }
  getEmailLink(callback,data){
    return this.call("../../app/application/get_email_link.php",data,callback);
  }
  getQrImage(callback,data){
    return this.call("../../app/application/get_qr_image.php",data,callback);
  }
  getWhatsAppLink(callback,data){
    return this.call("../../app/application/get_whatsapp_link.php",data,callback);
  }
};