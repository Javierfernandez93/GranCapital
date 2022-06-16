$(document).ready(function(){
  let users = new Users;
  let TIME_OUT = 800;

  getUsers();

  $("#names").keyup(delay(function (e) {
    getUsers($("#names").val());
  }, TIME_OUT));

  function getUsers(names) {
    users.getUsers((response)=>{
      if(response.s == 1)
      {
        $(".box-content").html(response.html);
      }
    },{names:names});
  }

  window.getUsers = function(names) {
    getUsers(names);
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
});

class Users extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  getUsers(callback,data){
    return this.call('../../app/application/get_users.php',data,callback,false);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};