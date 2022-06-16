$(document).ready(function(){
	let sheets = new Sheets;

	$("body").tooltip({ selector:'[data-toggle=tooltip]'});

	dinamicLoader.showLoader($(".response"));

	sheets.getAllSheets((response)=>{
		if(response.s == 1)
		{
			$(".response").html(response.html);

			$(".progress-circle").each((k,element)=>{
				loadProgressBar(element,$(element).data("percentaje"));
			});

		}
	},{proyect_id:getParam("pid")});

	function loadProgressBar(element,value)
	{
		let color;

		if(value > 66)
		{
			color = "#00d97d";
		} else if(value < 33) {
			color = "#de1d00";
		} else {
			color = "#f5cc04";
		}

		var bar = new ProgressBar.Circle(element, {
		    color: color,
		    strokeWidth: 4,
		    trailWidth: 1,
		    easing: 'easeInOut',
		    duration: 1350,
		    text: {
		      autoStyleContainer: false
		    },
		    from: { color: color, width: 1 },
		    to: { color: color, width: 5 },
		    // Set default step function for all animate calls
		    step: function(state, circle) {
		      circle.path.setAttribute('stroke', state.color);
		      circle.path.setAttribute('stroke-width', state.width);

		      var value = Math.round(circle.value() * 100);
		      if (value === 0) {
		        circle.setText('');
		      } else {
		        circle.setText(value+"%");
		      }

		    }
		});

	  	bar.text.style.fontSize = '1.7rem';
	  	bar.animate(value/100);  
	}


  window.getMethodsToShareSheet = function(element)
  {
    _showLeftAlertWS('getMethodsToShareSheet',null,{proyect_id:getParam("pid")},element,'preloader-sm-black')
  }

});

class Sheets extends Http {
  constructor()
  {
    super();
  }
  getAllSheets(callback,data){
    return this.call("../../app/application/get_all_sheets.php",data,callback);
  }
};