$(document).ready(function(){
	$('.steps-ul > li').click(function(){
		if($(this).hasClass('step-active-checked'))
		JfSteps.getStepByIndex($(this).index()+1)
	});
})
var JfSteps = {
	actualStep : 1,
	totalSteps : false,
	init : function(){
		this.showStepByStepId(this.actualStep);
		this.totalSteps = $('.steps-ul li').size();
	},
	getNextStep : function(addComplete){
		this.actualStep++;
		this.showStepByStepId(this.actualStep,addComplete);
		return true;
	},
	getStepByIndex : function(step){
		this.actualStep = step;
		this.showStepByStepId(this.actualStep);
	},
	showStepByStepId : function(actualStep,addComplete){
		$('[data-step]').hide();
		$('[data-step='+actualStep+']').fadeIn(300);
		$('.steps-ul li').removeClass('step-active');
		$('.steps-ul li').eq(actualStep-1).addClass('step-active');

		if(addComplete != undefined)
		{
			$('.steps-ul li').eq(actualStep-2).addClass('step-active-checked');
			$('.steps-ul li').eq(actualStep-2).addClass('step-active-li-checked');
		}

		return true;
	},
	removeStep : function(step){
		$('.steps-ul li').eq(step-1).removeClass('step-active-checked');
		$('.steps-ul li').eq(step-1).removeClass('step-active-li-checked');
		this.actualStep = step - 1;
		return true;
	},
	stepsEnd : function(){
		if(this.stepStatus())
		{
			setTimeout(function(){
				$('.steps-ul,.steps-box').fadeOut();
			},1000);
			return true;
		}

		return false;
	},
	stepStatus : function(){
		if(this.totalSteps == $('.step-active-li-checked').size())
			return true;

		return false;
	},
	getPrevStep : function(addComplete){
		this.actualStep--;
		return true;
	},
};