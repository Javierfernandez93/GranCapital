class Card extends Http {
	getAllCards(callback,data){
		return this.call('../../app/application/get_all_cards.php',data,callback);
	}
	deleteCard(callback,data){
		return this.call('../../app/application/delete_card.php',data,callback,false,0);
	}
	saveCard(callback,data){
		return this.call('../../app/application/save_card.php',data,callback,false,0);
	}	
}