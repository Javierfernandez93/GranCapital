$(document).ready(function() {
	loadBalance();
	loadUsersOnMyCommerce();

	let alert = alertCtrl.create({
        title: "Clientes autorizados", 
        subTitle: '<p>Autoriza a tus clientes para empezar a utilizar su aplicación en tu negocio</p>',
        inputs: [
	        {
	          type: 'text',
	          name: 'name',
	          placeholder: 'Nombre o correo electrónico'
	        },
      	],
        buttons: [
        	{ 
            	text: translate('Aceptar'), 
            	handler: data => { 
            		Welcome.searchUser((response)=>{
						if(response.s == 1)
						{

						}
					},{name:data.name,web:true});
            	} 
        	},
        	{ 
            	text: "Cancelar", 
            	role: 'cancel', 
            	handler: data => { 

            	} 
        	},
        ]
    });

    alert.addInput({
        type: 'radio',
        label: 'a',
        value: 'b'
    });

    alertCtrl.present(alert.modal);

	$(".searchUser").click((r)=>{

		Welcome.modal({
	        title: "Clientes autorizados", 
	        subTitle: '<p>Autoriza a tus clientes para empezar a utilizar su aplicación en tu negocio</p>',
	        inputs: [
		        {
		          type: 'text',
		          name: 'name',
		          placeholder: 'Nombre o correo electrónico'
		        },
	      	],
	        buttons: [
	        	{ 
	            	text: translate('Aceptar'), 
	            	handler: data => { 
	            		Welcome.searchUser((response)=>{
							if(response.s == 1)
							{

							}
						},{name:data.name,web:true});
	            	} 
	        	},
	        	{ 
	            	text: "Cancelar", 
	            	role: 'cancel', 
	            	handler: data => { 

	            	} 
	        	},
	        ]
	    });
	});

	$('.selectWaiter').click((r)=>{
		$('#selectBoardModal').modal('hide');

		Welcome.getAllWaiters((response)=>{
			$('#selectWaiterModal').modal('show');
			if(response.s == 1)
			{
				$("#selectModalWaiterHtml").html(response.html)
			}
		},{web:true});
	});

	$('.selectBoard').click((r)=>{
		$('#selectModal').modal('hide');
		$('#selectBoardModal').modal('show');
	});

	$('.setUserInAboard').click((r)=>{
		Welcome.setUserInBoard((response)=>{
			$('#selectWaiterModal').modal('hide');
			if(response.s == 1)
			{
				$("#selectModalHtml").html(response.html);
				$("#selectModal").modal('show');
			} else if(response.r == "ORDER_ALREADY_ACTIVE") {
				Welcome.showMessage('Ops!','Esté usuario ya está en una mesa, pide que cierre su cuenta para poder crear una nueva orden.');
			}
		},{to:$('body input[name=to]:checked').val(),waiter:1,board:1});
	});

	$('.loadUsersOnMyCommerce').click((r)=>{
		Welcome.searchUser((response)=>{
			$('#myModal').modal('hide');
			if(response.s == 1)
			{
				$("#selectModalHtml").html(response.html);
				$("#selectModal").modal('show');
			}
		},{name:$("#name").val(),web:true});

		// Welcome.getUsersAroundForFood((response)=>{
		// 	if(response.s == 1)
		// 	{
		// 		console.log(response)
		// 	}
		// });
	});

	setInterval(function(){ 
		loadBalance();
		loadUsersOnMyCommerce();
	}, 5000); 
});

function loadUsersOnMyCommerce(){
	Welcome.getUsersOnMyCommerce((response)=>{
		if(response.s == 1)
		{
			$("#users_active").html(response.users_active);
			$("#users_done").html(response.users_done);
			$("#users_pending").html(response.users_pending);
			$("#users_petition").html(response.users_petition);
		}
	});
}
function loadBalance(){
	Welcome.getBalance((response)=>{
		if(response.s == 1)
		{
			$("#partial_balance").html('$'+response.partial_balance);
			$("#full_balance").html('$'+response.full_balance);
			$("#partial_sales").html(response.partial_sales);
			$("#full_sales").html(response.full_sales);
		}
	});
}
