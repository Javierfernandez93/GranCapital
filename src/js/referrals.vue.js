import { User } from './user.module.js'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            referrals: {},
            User : null
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
        getReferrals : function() {
            this.User.getReferrals({},(response)=>{
                if(response.s == 1)
                {
                    this.referrals = response.referrals.map((referral)=>{
                        referral.signup_date = new Date(referral.signup_date*1000).toLocaleDateString()
                        return referral
                    })
                }
            })
        }
    },
    mounted() 
    {
        console.log(1)
        this.User = new User

        this.getReferrals()
    },
}).mount('#app')