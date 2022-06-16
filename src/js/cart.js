class Cart extends Http {
	constructor(){
		this.total = '0';
		this.currency = 'MXN';
		this.items = false;
	}
	addItem(){
		return this.call('../../app/application/cart/add_item.php',data,callback,false);
	}
	getItems(){
		return this.call('../../app/application/cart/get_items.php',data,callback,false);
	}
	deleteItem(){
		return this.call('../../app/application/cart/delete_item.php',data,callback,false);
	}
	loadTotal(){
		return this.call('../../app/application/cart/get_total.php',data,callback,false);
	}
}