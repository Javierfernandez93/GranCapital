 $(document).ready(function() {
	let quiz = new Quiz;
	var user_id=[];

	if($("#name").val()) findbyuser($("#name"));

	function delay(callback, ms) {
	  var timer = 0;
	  return function() {
	    var context = this, args = arguments;
	    clearTimeout(timer);
	    timer = setTimeout(function () {
	      callback.apply(context, args);
	    }, ms || 0);
	  };
	}

	$('#name').keyup(delay(function (e) {
		findbyuser();
	}, 1000));

	function findbyuser(element){
		if($("#name").val()!=""){
		 	quiz.findByUser((response)=>{
				if(response.s == 1) {
					$("#response").html(response.html);
				} 
				else{
					
				}

			},{name:$("#name").val()});
	  }	
	}

	window.findbyuser = function(element){
		findbyuser(element);
	};

	window.sendquiz = function(element){
		if($("#catalog_quiz_gift_box_id :selected").val() &&  user_id != "" ){
		 	quiz.addlist((response)=>{
				if(response.s == 1) {
					$(element).html("Enviados correctamente").removeClass("btn-success").addClass("").attr("disabled",true);
				} else {
					$(element).html("Error al enviar");
				}

			},{users_id:user_id,catalog_quiz_gift_box_id:$("#catalog_quiz_gift_box_id :selected").val()});
		}
	};

 	window.adduser = function(names,company_id,element){
	 if(company_id){
			 var user = $('<span/>', {
			  'html': '<h5>'+names +'</h5>',
			  'class': 'badge px-2 my-1 badge-primary mx-2',
			  'id' : company_id
			});
			 user_id[user_id.length]=company_id;
			 $("#user").append(user);
	 	}	
 	}
});

class Quiz extends Http {
	constructor()
	{
		super();
		this.options = {};
	}	
	findByUser(callback,data){ 
    return this.call('../../app/application/find_user_by_quiz.php',data,callback,false);
 	 }
 	 addlist(callback,data){ 
    return this.call('../../app/application/save_quiz_per_user.php',data,callback,false);
 	 }
}