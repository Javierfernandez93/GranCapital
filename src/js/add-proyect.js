load(()=>{
	let proyect = new Proyect;

	dinamicLoader.showLoader($(".response"));

	proyect.init();

  window.setPrivateProyect = function(element)
  {
    if($(element).is(":checked")){
      proyect.setPrivate(true);
    } else {
      proyect.setPrivate(false);
    }

    $("#content-wrapper").toggleClass("private-proyect-bg");
  }

  window.toggleCard = function(hide_card_id,show_card_id)
  {
    $("#"+hide_card_id).addClass("opacity-3");
    $("#"+show_card_id).removeClass("d-none");

    setTimeout(()=>{
      _scrollTo($("#"+show_card_id).offset().top);
    },100)
  }

  window.setProyectDescription = function(element,event,next_element)
  {
    let proyect_description = $(element).val();
    
    proyect.setProyectDescription(proyect_description);

    checkFirstStep();

    nextElement(event,next_element)
  }

  window.setProyectName = function(element,event,next_element)
  {
    let proyect_name = $(element).val();

    if(proyect_name)
    {
      proyect.setProyectName(proyect_name);

      $("#proyect-name").text(proyect.getProyectName());

      checkFirstStep();
      $("#title-first").removeClass("lead-md").addClass("text-muted lead");
      $(element).addClass("is-valid").removeClass("is-invalid");
    } else {
      $("#proyect-name").text("");
      $("#title-first").removeClass("lead text-muted").addClass("lead-md");
      $(element).addClass("is-invalid").removeClass("is-valid");
    }
      
    nextElement(event,next_element)
  }
  
  window.checkWebSite = function(element,event,next_element)
  {
    let url = $(element).val();

    nextElement(event,next_element);

    if(validURL(url))
    {
      $(element).addClass("is-valid").removeClass("is-invalid");
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }
  }
  
  window.checkEmail = function(element,event,next_element)
  {
    let email = $(element).val();

    nextElement(event,next_element);

    if(isValidMail(email))
    {
      $(element).addClass("is-valid").removeClass("is-invalid");
    } else {
      $(element).addClass("is-invalid").removeClass("is-valid");
    }
  }

  window.nextElement = function(event,next_element)
  {
    nextElement(event,next_element)
  }

  function nextElement(event,next_element)
  {
    if(event.keyCode == 13)
    {
      $(next_element).focus();
    }
  }

  window.setTemplateId = function(element,template_id)
  {
    $(".btn-template").text("Take").removeAttr("disabled").removeAttr("style");
    dinamicLoader.show(element);
    proyect.setTemplateId(template_id);
    dinamicLoader.removeStyle();
    $(element).text("Taked");

    checkSecondStep();
  }

  window.nextStep = function(element,actual_step)
  {
    dinamicLoader.showLoader(element);

    proyect.actual_step = actual_step;

    if(proyect.actual_step == 2)
    { 
      proyect.getSecondStep((response)=>{
        if(response.s == 1)
        {
          $(".response").html(response.html);
        }
      });
    } else if(proyect.actual_step == 3) {
        proyect.getThirdStep((response)=>{
          if(response.s == 1)
          {
            $(".response").html(response.html);
          }
        });
    } else if(proyect.actual_step == proyect.steps) {
      proyect.saveProyect((response)=>{
        if(response.s == 1)
        {
          dinamicLoader.removeStyle();
          $(element).text("¡Listo!")
        }
      },{template_id:proyect.getTemplateId(),proyect_name:proyect.getProyectName(),proyect_description:proyect.getProyectDescription()});
    }
  }

  function checkFirstStep()
  {
    if(isEmpty(proyect.getProyectName()))
    {
      $("#first-step").attr("disabled",true);
      return false;
    }

    if(isEmpty(proyect.getProyectDescription()))
    {
      $("#first-step").attr("disabled",true);

      return false;
    }
    
    $("#first-step").removeAttr("disabled");
  }

  function checkSecondStep()
  {
    if(proyect.getTemplateId() == null)
    {
      $("#second-step").attr("disabled",true);
      return false;
    }
    
    $("#second-step").removeAttr("disabled");
  }
});

class Proyect extends Http {
  constructor()
  {
    super();
    this.actual_step = 1;
    this.steps = 4;
    this.template_id = null;
    this.proyect_name = null;
    this.proyect_description = null;
    this.keywords = null;
    this._private = false
  }
  getPrivate()
  {
    return this._private;
  }
  setPrivate(_private)
  {
    this._private = _private;
  }
  getKeywords()
  {
    return this.keywords;
  }
  setKeywords(keywords)
  {
    this.keywords = keywords;
  } 
  getProyectName()
  {
    return this.proyect_name;
  }
  setProyectName(proyect_name)
  {
    this.proyect_name = proyect_name;
  }
  getProyectDescription()
  {
    return this.proyect_description;
  }
  setProyectDescription(proyect_description)
  {
    this.proyect_description = proyect_description;
  }
  getTemplateId()
  {
    return this.template_id;
  }
  setTemplateId(template_id)
  {
    this.template_id = template_id;
  }
  init()
  {
  	if(this.actual_step == 1)
  	{
  		this.getFirstStep((response)=>{
			if(response.s == 1)
			{
				$(".response").html(response.html);
        this.startKeyupFunctions();

        var options =  {
          placeholder: "(+00) 0000-0000",
          onComplete: function(cep) {
            // console.log('CEP Completed!:' + cep);
            $("#phone").addClass("is-valid").removeClass("is-invalid");
          },
          onKeyPress: function(cep, event, currentField, options){
            // console.log('A key was pressed!:', cep, ' event: ', event, 'currentField: ', currentField, ' options: ', options);
          },
          onChange: function(cep){
            // console.log('cep changed! ', cep);
          },
          onInvalid: function(val, e, f, invalid, options){
            var error = invalid[0];
            // console.log ("Digit: ", error.v, " is invalid for the position: ", error.p, ". We expect something like: ", error.e);
            $("#phone").addClass("is-invalid").removeClass("is-valid");
          }
        };


        $('#phone').mask('(+00) 0000-0000', options);
			}
		});
  	}
  }
  hideIAProyectPrediction(){
    $("#proyect-prediction").addClass("d-none");
  }
  showIAProyectPrediction(){
    $("#proyect-prediction").removeClass("d-none").text(this.getKeywords());
  }
  startKeyupFunctions(){
    $("#proyect-description").keyup(delay((e)=>{
      this.analizeKeywords((response)=>{
        if(response.s == 1)
        {
          this.setKeywords(response.prediction);
          this.showIAProyectPrediction();
        } else {
          this.hideIAProyectPrediction();
        }
      },{keywords:this.getProyectDescription()});
    }, 500));
  }
  getFirstStep(callback,data){
    return this.call("../../app/application/get_first_step.php",data,callback);
  }
  getSecondStep(callback,data){
    return this.call("../../app/application/get_second_step.php",data,callback);
  }
  getThirdStep(callback,data){
    return this.call("../../app/application/get_third_step.php",data,callback);
  }
  saveProyect(callback,data){
    return this.call("../../app/application/save_proyect.php",data,callback);
  }
  analizeKeywords(callback,data){
    return this.call("../../app/application/analize_keywords.php",data,callback);
  }
};