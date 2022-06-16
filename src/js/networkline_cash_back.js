$(document).ready(function(){

     $('.marquee').marquee({
        //speed in milliseconds of the marquee
        duration: 15000,
        //gap in pixels between the tickers
        gap: 50,
        //time in milliseconds before the marquee will start animating
        delayBeforeStart: 0,
        //'left' or 'right'
        direction: 'left',
        //true or false - should the marquee be duplicated to show an effect of continues flow
        duplicated: true
    });

	let NetworkLine = new networkline;
	window.getnetworks=function(page=1){
		param=$("#menu1").val()		
			
		if(param==0){
			alertmesage("Seleccione que Línea deseas visualizar");
		}else{

			Loader.showLoader();
			NetworkLine.getnetwork((response)=>{
		  			if(response.s=="1"){
		  				Loader.closeLoader();
			 			document.getElementById("network").innerHTML = response.html;	
			 		}
		 		},{number:param,page:page}			
		 	);
		
		}
			
	}	

	window.getpositions=function(param=1,page=1){
				
		Loader.showLoader();
		NetworkLine.getpositions((response)=>{
	  			if(response.s=="1"){
	  				Loader.closeLoader();
		 			document.getElementById("network").innerHTML = response.html;	
		 		}
	 		},{number:param,page:page}			
	 	);			
	}	

	window.choiceGoNextNetwork=function(commision_id=false,network=false){
		if(commision_id){			
            let alert = alertCtrl.create({
              title: "IMPORTANTE",
              subTitle: "¿Estás seguro de tomar una posición en la Red <h2 class='text-center'> "+network+"</h2> esta acción no se puedecambiar.",
              buttons: [
                    {
                        text:"NO",
                        role:'cancel',
                        handler: data => {}, 
                    },             
                    { 
                        text: "SI",
                        role: 'cancel', 
                        handler: data => {
                            Loader.showLoader();
                            NetworkLine.choiceGoNextNetwork((response)=>{

                                    Loader.closeLoader();
                                    alertmesage(response.m);
                                    setTimeout('document.location.reload()',1500);

                                },{commision_id:commision_id}
                            );
                        }, 
                    },
              ]
            });
            alertCtrl.present(alert.modal);
		}else
			alertmesage("No cuentas con comisión para cambiar");
	}


	window.choiceDeposit=function(commision_id=false,ammount=false){
		if(commision_id){			
            let alert = alertCtrl.create({
              title: "IMPORTANTE",
              subTitle: "¿Estás seguro de cambiar tu comisioń por un depósito de <h2> $"+ammount+" MXN </h2> esta acción no se puedecambiar.",
              buttons: [
                    {
                        text:"NO",
                        role:'cancel',
                        handler: data => {}, 
                    },             
                    { 
                        text: "SI",
                        role: 'cancel', 
                        handler: data => {
                            Loader.showLoader();
                            NetworkLine.choiceDeposit((response)=>{

                                    Loader.closeLoader();
                                    alertmesage(response.m);
                                    setTimeout('document.location.reload()',1500);

                                },{commision_id:commision_id}
                            );
                        }, 
                    },
              ]
            });
            alertCtrl.present(alert.modal);
		}else
			alertmesage("No cuentas con comisión para cambiar");
	}

});


class networkline extends Http{
    getnetwork(callback,data){
        return this.call("../../apps/cash_back/subcore/application/get_network.php",data,callback,false);
    }
    getpositions(callback,data){
        return this.call("../../apps/cash_back/subcore/application/get_positions.php",data,callback,false);
    }
    choiceDeposit(callback,data){
        return this.call("../../apps/cash_back/subcore/application/choice_deposit_by_commission.php",data,callback,false);
    }
    choiceGoNextNetwork(callback,data){
        return this.call("../../apps/cash_back/subcore/application/choice_go_next_network_by_commission.php",data,callback,false);
    }
}