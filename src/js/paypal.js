$(document).ready(function(){
  setTimeout(()=>{
    $("#paypal").addClass("d-none-hide");
    $("#bm").removeClass("d-none");
    runAnimation();
  },1000);

  function runAnimation()
  {
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('bm'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '../../src/files/json/done.json'
    });
  }

});