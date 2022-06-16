$(document).ready(function(){
  let playerStats = new PlayerStats;

  window.checkProjection = function(element,catalog_player_id) {
    $(element).html("Analizando estadísticas...");
    playerStats.checkProjection((response)=>{
      if(response.s == 1)
      {
        $(element).parent().html(response.html);
      }
    },{catalog_player_id:catalog_player_id});
  }
});

class PlayerStats extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  checkProjection(callback,data){
    return this.call('../../app/application/check_projection.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};