$(document).ready(function(){
  let cart = new Cart;
  let packages = new Packages;
  let passwordHelper = new PasswordHelper;
  let steps = new Steps;
  let healtBroker = new HealtBroker;
  let promotorAttr = new PromotorAttr;
  let membersAdapter = new MembersAdapter;
  let addressAttr = new AddressAttr;
  let TIME_OUT = 800;

  selectPackageId(false,27,()=>{
    // nextStep(()=>{
    //   nextStep(()=>{
    //     nextStep();
    //   });
    // });
  });

  $("#healt_broker_names").keyup(delay(function (e) {
    getHealtBroker($("#healt_broker_names").val());
  }, TIME_OUT));

  window.hidePrimarySteps = function() {
    $(".overlay-steps").addClass("d-none");
  }

  window.previousStep = function() {
    steps.previousStep();
  }

  window.setGenotype = function() {
    let id = membersAdapter.getActualMemberId()-1;
    memberAttrTemp = membersAdapter.get(id);
    memberAttrTemp.setGenotype($("input[name='genotype']:checked").val());

    membersAdapter.adapter[id] = memberAttrTemp;

    $("#member-"+membersAdapter.getActualMemberId()).find(".input-genotype").text($("input[name='genotype']:checked").val());

    hasFullFilled();
  }

  window.selectGenotype = function(actual_member_id) {

    $("#genotype-main").removeClass("d-none");
    
    $('html, body').animate({
      scrollTop: $("#genotype-main").offset().top
    }, 1000);

    membersAdapter.setActualMemberId(actual_member_id);

    addMember(actual_member_id,(exist)=>{
      if(exist === false)
      {
        memberAttrTemp = membersAdapter.get(actual_member_id-1);

        $("#genotype-for").html("<b style='font-size:32px;'>Genotipo para "+memberAttrTemp.getNames()+"</b>");
      }
    });
  }

  function addMember(actual_member_id,callback)
  {
    let div = $("#member-"+actual_member_id);

    let membersAttr = new MemberAttr;
    membersAttr.setEmail($(div).find(".input-email").val());
    membersAttr.setNames($(div).find(".input-name").val());
    membersAttr.setLastName($(div).find(".input-last-name").val());
    membersAttr.setSecondLastName($(div).find(".input-sur-name").val());
    membersAttr.setPassword($(div).find(".input-password").val());

    if(membersAdapter.exist(membersAttr) == false) {
      membersAdapter.add(membersAttr);
      callback(false);
    }
    
    callback(true);
  }

  window.saveBuy = function(element) {
    $(element).html("Espere...");

    cart.saveUsers((response)=>{
      if(response.s == 1)
      {
        cart.saveBuy((response)=>{
          if(response.s === 1)
          {
            $(".box-step-main-container").html(response.html);
            $(".box-payment-html").html(response.payment_html);
          }
        },{genotypes:response.genotypes,company_ids:response.company_ids});
      }
    },{users:membersAdapter.getAdapter(),promotor_id:promotorAttr.getPromotorId(),address:addressAttr});

  }

  window.selectPaymentMethod = function(element,payment_id) {
    let text = $(element).text();
    $(".btn-payment-method").removeClass("method-selected btn-primary");
    $(element).html("Espere...");
    cart.selectPaymentMethod((response)=>{
      if(response.s === 1)
      {
        $(element).addClass("method-selected btn-primary").text(text);
        getTotalAmmount();
      }
    },{payment_id:payment_id});
  }

  window.selectShippingMethod = function(element,shipping_id) {
    let text = $(element).text();
    $(".btn-shipping-method").removeClass("method-selected");
    $(element).html("Espere...");
    cart.selectShippingMethod((response)=>{
      if(response.s === 1)
      {
        $(element).addClass("method-selected").text(text);
        $(".shipping-ammount").text(response.shipping_amount);
        getTotalAmmount();
      }
    },{shipping_id:shipping_id});
  }

  window.addProcuct = function(product_id,element) {
    $(".btn-bracelet").html("Elegir");
    $(element).html("Espere...");

    cart.addProcuct((response)=>{
      if(response.s === 1)
      {
        $(element).html("Añadido");
      }
    },{product_id:product_id});
  }

  window.deleteAdnProfile = function(element) {
    $(element).html("Espero...");
    deleteItem('Product',10042,()=>{
      $("#adn-profile").html("Elegir");
      $(element).html("Listo");
    });
  }

  window.deleteItem = function(kind,id) {
    deleteItem(kind,id);
  }

  function deleteItem(kind,id,callback) {
    cart.deleteItem((response)=>{
      if(response.s === 1)
      {
        if(callback != undefined) {
          callback()
        }
        // $("#2").html(response.html);
      }
    },{id:id,kind:kind});
  }

  window.nextStep = function(callback) {
    nextStep(callback);
  }

  function nextStep(callback)
  {
    steps.nextStep();

    if(steps.getStep() === 2)
    {
      membersAdapter.clean();

      $.each($(".box-add-person"),(key,div)=>{
          let membersAttr = new MemberAttr;
          membersAttr.setEmail($(div).find(".input-email").val());
          membersAttr.setNames($(div).find(".input-name").val());
          membersAttr.setLastName($(div).find(".input-last-name").val());
          membersAttr.setSecondLastName($(div).find(".input-sur-name").val());
          membersAttr.setPassword($(div).find(".input-password").val());
          membersAttr.setGenotype($(div).find(".input-genotype").text());
          membersAdapter.add(membersAttr);
      });

      addressAttr.setStreet($(".input-street").val());
      addressAttr.setColony($(".input-colony").val());
      addressAttr.setState($(".input-state").val());
      addressAttr.setCity($(".input-city").val());
      addressAttr.setZipCode($(".input-zip-code").val());
    
      packages.getPackages((response)=>{
        if(response.s === 1)
        {
          $(".box-step-main-container").html(response.html);
          if(callback != undefined) callback();
        }
      });
    } else if(steps.getStep() === 3) {
      cart.getProductsForm((response)=>{
        if (response.s == 1) {
          $(".box-step-main-container").html(response.html);

          getProductsByLine('Cronos');
          getSubTotalAmmount();
          if(callback != undefined) callback();
        }
      });
    } else if(steps.getStep() === 4) {
      cart.getPaymentAndShippingForm((response)=>{
        if (response.s == 1) {
          $(".box-step-main-container").html(response.html);

          if(callback != undefined) callback();

          getTotalAmmount();
        }
      },{address:addressAttr});
    }
  }

  window.deleteProductToCart = function(product_id,element) {
    deleteItem(product_id,element);    
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

  window.addProductToCart = function(element,product_id)
  {
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
            $(".button-next").removeClass("d-none").removeAttr("disabled");
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

  window.getProductsByLine = function(line)
  {
    getProductsByLine(line);
  }

  function getProductsByLine(line)
  {
    cart.getProductsByLine((response)=>{
      if(response.s == 1) {
        $("#box_products").html(response.html);
      }
    },{line:line}); 
  }

  function getSubTotalAmmount()
  {
    cart.getSubTotalAmmount((response)=>{
      if (response.s == 1) {
        $(".box-subtotal-amount").html(response.html);
      }
    });
  }

  function getTotalAmmount()
  {
    cart.getTotalAmmount((response)=>{
      if (response.s == 1) {
        $("#box-total-amount").html(response.html);
        $(".total-ammount").html(response.total_amount);
      }
    });
  }

  window.getHealtBroker = function(element,names) {
    $(element).html("Espere...");
    getHealtBroker(names);
  }

  function getHealtBroker(names)
  {
    healtBroker.getHealtBroker((response)=>{
        if(response.s == 1)
        {
          $(".box-healt-broker").html(response.html);
          promotorAttr.setPromotorId(response.promotor_id);
        }
      },{names:names});
  }

  window.addProductAditional = function(product_id,element){
    $(element).html("Espere...");
    cart.addProductAditional((response)=>{
      if(response.s == 1)
      {
        $(element).html("Añadido");
      }
    },{product_id:product_id});
  }

  async function selectPackageId(element,package_id,callback)
  {
    cart.setPackage((response)=>{
      if(response.s == 1)
      {
      }
    },{package_id:package_id});

    $(".box-person-fields").html("");
    packages.removePackagesIdsSelected();
    packages.setPackageId(package_id);
    packages.setPackageIdASelected(element);
    packages.showBoxToFillPersonalInfo();
    packages.toggleAddButton();

    for(i=0;i<packages.getRowsLimit();i++){
      await appendPersonForm(i+1);
    }

    if(callback != undefined) {
      callback();
    }
  }

  window.checkAddressFilled = function() {
    hasFullFilled();
  }

  window.checkFieldsFilled = function(element) {
    let div = $(element).parent().parent();

    $(div).find(".btn-select-genotype").attr("disabled",true);
    
    if(!div.find(".input-name").val())
    {
      return;
    }

    if(!div.find(".input-last-name").val())
    {
      return;
    }

    if(!div.find(".input-sur-name").val())
    {
      return;
    }

    if(!div.find(".input-email").val())
    {
      return;
    }

    if(!div.find(".input-password").val())
    {
      return;
    }

    $(div).parent().find(".btn-select-genotype").removeAttr("disabled");

    hasFullFilled();
  }

  function hasFullFilled()
  {
    membersAdapter.hasFullFilled().then((full_filled)=>{
        if(full_filled === true)
        {
          addressAttr.hasFullFilled().then((full_filled)=>{
            if(full_filled === true)
            {
              $("#next-step-1").removeAttr("disabled");
            }
          });
        } else {
          $("#next-step-1").attr("disabled",true);
        }
    });
  }

  window.togglePassword = function(element) {
    passwordHelper.toggleElement($(element).parent().parent().find(".input-password"),element);
  }

  window.appendPersonForm = function(element) {
    $(element).html("espere...");
    appendPersonForm(packages.getPersonId()+1).then((inserted_element)=>{
      $(element).html("+ añadir miembro");
      // $(inserted_element).addClass("ml-5");
      $('html, body').animate({
        scrollTop: $(inserted_element).offset().top
      }, 1000);
    });
  }

  function appendPersonForm(number)
  {
    return new Promise((resolve, reject) => {
        packages.setPersonId(number);
        packages.getPersonFields((response)=>{
          if(response.s == 1)
          { 
            $(".box-person-fields").append(response.html);
            resolve($(".box-add-person").last());
          } else {
            reject();
          }
        },{number:number});
    });
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
      // packages.removeSelected();
      // packages.setPackageSelected(package_selected);
      // packages.selectPackage();
    }
  }
});

class HealtBroker extends Http {
  constructor(){
    super();
    this.sponsor_id = null;
  }
  getHealtBroker(callback,data) {
    return this.call("../../app/application/get_healt_broker.php",data,callback,false);
  }
}

class PasswordHelper {
  constructor() {
    this.TEXT = 'text';
    this.PASSWORD = 'password';
  }
  toggleElement(element,helper) {
    if($(element).attr("type") == this.PASSWORD) {
      $(element).parent().parent().find(".input-password").prop("type", this.TEXT);
      if(helper != undefined) {
        $(helper).html("Ocultar");
      }
    } else if($(element).attr("type") == this.TEXT) {
      $(element).parent().parent().find(".input-password").prop("type", this.PASSWORD);
      if(helper != undefined) {
        $(helper).html("Mostrar");
      }
    }
  }
}

class MembersAdapter {
  constructor() {
    this.adapter = [];
    this.actual_member_id = 1;
    this.full_filled = false;
  }
  getActualMemberId() {
    return this.actual_member_id;
  }
  checkFilledMember(memberAttr) {
    return new Promise(resolve => {
      if(memberAttr.getNames() == null)
      {
        resolve(false);
      }
      if(memberAttr.getEmail() == null)
      {
        console.log(2)
        resolve(false);
      }
      if(memberAttr.getLastName() == null)
      {
        console.log(3)
        resolve(false);
      }
      if(memberAttr.getSecondLastName() == null)
      {
        console.log(4)
        resolve(false);
      }
      if(memberAttr.getPassword() == null)
      {
        console.log(5)
        resolve(false);
      }
      if(memberAttr.getGenotype() == null)
      {
        console.log(6)
        resolve(false);
      }

      console.log(7)
      resolve(true);
    });
  }
  async hasFullFilled() {
    if(this.getAdapter().length > 0)
    {
      for (const memberAttr of this.getAdapter()) {
        this.full_filled = await this.checkFilledMember(memberAttr);
      }
    }

    return this.full_filled;
  }
  setActualMemberId(actual_member_id) {
    this.actual_member_id = actual_member_id;
  }
  clean() {
    this.adapter = [];
  }
  get(id) 
  {
    if (this.adapter.length > 0) 
    {
      if(this.adapter[id] != undefined)
      {
        return this.adapter[id];
      }
    }
  }
  exist(memberAttr) {
    let exist = false;

    if (this.adapter.length > 0) 
    {
      this.adapter.forEach((value,key)=>{
        if(value.email == memberAttr.email){
          exist = key;
        }
      });
    }

    return exist;
  }
  getAdapter() {
    return this.adapter;
  }
  add(memberAttr) {
    let key = this.exist(memberAttr);
    
    if(key === false) {
      this.adapter.push(memberAttr);
    } else {
      this.adapter[key] = memberAttr;
    }
  }
}

class MemberAttr {
  constructor() {
    this.names = null;
    this.last_name = null;
    this.second_last_name = null;
    this.email = null;
    this.password = null;
    this.genotype = null;
  }
  setNames(names) {
    this.names = names;
  }
  setLastName(last_name) {
    this.last_name = last_name;
  }
  setGenotype(genotype) {
    this.genotype = genotype;
  }
  setSecondLastName(second_last_name) {
    this.second_last_name = second_last_name;
  }
  setEmail(email) {
    this.email = email;
  }
  setPassword(password) {
    this.password = password;
  }
  getNames() {
    return this.names;
  }
  getLastName() {
    return this.last_name;
  }
  getSecondLastName() {
    return this.second_last_name;
  }
  getEmail() {
    return this.email;
  }
  getGenotype() {
    return this.genotype;
  }
  getPassword() {
    return this.password;
  }
}

class Steps {
  constructor() {
    this.actual_step = 1;
    this.box_step_header = "box-step-header";
    this.box_step_main = "box-step-main";
    this.step_limit = 5;
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

      this.showNextStepMain();
      this.showNextStepHeader();
      this.scrollUp($(".box-steps-main"));
    }
  }
  previousStep() {
    if(this.actual_step > 1)
    {
      this.setStep(this.actual_step-1);

      this.showNextStepMain();
      this.showNextStepHeader();
      this.scrollUp($(".box-step-main").eq(this.getStep()-1));
    }
  }
}

class PromotorAttr {
  constructor() {
    this.promotor_id;
  }
  getPromotorId() {
    return this.promotor_id;
  }
  setPromotorId(promotor_id) {
    this.promotor_id = promotor_id;
  }
}

class AddressAttr {
  constructor() {
    this.street = null;
    this.colony = null;
    this.city = null;
    this.state = null;
    this.zip_code = null;
  }
  setStreet(street) {
    this.street = street;
  }
  setColony(colony) {
    this.colony = colony;
  }
  setCity(city) {
    this.city = city;
  }
  setState(state) {
    this.state = state;
  }
  setZipCode(zip_code) {
    this.zip_code = zip_code;
  }
  checkFilledAddress() {
    return new Promise(resolve => {

      if(!$(".input-street").val())
      {
        resolve(false);
      }
      if(!$(".input-colony").val())
      {
        resolve(false);
      }
      if(!$(".input-city").val())
      {
        resolve(false);
      }
      if(!$(".input-state").val())
      {
        resolve(false);
      }
      if(!$(".input-zip-code").val())
      {
        resolve(false);
      }

      resolve(true);
    });
  }
  async hasFullFilled() {
    return await this.checkFilledAddress();
  }
  getStreet() {
    return this.street;
  }
  getColony() {
    return this.colony;
  }
  getCity() {
    return this.city;
  }
  getState() {
    return this.state;
  }
  getZipCode() {
    return this.zip_code;
  }
}

class Cart extends Http {
  constructor() {
    super();
  }
  getPaymentAndShippingForm(callback,data) {
    return this.call("../../app/application/get_payment_and_shipping_form_premium.php",data,callback,false);
  }
  setPackage(callback,data) {
    return this.call("../../app/application/set_package_premium.php",data,callback,false);
  }
  addProductToCart(callback,data) {
    return this.call("../../app/application/add_product_cronos_premium.php",data,callback,false);
  }
  addProductAditional(callback,data) {
    return this.call("../../app/application/add_product_aditional_cronos_premium.php",data,callback,false);
  }
  getProductsForm(callback,data) {
    return this.call("../../app/application/get_products_form_premium.php",data,callback,false);
  }
  getProductsByLine(callback,data) {
    return this.call("../../app/application/get_products_by_line_premium.php",data,callback,false);
  }
  deleteItem(callback,data) {
    return this.call("../../app/application/delete_item_cronos_premium.php",data,callback,false);
  }
  selectPaymentMethod(callback,data) {
    return this.call("../../app/application/select_payment_method_premium.php",data,callback,false);
  }
  getTotalAmmount(callback,data) {
    return this.call("../../app/application/get_total_ammount_premium.php",data,callback,false);
  }
  getSubTotalAmmount(callback,data) {
    return this.call("../../app/application/get_subtotal_ammount_premium.php",data,callback,false);
  }
  selectShippingMethod(callback,data) {
    return this.call("../../app/application/select_shipping_method_premium.php",data,callback,false);
  }
  saveBuy(callback,data) {
    return this.call("../../app/application/save_buy_cronos_premium.php",data,callback,false);
  }
  saveUsers(callback,data) {
    return this.call("../../app/application/save_users_premium.php",data,callback,false);
  }
  addProduct(callback,data) {
    return this.call("../../app/application/add_product_cronos_premium.php",data,callback,false);
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
    if(this.package_id == 27)
      return true;
    else if(this.package_id == 28)
      return true;
    else if(this.package_id == 29)
      return false;
  }
  getRowsLimit() {
    if(this.package_id == 27)
      return 1;
    else if(this.package_id == 28)
      return 2;
    else if(this.package_id == 29)
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
  getPersonFields(callback,data) {
    return this.call("../../app/application/get_person_fields.php",data,callback,false);
  }
  getPackages(callback,data) {
    return this.call("../../app/application/get_packages_premium.php",data,callback,false);
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