$(document).ready(function(){
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  console.log(window.innerWidth);
  console.log(window.innerWidth);



  canvas.width = 2000;
  canvas.height = 2000;

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(00, 150);
  context.stroke();
});


class Context {
  constructor()
  {
    this.context = null;
  }
  getContext()
  {
    return this.context;
  }
  setContext(context)
  { 
    this.context = context;
  }
}