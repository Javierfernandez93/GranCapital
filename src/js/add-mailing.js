load(()=>{
	let mailing = new Mailing;

	dinamicLoader.showLoader($(".response"));

	mailing.init();

  window.switchSheet = function(sheet_per_proyect_id)
  {
    $("[data-sppid="+sheet_per_proyect_id+"]").toggleClass("opacity-3")
  }

  window.setMailListId = function(element)
  {    
    let mail_list_id = $(element).val();

    mailing.setMailListId(mail_list_id);

    checkFirstStep();
  }

  window.changeProgramatedDate = function(element)
  {
    if($("#programated_date_option").is(":checked"))
    {
      $("#programated_date-container").addClass("d-none");
    } else {
      $("#programated_date-container").removeClass("d-none");
    }
  }

  window.setProgramatedDate = function(element)
  {
    mailing.setProgramatedDate($(element).val());
  }

  window.setCampaignName = function(element,event,next_element)
  {
    let campaign_name = $(element).val();

    if(campaign_name)
    {
      mailing.setCampaignName(campaign_name);

      $("#proyect-name").text(mailing.getCampaignName());

      checkFirstStep();
      $("#title-first").removeClass("display-3").addClass("text-muted display-5");
    } else {
      $("#proyect-name").text("");
      $("#title-first").removeClass("display-5 text-muted").addClass("display-3");
    }
      
    nextElement(event,next_element)
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
  
  window.nextStep = function(element,actual_step)
  {
    dinamicLoader.showLoader(element);

    mailing.actual_step = actual_step;

    if(mailing.actual_step == 2)
    { 
      mailing.getSecondStepMailing((response)=>{
        if(response.s == 1)
        {
          $(".response").html(response.html);
        }
      },{campaign_name:mailing.getCampaignName()});
    } else if(mailing.actual_step == mailing.steps) {
      let sheet_per_proyect_ids = [];

      $(".sheet_per_proyect_ids").each((k,element)=>{
        if($(element).is(":checked")){
          sheet_per_proyect_ids.push({sheet_per_proyect_id:$(element).val()});
        }
      });

      console.log(mailing.getProgramatedDate())

      // mailing.saveMailingCampaign((response)=>{
      //   if(response.s == 1)
      //   {
      //     dinamicLoader.removeStyle();
      //     $(element).text("¡Listo!")
      //   }
      // },{sheet_per_proyect_ids:sheet_per_proyect_ids,campaign_name:mailing.getCampaignName(),mail_list_id:mailing.getMailListId()});
    }
  }

  function checkFirstStep()
  {
    if(isEmpty(mailing.getCampaignName()))
    {
      $("#first-step").attr("disabled",true);
      return false;
    }

    if(!mailing.getMailListId())
    {
      $("#first-step").attr("disabled",true);

      return false;
    }
    
    $("#first-step").removeAttr("disabled");
  }

  function checkSecondStep()
  {
    if(mailing.getTemplateId() == null)
    {
      $("#second-step").attr("disabled",true);
      return false;
    }
    
    $("#second-step").removeAttr("disabled");
  }
});

class Mailing extends Http {
  constructor()
  {
    super();
    this.actual_step = 1;
    this.steps = 3;
    this.mail_list_id = null;
    this.campaign_name = null;
    this.programated_date = null;
  }
  setProgramatedDate(programated_date) {
    this.programated_date = programated_date;
  }
  getProgramatedDate()
  {
    return this.programated_date;
  }
  getCampaignName()
  {
    return this.campaign_name;
  }
  setCampaignName(campaign_name)
  {
    this.campaign_name = campaign_name;
  }
  getMailListId()
  {
    return this.mail_list_id;
  }
  setMailListId(mail_list_id)
  {
    this.mail_list_id = mail_list_id;
  }
  init()
  {
  	if(this.actual_step == 1)
  	{
    	this.getFirstStepMailing((response)=>{
  			if(response.s == 1)
  			{
  				$(".response").html(response.html);
  			}
		  });
  	}
  }
  getFirstStepMailing(callback,data){
    return this.call("../../app/application/get_first_step_mailing.php",data,callback);
  }
  getSecondStepMailing(callback,data){
    return this.call("../../app/application/get_second_step_mailing.php",data,callback);
  }
  getThirdStep(callback,data){
    return this.call("../../app/application/get_third_step.php",data,callback);
  }
  saveMailingCampaign(callback,data){
    return this.call("../../app/application/save_mailing_campaign.php",data,callback);
  }
};