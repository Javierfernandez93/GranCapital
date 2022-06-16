$(document).ready(function() {
    let signature = new Singature;
    let canvas = null;
    let signaturePad = null;

    // getSignatureForm();
    
    window.getSignatureForm = function()
    {
        getSignatureForm();
    }
    
    function getSignatureForm()
    {
        $(".overlay").removeClass("d-none");
        signature.getSignatureForm((response) => {
            if(response.s == 1)
            {
                $("#response-signature").html(response.html);

                initSignaturePad();
            }
        },{user_login_id:getParam('user_login_id')});
    }

    function initSignaturePad()
    {
        canvas = document.querySelector("canvas");
        
        signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)'
        }); 
    
        function resizeCanvas() {
            var ratio =  Math.max(window.devicePixelRatio || 1, 1);

            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            // signaturePad.clear();
        }

        window.onresize = resizeCanvas;

        resizeCanvas();

        window.clearSignature = function()
        {
            signaturePad.clear();
        }

        window.undoSignature = function()
        {
            var data = signaturePad.toData();

            if (data) {
                data.pop(); // remove the last dot or line
                signaturePad.fromData(data);
            }
        }

        window.saveSignature = function()
        {
            if (signaturePad.isEmpty() == false) 
            {
                signature.saveSignature((response)=>{
                    if(response.s == 1)
                    {
                        
                    }
                },{singature:signaturePad.toDataURL()});
            }
        }
    }
});

class Singature extends Http
{
	constructor()
	{
		super();
	}
	getSignatureForm(callback,data){
    	return this.call('../../app/application/get_signature_form.php',data,callback,false);
    }
	saveSignature(callback,data){
    	return this.call('../../app/application/save_signature.php',data,callback,false,null,POST);
    }
}