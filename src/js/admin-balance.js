$(document).ready(function(){
  let balance = new Balance;

  getBalance($("#default-loader"));

  function getBalance(element)
  {
    dinamicLoader.show(element);
    
    balance.getBalance((response)=>{
      dinamicLoader.close();

      if(response.s == 1)
      {
        $("#response").html(response.html);

        runDataTable();
      }
    });
  }

  window.cancelBalance = function(balance_id)
  {
    let alert = alertCtrl.create({
        title: "Aviso",
        subTitle: "¿Estás seguro de cancelar éste movimiento?",
        buttons: [
          { 
              text: 'Sí, cancelar',
              role: 'cancel', 
              class: 'btn-primary',
              handler: data => {
                alert.modal.dismiss();

                balance.cancelBalance((response)=>{
                  if(response.s == 1)
                  {
                    getBalance();
                  }
                },{balance_id:balance_id});
              }              
          },
          { 
              text: 'Cancelar',
              role: 'cancel', 
              class: 'btn-light',
              handler: data => {
                alert.modal.dismiss();
              }              
          },
        ]
      });

    alertCtrl.present(alert.modal);
  }

  function runDataTable()
  {
    $('#table').DataTable({
      dom: 'Bfrtip',
      order: [
        [ 3, "desc" ]
      ],
      buttons: [
          'excel', 'pdf'
      ],
      "language": {
          "search": "Buscar:",
          "paginate": {
            "previous": "Anterior",
            "next": "Siguiente"
          },
          "lengthMenu": "Mostrando _MENU_ registros por página",
          "zeroRecords": "No encontramos información - lo sentimos",
          "info": "Mostrando página _PAGE_ de _PAGES_",
          "infoEmpty": "No hay registros disponibles",
          "infoFiltered": "(filtrado desde _MAX_ total de registros)"
      }
    });
  }

  window.addBalance = function(balance_id)
  {
    let alert = alertCtrl.create({
        title: "Ingresa la información",
        inputs : [
          {
            type: 'text',
            id: 'description',
            name: 'description',
            placeholder: 'Ingresa el movimiento aquí...',  
          },
          {
            type: 'number',
            id: 'ammout',
            name: 'ammout',
            placeholder: 'Ingresa el monto aquí...',
          },
          {
            type: 'radio',
            id: 'add',
            name: 'operation',
            value: '',  
            text: 'Entrada',  
          },
          {
            type: 'radio',
            id: 'rest',
            name: 'operation',
            value: '-',  
            text: 'Salida',  
          }
        ],
        buttons: [
          { 
              text: 'Dar de alta movimiento',
              role: 'cancel', 
              class: 'btn-primary',
              handler: data => {
                alert.modal.dismiss();

                balance.addBalance((response)=>{
                  if(response.s == 1)
                  {
                    getBalance();
                  }
                },{operation:data.operation,ammout:data.ammout,description:data.description});
              }              
          },
          { 
              text: 'Cancelar',
              role: 'cancel', 
              class: 'btn-light',
              handler: data => {
                alert.modal.dismiss();
              }              
          },
        ]
      });

    alertCtrl.present(alert.modal);
  }
});

class Balance extends Http {
  constructor()
  {
    super();
  }
  getBalance(callback,data){
    return this.call('../../app/application/get_balance.php',data,callback);
  }
  addBalance(callback,data){
    return this.call('../../app/application/add_balance.php',data,callback);
  }
  cancelBalance(callback,data){
    return this.call('../../app/application/cancel_balance.php',data,callback);
  }
};