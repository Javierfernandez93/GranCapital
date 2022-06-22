import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            totals : {},
            day : null,
            brokers : {},
            brokersAux : {},
            query : null,
        }
    },
    watch : {
        query : 
        {
            handler() {
                this.filterData()
            },
            deep : true
        },
        brokers : 
        {
            handler() {
                this.calculateData()
            },
            deep : true
        }
    },
    methods: {
        filterData : function() {
            this.brokers = this.brokersAux
            
            this.brokers = this.brokersAux.filter((broker)=>{
                return broker.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        inactiveBroker : function(broker_id) {
            this.UserSupport.inactiveBroker({broker_id:broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.getBrokers()
                }
            })
        },
        activeBroker : function(broker_id) {
            this.UserSupport.activeBroker({broker_id:broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.getBrokers()
                }
            })
        },
        deleteBroker : function(broker_id) {
            this.UserSupport.deleteBroker({broker_id:broker_id},(response)=>{
                if(response.s == 1)
                {
                    this.getBrokers()
                }
            })
        },
        addGainPerBroker : function(broker) {

            this.UserSupport.addGainPerBroker({gain:broker.gain,broker_id:broker.broker_id},(response) => {
                if(response.s == 1)
                {
                    
                }
            })

            this.toggleEditing(broker);
        },
        toggleEditing : function(broker) {
            broker['editing'] = broker['editing'] != undefined ? !broker['editing'] : true
        },
        goToActivatePlan : function(company_id) {
            window.location.href = '../../apps/admin-users/activate?ulid='+company_id
        },
        resetTotals : function() {
            Object.assign(this.totals, {
                fee: 0,
                gain: 0,
                new_capital: 0,
                percentaje_gain: 0,
                portfolio: 0,
                real_gain: 0
            })
        },
        calculateData : function() {
            this.calculateVars()
            this.calculateTotals()
        },
        calculateVars : function() {
            this.brokers.map((broker) => {
                // getting gain witout fee
                broker['real_gain'] = broker['fee'] == 0 ? broker['gain'] : broker['fee'] * broker['gain']

                // getting gain percentaje
                broker['percentaje_gain'] = (broker['real_gain'] / broker['capital']) * 100

                // new capital
                broker['new_capital'] = broker['capital'] + broker['real_gain']
            })
        },
        addCapital : function(broker) {
            const alert = alertCtrl.create({
                title: `añade el monto para ${broker.name}`,
                subTitle: "monto a invertir",
                inputs : [
                  {
                    type: 'number',
                    placeholder: '$0',
                    name: 'capital',
                    id:'capital'
                  }  
                ],
                buttons: [
                    { 
                        text: 'Aceptar',
                        handler: data => {
                            this.UserSupport.addCapitalToBroker({capital:data.capital,broker_id:broker.broker_id},(response) => {
                                if(response.s == 1)
                                {
                                    this.getBrokers()
                                }
                            })
                        }              
                    },
                    {
                        text: 'Cancelar',
                        role: 'cancel', 
                        handler: data => {
                        }
                    },  
                ]
            });
          
            alertCtrl.present(alert.modal);
        },
        calculateTotals : function() {
            this.resetTotals()
            this.brokers.map((broker) => {
                this.totals['portfolio'] += parseFloat(broker['portfolio']);
                this.totals['gain'] += broker['gain'] ? parseFloat(broker['gain']) : 0;
                this.totals['fee'] += parseFloat(broker['fee']);
                this.totals['real_gain'] += parseFloat(broker['real_gain']);
                this.totals['percentaje_gain'] += parseFloat(broker['percentaje_gain']);
                this.totals['new_capital'] += parseFloat(broker['new_capital']);
            })
        },
        viewCapitals : function(broker_id) {
            window.location.href = '../../apps/admin-brokers/capitals?bid='+broker_id
        },
        goToEdit : function(broker_id) {
            window.location.href = '../../apps/admin-brokers/edit?bid='+broker_id
        },
        getBrokers : function() {
            this.UserSupport.getBrokers({},(response)=>{
                if(response.s == 1)
                {
                    this.day = response.day
                    this.totals.capital = response.data.totals.capital
                    this.brokersAux = response.data.brokers
                    this.brokers = this.brokersAux

                    this.calculateData()
                }
            })
        },
    },
    mounted() 
    {
        this.UserSupport = new UserSupport
        this.getBrokers()
    },
}).mount('#app')