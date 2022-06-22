import { User } from '../../src/js/user.module.js'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            User : null,
            plans : {},
        }
    },
    watch : {
    },
    methods: {
        getPlans : function() {
            this.User.getPlans({},(response)=>{
                if(response.s == 1)
                {
                    Object.assign(this.plans, response.plans)
                }
            })
        },
    },
    mounted() 
    {
        this.User = new User
        
        this.getPlans()
    },
}).mount('#app')