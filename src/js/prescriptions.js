$(document).ready(function(){
  prescription = new Prescription;


  window.savePrescritions=function(video_consulting_per_user_id){
    if(video_consulting_per_user_id){
      if($('#prescription').val()){
         prescription.save_prescription((response)=>{
              if(response.s==1){
               window.location.href = "../videoconsulting/"; 
              }else{
                alertmesage("No se guardaron los datos");
              }
            },{video_consulting_per_user_id:video_consulting_per_user_id,prescription:$('#prescription').val()}
          );

      }else{
          alertmesage("ingresa los datos para la receta");
      }
    }else{
      alertmesage("no selecciono una video consulta");
    }



  }
});

class Prescription extends Http {
  save_prescription(callback,data){
    return this.call('../../app/application/save_prescription.php',data,callback,false);
  }
};