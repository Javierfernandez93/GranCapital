import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            user : {
                user_login_id : null,
                signup_date : null,
                email : null,
                image : null,
                names : null,
                phone : null,
                country_id : 159, // México country is loaded by default 
                catalog_plan_id : 0
            },
            selectedPlan: {},
            plans : {},
        }
    },
    watch : {
        user: {
            handler() {
                this.getPlan(this.user.catalog_plan_id)
            },
            deep : true
        }
    },
    methods: {
        getPlan : function(catalog_plan_id) {
            this.selectedPlan = this.plans.filter((plan)=>{
                return plan.catalog_plan_id == catalog_plan_id
            })[0]

            console.log(this.selectedPlan)
        },
        updatePlan : function() {
            this.UserSupport.updatePlan({user_login_id:this.user.user_login_id,catalog_plan_id:this.selectedPlan.catalog_plan_id,additional_profit:this.user.additional_profit},(response)=>{
                if(response.s == 1)
                {
                    this.$refs.button.innerText = 'Actualizado con éxito'
                }
            })
        },
        getUserProfile : function(user_login_id) {
            this.UserSupport.getUserProfile({user_login_id:user_login_id},(response)=>{
                if(response.s == 1)
                {
                    response.user.user_plan = {
                        catalog_plan_id: response.user.catalog_plan_id
                    }

                    Object.assign(this.user,response.user)
                }
            })
        },
        getPlans : function() {
            return new Promise((resolve)=> {
                this.UserSupport.getPlans({},(response)=>{
                    if(response.s == 1)
                    {
                        this.plans = response.plans
                    }

                    resolve()
                })
            })
        },
    },
    mounted() 
    {
        this.UserSupport = new UserSupport

        if(getParam('ulid'))
        {
            this.getPlans().then(()=>{
                this.getUserProfile(getParam('ulid'))
            })
        }
    },
}).mount('#app')