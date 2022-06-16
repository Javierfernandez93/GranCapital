$(document).ready(function(){
  let search = new Search;
  
  if(getParam("txid"))
  {
    searchTXID($("#search"));
  }

  window.searchTXID = function(element)
  {
    searchTXID(element);
  }
  
  function searchTXID(element)
  {
    search.searchTXID((response)=>{
      if(response.s == 1)
      {
        $(".box-response").html(response.html);
      }
    },{txid: $("#search").val()});
  }
});

class Search extends Http {
  constructor()
  {
    super();
  }
  searchTXID(callback,data){
    return this.call('../../app/application/search_txid.php',data,callback);
  }
};