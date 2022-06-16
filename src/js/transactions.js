$(document).ready(function(){
  let transactions = new Transactions;
  let TIME_OUT = 800;

  function searchByHash(transaction){    

    $(".box-ewallet-transaction").removeClass("d-none");

    if(transaction)
    {
      console.log("entró")
      $(".box-ewallet-transaction-container").find('.box-ewallet-transaction').filter(function(index, div) { 
          return !$(div).find(".box-hash").text().toLowerCase().includes(transaction.toLowerCase());
        }).addClass("d-none");
    }
  }

  window.startKeyUpFunctions = function(element)
  {
    let transaction = $(element).val();
    delay();
    searchByHash(transaction);
  }

  function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  
  transactions.getTransactions((response)=>{
    if(response.s == 1)
    {
      $(".box-container").html(response.html);
    }
  });
});

class Transactions extends Http {
  constructor()
  {
    super();
  }
  getTransactions(callback,data){
    return this.call('../../app/application/get_transactions.php',data,callback);
  }
};