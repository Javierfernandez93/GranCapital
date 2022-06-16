class ScheduleOffer extends Http {
	constructor()
	{
		super();
	}
	selectDay(callback,element){
		$('body .box-day').removeClass('box-day-selected');
		$(element).addClass('box-day-selected');
		callback();
	}
	saveOffer(callback,data){
		return this.call('../../app/application/save_offer.php',data,callback,false,0);
	}
	showBillOfDay(callback,data){
		return this.call('../../app/application/get_bill_of_day.php',data,callback,false,0);
	}
	getScheduleOffers(callback,data){
		return this.call('../../app/application/get_schedule_offers.php',data,callback);
	}
};