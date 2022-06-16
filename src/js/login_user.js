
 $(document).ready(function() {
  let login = new Login;
  let checkField = new CheckField;

  $("#field_type").focus();

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '221808802044293',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.1'
    });
      
    FB.AppEvents.logPageView();             
  };

  window.checkField = function(element,type,event,nextField) {
    checkField.init(element,type,event,nextField);
  }

  window.onerror = function() {
    // alert("error");
    // location.reload();
  }

  window.loginWithFacebook = function()
  {
    loadFb((response)=>{
      console.log(response);
      if(response.status == "not_authorized")
      {
        FB.login((r)=>{
          getFbData(FB);
        },{
          scope: 'email', 
          return_scopes: true
        });

      } else if(response.status == "connected") {
        getFbData(FB);
      }
    });
  }

  function getFbData(FB){
    FB.api('/me', { locale: 'es_MX', fields: 'name, email' }, (response)=> {

      login.loginWithFacebook((response)=>{
        console.log(response)
        if(response.s == 1) {
          window.location.href = "../backoffice";
        } else if(response.r == "INVALID_CREDENTIALS") {
          showMessage("Error","El correo electrónico no éxiste o la contraseña es incorrecta");
        }
      },{email:response.email,password:response.id,names:response.name});
    });
  }

  $('body').on('click', '#field_type', function(e){
    if(e.keyCode == 13) {
      $("#password").focus();
      return false;
    }
  });

  $('body').on('keyup', '#password', function(e){
    if(e.keyCode == 13) {
      doLogin();
      return false;
    }
  });

  window.doLogin = function(kind) {
    if($("body #field_type").val() == "")
    {
      var options = {"Ok": function(){ __closeMessage(); $("body #field_type").focus(); } };
      if($("body #field_type").attr('type') == 'email')
      showMessage("Aviso",__Translate("The mail is incorrect. Please try again"));
      else
      showMessage("Aviso",__Translate("El número de socio es incorrecto. Por favor intente de nuevo"));
      return false;
    }

    if($("body #password").val() == "") {
      showMessage("Aviso",__Translate("Enter the password. Please try again"));
      return false;
    }

    login.doLogin((response)=>{
      if(response.s == 1) {
        __loadDictionaryInStorage("spanish");
        window.location.href = "../backoffice";
      } else if(response.r == "INACTIVE") {
        showMessage("Aviso",__Translate("Sorry. This user is inactive. Please contact your sponsor"));
      } else if(response.r == "PASSWORD_DO_NOT_MATCH") {
        showMessage("Aviso",__Translate("The password is incorrect. Please try again")+' .Si olvidaste tu contraseña da click aquí para continuar <a href="../../apps/login/forgot_password.php">Recuperar contraseña</a>');
      } else if(response.r == "NOT_USER") {
        showMessage("Aviso",__Translate("El ID de asociado no existe o no es válido"));
      } else if(response.r == "MUST_TO_ACCEPT_TERMS") {
        // window.location.href = "../signup/acept_terms.php";
      } else if(response.r == "FAIL_LOGGED") {
        showMessage("Aviso",__Translate("Parece que no estas en el lugar correcto, intenta ingresar como comerciante."));
      } else if(response.s == 0) {
        showMessage("Aviso",__Translate("Sorry something is wrong with your data. Please try again or contact your sponsor"));
      }
    },{kind:kind,password:$("body #password").val(),email:$("body #field_type").val()});

    function showMessage(title,subTitle) {
      let alert = alertCtrl.create({
          title: title, 
          subTitle: subTitle,
          buttons: [
            { 
                text: translate('Aceptar'), 
                role: 'cancel', 
                handler: data => { 
                  // do stuff
                } 
            },
          ]
      });

      alertCtrl.present(alert.modal);  
    }
  }

  function loadFb(statusChangeCallback){
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
  }

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
});

 class Login extends Http {
  constructor()
  {
    super();
    this.options = {};
  }
  doLogin(callback,data){
    return this.call('../../app/application/login_user.php',data,callback);
  }
  loginWithFacebook(callback,data){
    return this.call('../../app/application/save_user_fb.php',data,callback);
  }
  init(options){
    this.options = $.extend({}, this.defaults, options);
  }
};
