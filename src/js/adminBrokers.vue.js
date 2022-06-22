import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
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
            
            this.brokers = this.users.filter((broker)=>{
                return broker.names.toLowerCase().includes(this.query.toLowerCase()) || broker.email.toLowerCase().includes(this.query.toLowerCase())
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
                    this.brokersAux = response.users.map((user)=>{
                        user['signup_date'] = new Date(user['signup_date']*1000).toLocaleDateString()
                        return user
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