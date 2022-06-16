$(document).ready(function() {
	$('body').on('click','.box-option-item-show',function(){
		$('.box-option-item-show').removeClass('box-option-item-selected');
		$(this).addClass('box-option-item-selected');
	});
	$('body').on('click','.box-option',function(){
		if($('.box-option-show').length)
		{
			$(this).find('li').removeClass('box-option-item-show')
			$(this).removeClass('box-option-show')
			$.each($(this).find('li'),function(index,element){
				$(element).css("top",0);
			});
		} else {
			var direction = $(this).data('direction');
			$.each($(this).find('li'),function(index,element){
				if(direction == 'bottom')
				$(element).css("top",(index * $(element).height()));
				else if(direction == 'top')
				$(element).css("top",-(index * $(element).height()));
			});
			$(this).addClass('box-option-show')
			$(this).find('li').addClass('box-option-item-show')
		}
	});
});