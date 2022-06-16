class CheckField {
  constructor() {
    this.element = [];
    this.elements = [];
    this.field = false;
  }
  exist(element) {
    return this.elements.indexOf(element) != -1;
  }
  addElement(element) {
    this.elements.push(element);
  }
  init(element,field,event,nextField) {
    this.element = element;

    if(!this.exist(element)) {
      switch(field) {
        case 'email':
          this.element.Validator = new EmailField;
        break;
        case 'text':
          this.element.Validator = new TextField;
        break;
        case 'password':
          this.element.Validator = new PasswordField;
        break;
        case 'number':
          this.element.Validator = new NumberField;
        break;
      }
      
      this.addElement(this.element);
    }

    this.validate(event,nextField);
  }
  validate(event,nextField) {
    this.element.Validator.validate(this.element,event,nextField);
  }
}

class Input {
  removeError(event,nextField) {
    $(this.element).removeClass("text-danger is-invalid").addClass("text-success is-valid");
    this.checkNextField(event,nextField);
  }
  showError() {
    $(this.element).removeClass("text-success is-valid").addClass("text-danger is-invalid");
  }
  isValidFunction(v) {if (v instanceof Function) {/* do something */} };
  checkNextField(event,nextElement) {
    // nextElement();  
    // if(this.isValidFunction(nextElement)) {
    //   alert();
    // }
    if((event.which || event.keyCode) == 13) {
      if($("#"+nextElement).length) {
        $("#"+nextElement).focus();
      }
    }
  }
}

class EmailField extends Input {
  validate(element,event,nextField) {
    this.element = element;
    
    if(!$(this.element).val() || !this.validateEmail($(this.element).val())) {
      this.showError();
      return;
    }

    this.removeError(event,nextField);
  }
  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}


class TextField extends Input {
  validate(element,event,nextField) {
    this.element = element;
    
    if(!$(this.element).val()) {
      this.showError();
      return;
    }

    this.removeError(event,nextField);
  }
}

class PasswordField extends Input {
  constructor() {
    super();
    this.min_lenght = 8;
    this.max_lenght = 20;
  }
  hasLength() {
    let field_length = $(this.element).val().length;

    if(field_length >= this.min_lenght && field_length <= this.max_lenght) {
      return true;
    }

    return false;
  }
  validate(element,event,nextField) {
    this.element = element;
    
    if(!$(this.element).val() || !this.hasLength()) {
      this.showError();
      return;
    }

    this.removeError(event,nextField);
  }
}

class NumberField extends Input {
  constructor() {
    super();
  }
  hasLength() {
    let field_length = $(this.element).val().length;

    if(field_length >= this.min_lenght && field_length <= this.max_lenght) {
      return true;
    }

    return false;
  }
  validate(element,event,nextField) {
    this.element = element;
    
    if(!$(this.element).val() || isNaN($(this.element).val())) {
      this.showError();
      return;
    }

    this.removeError(event,nextField);
  }
}