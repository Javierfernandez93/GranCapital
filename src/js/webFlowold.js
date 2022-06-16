$(document).ready(function(){
  let webFlow = new WebFlow;yy

  webFlow.loadElements();

  window.changeProperty = function(property,type,element)
  {
    webFlow.getElement().set(property,$(element).val());
  }

  window.getMainData = function(element)
  {
    if($("#page-properties").hasClass("d-none"))
    {
      $("#page-properties").removeClass("d-none");
      $("#element-properties").addClass("d-none");
    } else {
      $("#page-properties").addClass("d-none");
      $("#element-properties").removeClass("d-none");
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

  window.setPaddingLeft = function(element)
  {
    webFlow.getElement().setPaddingLeft($(element).val());
    webFlow.getElement().make();
  }

  window.setHref = function(element)
  {
    webFlow.getElement().setHref($(element).val());
    webFlow.getElement().make();
  }

  window.setFontSize = function(element)
  {
    webFlow.getElement().setFontSize($(element).val());
    webFlow.getElement().make();
  }

  window.setPaddingRight = function(element)
  {
    webFlow.getElement().setPaddingRight($(element).val());
    webFlow.getElement().make();
  }

  window.setPaddingTop = function(element)
  {
    webFlow.getElement().setPaddingTop($(element).val());
    webFlow.getElement().make();
  }

  window.setPaddingBottom = function(element)
  {
    webFlow.getElement().setPaddingBottom($(element).val());
    webFlow.getElement().make();
  }

  window.setPlaceHolder = function(element)
  {
    webFlow.getElement().setPlaceHolder($(element).val());
    webFlow.getElement().make();
  }

  window.setText = function(element)
  {
    webFlow.getElement().setText($(element).val());
    webFlow.getElement().make();
  }

  window.setElementId = function(element)
  {
    webFlow.getElement().setId($(element).val())
    webFlow.getElement().getElement().attr("id",webFlow.getElement().getId());
    webFlow.getElement().showElementProperties();
  }

  window.setHeight = function(element)
  {
    webFlow.getElement().setHeight($(element).val());
    webFlow.getElement().make();
  }

  window.setWidth = function(element)
  {
    webFlow.getElement().setWidth($(element).val());
    webFlow.getElement().make();
  }

  window.marginTop = function(element)
  {
    webFlow.getElement().setMarginTop($(element).val());
    webFlow.getElement().make();
  }

  window.marginBottom = function(element)
  {
    webFlow.getElement().setMarginBottom($(element).val());
    webFlow.getElement().make();
  }
  
  window.marginLeft = function(element)
  {
    webFlow.getElement().setMarginLeft($(element).val());
    webFlow.getElement().make();
  }

  window.marginRight = function(element)
  {
    webFlow.getElement().setMarginRight($(element).val());
    webFlow.getElement().make();
  }

  window.toggleAside = function()
  { 
    if($("#aside").hasClass("d-none"))
    {
      $("#aside-button-floating").addClass("d-none");
      $("#aside").removeClass("d-none");
    } else {
      $("#aside-button-floating").removeClass("d-none");
      $("#aside").addClass("d-none");
    }
  }

  window.addElement = function(InputType)
  {
    webFlow.setType(InputType);
    webFlow.getElement().set("id",webFlow.createUUID());
    webFlow.getElement().make(webFlow.getMainElement());
    webFlow.save();
    webFlow.getElement().showElementProperties();
    webFlow.clearBeforeClasses();
    webFlow.setClickeableFunctions();
    webFlow.hideBoxSearch();

    $("#page-properties").addClass("d-none"); // todo
  }

  window.deleteItem = function(element)
  {
    webFlow.deleteItem(webFlow.getElement())
  }

  $("#webflow-search").keyup(delay(function (e) {
    let search = $("#webflow-search").val();

    $(".item-element").removeClass("d-none");

    if(search)
    {
      $("#items-elements").find('.item-element').filter(function(index, div) { 
        return !$(div).find(".item-name").text().toLowerCase().includes(search.toLowerCase());
      }).addClass("d-none");
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

  $('#background-color').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
      $(colpkr).fadeIn(500);
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(500);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      webFlow.updateBackgroundColor('#' + hex);
      $('#background-color input').val('#' + hex);
      $('#background-color .color-picker').css('backgroundColor', '#' + hex);
    }
  });
});

class TimeOut {
  static ANIMATION = 100;
  static KEY_PRESS = 400;
}

class InputTypes {
  static BUTTON = "BUTTON";
  static INPUT = "INPUT";
  static DIV = "DIV";
  static ANCHOR = "ANCHOR";
  static PARAGRAPH = "PARAGRAPH";
}

class WebFlow {
  constructor()
  {
    this.elements = [];
    this.element = null;
    this.selector = null;
    this.type = null;
    this.main_element = null;
    this.background_color = "#fff";
  }
  loadElements() {
    let childrens = $("#main").find('*');
    // $("#main").html('');

    childrens.each((key,children)=>{
      // this.setType($(children).get(0).tagName);
      // this.getElement().setId(this.createUUID());
      // this.getElement().make();
      // this.save();
      // this.getElement().showElementProperties();
      // this.setClickeableFunctions();
      // this.setMainElement(this.getElement())
    })
  }
  getMainElement() {
    return this.main_element;
  }
  setMainElement(main_element) {
    if(AviableElementsToBeMain.isAviable(main_element.getType()))
    {
      this.main_element = main_element;
    }
  }
  getBackgroundColor() {
    return this.background_color;
  }
  setBackgroundColor(background_color) {
    this.background_color = background_color;
  }
  getSelector()
  {
    return this.selector;
  }
  setSelector(selector)
  {
    this.selector = selector;
  }
  createUUID()
  {
      var d = new Date().getTime();

      if (window.performance && typeof window.performance.now === "function") {
          d += performance.now(); 
      }

      var uuid = '4xxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });

      return uuid;
  }
  deleteItem(element) {
    this.setElement(null);
    $(element.getElement()).remove()
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
  updateBackgroundColor(background_color) {
    this.setBackgroundColor(background_color);
    $("body").css({backgroundColor:this.getBackgroundColor()});
  }
  setType(type) {
    switch (type) {
      case InputTypes.INPUT:
        this.type = type;
        this.setElement(new Input)
        this.getElement().setType(type)
        break;
      case InputTypes.DIV:
        this.type = type;
        this.setElement(new Div)
        this.getElement().setType(type)
        break;
      case InputTypes.ANCHOR:
        this.type = type;
        this.setElement(new Anchor)
        this.getElement().setType(type)
        break;
      case InputTypes.PARAGRAPH:
        this.type = type;
        this.setElement(new Paragraph)
        this.getElement().setType(type)
        break;
      case InputTypes.BUTTON:
        this.type = type;
        this.setElement(new Button)
        this.getElement().setType(type)
        break;
    }
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
  setClickeableFunctions() {
    let self = this;

    this.getElement().getElement().dblclick(function(){
      let id = $(this).attr("id");

      let element = self.foundElement(id);

      if(element != false)
      {
        self.clearBeforeClasses();
        $(element.element).addClass("webflow-item-selected");

        self.setElement(element);
        self.getElement().make();
        self.getElement().showElementProperties();
      }
    });
  }
  foundElement(id) {
    let _element = false;
    this.getElements().forEach((element)=>{
      if(element.id == id)
      {
        _element = element;
      }
    });

    return _element;
  }
}

class Element {
  constructor() 
  {
    this.element = null;
    this.type = null;
    this.id = null;
    this.classes = []
  }
  get(key)
  {
    if(this[key] != undefined) {
      return this[key]
    }
  }
  set(key,value)
  {
    this[key] = value
  }
  _make(element,main_element,is_new_element) 
  {
    // if(this.getPaddingLeft() != null)
    // {
    //   element.animate({
    //     paddingLeft: '+'+this.getPaddingLeft()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getPaddingRight() != null)
    // {
    //   element.animate({
    //     paddingRight: '+'+this.getPaddingRight()+'px',
    //   }, TimeOut.ANIMATION);
    // }
  
    // if(this.getPaddingTop() != null)
    // {
    //   element.animate({
    //     paddingTop: '+'+this.getPaddingTop()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getPaddingBottom() != null)
    // {
    //   element.animate({
    //     paddingBottom: '+'+this.getPaddingBottom()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getMarginTop() != null)
    // {
    //   element.animate({
    //     marginTop: '+'+this.getMarginTop()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getMarginBottom() != null)
    // {
    //   element.animate({
    //     marginBottom: '+'+this.getMarginBottom()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getMarginLeft() != null)
    // {
    //   element.animate({
    //     marginLeft: '+'+this.getMarginLeft()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getMarginRight() != null)
    // {
    //   element.animate({
    //     marginRight: '+'+this.getMarginRight()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getHeight() != null)
    // {
    //   element.animate({
    //     height: '+'+this.getHeight()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    // if(this.getWidth() != null)
    // {
    //   element.animate({
    //     width: '+'+this.getWidth()+'px',
    //   }, TimeOut.ANIMATION);
    // }

    this.setElement(element);
    $(element).addClass("webflow-item-selected");

    if(is_new_element == true) 
    {
      if(main_element != undefined)
      {
        this.insertIntoElement(main_element,this.getElement());
      } else {
        this.insertIntoGrid(this.getElement());
      }
    }

    setTimeout(()=>{
      this.setFollowerSpan();
    },500);
  }
  setType(type) 
  {
    this.type = type;
  }
  getType() 
  {
    return this.type;
  }
  setElement(element) 
  {
    this.element = element;
  }
  getElement() 
  {
    return this.element;
  }
  insertIntoElement(main_element,element) 
  {
    $(main_element.element).append($(element))
  }
  insertIntoGrid(element) 
  {
    $("#main").append($(element))
  }
  toggleProperties() {
    $(".element-webflow").each((key,element)=>{
      let only_for = $(element).data('only_for');
      
      if(only_for != undefined)
      {
        if(only_for.includes(this.element_type.toLowerCase()))
        {
          $(element).parent().parent().parent().removeClass("d-none");
        } else {
          $(element).parent().parent().parent().addClass("d-none");
        }
      }
    });
  }
  setFollowerSpan() 
  {
    let set_at_bottom = false;
    let position = $(this.getElement()).position();
    
    position.left = parseInt(this.getElement().css("marginLeft")) + position.left + parseInt(this.getElement().css("paddingLeft"));

    if(position.top < (this.getElement().height() + 6))
    {
      set_at_bottom = true;
      position.top = this.getElement().height() + parseInt(this.getElement().css("marginTop")) + parseInt(this.getElement().css("paddingTop")) + parseInt(this.getElement().css("paddingBottom"));
    } 
    
    let div = null;
    let is_new_element = false;

    if($("#follower").length > 0)
    {
      div = $("#follower");
    } else {
      div = $("<div/>").attr("id","follower");
      is_new_element = true;
    }
    
    div.css({left:position.left,top:position.top}).text("<"+this.getType().toLowerCase()+">").addClass("webflow-item-selected-span");

    if(is_new_element == true) $("#main").append(div);
  }
}

class Input extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.INPUT;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;

    if($("#"+this.get("id")).length > 0 )
    {
      element = $("#"+this.get("id"))
    } else {
      is_new_element = true;
      element = $("<input/>").attr("id",this.get("id"))

      element.addClass("form-control")
    }
    
    // if(this.getPlaceHolder() != null)
    // {
    //   element.attr("placeholder",this.getPlaceHolder())
    // }

    // if(this.get("font-size") != null)
    // {
    //   element.css("font-size",this.get("font-size")+'px')
    // }
        
    this._make(element,main_element,is_new_element);
  }
  showElementProperties() {
    this.toggleProperties();

    if($("#element-properties").hasClass("d-none"))
    {
      $("#element-properties").removeClass("d-none");
    }

    $("#element-id").val(this.get("id"))
    // $("#element-placeholder").val(this.getPlaceHolder())
    // $("#element-type").text(this.getType())    
    // $("#element-resume-id").text("#"+this.getId())    

    // /* margins */
    // $("#width").val(this.getWidth())    
    // $("#height").val(this.getHeight())   
    // $("#margin-top").val(this.getMarginTop())    
    // $("#margin-bottom").val(this.getMarginBottom())    
    // $("#margin-left").val(this.getMarginLeft())    
    // $("#margin-right").val(this.getMarginRight())    
  }
}

class Button extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.Button;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;

    if($("#"+this.getId()).length > 0 )
    {
      element = $("#"+this.getId())
    } else {
      is_new_element = true;
      element = $("<button/>").attr("id",this.getId())
      element.addClass("btn btn-primary")
      element.text("Button");
    }
    
    if(this.getText() != null)
    {
      element.text(this.getText())
    }
    
    if(this.getFontSize() != null)
    {
      element.css({fontSize:this.getFontSize()+'px'})
    }
        
    this._make(element,main_element,is_new_element);
  }
  showElementProperties() {
    this.toggleProperties();

    if($("#element-properties").hasClass("d-none"))
    {
      $("#element-properties").removeClass("d-none");
    }

    $("#element-id").val(this.getId())
    $("#element-type").text(this.getType())    
    $("#element-resume-id").text("#"+this.getId())    

    /* margins */
    $("#width").val(this.getWidth())    
    $("#height").val(this.getHeight())    
    $("#margin-top").val(this.getMarginTop())    
    $("#margin-bottom").val(this.getMarginBottom())    
    $("#margin-left").val(this.getMarginLeft())    
    $("#margin-right").val(this.getMarginRight())    
  }
}

class Div extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.DIV;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;

    if($("#"+this.getId()).length > 0 )
    {
      element = $("#"+this.getId())
    } else {
      is_new_element = true;
      element = $("<div/>").attr("id",this.getId()).addClass("col");
    }

    this._make(element,main_element,is_new_element);
  }
  showElementProperties() {
    this.toggleProperties();

    if($("#element-properties").hasClass("d-none"))
    {
      $("#element-properties").removeClass("d-none");
    }

    $("#element-id").val(this.getId())
    $("#element-type").text(this.getType())    
    $("#element-resume-id").text("#"+this.getId())    

    /* margins */
    $("#width").val(this.getWidth())    
    $("#height").val(this.getHeight())    
    $("#margin-top").val(this.getMarginTop())    
    $("#margin-bottom").val(this.getMarginBottom())    
    $("#margin-left").val(this.getMarginLeft())    
    $("#margin-right").val(this.getMarginRight())    
  }
}

class Paragraph extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.PARAGRAPH;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;

    if($("#"+this.getId()).length > 0 )
    {
      element = $("#"+this.getId())
    } else {
      is_new_element = true;
      element = $("<p/>").attr("id",this.getId()).text("Parrafo")
    }

    if(this.getText() != null)
    {
      element.text(this.getText())
    }

    if(this.getFontSize() != null)
    {
      element.css({fontSize:this.getFontSize()+'px'})
    }
    
    this._make(element,main_element,is_new_element);
  }
  showElementProperties() {
    this.toggleProperties();

    if($("#element-properties").hasClass("d-none"))
    {
      $("#element-properties").removeClass("d-none");
    }

    $("#element-id").val(this.getId())
    $("#element-type").text(this.getType())    
    $("#element-resume-id").text("#"+this.getId())    

    /* margins */
    $("#width").val(this.getWidth())    
    $("#height").val(this.getHeight())    
    $("#margin-top").val(this.getMarginTop())    
    $("#margin-bottom").val(this.getMarginBottom())    
    $("#margin-left").val(this.getMarginLeft())    
    $("#margin-right").val(this.getMarginRight())    
  }
}

class Anchor extends Element {
  constructor()
  {
    super();
    this.element_type = InputTypes.ANCHOR;
  }
  make(main_element)
  {
    var element = null;
    var is_new_element = false;

    if($("#"+this.getId()).length > 0 )
    {
      element = $("#"+this.getId())
    } else {
      is_new_element = true;
      element = $("<a/>").attr("id",this.getId()).text("Liga").addClass("btn btn-link");
    }

    if(this.getText() != null)
    {
      element.text(this.getText())
    }

    if(this.getFontSize() != null)
    {
      element.css({fontSize:this.getFontSize()+'px'})
    }

    if(this.getHref() != null)
    {
      element.attr('href',this.getHref());
    }
    
    this._make(element,main_element,is_new_element);
  }
  showElementProperties() {
    this.toggleProperties();

    if($("#element-properties").hasClass("d-none"))
    {
      $("#element-properties").removeClass("d-none");
    }

    $("#element-id").val(this.getId())
    $("#element-type").text(this.getType())    
    $("#element-resume-id").text("#"+this.getId())    

    /* margins */
    $("#width").val(this.getWidth())    
    $("#height").val(this.getHeight())    
    $("#margin-top").val(this.getMarginTop())    
    $("#margin-bottom").val(this.getMarginBottom())    
    $("#margin-left").val(this.getMarginLeft())    
    $("#margin-right").val(this.getMarginRight())    
  }
}

class AviableElementsToBeMain {
  static LIST = [InputTypes.DIV]
  static isAviable(type)
  {
    return AviableElementsToBeMain.LIST.includes(type);
  }
}