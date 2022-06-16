import Element from '../../src/js/element.module.js';

load(()=>{
  let target = new Target;
  let webFlow = new WebFlow;
  let templates = new Templates;
  let keyCombination = new KeyCombination;
  
  $("body").tooltip({ selector:'[data-toggle=tooltip]', trigger: "hover"});

  $("#main-aside").draggable();

  window.loadPath = function() {
    console.log("loading")
  }

  window.analizeImageColors = function(element,image,id) {
    dinamicLoader.showLoader(element);
    
    webFlow.analizeImageColors((response)=>{
      dinamicLoader.close();

      if(response.s == 1)
      {
        $("#compare-result-"+id).html(response.html);
      }
    },{image:image});
  }

  // $('#ruler').ruler({
  //     unit: 'px',
  //     minWidth: 30,
  //     maxWidth: screen.width,
  //     width: 300,
  //     draggable: true,
  //     resizable: true,
  //     autoResize: true,
  //     tickMajor: 50,
  //     tickMinor: 10,
  //     tickMicro: 1,
  //     showLabel: true,
  //     arrowStyle:'arrow'
  // });
  // $("#drop-left").droppable({
  //   accept: "#main-aside",
  //   drop: function( event, ui ) {
  //     $(this).addClass("ui-state-highlight aside-left");

  //     setTimeout(()=>{
  //       $("#main-aside").removeClass("main-aside-floating ui-droppable ui-state-highlight aside-left").removeAttr("style").addClass("col-3");
  //     },500);
  //   }
  // });

  window.initEngine = function(callback)
  {
    webFlow.addMainElement();
    webFlow.setProyectId(getParam("pid"));
    webFlow.setSheetPerProyectId(getParam("sppid"));

    dinamicLoader.showLoader("#main","preloader-sm-black my-4");

    templates.getTemplateFromSheet((response)=>{
      if(response.s == 1)
      {
        $("#main").html(response.html);

        let elements = $("#main").find('*');

        elements.each(function(){
          _insertElement($(this));
        });

        loadDraggable();

        if(callback != undefined) callback(response);
      }
    },{proyect_id:webFlow.getProyectId(),sheet_per_proyect_id:webFlow.getSheetPerProyectId()});
  }
  
  


  function loadDroppable()
  {
    const length = $("#main").find(".div-droppable").length;

    $(".div-droppable").droppable({
      accept: ".div-draggable",
      drop: function(event, ui) {
        let input_type = $(ui.draggable).data("element");
        let id = $(event.target).attr("id");

        if(length > 0 && id != "main")
        {
          setElementActive(id,()=>{
            addElement(input_type,Util.getUUID(),()=>{
              console.log(id,input_type);
            });
          });
        }
      },
      over: function(event, ui) {
        $(this).addClass("outline");
      },
      out: function(event, ui) {
        $(this).removeClass("outline");
      }
    });
  }

  function loadDraggable()
  {
    $(".div-draggable").draggable({
        containment: $('#page'),
        helper: 'clone',
        cursor: 'move',
        appendTo: '#page'
    });
  }

  $("body button").click(function(){
    if($(this).data("pixel_name") != undefined)
    {
      let pixel = $(this).data();
      webFlow.setPixel((response)=>{

      },{pixel_name:pixel.pixel_name,pixel_type:pixel.pixel_type,mode:MODE.DEBUG,proyect_id:webFlow.getProyectId()});
    }
  });

  window.toggleRuler = function(element)
  {
    $("#ruler").toggleClass("d-none");
  }

  window.setContentOrder = function(element,ORDER)
  {
    if(WebFlowOrder.LEFT == ORDER)
    {
      $("#webflow-container").addClass("order-1");
    } else if(WebFlowOrder.RIGHT == ORDER) {
      $("#webflow-container").removeClass("order-1");
    }
  }

  function _insertElement(_element)
  {
    let element = _element;
    let _class = element.attr("class");

    if(element.attr("id") == undefined)
    {
      element.attr("id",Util.getUUID());
    } 
    
    let id = element.attr("id");
    let type = element.prop('nodeName');
    let text = element.text();

    addElement(type,id,(_id)=>{

      if(_id != undefined)
      {
        webFlow.getElement().set("id",_id,PropertyType.ATTR);
      }
      
      if(_class != undefined)
      {
        webFlow.getElement().set("class",_class,PropertyType.ATTR);
      }

      if(text != undefined && webFlow.isAviableIncludeTypeToText(type))
      {
        webFlow.getElement().set("text",text,PropertyType.FUNCTION);
      }

      webFlow.getElement().update();
    });
  }

  $("#search-element-list").keyup(delay(function (e) {
      searchElementList(this);
  }, TimeOut.KEY_PRESS_SHORT));

  $("#search-image").keyup(delay(function (e) {
      getImageSearch(this);
  }, TimeOut.KEY_PRESS_LONG));

  window.setImage = function(url) 
  {
    if(ImageHelper.isAviableElement(webFlow.getElement().element_type) == true)
    {
      changeProperty('background-image',PropertyType.BACKGROUND_IMAGE,url);
    }
  }

  window.saveSheetName = function(element) 
  {
    webFlow.saveSheetName((response)=>{
      if(response.s == 1)
      {
        console.log(1)
      }
    },{sheet_per_proyect_id:getParam("sppid"),title:$(element).val()});
  }

  window.toggleChat = function(enable_chat) 
  {
    webFlow.toggleChat((response)=>{
      if(response.s == 1)
      {
        
      }
    },{sheet_per_proyect_id:getParam("sppid"),enable_chat:enable_chat});
  }

  window.saveWebFlow = function(element) 
  {
    let _html = $(element).html();

    dinamicLoader.showLoader(element);

    //sanitize data
    let html = $('#main').clone();

    $(html).find(".element-followed").removeClass("element-followed");
    $(html).find(".webflow-item-selected").removeClass("webflow-item-selected");
    $(html).find(".div-droppable").removeClass("div-droppable");
    $(html).find(".ui-droppable").removeClass("ui-droppable");
    $(html).find(".ui-resizable").removeClass("ui-resizable");
    $(html).find(".ui-resizable-handle").remove();

    html = $(html).html();

    
    webFlow.saveWebFlow((response)=>{
      dinamicLoader.removeStyle();

      if(response.s == 1)
      {
        $(element).html('<i class="fas fa-check-double"></i> Guadado con éxito');

        setTimeout(()=>{
          dinamicLoader.close();
          $(element).html(_html);
        },3000);
      }
    
    },{elements:null,html:html,proyect_id:webFlow.getProyectId(),sheet_per_proyect_id:webFlow.getSheetPerProyectId()}); 
  }

  window.setHtmlWebFlow = function(element_id) 
  {
    $(element_id).html($("#main").html())
  }

  function getImageSearch(_element)
  {
    dinamicLoader.show($("#box-searcher-main"),"preloader-sm-black my-4");
    
    webFlow.getImageSearch((response)=>{
      dinamicLoader.close();
      if(response.s == 1)
      {
        $("#box-searcher-main").html(response.html);
      }
    },{q:$(_element).val()})
  }

  function searchElementList(_element)
  {
    let element = $(_element).val();

    $(".box-element-list").removeClass("d-none");

    if(element)
    {
      $(".box-element-list-container").find('.box-element-list').filter(function(index, div) { 
        return !$(div).find(".box-element-list-name").text().toLowerCase().includes(element.toLowerCase());
      }).addClass("d-none");
    }
  }

  $(window).click(function(e){
    let id = $(e.target).attr("id");
    let element = $("#main").find("#"+id);

    if(id == $(element).attr("id"))
    { 
      setElementActive(id);
      loadDataIntoInputs();
    }
  });

  function loadDataIntoInputs()
  {
    // console.log(webFlow.getElement().properties)
  }
  
  function getElementList()
  {
    dinamicLoader.show($("#element-list"),"preloader-sm-black my-4");

    webFlow.getElementList((response)=>{
      dinamicLoader.close();

      if(response.s == 1)
      {
        $("#element-list").html(response.html);
      }
    },{elements:webFlow.getElementsList()});
  }

  window.getElementList = function()
  {
    getElementList();
  }

  function getElementPixels()
  {
    webFlow.getElementPixels((response)=>{
      if(response.s == 1)
      {
        $("#element-pixels").html(response.html);
      }
    },{elements:webFlow.getElementsListComplete()});
  }

  window.getElementPixels = function()
  {
    getElementPixels();
  }

  window.toggleViewElements = function(id)
  {
    webFlow.toggleViewElements();
  }

  window.hideTabContent = function(element)
  {
    $(element).html('<i class="fas fa-window-maximize"></i>');
    
    $("#tab-content").addClass("d-none");
  }

  window.relocateTabMenu = function(element)
  {
    $("#main-aside").animate({
      left: 'calc(50vh - 380px/2)',
      top: '5vh',
    },100);
  }

  window.showTabContent = function(element)
  {
    $(element).html('<i class="fas fa-window-minimize"></i>');
    
    $("#tab-content").removeClass("d-none");
  }

  window.toggleTabContent = function(element)
  {
    if($("#tab-content").hasClass("d-none"))
    {
      $(element).html('<i class="fas fa-window-minimize"></i>');
    } else {
      $(element).html('<i class="fas fa-window-maximize"></i>');
    }

    $("#tab-content").toggleClass("d-none");
  }

  window.hoverElement = function(element)
  {
    let id = $(element).data("id");

    $("#"+id).toggleClass("webflow-item-hovered");
  }

  window.setElementParentActive = function()
  {
    let id = $(webFlow.getElement().element).parent().attr("id");
    
    setElementActive(id);
  }  

  window.duplicateItem = function()
  {
    let element_cloned = $(webFlow.getElement().element).clone();
    let id = $(webFlow.getElement().element).parent().attr("id");
    let new_id = Util.getUUID();
    
    setElementActive(id,()=>{
      element_cloned.attr("id",new_id);

      _insertElement($(element_cloned));

      setElementActive(new_id);

      $("body .tooltip").addClass("hide");
    });
  }

  window.setElementActive = function(id,callback,element)
  {
    $(".list-group-item-element").removeClass("list-group-item-element-active");
    $(element).addClass("list-group-item-element-active");

    setElementActive(id);

    if(callback != undefined)
    {
      callback();
    }
  }

  function setElementActive(id,callback)
  {
    let element = webFlow.foundElement(id);

    if(element != false)
    {
      setTimeout(function(){
        webFlow.setElement(element);
        webFlow.getElement().update();

        WebFlow.setMainElement(webFlow.getElement());

        // if(!$(element.element).hasClass("ui-resizable"))
        // {
        //   $(element.element).resizable({
        //     animate: false,
        //     // containment: $(element.element).parent(),
        //     helper: "ui-resizable-helper",  
        //     ghost: true,
        //     grid: 140,
        //     stop: function( event, ui ) {
        //       followTarget(id);
        //     }
        //   });
        // }

        followTarget(id);

        if(callback != undefined) {
          callback();
        }
      },TimeOut.HOLDING);
    }
  }

  window.followTarget = function(id)
  {
    followTarget(id);
  }

  function followTarget(id)
  {
    target.setTarget(id);
    target.follow(webFlow.getElement().type,id); 
  }

  window.changePropertyMain = function(property,PropertyType,element)
  {
    setElementActive("main");
    webFlow.getElement().set(property,$(element).data("val"),PropertyType);
    webFlow.getElement().update();
  }

  window.deleteClasses = function(element)
  {
    $(webFlow.getElement().element).removeAttr("class");
  }

  window.changeProperty = function(property,PropertyType,element)
  {
    changeProperty(property,PropertyType,element,()=>{
      target.follow(); 
    });
  }

  function changeProperty(property,PropertyType,element,callback)
  {
    let value = ""
    if (typeof element === 'string' || element instanceof String) {
      value = element;
    } else  {
      value = $(element).val();
    }

    webFlow.getElement().set(property,value,PropertyType);
    webFlow.getElement().update();

    if (callback != undefined) { callback()}

    processPixel(property,value);
  }

  function processPixel(property,value)
  {
    if(property == "pixel_type")
    {
      $("#pixel-bars").html("");
      $("#pixel-pages").html("");

      if(value == "VAR")
      {
        webFlow.getVarsForPixel((response)=>{
          if(response.s == 1)
          {
            $("#pixel-bars").html(response.html);
          }
        },{proyect_id:getParam("pid")}); 
      } else if(value == "CONNECT_PAGE") {
          webFlow.getAviablePagesPixel((response)=>{
          if(response.s == 1)
          {
            $("#pixel-bars").html(response.html);
          }
        },{proyect_id:getParam("pid"),sheet_per_proyect_id:getParam("sppid")});
      } else if(value == "SAVE_FORM") {
          changeProperty('onclick',PropertyType.ATTR,"saveForm(this)");
      }
    }
  }

  window.getMainData = function(element)
  {
    if($("#page-properties").hasClass("d-none"))
    {
      $("#page-properties").removeClass("d-none");
      // $("#element-properties").addClass("d-none");
    } else {
      $("#page-properties").addClass("d-none");
      // $("#element-properties").removeClass("d-none");
    }
  }

  window.toggleSelector = function(element)
  {
    $(element).addClass("btn-primary").removeClass("btn-outline-secondary");

    $("body").addClass("selector")

    if(webFlow.getSelector() == false)
    {
      this.webFlow.setSelector(true);
    } else {
      this.webFlow.setSelector(false);
    }
  }

  window.toggleFullView = function()
  {
    $(".ef-ruler").toggleClass("d-none");

    toggleAside();
  }

  function toggleAside()
  {
    $("#aside").toggleClass("d-none");
    $("#toggle-aside").toggleClass("d-none");
    $(".ui-resizable-handle").toggleClass("d-none");
  }

  window.toggleAside = function()
  {
    toggleAside();
  }

  window.addGrid = function(InputType,GridType)
  {
    Grid.makeGrid(webFlow,InputType,GridType);
  }

  window.addComponent = function(ComponentType)
  {
    Component.makeComponent(webFlow,ComponentType);
  }

  function addElement(InputType,id,callback)
  {
    id = id != undefined ? id : Util.getUUID();
    webFlow.setType(InputType);
    webFlow.getElement().set("id",id,PropertyType.ATTR);
    webFlow.getElement().make();
    webFlow.getElement().update();
    webFlow.save();

    if(callback != undefined) callback(id);

    loadDroppable();
  }

  window.addElement = function(InputType)
  {
    addElement(InputType,null,()=>{
      getElementList();
    });
  }

  window.deleteItem = function(element)
  {
    deleteItem(webFlow.getElement);
  }

  function deleteItem(element)
  {
    target.clearLastTarget();
    webFlow.deleteItem(webFlow.getElement())
  }

  $("#webflow-search").keyup(delay(function (e) {
    let search = $("#webflow-search").val();

    $(".item-element").addClass("d-none");

    if(search)
    {
      $("#items-elements").find('.item-element').filter(function(index, div) {
        return $(div).find(".item-name").text().toLowerCase().includes(search.toLowerCase());
      }).removeClass("d-none");
    }
  }, TimeOut.KEY_PRESS));

  window.searchElement = function(element)
  {
    webFlow.searchElement();
  }

  window.selectElement = function(id)
  {
    webFlow.foundElement(id);
  }

  $(document).keyup(function(e) {
    if (e.key === "Escape") {
      webFlow.searchElement();
    }
  });

  $('.background-color').ColorPicker({
    color: '#000000',
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $(this).val(hex);
      let val = "#"+$(this).val();
      $(".color-picker-background").css("background-color",val);
      window.changeProperty("background-color",PropertyType.CSS_COLOR,val);
    }
  });

  $('.color').ColorPicker({
    color: '#000000',
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $(this).val(hex);
      let val = "#"+$(this).val();
      $(".color-picker-text").css("background-color",val);
      window.changeProperty("color",PropertyType.CSS_COLOR,val);
    }
  });

  $("body [data-gdropdown]").click(function(){
    const target_element = $(this).data("gdropdown");
    const left = $(this).offset().left;
    const top = $(this).offset().top + $(this).innerHeight() + 7;

    console.log(target_element);
    
    $("[data-gdropdown-target='"+target_element+"'").css({"left":left,"top":top}).toggleClass("gdropdown-show");
  });

  window.showMoreOptions = function(element)
  {
    closeGdropdown();
    
    const target_element = $(element).data("gdropdown");
    const left = $(element).offset().left;
    const top = $(element).offset().top + $(element).innerHeight() + 7;

    $("[data-gdropdown-target='"+target_element+"'").css({"left":left,"top":top}).toggleClass("gdropdown-show");

    loadDataElement(webFlow.getElement().element);
  }

  function closeGdropdown()
  {
    $("[data-gdropdown-target]").removeClass("gdropdown-show");
  }

  window.closeGdropdown = function()
  {
    closeGdropdown();
  }

  window.showMoreStyles = function(element)
  {
    closeGdropdown();

    const target_element = $(element).data("gdropdown");
    const left = $(element).offset().left;
    const top = $(element).offset().top + $(element).innerHeight() + 7;
    
    $("[data-gdropdown-target='"+target_element+"'").css({"left":left,"top":top}).toggleClass("gdropdown-show");
  }

  function loadDataElement(element)
  {
    const margin_top = $(element).css("margin-top").replace("px","");
    const margin_bottom = $(element).css("margin-bottom").replace("px","");
    const margin_left = $(element).css("margin-left").replace("px","");
    const margin_right = $(element).css("margin-right").replace("px","");

    const padding_top = $(element).css("padding-top").replace("px","");
    const padding_bottom = $(element).css("padding-bottom").replace("px","");
    const padding_left = $(element).css("padding-left").replace("px","");
    const padding_right = $(element).css("padding-right").replace("px","");

    const width = $(element).width();
    const height = $(element).height();

    $("#gmargin-left").val(margin_left);
    $("#gmargin-top").val(margin_top);
    $("#gmargin-bottom").val(margin_bottom);
    $("#gmargin-right").val(margin_right);

    $("#gpadding-left").val(padding_left);
    $("#gpadding-top").val(padding_top);
    $("#gpadding-bottom").val(padding_bottom);
    $("#gpadding-right").val(padding_right);

    $("#gheight").val(120);
    $("#gwidth").val(width);
  }
});

class TimeOut {
  static ANIMATION = 100;
  static KEY_PRESS = 400;
  static SAVING_TIME = 1000*60; // seconds
  static KEY_PRESS_SHORT = 200;
  static KEY_PRESS_LONG = 600;
  static HOLDING = 150;
}

class PropertyType {
  static DIMENSION_PERCENTAJE = "DIMENSION_PERCENTAJE";
  static DIMENSION = "DIMENSION";
  static ANIMATION = "ANIMATION";
  static DATA = "DATA";
  static BACKGROUND_IMAGE = "BACKGROUND_IMAGE";
  static ATTR = "ATTR";
  static PIXEL = "PIXEL";
  static FUNCTION = "FUNCTION";
  static CSS_COLOR = "CSS_COLOR";
  static CSS_CLASS = "CSS_CLASS";
  static CSS = "CSS";
  static NONE = null;

  static isBackgroundProperty(property_type) {
    return property_type == PropertyType.BACKGROUND_IMAGE;
  }
  static isPixel(property_type) {
    return property_type == PropertyType.PIXEL;
  }
  static isFunctionProperty(property_type) {
    return property_type == PropertyType.FUNCTION;
  }
  static isDataProperty(property_type) {
    return property_type == PropertyType.DATA;
  }
  static isAttrProperty(property_type) {
    return property_type == PropertyType.ATTR;
  }
  static isAnimationProperty(property_type) {
    return property_type == PropertyType.ANIMATION;
  }
  static isClassProperty(property_type) {
    return property_type == PropertyType.CSS_CLASS;
  }
  static isCssProperty(property_type) {
    if(property_type == PropertyType.CSS)
      return true;
    else if(property_type == PropertyType.DIMENSION)
      return true;
    else if(property_type == PropertyType.DIMENSION_PERCENTAJE)
      return true;
    else if(property_type == PropertyType.CSS_COLOR)
      return true;

    return false;
  }
  static getSintaxAfter(property_type) {
    if(property_type == PropertyType.DIMENSION)
    {
      return "px";
    } else if(property_type == PropertyType.DIMENSION_PERCENTAJE) {
      return "%";
    }

    return ""
  }
  static getSintaxBefore(property_type) {
    return ""
  }
}

class Component {
  static InputGroup = "InputGroup"
  static addComponent(webFlow,InputType,_class,set_main)
  {
    webFlow.setType(InputType);
    webFlow.getElement().set("id",Util.getUUID(),PropertyType.ATTR);
    webFlow.getElement().set("class",_class,PropertyType.ATTR);
    webFlow.getElement().make();
    webFlow.save();
    webFlow.clearBeforeClasses();
    webFlow.hideBoxSearch();

    if(set_main == true) {
      WebFlow.setMainElement(webFlow.getElement());
    }

    webFlow.getElement().update();

    return webFlow.getElement();
  }
  static makeComponent(webFlow,ComponentType)
  {
    if(Component.isValidComponent(ComponentType) == true)
    {
      let _element = Component.addComponent(webFlow,InputTypes.DIV,"input-group mb-3",true);
      Component.addComponent(webFlow,InputTypes.DIV,"input-group-prepend",true);
      Component.addComponent(webFlow,InputTypes.SPAN,"input-group-text",false);
      WebFlow.setMainElement(_element);
      Component.addComponent(webFlow,InputTypes.INPUT,"form-control",false);
    }
  }
  static isValidComponent(ComponentType)
  {
    if(Component.InputGroup == ComponentType)
      return true;
  }
}

class Grid {
  static ONE_COLUMN = 1;
  static TWO_COLUMN = 2;
  static THREE_COLUMN = 3;
  static FOUR_COLUMN = 4;
  static FIVE_COLUMN = 5;
  static SIX_COLUMN  = 6;

  static isValidGrid(GridType)
  {
    if(Grid.ONE_COLUMN == GridType)
      return true;
    else if(Grid.TWO_COLUMN == GridType)
      return true;
    else if(Grid.THREE_COLUMN == GridType)
      return true;
    else if(Grid.FOUR_COLUMN == GridType)
      return true;
    else if(Grid.FIVE_COLUMN == GridType)
      return true;
    else if(Grid.SIX_COLUMN == GridType)
      return true;

    return false;
  }
  static addDiv(webFlow,InputType,_class,set_main)
  {
    webFlow.setType(InputType);
    webFlow.getElement().set("id",Util.getUUID(),PropertyType.ATTR);
    webFlow.getElement().set("class",_class,PropertyType.ATTR);
    webFlow.getElement().make();
    webFlow.save();
    webFlow.clearBeforeClasses();
    webFlow.hideBoxSearch();

    if(set_main == true) {
      WebFlow.setMainElement(webFlow.getElement());
    }

    webFlow.getElement().update();
  }
  static getGridCalculator(GridType)
  {
    if(GridType != 5)
    {
      return 12/GridType;
    }

    return "";
  }
  static getGridCalculatorSintaxt(GridType)
  {
    if(GridType != 5)
    {
      return "col-" + Grid.getGridCalculator(GridType)
    } 


    return "col";
  }
  static makeGrid(webFlow,InputType,GridType)
  {
    if(Grid.isValidGrid(GridType) == true)
    {
      Grid.addDiv(webFlow,InputType,"row",true);

      for (var i = 0; i < parseInt(GridType); i++) {
        Grid.addDiv(webFlow,InputType,Grid.getGridCalculatorSintaxt(GridType),false);
      }
    }
  }
}

class InputTypes {
  static BUTTON = "BUTTON";
  static INPUT = "INPUT";
  static DIV = "DIV";
  static A = "A";
  static P = "P";
  static LABEL = "LABEL";
  static SPAN = "SPAN";
  static H1 = "H1";
  static H2 = "H2";
  static H3 = "H3";
  static H4 = "H4";
  static H5 = "H5";
  static H6 = "H6";
  static MAIN = "MAIN";
  static FOOTER = "FOOTER";
  static BODY = "BODY";
  static SMALL = "SMALL";
  static IMAGE = "IMAGE";
  static UL = "UL";
  static LI = "LI";
  static NAV = "NAV";
}

class WebFlowOrder {
  static LEFT = "LEFT";
  static RIGHT = "RIGHT";
}

class WebFlowServices extends Http {
  constructor()
  {
    super();
  }
  analizeImageColors(callback,data){
    return this.call("../../app/application/analize_image_colors.php",data,callback,false,0,METHODS.GET);
  }
  getElementList(callback,data){
    return this.call("../../app/application/get_element_list.php",data,callback,false,0,METHODS.POST);
  }
  getImageSearch(callback,data){
    return this.call("../../app/application/get_image_search.php",data,callback,false,0,METHODS.GET);
  }
  getElementPixels(callback,data){
    return this.call("../../app/application/get_element_pixels.php",data,callback,false,0,METHODS.POST);
  }
  setPixel(callback,data){
    return this.call("../../app/application/set_pixel.php",data,callback,false,0,METHODS.GET);
  }
  saveWebFlow(callback,data){
    return this.call("../../app/application/save_webflow.php",data,callback,false,0,METHODS.POST);
  }
  saveSheetName(callback,data){
    return this.call("../../app/application/save_sheet_name.php",data,callback,false,0,METHODS.POST);
  }
  toggleChat(callback,data){
    return this.call("../../app/application/toggle_chat.php",data,callback,false,0,METHODS.POST);
  }
  getVarsForPixel(callback,data){
    return this.call("../../app/application/get_vars_for_pixel.php",data,callback,false,0,METHODS.POST);
  }
  getAviablePagesPixel(callback,data){
    return this.call("../../app/application/get_aviable_pages_pixel.php",data,callback,false,0,METHODS.POST);
  }
}

class WebFlow extends WebFlowServices {
  static main_element = $("#main");
  constructor()
  {
    super();
    this.elements = [];
    this.element = null;
    this.selector = null;
    this.type = null;
    this.view_elements = true;
    this.sheet_per_proyect_id = null;
    this.proyect_id = null;
    this.aviable_types = [InputTypes.H1,InputTypes.H2,InputTypes.H3,InputTypes.H3,InputTypes.H4,InputTypes.H5,InputTypes.H6,InputTypes.INPUT,InputTypes.SMALL,InputTypes.SPAN,InputTypes.P,InputTypes.A];
  }
  isAviableIncludeTypeToText(type) {
    return this.aviable_types.includes(type);
  }
  getSheetPerProyectId() {
    return this.sheet_per_proyect_id;
  }
  setSheetPerProyectId(sheet_per_proyect_id) {
    this.sheet_per_proyect_id = sheet_per_proyect_id;
  }
  getProyectId() {
    return this.proyect_id;
  }
  setProyectId(proyect_id) {
    this.proyect_id = proyect_id;
  }
  toggleViewElements()
  {
    if(this.view_elements == true)
    {
      this.view_elements = false;
      this.getElements().forEach((element,v)=>{
        $(element.element).removeClass("webflow-item-selected");
      });
    } else {
      this.view_elements = true;
      this.getElements().forEach((element,v)=>{
        $(element.element).addClass("webflow-item-selected");
      });
    }
  }
  addMainElement()
  {
    this.setType(InputTypes.DIV);
    this.getElement().set("id","main",PropertyType.ATTR);
    this.getElement().make();
    this.getElement().update();
    this.save();
    this.clearBeforeClasses();
    this.hideBoxSearch();
  }
  static getMainElement() {
    return WebFlow.main_element;
  }
  static setMainElement(main_element) {
    // if(AviableElementsToBeMain.isAviable(main_element.getType()))
    if(true)
    {
      WebFlow.main_element = main_element;
    }
  }
  getSelector()
  {
    return this.selector;
  }
  setSelector(selector)
  {
    this.selector = selector;
  }
  deleteItem(element) {
    this.setElement(null);
    $(element.getElement()).remove();
  }
  showBoxSearch() {
    $("#box-searcher").removeClass("d-none").find("input").focus();
  }
  hideBoxSearch() {
    $("#box-searcher").addClass("d-none");
  }
  searchElement() {
    if($("#box-searcher").hasClass("d-none"))
    {
      this.showBoxSearch();
    } else {
      this.hideBoxSearch();
    }
  }
  getElement() {
    return this.element;
  }
  setElement(element) {
    this.element = element
  }
  getType() {
    return this.type
  }
  setType(type) {
    switch (type) {
      case InputTypes.INPUT:
        this.setElement(new Input)
        break;
      case InputTypes.DIV:
        this.setElement(new Div)
        break;
      case InputTypes.A:
        this.setElement(new Anchor);
        break;
      case InputTypes.P:
        this.setElement(new P);
        break;
      case InputTypes.BUTTON:
        this.setElement(new Button);
        break;
      case InputTypes.LABEL:
        this.setElement(new Label);
        break;
      case InputTypes.SPAN:
        this.setElement(new Span);
        break;
      case InputTypes.H1:
        this.setElement(new H1);
        break;
      case InputTypes.H2:
        this.setElement(new H2);
        break;
      case InputTypes.H3:
        this.setElement(new H3);
        break;
      case InputTypes.H4:
        this.setElement(new H4);
        break;
      case InputTypes.H5:
        this.setElement(new H5);
        break;
      case InputTypes.H6:
        this.setElement(new H6);
        break;
      case InputTypes.MAIN:
        this.setElement(new Main);
        break;
      case InputTypes.FOOTER:
        this.setElement(new Footer);
        break;
      case InputTypes.BODY:
        this.setElement(new Body);
        break;
      case InputTypes.SMALL:
        this.setElement(new Small);
        break;
      case InputTypes.IMAGE:
        this.setElement(new Image);
        break;
      case InputTypes.UL:
        this.setElement(new Ul);
        break;
      case InputTypes.LI:
        this.setElement(new Li);
        break;
      case InputTypes.NAV:
        console.log(type)
        this.setElement(new Nav);
        break;
    }

    this.type = type;
    this.getElement().setType(type)
    this.getElement().set("type",type)
  }
  getElementsListComplete() {
    let list = [];

    this.getElements().forEach((element,k)=>{
      list.push({type:element.type,properties:element.properties});
    });
    console.log(list)

    return list;
  }
  getElementsList() {
    let list = [];

    this.getElements().forEach((element,k)=>{
      list.push({type:element.type,id:element.getPropertyByKey("id").value});
    });

    return list;
  }
  getElements() {
    return this.elements;
  }
  save() {
    this.elements.push(this.getElement());
  }
  clearBeforeClasses() {
    this.getElements().forEach((element)=>{
      element.element.removeClass("webflow-item-selected");
    });
  }
  foundElement(id) {
    let _element = false;

    this.getElements().forEach((element)=>{
      let property = element.getPropertyByKey("id");

      if(property.value == id)
      {
        _element = element;
      }
    });

    return _element;
  }
}

class MODE {
  static DEBUG = "DEBUG";
  static LIVE = "LIVE";
}

class PixelType {
  static NONE = "NONE";
  static ACTION = "ACTION";
}

class Input extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.INPUT;
  }
  make()
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<input/>").attr("id",id)
    }

    this._make(element,is_new_element);
  }
}

class Button extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.BUTTON;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<button/>").attr("id",id);
      element.addClass("btn btn-primary");
      element.text("Button");
    }

    this._make(element,is_new_element);
  }
}

class Div extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.DIV;
  }
  make()
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<div/>").attr("id",id).addClass("div-droppable");
    }

    this._make(element,is_new_element);
  }
}

class Label extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.LABEL;
  }
  make()
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<label/>").attr("id",id).text("Label");
    }

    this._make(element,is_new_element);
  }
}

class P extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.P;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<p/>").attr("id",id).text("Parrafo")
    }

    this._make(element,is_new_element);
  }
}

class Anchor extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.A;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id);
    } else {
      is_new_element = true;
      element = $("<a/>").attr("id",id).text("Liga").addClass("btn btn-link");
    }

    this._make(element,is_new_element);
  }
}

class Span extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.SPAN;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<span/>").attr("id",id).text("Span");
    }

    this._make(element,is_new_element);
  }
}

class H1 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H1;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h1/>").attr("id",id).text("h1");
    }

    this._make(element,is_new_element);
  }
}

class H2 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H2;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h2/>").attr("id",id).text("h2");
    }

    this._make(element,is_new_element);
  }
}

class H3 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H3;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h3/>").attr("id",id).text("h3");
    }

    this._make(element,is_new_element);
  }
}

class H4 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H4;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h4/>").attr("id",id).text("h4");
    }

    this._make(element,is_new_element);
  }
}

class H5 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H5;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h5/>").attr("id",id).text("h5");
    }

    this._make(element,is_new_element);
  }
}

class H6 extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.H6;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<h6/>").attr("id",id).text("h6");
    }

    this._make(element,is_new_element);
  }
}

class Main extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.MAIN;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<main/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Footer extends Element {constructor()
  {
    super();
    this.element_type = InputTypes.FOOTER;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<footer/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Body extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.BODY;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<body/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Small extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.SMALL;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<small/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Image extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.IMAGE;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<image/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Ul extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.UL;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<ul/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class Li extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.LI;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id)
    } else {
      is_new_element = true;
      element = $("<li/>").attr("id",id).text;
    }

    this._make(element,is_new_element);
  }
}

class Nav extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.NAV;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;
    var id = this.getPropertyByKey("id").value;

    if($("#"+id).length > 0 )
    {
      element = $("#"+id);
    } else {
      is_new_element = true;
      element = $("<nav/>").attr("id",id);
    }

    this._make(element,is_new_element);
  }
}

class AviableElementsToBeMain {
  static LIST = [InputTypes.DIV]
  static isAviable(type)
  {
    return AviableElementsToBeMain.LIST.includes(type);
  }
}

class Util
{
  static getClasessList(element)
  {
    return $(element).attr('class').split(/\s+/);
  }
  static getClasess(element)
  {
    return $(element).attr('class');
  }
  static getUUID()
  {
    var d = new Date().getTime();

    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); 
    }

    var uuid = 'xx-fxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });

    return uuid;
  }
}

class ImageHelper 
{
  static isAviableElement(InputType)
  {
    if(InputType == InputTypes.DIV)

    return true;
  }
}

class KeyCombination 
{
  constructor()
  {
    this.ctrlPressed = false;
    // this.init();
  }
  init() {
    this.listenControl();
    this.listenCombination();
  }
  listenControl() 
  {
    $(document).keydown((e)=> {
      if (e.ctrlKey) { 
        this.ctrlPressed = true; 
      }
    }).keyup(function(e) { 
      if (e.ctrlKey) {
        this.ctrlPressed = false; 
      }
    }); 
  }
  listenCombination() 
  {
    $(document).keydown((e)=> { //For any other keypress event
      console.log(this.ctrlPressed);
      console.log(e.which);
      if (e.which == 32) { //Checking if it's space button
        if(this.ctrlPressed == true){ //If it's space, check if ctrl key is also pressed
          // myFunc(); //Do anything you want
          this.ctrlPressed = false; //Important! Set ctrlPressed variable to false. Otherwise the code will work everytime you press the space button again
        }
      }
    })
  } 
}