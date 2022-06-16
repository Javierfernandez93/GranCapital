$(document).ready(function(){
	let calculator = new Calculator;
	let result0 = 0;
	
	getForm(1);

	window.getResults = function(id) {
		let choices = [];

		$("[name^='choices']").each((key,choice)=>{
				if($(choice).prop('type') == "radio") {
				  if ($(choice).prop("checked") == true) {
				    choices.push($(choice).val());
				  }
				} else {
					choices.push($(choice).val());
				}
		});

		calculator.getResults((response)=>{
			if(response.s == 1) {
				result0 = eval(response.function);

				getSingleResult(id,result0, choices)
			}
		},{id:id,choices:choices});
	}

	window.getForm = function(id) {
		getForm(1);
	}

	function getForm(id) {
		calculator.getForm((response)=>{
			if(response.s == 1) {
				$(".box-content").html(response.html);
			}
		},{id:id});
	}

	function getSingleResult(id,result0,choices) {
		calculator.getSingleResult((response)=>{
			if(response.s == 1) {

				if(response.functions != undefined)
				{
					response.functions.forEach((_function)=>{
						let result = eval(_function._function);
						console.log(result + _function.title);
					});
				}
				console.log(response);
			}
		},{result0:result0,id:id,choices:choices});
	}
});

class Calculator extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  getForm(callback,data){
    return this.call('../../app/application/get_form.php',data,callback);
  }
  getResults(callback,data){
    return this.call('../../app/application/get_result.php',data,callback);
  }
  getSingleResult(callback,data){
    return this.call('../../app/application/get_single_result.php',data,callback);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};