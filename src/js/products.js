$(document).ready(function(){
  let products = new Products;
  let TIME_OUT = 1000;

  $("body").tooltip({ selector:'[data-toggle=tooltip]'});

  dinamicLoader.show($(".response"));
  
  getProducts();

  window.popData = function() {
    specialAlert.popData();
  }

  window.saveProduct = function(element)
  {
    products.saveProduct((response)=>{

    },{title:$("#title").val(),sku:$("#sku").val(),description:editor.getValue(),catalog_brand_id:$("#catalog_brand_id :selected").val(),catalog_product_id:$("#catalog_product_id :selected").val()});
  }

  window.getEditableStock = function(element,product_id) {
    $("[data-product_stock_view='"+product_id+"']").addClass("d-none");
    $("[data-product_stock_edit='"+product_id+"']").removeClass("d-none");
  }

  window.setInvisibleProduct = function(element,product_id) {
    dinamicLoader.show(element);

    products.setInvisibleProduct((response)=>{
      if(response.s == 1)
      {
        getProducts();
      }

    },{product_id:product_id});
  }

  window.setVisibleProduct = function(element,product_id) {
    dinamicLoader.show(element);

    products.setVisibleProduct((response)=>{
      if(response.s == 1)
      {
        getProducts();
      }

    },{product_id:product_id});
  }

  window.deleteProduct = function(element,product_id) {
    dinamicLoader.show(element);

    products.deleteProduct((response)=>{
      if(response.s == 1)
      {
        location.reload();
      }

    },{product_id:product_id});
  }

  window.getProducts = function() {
    getProducts();
  }

  function search(element)
  {
    let query = $(element).val();

    $(".tr").removeClass("d-none");

    if(query)
    {
      $("table").find('.tr').filter(function(index, tr) { 
        if(query.toLowerCase().indexOf("akt") > -1)
        {
          return $(tr).find(".sku").text().toLowerCase().search(query.toLowerCase());
        } else {
          fs = FuzzySet([
            $(tr).find(".title").text().toLowerCase(),
            $(tr).find(".brand").text().toLowerCase(),
            $(tr).find(".sku").text().toLowerCase()
          ], false);
          
          return !fs.get(query);
        }
      }).addClass("d-none");
    }
  }

  function updateStock(element,ammount,product_id) {
    dinamicLoader.show(element);

    products.updateStock((response)=>{
      dinamicLoader.close();

      $("[data-product_stock_view='"+product_id+"']").removeClass("d-none").text(number_format(ammount)+" u.");
      $("[data-product_stock_edit='"+product_id+"']").addClass("d-none");

      if(response.s == 1)
      {
        $(".response").html(response.html);

        $("#search").keyup(delay(function(e) {
          search(this);
        }, TIME_OUT));
      }
    },{ammount:ammount,product_id:product_id});
  }

  function getProducts() {
    products.getProducts((response)=>{
      if(response.s == 1)
      {
        $(".response").html(response.html);

        $("#search").keyup(delay(function(e) {
          search(this);
        }, TIME_OUT));

        $(".ammount").keyup(delay(function(e) {
          updateStock($('#loader-toolbar'),$(this).val(),$(this).data("product_id"));
        }, TIME_OUT));
      }
    },{store_per_user_id:getParam("spuid")});
  }

  window.getProduct = function(element,product_id) {
    getProduct(element,product_id);
  }

  function getProduct(element,product_id) {
    dinamicLoader.show($(element));

    products.getProduct((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").append(response.html);

        specialAlert.pushData($("#card-main"),$("#card-submain"));
      }
    },{product_id:product_id});
  }
});

class Products extends Http {
  constructor()
  {
    super();
  }
  setInvisibleProduct(callback,data){
    return this.call('../../app/application/set_invisible_product.php',data,callback,false);
  }
  setVisibleProduct(callback,data){
    return this.call('../../app/application/set_visible_product.php',data,callback,false);
  }
  deleteProduct(callback,data){
    return this.call('../../app/application/delete_product.php',data,callback,false);
  }
  getProducts(callback,data){
    return this.call('../../app/application/get_products.php',data,callback,false);
  }
  updateStock(callback,data){
    return this.call('../../app/application/update_stock.php',data,callback,false);
  }
  saveProduct(callback,data){
    return this.call('../../app/application/save_product.php',data,callback,false);
  }
  getProduct(callback,data){
    return this.call('../../app/application/get_single_product.php',data,callback,false);
  }
};