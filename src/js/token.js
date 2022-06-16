$(document).ready(function(){
    let token = new Token();

    window.init = function () {
        token.init((response)=>{
            if(response.s == 1) {
                $(".box-loader").html(response.html);
            }
        },{"nombre":"javier"});
    }

    window.getToken = function () {
        token.getToken((response)=>{
            if(response.s == 1) {
                $(".box-loader").html(response.html);
            }
        },{"variable":$("#variable").val()});
    }

    window.checkToken = function (element) {
        $(element).html("checando ENCRIPTACION");
        token.checkToken((response)=>{
            if(response.s == 1) {
                $(element).html("ENCRIPTACION VALIDO");
            } else if(response.r == "INVALID_ENCRYPTATION") {
                $(element).html("ENCRIPTACION NO VALIDO");
            }
        },{"token":$("#token").val(),"key":$("#key").val()});
    }
});

class Token extends Http {
    constructor() {
        super();
    }
    init(callback,data) {
        this.call("../../app/application/init.php",data,callback,false);
    }
    getToken(callback,data) {
        this.call("../../app/application/get_token.php",data,callback,false);
    }
    checkToken(callback,data) {
        this.call("../../app/application/check_token.php",data,callback,false);
    }
}
