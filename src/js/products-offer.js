$(document).ready(function(){
  let productsOffer = new ProductsOffer;

  productsOffer.getOffers((response)=>{
    if(response.s == 1)
    {
      $(".response").html(response.html);
    }
  },{store_per_user_id:getParam("spuid")});
});

class ProductsOffer extends Http {
  constructor()
  {
    super();
  }
  getOffers(callback,data){
    return this.call('../../app/application/get_offers.php',data,callback,false);
  }
};