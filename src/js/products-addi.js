$(document).ready(function(){
  let products = new Products;
  let imageList = new ImageList;
  let product = new Product;
  const TIME_OUT = 1000; // 1s

  getStepOneProduct($("#response"));
  // getStepFinalProduct($("#response"));

  window.toggleCard = function(hide_card_id,show_card_id)
  {
    $("#"+hide_card_id).addClass("opacity-3");
    $("#"+show_card_id).removeClass("d-none");

    setTimeout(()=>{
      _scrollTo($("#"+show_card_id).offset().top);
    },100)
  }

  window.getInfoAboutMargin = function(element)
  {
    _showLeftAlertWS('getInfoAboutMargin',null,{},element,'preloader-sm-black')
  }

  window.getInfoAboutProfit = function(element)
  {
    _showLeftAlertWS('getInfoAboutProfit',null,{},element,'preloader-sm-black')
  }

  window._getStepFinalProduct = function(element,event)
  {
    product.setTitle($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      if(event.which == 13)
      {
        getStepFinalProduct($("#response"));
      }
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  window.getStepFinalProduct = function(element,catalog_product_id)
  {
    getStepFinalProduct($("#response"));
  }

  window.selectCatalogProductStateId = function(element,catalog_product_state_id)
  {
    $(".list-group-item").removeClass("active");
    $(element).addClass("active");
    
    product.selectCatalogProductStateId(catalog_product_state_id);
  }

  window.selectCatalogProduct = function(element,catalog_product_id)
  {
    $(".card-category").addClass("bg-dark");
    $(element).removeClass("bg-dark").addClass("bg-primary");

    product.setCatalogProductId(catalog_product_id);
    console.log(product.getCatalogProductId())
    
    getStepTwoProduct($("#response"));
  }

  function getStepFinalProduct(element)
  {
    product.setTitle($("#title").val());

    dinamicLoader.showLoader(element);

    products.getStepFinalProduct((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        $("#response").html(response.html);

        listenerFunctions();
      }
    },{title:product.getTitle()});
  }

  function getStepTwoProduct(element)
  {
    dinamicLoader.showLoader(element);

    products.getStepTwoProduct((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        $("#response").html(response.html);

        $("#title").focus();
      }
    });
  }

  function getStepOneProduct(element)
  {
    dinamicLoader.showLoader(element);

    products.getStepOneProduct((response)=>{
      dinamicLoader.closeLoader();

      if(response.s == 1)
      {
        $("#response").html(response.html);
      }
    });
  }

  function getBrands()
  {
    products.getBrands((response)=>{
      if(response.s == 1)
      {
        $(".autocomplete").autocomplete({
          autoFocus: true,
          source: response.catalog_brands
        });
      }
    });
  }

  $("body").tooltip({ selector:'[data-toggle=tooltip]'});

  window.setBrand = function(element)
  {
    product.setBrand($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }
  }

  window.setTitle = function(event,element,next_element)
  {
    product.setTitle($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      nextElement(event,next_element);
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  function listenerFunctions()
  {
    $("#sku").keyup(delay(function(e) {
      setSku(e,this,$("#code"));
    }, TIME_OUT));

    $("#code").keyup(delay(function(e) {
      setCode(e,this,$("#ammount"));
    }, TIME_OUT));

    if($("#editor").length > 0)
    {
      var editor = new Simditor({
        textarea: $('#editor'),
        upload: false
      });

      $("#title").focus();

      editor.on('valuechanged',(e,src)=>{
        setDescription(editor.getValue());
      });
    }

    $('.selectable').select2();

    $(".uploadFile").on('change',function(){
      let id = $(this).data("id");

      $("#uploadSubmit-"+id).removeAttr("disabled").removeClass("d-none");
      $("#text-image"+id).text("Imagen seleccionada");
    });

    $('.uploadImage').submit(function(event){
      let id = $(this).data("id");

      if($('#uploadFile-'+id).val())
      {
        $("#uploadSubmit-"+id).text("Subiendo, espere...");
        $("#progress-"+id).removeClass("d-none");
        
        event.preventDefault();

        $(this).ajaxSubmit({
          target: '#targetLayer-'+id,
          dataType : "json",
          beforeSubmit:function(){
            $('#progress-bar-'+id).width('0%');
          },
          uploadProgress: function(event, position, total, percentageComplete)
          {
            $("#progress-bar-"+id).animate({
                width: percentageComplete+'%'
            },{duration: 0});

            if(percentageComplete == 100)
            {

            }
          },
          success: function(data, textStatus, jqXHR) 
          {
            if(data.s == 1)
            {
              let imageAttr = imageList.getElementById(id);
              imageAttr.setId(id);
              imageAttr.setRoute(data.target_path);
              imageList.add(imageAttr);

              $("#uploadSubmit-"+id).addClass("d-none")
              $("#text-image"+id).text("Imagen de perfil actualizada correctamente");
              $('#image-upload-'+id).css('background-image','url('+data.target_path+')');
            }
          },
          resetForm: true
        });
      }
      return false;
    });
  }

  function setSku(event,element,next_element)
  {
    product.setSku($(element).val());

    if($(element).val())
    {
      dinamicLoader.showLoader($("#loader-toolbar"),"preloader-sm-black");

      products.isSkuaviable((response)=>{
        dinamicLoader.closeLoader();

        if(response.s == 1)
        {

          $(element).addClass("is-valid").removeClass("is-invalid");

          nextElement(event,next_element);
        }
      },{sku:$(element).val()});
      
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  function setCode(event,element,next_element)
  {
    product.setCode($(element).val());

    if($(element).val())
    {
      dinamicLoader.showLoader($("#loader-toolbar"),"preloader-sm-black");

      products.isCodeAviable((response)=>{
        dinamicLoader.closeLoader();

        if(response.s == 1)
        {

          $(element).addClass("is-valid").removeClass("is-invalid");

          nextElement(event,next_element);
        }
      },{code:$(element).val()});

    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  window.setAmmount = function(event,element,next_element)
  {
    product.setAmmount($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      nextElement(event,next_element);
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  window.setPrice = function(event,element,next_element)
  {
    product.setPrice($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      nextElement(event,next_element);
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
    checkMargins();
  }

  window.setPromoPrice = function(event,element,next_element)
  {
    product.setPromoPrice($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      nextElement(event,next_element);
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
  }

  window.setCost = function(event,element,next_element)
  {
    product.setCost($(element).val());

    if($(element).val())
    {
      $(element).addClass("is-valid").removeClass("is-invalid");

      nextElement(event,next_element);
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }

    checkFields();
    checkMargins();
  }

  function checkMargins()
  {
    if(product.getCost() && product.getPrice())
    {
      const gain = product.getPrice() - product.getCost();
      const margin = ((product.getPrice() * 100) / product.getCost()) - 100;

      $("#margin").text(number_format(margin,2)+"%");
      $("#gain").text("$"+number_format(gain,2));  

      if(gain > 0)
      {
        $("#margin, #gain").addClass("text-success").removeClass("text-danger");
      } else {

        $("#margin, #gain").removeClass("text-success").addClass("text-danger");
      }
    } else {
      $("#margin").text("-");
      $("#gain").text("-");
    }
  }

  function setDescription(description)
  {
    product.setDescription(description);
    
    checkFields();
  }

  window.nextElement = function(event,next_element)
  {
    nextElement(event,next_element)
  }

  function checkFields()
  {
    $("#save").attr("disabled",true);

    if(!product.getTitle())
    {
      return false;
    }

    if(!product.getSku())
    {
      return false;
    }

    if(!product.getPrice())
    {
      return false;
    }

    if(!product.getDescription())
    {
      return false;
    }

    $("#save").removeAttr("disabled");
  }

  function nextElement(event,next_element)
  {
    if(event.keyCode == 13)
    {
      $(next_element).focus();
    }
  }

  window.toggleColors = function(element)
  {
    $("#list-colors").toggleClass("d-none");
  }

  function saveProduct(element,store_per_user_id)
  {
    dinamicLoader.show(element);

    let visible = $("#visible").prop("checked") ? 1 : 0;
    let catalog_color_ids = [];

    $.each($(".catalog_color_ids"),(k,element)=>{
      if($(element).prop("checked"))
      {
        catalog_color_ids.push($(element).val())
      }
    });

    products.saveProduct((response)=>{
      dinamicLoader.close();

      if(response.s == 1)
      {
        $(element).text("Guardado con éxito");
      }
    },{brand:product.getBrand(),store_per_user_id:store_per_user_id,ammount:product.getAmmount(),promo_price:product.getPromoPrice(),cost:product.getCost(),images:imageList.getList(),title:product.getTitle(),sku:product.getSku(),code:product.getCode(),description:product.getDescription(),catalog_brand_id:$("#catalog_brand_id :selected").val(),catalog_product_id:product.getCatalogProductId(),catalog_product_state_id:product.gelectCatalogProductStateId(),visible:visible,catalog_color_ids:catalog_color_ids,store_per_user_id:getParam("spuid")});
  }

  window.saveProduct = function(element,store_per_user_id)
  {
    if(imageList.getList().length == 0)
    {
      let alert = alertCtrl.create({
        title: "Antes de continuar", 
        subTitle: "Es importante añadir images para que tu producto/servicio tenga una mejor exposición. ¿Deseas continuar de todos modos?",
        buttons: [
          { 
            text: translate('Sí, continuar'), 
            handler: data => { 
              alert.modal.dismiss()
              saveProduct(element,store_per_user_id);
            } 
          },
          { 
            text: translate('Cancelar'), 
            role: 'cancel', 
            handler: data => {
            } 
          },
        ],
      });

      alertCtrl.present(alert.modal);
    } else {
      saveProduct(element,store_per_user_id);
    }
  }

  window.selectImageFile = function(id)
  {
    $("#uploadFile-"+id).click();
  }
});

class Products extends Http {
  constructor()
  {
    super();
  }
  getStepFinalProduct(callback,data){
    return this.call('../../app/application/get_step_final_product.php',data,callback,false);
  }  
  getStepTwoProduct(callback,data){
    return this.call('../../app/application/get_step_two_product.php',data,callback,false);
  }
  getStepOneProduct(callback,data){
    return this.call('../../app/application/get_step_one_product.php',data,callback,false);
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
  saveProduct(callback,data){
    return this.call('../../app/application/save_product.php',data,callback,false);
  }
  getBrands(callback,data){
    return this.call('../../app/application/get_brands.php',data,callback,false);
  }
  isSkuaviable(callback,data){
    return this.call('../../app/application/is_sku_aviable.php',data,callback,false);
  }
  isCodeAviable(callback,data){
    return this.call('../../app/application/is_code_aviable.php',data,callback,false);
  }
};

class ImageAttr {
  constructor()
  {
    this.id = null;
    this.route = null;
  }
  getRoute()
  {
    return this.route
  } 
  getId()
  {
    return this.id
  }
  setRoute(route)
  {
    this.route = route;
  }
  setId(id)
  {
    this.id = id;
  }
}

class ImageList {
  constructor()
  {
    this.list = [];
  }
  searchElementById(id)
  {
    let _key = false;
      
    this.getList().forEach((element,key)=>{
      if(element.getId() == id)
      {
        _key = key;
      }
    });

    return _key;
  }
  getElementById(id)
  {
    let i = this.searchElementById(id);

    if(i !== false)
    {
      return this.getElement(i);
    }

    return new ImageAttr;
  }
  getElement(i)
  {
    return this.getList()[i];
  }
  exist(_element)
  {
    let exist = false;
    
    this.getList().forEach((element,key)=>{
      if(element.getId() == _element.getId())
      {
        exist = true;
      }
    });

    return exist;
  }
  add(element)
  {
    if(this.exist(element) == false)
    {
      this.list.push(element);
    }
  }
  getList()
  {
    return this.list;
  }
  setList(list)
  {
    this.list = list;
  }

}

class Product {
  constructor()
  {
    this.title = null;
    this.sku = null;
    this.price = null;
    this.catalog_product_id = null;
    this.promo_price = null;
    this.description = null;
    this.code = null;
    this.ammount = null;
    this.cost = null;
    this.brand = null;
    this.catalog_product_state_id = null;
  }
  gelectCatalogProductStateId()
  {
    return this.catalog_product_state_id;
  }
  selectCatalogProductStateId(catalog_product_state_id)
  {
    this.catalog_product_state_id = catalog_product_state_id;
  }
  setCatalogProductId(catalog_product_id)
  {
    this.catalog_product_id = catalog_product_id;
  }
  setTitle(title)
  {
    this.title = title;
  }
  setBrand(brand)
  {
    this.brand = brand;
  }
  setSku(sku)
  {
    this.sku = sku;
  }
  setCode(code)
  {
    this.code = code;
  }
  setCost(cost)
  {
    this.cost = cost;
  }
  setAmmount(ammount)
  {
    this.ammount = ammount;
  }
  setPrice(price)
  {
    this.price = price;
  }
  setPromoPrice(promo_price)
  {
    this.promo_price = promo_price;
  }
  setDescription(description)
  {
    this.description = description;
  }
  getCatalogProductId() {
    return this.catalog_product_id;
  }
  getTitle()
  {
    return this.title;
  }
  getSku()
  {
    return this.sku;
  }
  getPrice()
  {
    return this.price;
  }
  getDescription()
  {
    return this.description;
  }
  getCode()
  {
    return this.code;
  }
  getAmmount()
  {
    return this.ammount;
  }
  getPromoPrice()
  {
    return this.promo_price;
  }
  getCost()
  {
    return this.cost;
  }
  getBrand()
  {
    return this.brand;
  }
}