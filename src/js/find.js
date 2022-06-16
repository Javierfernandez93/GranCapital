$(document).ready(function(){
	let stores = new Stores;

	stores.initPreloader();

	window.goToStore = function(store_per_user_id)
	{
		window.location.href = "../../apps/store/?id="+store_per_user_id;
	}
  
	stores.getAllStores((response)=>{
		if(response.s == 1)
		{
			stores.setStores(response.stores,()=>{
				$('.lazy').Lazy({
					effect: "fadeIn",
			        effectTime: 500,
			        threshold: 0
				});
			});
		}
	});
});

class Store {
	constructor()
	{
		this.id = getUniqueId();
		this.stoper_per_user_id = null;
		this.name = null;
		this.image = null;
		this.shipping_cost = null;
		this.stars = null;
	}
	setStorePerUserId(stoper_per_user_id)
	{
		this.stoper_per_user_id = stoper_per_user_id;
	}
	getStorePerUserId()
	{
		return this.stoper_per_user_id;
	}
	setShippingCost(shipping_cost)
	{
		this.shipping_cost = shipping_cost;
	}
	getShippingCost()
	{
		return this.shipping_cost;
	}
	setStars(stars)
	{
		this.stars = stars;
	}
	getStars()
	{
		return this.stars;
	}
	setId(id)
	{
		this.id = id;
	}
	getId()
	{
		return this.id;
	}
	setName(name)
	{
		this.name = name;
	}
	getName()
	{
		return this.name;
	}
	setImage(image)
	{
		this.image = image;
	}
	getImage()
	{
		return this.image;
	}
}

class Stores extends Http
{
	constructor()
	{
		super();
		this.itinerator = 16;
		this.stores = [];
	}
	clearPreloader()
	{
		$("#response").html("");
	}
	setStores(stores,callback)
	{
		this.clearPreloader();
		this.stores = [];

		stores.forEach((store,key)=>{
			let _store = new Store;
			_store.setStorePerUserId(store.store_per_user_id);
			_store.setName(store.name);
			_store.setImage(store.image);
			_store.setStars(5.4);
			_store.setShippingCost("Costo de envío $35-$40 MXN");

			this.stores.push(_store);
		});

		this.showStores(callback);
	}
	initPreloader()
	{
		for(let i = 0; i < this.itinerator; i++)
		{
			this.stores.push(new Store);
		}

		this.showStores();
	}
	showStores(callback)
	{
		this.stores.forEach((store,key)=>{
			$("#response").append(
				this.createStore(
					store.getStorePerUserId(),
					store.getId(),
					store.getName(),
					store.getShippingCost(),
					store.getStars(),
					store.getImage()
				)
			);
		});

		if(callback != undefined) callback();
	}
	createStoreContainer()
	{
		let row = $("<div/>").addClass("row").attr("");

		return row;
	}
	createStore(store_per_user_id,id,name,shipping_cost,stars,image)
	{
		let col = $("<div/>").addClass("col-12 col-md-6 col-xl-3 mb-3").attr("data-store-id",id);
		let card = $("<div/>").addClass("card position-relative").attr("onclick","goToStore('"+store_per_user_id+"')");

		let img = $("<img/>").addClass("card-img-top");

		if(image != undefined)
		{
			img.addClass("lazy").attr("data-src",image);
		} else {
			img.addClass("animated-background");
		}
		
		let card_body = $("<div/>").addClass("card-body row d-flex align-items-center no-gutters");
		
		let left_data = $("<div/>").addClass("col-10");
		let left_data_row = $("<div/>").addClass("row");
		let left_data_col = $("<div/>").addClass("col-12");
		
		let store_name = $("<div/>").addClass("lead mb-1");

		if(name != undefined)
		{
			store_name.addClass("lead-md bold single-text").text(name);
		} else {
			store_name.addClass("animated-background");
		}

		let shipping_cost_container = $("<div/>").addClass("lead");

		if(shipping_cost != undefined)
		{
			shipping_cost_container.addClass("single-text lead-sm").text(shipping_cost);
		} else {
			shipping_cost_container.addClass("animated-background");
		}

		let col_stars = $("<div/>").addClass("col-2");
		let row_stars = $("<div/>").addClass("row d-flex justify-content-center align-items-center");
		let col_inner_stars = $("<div/>").addClass("col-auto");

		if(stars != undefined)
		{
			let stars_span = $("<span/>").addClass("position-absolute top-0 start-100 translate-middle p-2 bg-light border border-light rounded-circle");
			col_inner_stars.append(stars_span);
			stars_span.text(stars);
		} else {
			col_inner_stars.addClass("animated-background");
		}

		row_stars.append(col_inner_stars);
		col_stars.append(row_stars);

		left_data_row.append(left_data_col);

		left_data_col.append(store_name,shipping_cost_container);

		left_data.append(left_data_row);

		card_body.append(left_data,col_stars);

		card.append(img,card_body);

		let div_special_items = $("<div/>").addClass("position-absolute special-items");
		let span_fav = $("<span/>").addClass("p-2 text-white");
		let i_fav = $("<i/>").addClass("far fa-heart lead lead-md");

		div_special_items.append(span_fav);
		span_fav.append(i_fav);

		card.append(div_special_items);

		col.append(card);

		return col;
	}
	getAllStores(callback,data) {
   		return this.call('../../app/application/get_all_stores.php',data,callback,false);
  	}
}