import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            totals : {},
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
        }
    },
    methods: {
        filterData : function() {
            this.brokers = this.brokersAux
            
            this.brokers = this.brokersAux.filter((broker)=>{
                return broker.name.toLowerCase().includes(this.query.toLowerCase())
            })
        },
        deleteUser : function(company_id) {
            this.UserSupport.deleteUser({company_id:company_id},(response)=>{
                if(response.s == 1)
                {
                    this.getBrokers()
                }
            })
        },
        goToActivatePlan : function(company_id) {
            window.location.href = '../../apps/admin-users/activate?ulid='+company_id
        },
        goToEdit : function(company_id) {
            window.location.href = '../../apps/admin-users/edit?ulid='+company_id
        },
        getBrokers : function() {
            this.UserSupport.getBrokers({},(response)=>{
                if(response.s == 1)
                {
                    this.totals = response.data.totals
                    this.brokersAux = response.data.brokers.map((broker)=>{
                        broker['create_date'] = new Date(broker['create_date']*1000).toLocaleDateString()
                        broker['capital'] = number_format(broker['capital'],2)
                        broker['gain'] = number_format(broker['gain'],2)
                        broker['real_gain'] = number_format(broker['real_gain'],2)
                        broker['new_capital'] = number_format(broker['new_capital'],2)
                        return broker
                    })

                    this.brokers = this.brokersAux
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