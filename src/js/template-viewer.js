$(document).ready(function(){
  const screenShot = new ScreenShot;


  html2canvas(document.querySelector("#body")).then(canvas => {
    // var image = canvas.toDataURL('image/jpeg', 1.0);
    // var image = canvas.toDataURL('image/jpeg', 0.5);
    var image = canvas.toDataURL('image/jpeg', 0.1);

    screenShot.saveScreenShot((response)=>{
      if(response.s == 1)
      {
        console.log("SAVED")
      }
    },{image:image,template_id:getParam("template_id")});
  });
});

class ScreenShot extends Http {
  constructor()
  {
    super();
  }
  saveScreenShot(callback,data)
  {
      return this.call("../../app/application/save_screen_shot.php",data,callback,false,0,METHODS.POST);
  }
}