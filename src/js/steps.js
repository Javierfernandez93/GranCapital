$(document).ready(function(){
  let steps = new Steps;

  steps.start();

  $(".input-code").click(function(){
    $(this).val("");
    steps.index = $(this).attr("id");
  });

  $(".input-code").keyup(function(e){
    if(e.keyCode == 13 || e.keyCode == 32)
    {
      steps.focusNext($(this).attr("id"));
    }
    
    if($(this).attr("id") == 9) {
      steps.checkCode();
    }
  });
});

class Steps extends Http {
  constructor() {
    super();
    this.options = {};
    this.input_class = ".input-code";
    this.index = 0;
    this.input_length = 0;
    this.code = "";
  }
  _checkCode(callback,data){
    return this.call('../../app/application/check_code.php',data,callback);
  }
  focusInEmptyInput() {
    let focused = false;
    $(".input-code").each((k,v)=>{
      if($(v).val() == "" || $(v).val() == " " && !focused) {
        $(v).val("");
        $(v).focus();
        focused = true;
      }
    });
  }
  getCode() {
    let code = [];
    let complete = true;
    $(".input-code").each((k,v)=>{
      if($(v).val() != "" && $(v).val() != " ") {
        code.push($(v).val());
      } else {
        complete = false;
      }
    });

    if(complete)
    {
      this._checkCode((response)=>{
        if(response.s == 1) {
          window.location.href = "../home/home.php";
        } else if(response.r == "NOT_VALID_CODE") {
          this.showMessage("Código incorrecto","El código proporcionado es incorrecto, por favor póngase en contacto con nosotros.");
        }
      },{code:code.join("")});
    } else {
      this.focusInEmptyInput();
    }
  }
  showMessage(title,subTitle) {
    let alert = alertCtrl.create({
        title: title, 
        subTitle: subTitle,
        buttons: [
          { 
              text: translate('Aceptar'), 
              role: 'cancel', 
              handler: data => { 
                // do stuff
              } 
          },
        ]
    });

    alertCtrl.present(alert.modal); 
  }
  checkCode() {
    this.getCode();
  }
  start() {
    this.input_length = $(this.input_class).length;
  }
  getNextIndex() {
    if(this.index < (this.input_length-1))
      this.index++;
  }
  focusNext(index) {
    this.getNextIndex();
    $(this.input_class).eq(this.index).focus();
  }
}