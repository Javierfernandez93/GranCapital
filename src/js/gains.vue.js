import { User } from '../../src/js/user.module.js'

/* vue */
import { ProfitViewer } from '../../src/js/profitViewer.vue.js'

Vue.createApp({
    components : { 
        ProfitViewer
    },
    data() {
        return {
            User : null,
            gains : {
                total : 0,
                profits : {}
            },
        }
    },
    watch : {
        user : {
            handler() {
                
            },
            deep: true
        },
    },
    methods: {
        getProfits : function() {
            this.User.getProfits({},(response)=>{
                if(response.s == 1)
                {
                    this.gains.profits = response.profits.map((profit)=>{
                        profit['create_date'] = new Date(profit['create_date']*1000).toLocaleDateString()
                        return profit
                    })
                    
                    this.gains.total = this.gains.profits.reduce((a, b) => a + b['profit'], 0);
                }
            })
        },
    },
    mounted() 
    {
        this.User = new User
        this.getProfits()
    },
}).mount('#app')