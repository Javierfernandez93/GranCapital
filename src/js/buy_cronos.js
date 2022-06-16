$(document).ready(function(){
  let cart = new Cart;
  let packages = new Packages;
  let steps = new Steps;
  let TIME_OUT = 800;
  let n = 0;



// window.setEnableMinner = function(){
//  minner.setMinnerActive((response)=>{ 
//       Loader.closeLoader();       
//       if(response.s==1){  
//         enableTimerTick(response.time_limit,response.time_taken,response.expiration_date);
//       }else{
//         alertmesage("No tienes ningun paquete contratado");
//       }
//     });
// }

// window.setDisableMinner = function(){
//  minner.setMinnerDisable((response)=>{ 
//       Loader.closeLoader();       
//       if(response.s==1){  
//         alertmesage("Se a desactivado correctamente");
//         //enableTimerTick(response.time_limit,response.time_taken,response.expiration_date);
//       }else{
//         alertmesage("No tienes ningun paquete contratado");
//       }
//     },{time_taken:n});
// }
     
// function enableTimerTick(time_limit,time_taken,expiration_date){
//   if(Math.round(new Date().getTime()/1000)<=expiration_date){
//     alertmesage("Se a Activado correctamente");
//          var date = new Date(expiration_date * 1000);
//     // Hours part from the timestamp
//     var year = date.getFullYear();
//     var month = date.getMonth();
//     var day = date.getDay();
//     var hours = date.getHours();
//     // Minutes part from the timestamp
//     var minutes = "0" + date.getMinutes();
//     // Seconds part from the timestamp
//     var seconds = "0" + date.getSeconds();

//     // Will display time in 10:30:23 format
//     console.log( year+'/'+month+'/'+day+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
//   }else{
//     alertmesage("HAS EXCEDIDO EL TIEMPO LIMITE DE TU PAQUETE");
      
//   }
// }



  // console.log($("#hasInstance").val());
  // console.log($("#hasActivation").val());


  // Loader.showLoader();
  // steps.nextStep();
  // getResumeForm();
  // getTotalAmmount();
  // Loader.closeLoader();
  // steps.nextStep();


  if($("#hasInstance").val()==1){
    Loader.showLoader();
      getTotalAmmount();
    cart.getResumeForm((response)=>{
      Loader.closeLoader();
      console.log(response.html);
      $(".row-response").html(response.html);
      steps.nextStep();
      getProducstByLine("Cronos");
    });
  }else{
    let hasActivation =$("#hasActivation").val();
    let buy_from=$("#buy_from").val();
    Loader.showLoader();
    packages.getPackages((response)=>{ 
      Loader.closeLoader();       
      if(response.s==1){
        $(".row-response").html(response.html);     
      }else{
        alertmesage(response.m);
      }
    },{hasActivation:hasActivation,buy_from:buy_from});
  }

  // steps.nextStep();

  // Loader.showLoader();
  // steps.nextStep();
  // getResumeForm();
  // getTotalAmmount();
  // Loader.closeLoader();
  // steps.nextStep();
 


  window.selectKind = function(element,kind,user_login_id,description,activation=false){
  
    $(".box-choice-qualification-type").removeClass("option-active");
    $(".option-selected").addClass("d-none");
    $(element).addClass("option-active");
    
    $("body .save-activation-kind").data("kind",kind);
    $("body .save-activation-kind").data("description",description);
    $("body .save-activation-kind").data("user_login_id",user_login_id);
    $("body .save-activation-kind").data("activation",activation);

  }
  

  window.saveActivationKind = function(element){
    kind= $(element).data("kind");
    description= $(element).data("description");
    
    if(kind==undefined || kind==""){
      alertmesage("<p>Selecciona el tipo de compra que deseas realizar.</p>");      
    }else{
      let alert = alertCtrl.create({
          title: "Antes de continuar", 
          subTitle: '<p>Esta compra se tomará en cuenta para <b>'+description+'<b/>.</p>',     
          buttons: [        
            { 
              class: "btn-primary",
              text: "Aceptar y comprar",
              role: 'cancel',
              handler: data => { 
                Loader.showLoader();
                cart.setPackage((response)=>{
                  Loader.closeLoader();
                  if(response.s){
                    Loader.showLoader();
                    cart.getResumeForm((response)=>{
                       $(".row-response").html(response.html);
                      Loader.closeLoader();
                      getTotalAmmount();
                    });
                  }else{
                    alertmesage(response.m);
                  }
                },{package_id:kind,user_login_id:$(element).data("user_login_id"),activation:$(element).data("activation")});
              } 
            },
            { 
              text: "Cancelar", 
              role: 'cancel', 
              handler: data => { 

              } 
            },
          ]
      });
      alertCtrl.present(alert.modal);
    }
    
  }

  window.setInstanceAsLast = function(element,instance_id) {
    $(element).text("Espere...");
    Loader.showLoader();
    cart.setInstanceAsLast((response)=>{
      Loader.closeLoader();
      if(response.s === 1)
      {
        $(element).text("Actualizando página...");

        location.reload();
      }
    },{instance_id:instance_id});
  }

  window.addOrder = function(element) {
    Loader.showLoader();
    cart.verifyPurchaseToAditional((response)=>{
      Loader.closeLoader();
      if(response.s === 1)
      {
        alert = alertCtrl.create({
          title: translate("Aviso"),
          subTitle: translate("Ingresa el ID para anexar pedido"),
          buttons: [
            { 
                text: translate("Aceptar"),
                role: 'cancel', 
                handler: data => {              
                  foundNameToNewInstance(data.company_id);                              
                },           
            },
          ],
          inputs: [
            {
              type : 'number',
              name : 'company_id',
              id : 'company_id'
            }
          ]
        });

        alertCtrl.present(alert.modal);
                
      }else{
        alertmesage(response.m);        
      }
    });
  }

  function foundNameToNewInstance(user_login_id=false){
    if(user_login_id){
      Loader.showLoader();                
      packages.getNameToNewInstance((response)=>{
        Loader.closeLoader();
        if(response.s==1){
          alert = alertCtrl.create({
            title: translate("Importante "),
            subTitle: translate("Estas seguro de crear un perido para <b>"+response.name+"</b>?"),
            buttons: [        
                { 
                  class: "btn-primary",
                  text: translate('Aceptar'),
                  role: 'cancel',
                  handler: data => { 
                    Loader.showLoader();
                    packages.getResumeForm((response)=>{
                      Loader.closeLoader();
                      if(response.s==1){
                        steps.previousStep();
                        steps.previousStep();  
                        $(".row-response").html(response.html);     
                      }else{
                        alertmesage(response.m);
                      }                      
                    },{user_login_id:user_login_id});            
                  } 
                },
                { 
                  text: "Cancelar", 
                  role: 'cancel', 
                  handler: data => { 

                  } 
                },
              ]          
          });

          alertCtrl.present(alert.modal);          
        }else{
          alertmesage(response.m);
        }                      
      },{user_login_id:user_login_id});
    }
  }

  window.selectPaymentMethod = function(element,payment_id) {
    let text = $(element).text();
    $(".btn-payment-method").removeClass("method-selected btn-primary");
    // $(element).removeClass("payment_method_selected");
    // $(element).html("Espere...");
    Loader.showLoader();
    cart.selectPaymentMethod((response)=>{
      Loader.closeLoader();
      if(response.s === 1)
      {
        $(element).addClass("method-selected btn-primary").text(text);
        // $(element).removeClass("payment_method_selected");
        getTotalAmmount();
      }else{
        alertmesage(response.m);
      }
    },{payment_id:payment_id});
  }

  window.selectShippingMethod = function(element,shipping_id) {
    let text = $(element).text();
    $(".btn-shipping-method").removeClass("method-selected");
    $(element).html("Espere...");
    Loader.showLoader();
    cart.selectShippingMethod((response)=>{
      Loader.closeLoader();
      if(response.s === 1)
      {
        $(element).addClass("method-selected").text(text);
        getTotalAmmount();
      }
    },{shipping_id:shipping_id});
  }
  
  window.selectShippingAddress = function() {
    Loader.showLoader();
    cart.selectShippingAddress((response)=>{
      Loader.closeLoader();
      if(response.s === 1)
      {
        getTotalAmmount();
      }
    },{shipping_address:$("input[name='shipping_address']:checked").val()});
  }

  window.deleteProductToCart = function(product_id,element) {
    deleteItem(product_id,element);    
  }

  window.deleteProductFromInstance = function(product_id,instance_id) {
    Loader.showLoader();
    cart.deleteItemFromInstance((response)=>{
      Loader.closeLoader();
      if(response.s==1){        
        getResumeForm();
        getTotalAmmount();
      }
    },{product_id:product_id,instance_id:instance_id});
  }

  function deleteItem(product_id,element) {
    Loader.showLoader();
    cart.deleteItem((response)=>{
      if(response.s==1){
        getSubTotalAmmount();
        Loader.closeLoader();
        let input = $(element).parent().parent().find(".ammount-of-products-");
        $(element).addClass("d-none");
        $(input).val(0);
      }
    },{product_id:product_id});    
  }

  window.getProducstByLineChoice = function(line) { 
    getProducstByLine(line);   
  }

  function getProducstByLine(line)
  {
    Loader.showLoader();
    packages.getProductsByLine((response)=>{
      Loader.closeLoader();
      if(response.s == 1)
      {
        $("#box_products").html(response.html);
      }
    },{line:line});
  }

  window.nextStep = function() {    
    steps.nextStep();

    // console.log(steps.getStep());
    
    if(steps.getStep() === 3) {
      getResumeForm();
      getTotalAmmount();
    }else if(steps.getStep()==4){
      Loader.showLoader();
      cart.verifyBeforeSaveBuyCronos((response)=>{
        Loader.closeLoader();
        if(response.s === 1)
        {
          let alert = alertCtrl.create({
              title: "Antes de Continuar", 
              subTitle: '<p>El costo total de tu compra es de: <h2><b>$ '+response.total_ammount+' <b/></h2><br> ¿Estás seguro de terminar tu compra?</p>',     
              buttons: [        
                { 
                  class: "btn-primary",
                  text: translate('Aceptar'),
                  role: 'cancel',
                  handler: data => { 
                    Loader.showLoader();
                    cart.saveBuyCronos((response)=>{
                      if(response.s === 1)
                      {
                        Loader.closeLoader();
                        $(".row-response").html(response.html);
                        $(".box-payment-html").html(response.payment_html);
                      }
                    });               
                  } 
                },
                { 
                  text: "Cancelar", 
                  role: 'cancel', 
                  handler: data => { 

                  } 
                },
              ]
          });
          alertCtrl.present(alert.modal);
                  
        }else{
          alertmesage(response.m);
          steps.previousStep();
        }
      });      
    }
  }

  window.previousStep = function() {

    steps.previousStep();    
    if(steps.getStep() == 2) {
      Loader.showLoader();
      packages.getProductsForm((response)=>{
        Loader.closeLoader();
        $(".row-response").html(response.html); 
        getProducstByLine("Cronos");
        getSubTotalAmmount();
      });     
    }
  }

  function getResumeForm()
  {
    Loader.showLoader();
    cart.getResumeForm((response)=>{
      Loader.closeLoader();
      if (response.s == 1) {
        $(".row-response").html(response.html);
      }
    });
  }

  function getTotalAmmount(kind)
  {
    cart.getTotalAmmount((response)=>{
      if (response.s == 1) {
        $(".box-total-ammount").html(response.html);
      }
    },{kind:kind});
  }

  function getSubTotalAmmount(kind)
  {
    Loader.showLoader();
    cart.getSubTotalAmmount((response)=>{
      Loader.closeLoader();
      if (response.s == 1) {
        $(".box-subtotal-ammount").html(response.html);
      }
    },{kind:kind});
  }

  window.addProductToCart = function(element,product_id){
    let input = $(element).parent().parent().find(".ammount-of-products-");

    if($(input).val())
    {
      Loader.showLoader();
      
      cart.addProduct((response)=>{
        Loader.closeLoader();
        if(response.s == 1)
        {
          $(element).parent().find(".btn-delete-bracelete").removeClass("d-none");

           if(response.cart_done == true){
            $(".button-next").removeClass("d-none");
          }
          getSubTotalAmmount();
          

        }else{
          $(input).val(0);
          alertmesage(response.m);
          $(element).parent().find(".btn-delete-bracelete").addClass("d-none");
        }
      },{product_id:product_id,ammount:$(input).val()});
    } else {
      alertmesage("Ingresa una cantidad válida 1.");
    }
  }

  window.togglePassword = function(element) {
    passwordHelper.toggleElement($(element).parent().parent().find(".input-password"),element);
  }

  window.selectPackageId = function(element,package_id) {
    selectPackageId(element,package_id);
  }

  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

  window.selectPackage = function(package_selected) {
    if(packages.getPackageSelected() != package_selected)
    {
      packages.setPackageId(package_selected);
      packages.selectPackage();    
    }
  }
});


class Steps {
  constructor() {
    this.actual_step = 1;
    this.box_step_header = "box-step-header";
    this.box_step_main = "box-step-main";
    this.step_limit = 4;
  }
  isLastStep() {
    return this.actual_step === this.step_limit;
  }
  getStep() {
    return this.actual_step;
  }
  setStep(actual_step) {
    this.actual_step = actual_step++;
  }
  showNextStepHeader() {
    $(".box-step-header").removeClass("box-step-header-active");
    $(".box-step-header").eq(this.getStep()-1).addClass("box-step-header-active");
  }
  showNextStepMain() {
    $(".box-step-main").addClass("d-none");
    $(".box-step-main").eq(this.getStep()-1).removeClass("d-none");
  }
  scrollUp(element) {
    $('html, body').animate({
      scrollTop: $(element).offset().top
    }, 1000);
  }
  nextStep() {
    if(this.actual_step < this.step_limit)
    {
      this.setStep(this.actual_step+1);

      // this.showNextStepMain();
      this.showNextStepHeader();
      this.scrollUp($(".box-steps-main"));      
    }
  }
  previousStep() {
    if(this.actual_step > 1)
    {
      this.setStep(this.actual_step-1);
      this.showNextStepHeader();
      this.scrollUp($(".box-steps-main"));            
    }
  }
}



class Cart extends Http {
  constructor() {
    super();
  }
  addOrder(callback,data) {
    return this.call("../../app/application/add_order.php",data,callback,false);
  }
  setInstanceAsLast(callback,data) {
    return this.call("../../app/application/set_instance_as_last.php",data,callback,false);
  }
  setPackage(callback,data) {
    return this.call("../../app/application/set_package_cronos.php",data,callback,false);
  }
  addProduct(callback,data) {
    return this.call("../../app/application/add_product_cronos.php",data,callback,false);
  }  
  deleteItem(callback,data) {
    return this.call("../../app/application/delete_item_cronos.php",data,callback,false);
  }
  deleteItemFromInstance(callback,data) {
    return this.call("../../app/application/delete_item_cronos_per_instance.php",data,callback,false);
  }
  selectPaymentMethod(callback,data) {
    return this.call("../../app/application/select_payment_method.php",data,callback,false);
  }
  getTotalAmmount(callback,data) {
    return this.call("../../app/application/get_total_ammount.php",data,callback,false);
  }
  getSubTotalAmmount(callback,data) {
    return this.call("../../app/application/get_sub_total_ammount.php",data,callback,false);
  }
  selectShippingMethod(callback,data) {
    return this.call("../../app/application/select_shipping_method.php",data,callback,false);
  }
  selectShippingAddress(callback,data) {
    return this.call("../../app/application/select_shipping_address.php",data,callback,false);
  }
  getResumeForm(callback,data) {
    return this.call("../../app/application/get_resume_form.php",data,callback,false);
  }
  saveBuy(callback,data) {
    return this.call("../../app/application/save_buy.php",data,callback,false);
  }
  saveBuyCronos(callback,data) {
    return this.call("../../app/application/save_buy_cronos.php",data,callback,false);
  }
  verifyBeforeSaveBuyCronos(callback,data) {
    return this.call("../../app/application/verify_before_save_buy_cronos.php",data,callback,false);
  }
  verifyPurchaseToAditional(callback,data) {
    return this.call("../../app/application/verify_before_aditional_cronos.php",data,callback,false);
  }
  
  saveUsers(callback,data) {
    return this.call("../../app/application/save_users.php",data,callback,false);
  }
  addBracelete(callback,data) {
    return this.call("../../app/application/add_bracelete.php",data,callback,false);
  }
}
class Packages extends Http {
  constructor() {
    super();
    this.package_id = 21;
    this.person_id = 0;
    this.package_selected = false;
  }
  getPersonId() {
    return this.person_id;
  }
  setPersonId(person_id) {
    this.person_id = person_id;
  }
  getPackageId() {
    return this.package_id;
  }
  hasForcedRowsLimit() {
    if(this.package_id == 21)
      return true;
    else if(this.package_id == 22)
      return true;
    else if(this.package_id == 23)
      return false;
  }
  getRowsLimit() {
    if(this.package_id == 21)
      return 1;
    else if(this.package_id == 22)
      return 2;
    else if(this.package_id == 23)
      return 5;
  }
  toggleAddButton() {
    if(this.hasForcedRowsLimit() === false)
    {
      $(".box-add-member").removeClass("d-none");
    } else {
      $(".box-add-member").addClass("d-none");
    }
  }
  showBoxToFillPersonalInfo() {
    $(".box-personal-info").removeClass("d-none");
  }
  hideBoxToFillPersonalInfo() {
    $(".box-personal-info").addClass("d-none");
  }
  setPackageIdASelected(element) {
    if(element != undefined)
    {
      $(element).addClass("box-membership-selected");
    }
  }
  setPackageId(package_id) {
    this.package_id = package_id;    
  }
  selectPackage() {
    $(".bg-purple-"+this.getPackageSelected()).addClass("box-shadow-a");

    if(this.getPackageSelected() == 1)
    {
      $(".bg-purple-2, .bg-purple-3").addClass("bg-purple-onmouseleave");
    } else if(this.getPackageSelected() == 2) {
      $(".bg-purple-1, .bg-purple-3").addClass("bg-purple-onmouseleave");
    } else if(this.getPackageSelected() == 3) {
      $(".bg-purple-1, .bg-purple-2").addClass("bg-purple-onmouseleave");
    }
  }
  getPackageSelected() {   
    return this.package_selected;
  }
  getProductsForm(callback,data) {
    return this.call("../../app/application/get_products_form.php",data,callback,false);
  } 
  getPackages(callback,data) {
    return this.call("../../app/application/get_packages.php",data,callback,false);
  }
  getNameToNewInstance(callback,data) {
    return this.call("../../app/application/get_name_to_new_instance.php",data,callback,false);
  }
  getProductsByLine(callback,data) {
    return this.call("../../app/application/get_products_by_line.php",data,callback,false);
  }
  removePackagesIdsSelected() {
    $(".box-membership").removeClass("box-membership-selected");
  }
  removeSelected() {
    $(".bg-purple-1, .bg-purple-2, .bg-purple-3").removeClass("box-shadow-a bg-purple-onmouseleave");
  }
  setPackageSelected(package_selected) {
    this.package_selected = package_selected;
  }
}

