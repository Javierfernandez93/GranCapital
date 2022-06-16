$(document).ready(function(){
  let market = new Market;
  let TIME_OUT = 1000;

  $("body").tooltip({ selector:'[data-toggle=tooltip]'});

  dinamicLoader.show($(".response"));
  
  getMarket();

  window.pauseMarket = function(element,store_per_user_id)
  {
    dinamicLoader.show(element);

    market.pauseMarket((response)=>{

      dinamicLoader.close();

      if(response.s == 1)
      {
        location.reload();
      }
    },{store_per_user_id:store_per_user_id});
  }

  window.publicateMarket = function(element,store_per_user_id)
  {
    dinamicLoader.show(element);

    market.publicateMarket((response)=>{

      dinamicLoader.close();

      if(response.s == 1)
      {
        location.reload();
      }
    },{store_per_user_id:store_per_user_id});
  }

  window.deleteMarket = function(element,store_per_user_id)
  {
    dinamicLoader.show(element);

    singleDisccuss(()=>{
      market.deleteMarket((response)=>{
        dinamicLoader.close();

        if(response.s == 1)
        {
          location.reload();
        }
      },{store_per_user_id:store_per_user_id});
    },()=>{
      dinamicLoader.close();
    });    
  }
  
  window.getMethodsToShareStore = function(element)
  {
    _showLeftAlertWS('getMethodsToShareStore',null,{proyect_id:getParam("pid")},element,'preloader-sm-black')
  }

  function getMarket() {
    market.getMarket((response)=>{
      if(response.s == 1)
      {
        $(".response").html(response.html);

        market.setName($("#name").val());

        addKeyUpEventListener();
      }
    },{proyect_id:getParam("pid")});
  }

  function addKeyUpEventListener()
  {
    $("#name").keyup(delay((e)=>{
      if($("#name").val() != market.getName())
      {
        market.changeMarketName((response)=>{
          if(response.s == 1)
          {
            // @TODO
          }
        },{name:$("#name").val(),store_per_user_id:$("#name").data('store_per_user_id')});
      }
    }, 500));
  }

  window.focusStoreName = function(element)
  {
    let val = $("#name").val();
    $("#name").focus().val("").val(val);
  }
});

class Market extends Http {
  constructor()
  {
    super();
    this.name = null;
  }
  setName(name)
  {
    this.name = name;
  }
  getName()
  {
    return this.name;
  }
  getMarket(callback,data){
    return this.call('../../app/application/get_market.php',data,callback,false);
  }
  pauseMarket(callback,data){
    return this.call('../../app/application/pause_market.php',data,callback,false);
  } 
  publicateMarket(callback,data){
    return this.call('../../app/application/publicate_market.php',data,callback,false);
  }
  deleteMarket(callback,data){
    return this.call('../../app/application/delete_market.php',data,callback,false);
  }
  changeMarketName(callback,data){
    return this.call('../../app/application/change_market_name.php',data,callback,false);
  }
};