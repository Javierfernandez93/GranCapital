$(document).ready(function(){
	let addTeam = new AddTeam;

	$('.selectable').select2();

  window.joinTeam = function(element)
  {
    dinamicLoader.show(element);

    addTeam.joinTeam((response)=>{

    },{name:addTeam.getPartnerName(),email:$("#email").val(),nick_name:addTeam.getNickName(),password:$("#password").val(),about:$("#about").val()});
  }

  window.setPartnerName = function(element,event,next_element)
  {
    let partner_name = $(element).val();

    if(partner_name)
    {
      addTeam.setPartnerName(partner_name);

      $("#partner-name").text(addTeam.getPartnerName());

      $("#title-first").removeClass("display-3").addClass("text-muted display-5");
    } else {
      $("#partner-name").text("");
      $("#title-first").removeClass("display-5 text-muted").addClass("display-3");
    }
      
    nextElement(event,next_element)
  }

  function checkFirstStep()
  {
    if(addTeam.getPartnerName())
    {
      if(addTeam.getNickName())
      {
        $("#extra-info").addClass("h-hide").removeClass("d-none");
      }
    }
  }

  window.checkPasswordMatch = function(event,password_1,password_2,next_element)
  {
    if(!$(password_1).val())
    {
      isInvalid($(password_1));
      return false;
    } else {
      isValid($(password_1));
    }

    if(!$(password_2).val())
    {
      isInvalid($(password_2));
      return false;
    } else {
      isValid($(password_2));
    }

    if($(password_1).val() != $(password_2).val())
    {
      isInvalid($(password_1));
      isInvalid($(password_2));
      return false;
    } else {
      isValid($(password_1));
      isValid($(password_2));
    }

    if(next_element != undefined)
    {
      nextElement(event,next_element);
    }

    checkFirstStep();
  }

  window.setNickName = function(element,event,next_element)
  {
    let nick_name = $(element).val();

    if(nick_name)
    {
      addTeam.setNickName(nick_name);

      $("#nick-name").text(addTeam.getNickName());

      $("#title-first").removeClass("display-3").addClass("text-muted display-5");
    } else {
      $("#nick-name").text("");
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

  setTimeout(()=>{
    $("#extra-info").addClass("h-normal")
  },1000);
});

class AddTeam extends Http {
  constructor()
  {
    super();
    this.partner_name = null;
    this.nick_name = null;
  }
  getPartnerName()
  {
    return this.partner_name;
  }
  getNickName(){
    return this.nick_name;
  }
  setPartnerName(partner_name)
  {
    this.partner_name = partner_name;
  }
  setNickName(nick_name)
  {
    this.nick_name = nick_name;
  }
  getEmailLink(callback,data){
    return this.call("../../app/application/get_email_link.php",data,callback);
  }
  getQrImage(callback,data){
    return this.call("../../app/application/get_qr_image.php",data,callback);
  }
  joinTeam(callback,data){
    return this.call("../../app/application/join_team.php",data,callback);
  }
  getWhatsAppLink(callback,data){
    return this.call("../../app/application/get_whatsapp_link.php",data,callback);
  }
};