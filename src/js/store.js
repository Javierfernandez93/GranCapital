$(document).ready(function(){
	let store = new Store;
	let floatingElement = new FloatingElement;

	store.initPreloader();
	
	window.viewProduct = (product) => {
		console.log(product);
	}

	getAllProductsStore();

	function getAllProductsStore()
	{
		store.getAllProductsStore((response)=>{
			if(response.s == 1)
			{
				store.setProducts(response.products,()=>{
					$('.lazy').Lazy({
						effect: "fadeIn",
				        effectTime: 500,
				        threshold: 0
					});
				});
			}
		},{store_per_user_id:getParam("id")});
	}
});


class Product 
{
	constructor()
	{
		this.id = getUniqueId();
		this.product_id = null;
		this.title = null;
		this.price = null;
		this.promo_price = null;
		this.image = null;
	}
	setId(id)
	{
		this.id = id;
	}
	getId()
	{
		return this.id;
	}
	setProductId(product_id)
	{
		this.product_id = product_id;
	}
	getProductId()
	{
		return this.product_id;
	}
	setPrice(price)
	{
		this.price = price;
	}
	setTitle(title)
	{
		this.title = title;
	}
	getTitle()
	{
		return this.title;
	}
	setPrice(price)
	{
		this.price = price;
	}
	getPrice()
	{
		return this.price;
	}
	setPromoPrice(promo_price)
	{
		this.promo_price = promo_price;
	}
	getPromoPrice()
	{
		return this.promo_price;
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

class Store extends Http
{
	constructor()
	{
		super();
		this.itinerator = 16;
		this.products = [];
	}
	clearPreloader()
	{
		$("#response").html("");
	}
	setProducts(products,callback)
	{
		this.clearPreloader();
		this.products = [];

		products.forEach((product,key)=>{
			let _product = new Product;

			_product.setProductId(product.product_id);
			_product.setTitle(product.title);
			_product.setImage(product.image);
			_product.setPrice(product.price);
			_product.setPromoPrice(product.promo_price);

			this.products.push(_product);
		});

		this.showProducts(callback);
	}
	initPreloader()
	{
		for(let i = 0; i < this.itinerator; i++)
		{
			this.products.push(new Product);
		}

		this.showProducts();
	}
	showProducts(callback)
	{
		this.products.forEach((product,key)=>{
			$("#response").append(
				this.createProduct(
					product.getProductId(),
					product.getId(),
					product.getTitle(),
					product.getPrice(),
					product.getPromoPrice(),
					product.getImage()
				)
			);
		});

		if(callback != undefined) callback();
	}
	createProductContainer()
	{
		let row = $("<div/>").addClass("row").attr("");

		return row;
	}
	createProduct(product_id,id,title,price,promo_price,image)
	{
		let col = $("<div/>").addClass("col-12 col-md-6 col-xl-4 mb-3");
		let card = $("<div/>").addClass("card card-product").attr("data-product-id",id).attr("onclick","viewProduct("+JSON.stringify({product_id:product_id,title:title,price:price,promo_price:promo_price,image:image})+")");

		let row = $("<div/>").addClass("row");
		let col_info = $("<div/>").addClass("col-12 order-1 order-xl-0 col-xl-8 pl-4 d-flex align-items-center");
		let col_info_row = $("<div/>").addClass("row w-100");
		let col_info_col = $("<div/>").addClass("col-12 py-3 py-xl-0 ");

		let _title = $("<div/>").addClass("lead mb-1 lead-sm");

		if(title != undefined)
		{
			_title.addClass("bold single-line").text(title);
		} else {
			_title.addClass("animated-background");
		}

		let _price = $("<div/>").addClass("lead lead-sm");

		if(price != undefined)
		{
			_price.text("$"+number_format(price,2));
		} else {
			_price.addClass("animated-background");
		}

		col_info_col.append(_title,_price);

		col_info_row.append(col_info_col);
		col_info.append(col_info_row);

		let col_image = $("<div/>").addClass("col-12 col-xl-4");
		let _image = $("<img/>").addClass("card-img");

		if(image != undefined)
		{
			_image.addClass("lazy").attr("data-src",image);
		} else {
			_image.addClass("animated-background");
		}

		col_image.append(_image);

		row.append(col_info,col_image);

		card.append(row);

		col.append(card);

		return col;
	}
	getAllProductsStore(callback,data) {
   		return this.call('../../app/application/get_all_products_store.php',data,callback,false);
  	}
}