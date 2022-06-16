$(document).ready(function(){
  let mailing = new Mailing;
  let bar;

  function done()
  {
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('lottie'), // Required
      path: '../../src/json/mail-done.json', // Required
      renderer: 'svg/canvas/html', // Required
      loop: false, // Optional
      autoplay: true, // Optional
      name: "Hello World", // Name for future reference. Optional.
    })
  }

  mailing.getMailsByCampaign((response)=>{
    if (response.s == 1) 
    {
      sendMails(response.mails);
    }
  });

  async function sendMails(mails)
  {
    mailing.setMails(mails);

    $("#mails-size").text(mailing.getMails().length);

      mailing.getMails().forEach(async (user,key)=>{
        await mailing.sendMail((response)=>{
          let _key = key+1;
          $("#mail-number").text(_key);

          if(response.s == 1)
          {
            $("#mail").html('<i class="far fa-envelope-open mr-2"></i>'+user.email);

            mailing.sent++;

            loadProgressBar(".progress",mailing.calculateProgress(key));

            if(mailing.calculateProgress(key) == 100)
            {

              setTimeout(()=>{
                $("#message").addClass("d-none");
                $("#lottie").removeClass("d-none");
                done();
              },1500);
            }
          }
        },{email:user.email});
          
      })
  }
  function loadProgressBar(element,value,callback)
  {
    if(bar == undefined)
    {
      bar = new ProgressBar.Circle(element, {
          color: '#00d97d',
          strokeWidth: 4,
          trailWidth: 1,
          easing: 'easeInOut',
          duration: 1350,
          text: {
            autoStyleContainer: false
          },
          from: { color: '#00d97d', width: 1 },
          to: { color: '#00d97d', width: 5 },
          // Set default step function for all animate calls
          step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
              circle.setText('');
            } else {
              circle.setText(value+"%");
            }

          }
      });

      bar.text.style.fontSize = '2rem';
    }
    bar.animate(value/100);  
  }

});

class Mailing extends Http {
  constructor()
  {
    super();
    this.sent = null;
    this.mails = null;
  }
  calculateProgress()
  {
    return (this.sent * 100) / this.getMails().length;
  }
  getMails(mails)
  {
    return this.mails;
  }
  setMails(mails)
  {
    this.mails = mails;
  }
  sendMail(callback,data){
    return this.call("../../app/application/send_mail.php",data,callback,null,0,'GET',true);
  }
  getMailsByCampaign(callback,data){
    return this.call("../../app/application/get_mails_by_campaign.php",data,callback);
  }
};