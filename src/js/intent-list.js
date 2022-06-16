$(document).ready(function(){
  const intentList = new IntentList;

  dinamicLoader.show($(".response"));

  intentList.getAllIntentList((response)=>{
    dinamicLoader.close();

    if(response.s == 1)
    {
      $(".response").html(response.html);
    }
  },{sheet_per_proyect_id:getParam("sppid")});
});

class IntentList extends Http {
  constructor()
  {
    super();
  }
  getAllIntentList(callback,data){
    return this.call('../../app/application/get_all_intent_list.php',data,callback);
  }
};