$(document).ready(function(){
  let qrreceiver = new QrReceiver;
  
  window.generateQr = function(element)
  {
    $(element).text("Espere...").attr("disabled",true);

    qrreceiver.generateQr((response)=>{
      $(element).text("Listo").removeAttr("disabled");

      if(response.s == 1)
      {
        $(".box-response").html(response.html);
      }
    },{amount: $("#amount").val(),observation: $("#observation").val()});
  }

  qrreceiver.getQrTransaction((response)=>{
    if(response.s == 1)
    {
      $(".box-response").html(response.html);
    }
  });
});

class QrReceiver extends Http {
  constructor()
  {
    super();
    this.ADDRESS_LENGHT = 25;
    this.balance = 0;
    this.address = false;
  }
  getQrTransaction(callback,data){
    return this.call('../../app/application/get_qr_transaction.php',data,callback);
  }
  generateQr(callback,data){
    return this.call('../../app/application/generate_qr.php',data,callback);
  }
};