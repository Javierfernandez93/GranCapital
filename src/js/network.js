$(document).ready(function(){
  let Network = new network;
  // Variables
  var colorButton = $(".colors li");
  
  colorButton.on("click", function(){
    
    // Remove class from currently active button
    $(".colors > li").removeClass("active-color");
    
    // Add class active to clicked button
    $(this).addClass("active-color");
    
    // Get background color of clicked
    var newColor = $(this).attr("data-color");
    console.log(newColor);
    
    // Change background of everything with class .bg-color
    $(".bg-color").css("background-color", newColor);
    
    // Change color of everything with class .text-color
    $(".text-color").css("color", newColor);

    if(newColor=='#76A711'){
      $("#info").html('<h1><t>Este color representa a las personas activas con paquete personal (1 sticker)</t></h1>');
    }else if(newColor=="#066CB0"){
      $("#info").html('<h1><t>Este color representa a las personas activas con paquete empresarial (8 stickers)</t></h1>');
    }else if(newColor=="#7E051f"){
      $("#info").html('<h1><t>Este color representa a las personas activas con paquete duo (2 stickers)</t></h1>'); 
    
    }else if(newColor=="#ff5722"){
      $("#info").html('<h1><t>Este color representa a las personas activas con paquete familiar (4 stickers)</t></h1>');
      
    }else if(newColor=="#bdc3c7"){
      $("#info").html('<h1><t>Este color representa a las personas inactivas</t></h1>');  
    }

    translateWords();
  });
  
  window.getNetwork = function(to_company_id)
  {   
    // Loader.showLoader();

    Network.getnetwork((response)=>{
        if(response.s == 1)
        {
          // Loader.closeLoader();
        $("#network").html(response.html);
      } else {
        alertmesage(response.r);
      }
    },{level:1,to_company_id:to_company_id,mode:mode});
  }

  window.getnetworks=function(element,level){   
    filter = $("#kind").val();
    mode   = $("#mode").val();

    let coordenadas= $(element).offset();
    
    if($(".next-level")){
      $(".next-level").remove();
    }

    if(level==0){
      alertmesage("Selecciona cuantos niveles deseas ver.");
    }else if(filter==0){
      alertmesage("Seleccione un filtro (Todos ó Activos ).");
    }else if(mode==0){
      alertmesage("Selecciona como deseas visualizar tu Red.");
    }else{

      Loader.showLoader();
      Network.getnetwork((response)=>{
            if(response.s=="1"){
              Loader.closeLoader();
              if(level==1){
              $("#network").html(response.html);
              }else{
                $("#network").append(response.html);
              }
              $(window).scrollTop(coordenadas.top-40);
          }else{
            alertmesage(response.r);
          }
        },{level:level,filter:filter,mode:mode}     
      );
    
    }
  }
  
  window.closePopup=function(){
    if ($(".popup").is(':visible')) {
      $(".popup").hide();
    }
  } 

  window.getExcedentes=function(){
    Loader.showLoader();
    Network.getExcedentNetwork((response)=>{
        Loader.closeLoader();
        $("#network").html(response.html);        
      },{found:true}      
    );
  } 

  window.goUp = function(){
    $("html, body").animate({scrollTop : 0},'fast');
  }

  $(window).scroll(function () {
      if ($(window).scrollTop() >= 535) 
          $('.network-scroll').removeClass('d-none');
      if ($(window).scrollTop() <= 533)      
          $('.network-scroll').addClass('d-none');                
  });

  window.mostrar = function(element,id){
    popupOpenClose($(".popup"),id,$(element).offset());
  }
});


function popupOpenClose(popup,sponsor_id,coordenadas) {

  let Network = new network;  
  Loader.showLoader(false);

  Network.getData((response)=>{
        if(response.s=="1"){
        document.getElementById("patrocinador").innerHTML = response.html['header'];
        Loader.closeLoader();
        $(popup).show();
      }else{
        alertmesage(response.r);
      }
    },{sponsor_id:sponsor_id}     
  );
  

  /* Close popup if user clicks on background */
  $(popup).click(function(e) {
    if ( e.target == this ) {
      if ($(popup).is(':visible')) {
        $(popup).hide();
      }
    }

    $(window).scrollTop(coordenadas.top);

  });

}

class network extends Http {
    getnetwork(callback,data){
        return this.call("../../apps/network/subcore/application/getnetwork.php",data,callback,false);
    }
    getData(callback,data){
      return this.call("../../apps/network/subcore/application/getdatos.php",data,callback,false);
    }
    getExcedentNetwork(callback,data){
      return this.call("../../apps/network/subcore/application/getnetwork_excedent.php",data,callback,false);
    }
}