$(document).ready(function(){
	let team = new Team;

	dinamicLoader.showLoader($(".response"));

  if(getParam("pid"))
  {
    getProyectMembers();
  }

  window.getProyectMembers = function()
  {
    getProyectMembers();
  }

  function getProyectMembers()
  {
    dinamicLoader.showLoader($(".response"));

    team.getProyectMembers((response)=>{
      dinamicLoader.hide();

      if(response.s == 1)
      {
        $(".response").html(response.html);
      }
    },{proyect_id:getParam("pid")});
  }

  $("#search-member").keyup(delay((e)=>{
    dinamicLoader.show($("#loader-list"));

    $(".search-list").addClass("d-none").html("");

    team.searchMember((response)=>{
      
      dinamicLoader.hide();

      if(response.s == 1)
      { 
        $(".search-list").removeClass("d-none");
        response.users.forEach((user,key)=>{
          let div = $("<div/>").addClass("list-group-item list-group-item-action d-flex justify-content-between align-items-center");
          let div_left = $("<div/>").addClass("d-flex align-items-center w-100");
          let a = $("<a/>").addClass("avatar avatar-sm mr-3");
          let img = $("<img/>").addClass("avatar-img rounded-circle").attr("src",user.image).attr("alt",user.names);
          let div_inner = $("<div/>").addClass("h2 m-0").text(user.names);
          let button = $("<button/>").addClass("btn btn-success").text(translate("Añadir al proyecto")).click(()=>{
            dinamicLoader.show(button);
            

            team.addUserToProyect((response)=>{
              $(".search-list").addClass("d-none").html("");
              dinamicLoader.hide();

              if(response.s == 1)
              {
                getProyectMembers();
              }
            },{user_login_id:user.user_login_id,proyect_id:getParam("pid")});
          });
          a.append(img);
          div_left.append(a,div_inner);
          div.append(div_left,button);

          $(".search-list").append(div);
        })
      }
    },{name:$("#search-member").val()});
  }, 500));

  window.inactiveUserFromTeam = function(element,team_id)
  {
    dinamicLoader.show(element);

    team.inactiveUserFromTeam((response)=>{
      dinamicLoader.hide(element);

      if(response.s == 1)
      {
          $("[data-tid='"+team_id+"']").addClass("opacity-3");
      }
    },{team_id:team_id});
  }  

  window.activeUserFromTeam = function(element,team_id)
  {
    dinamicLoader.show(element);

    team.activeUserFromTeam((response)=>{
      dinamicLoader.hide(element);

      if(response.s == 1)
      {
          $("[data-tid='"+team_id+"']").removeClass("opacity-3");
      }
    },{team_id:team_id});
  }

  window.deleteUserFromTeam = function(event,team_id)
  {
    team.deleteUserFromTeam((response)=>{
      if(response.s == 1)
      {

      }
    });
  }

  window.deleteUserFromProyect = function(event,user_per_proyect_id)
  {
    team.deleteUserFromProyect((response)=>{
      if(response.s == 1)
      {
        getProyectMembers(); 
      }
    },{user_per_proyect_id:user_per_proyect_id});
  } 

  window.inactiveUserFromProyect = function(event,user_per_proyect_id)
  {
    team.inactiveUserFromProyect((response)=>{
      if(response.s == 1)
      {
        getProyectMembers(); 
      }
    },{user_per_proyect_id:user_per_proyect_id});
  }

  window.activeUserFromProyect = function(event,user_per_proyect_id)
  {
    team.activeUserFromProyect((response)=>{
      if(response.s == 1)
      {
        getProyectMembers(); 
      }
    },{user_per_proyect_id:user_per_proyect_id});
  }
});

class Team extends Http {
  constructor()
  {
    super();
  }
  deleteUserFromTeam(callback,data){
    return this.call("../../app/application/delete_user_from_team.php",data,callback);
  } 
  deleteUserFromProyect(callback,data){
    return this.call("../../app/application/delete_user_from_proyect.php",data,callback);
  } 
  inactiveUserFromTeam(callback,data){
    return this.call("../../app/application/inactive_user_from_team.php",data,callback);
  }
  inactiveUserFromProyect(callback,data){
    return this.call("../../app/application/inactive_user_from_proyect.php",data,callback);
  }
  searchMember(callback,data){
    return this.call("../../app/application/search_member.php",data,callback);
  }
  activeUserFromTeam(callback,data){
    return this.call("../../app/application/active_user_from_team.php",data,callback);
  }
  activeUserFromProyect(callback,data){
    return this.call("../../app/application/active_user_from_proyect.php",data,callback);
  }
  addUserToProyect(callback,data){
    return this.call("../../app/application/add_user_to_proyect.php",data,callback);
  }
  getProyectMembers(callback,data){
    return this.call("../../app/application/get_proyect_members.php",data,callback);
  }
};