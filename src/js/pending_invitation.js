$(document).ready(function(){
  wow = new WOW({
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
  });
  wow.init();

  let pendingInvitation = new PendingInvitation;

  setTimeout(function(){
    $(".intro").remove();
  },800);

  $("body").on("click","#email",function(){
    $(".box-signup").addClass("box-signup-big");
    $(".box-signup-inner-header").removeClass("hide");
    $(".box-signup-inner").addClass("px-5");
    setTimeout(function(){
      $(".box-signup").addClass("box-signup-big-static");
    },1000);
  })
  
  window.saveInvitation = function(pending_invitation_id)
  {
    if($("#email").val())
    {
      pendingInvitation.save((response)=>{
        if(response.s == 1)
        {
          $(".box-signup").removeClass("bg-orange").addClass("bg-space-gray-dark");
          $(".box-signup-inner").html(response.html)
        }
      },{pending_invitation_id:pending_invitation_id,email:$("#email").val()});
    }
  }

  // let offsets = [];

  // $(".element-viewport").each(function(){
  //   let top = $(this).offset().top;
  //   if(top) {
  //     offsets.push($(this).offset().top);
  //   }
  // });

  // for (var i = 0; i < offsets.length; i++) {
  //     console.log(offsets[i])
  // }
  // let busy = false;
  // let lastOffset = 0;

  // if(offsets.length)
  // {
  //   $(window).scroll(()=>{
  //     for (var i = 0; i < offsets.length; i++) {
  //       let offset = offsets[i];
  //       let scrollTop = $(window).scrollTop();

  //       if(!busy && (scrollTop >= (offset-50)) && scrollTop >= (lastOffset-50))
  //       {
  //         if(offset > lastOffset) {
  //           lastOffset = offset;
  //         }
  //         busy = true;
  //         console.log("SCROLLING TO "+ offset+" FROM "+scrollTop);
  //         $('html,body').animate({ scrollTop: offset+scrollTop+50 }, 1000,()=>{
  //           setTimeout(()=>{
  //             busy = false;
  //           },1000);
  //         });
  //       }
  //       return;
  //     }
  //   });
  // }
});

class PendingInvitation extends Http {
  constructor() {
    super();
  }
  save(callback,data){
    return this.call('../app/application/save_pending_invitation_email.php',data,callback);
  }
}