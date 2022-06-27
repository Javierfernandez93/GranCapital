import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components: {
    },
    data() {
        return {
            UserSupport: null,
            user: {
                user_login_id: null,
                signup_date: 0,
                email: null,
                image: null,
                names: null,
                phone: null,
                country_id: 159, // México country is loaded by default 
                ammount: 0,
                catalog_plan_id: 0
            },
            selectedPlan: {
                name: 0
            },
            plans: {},
        }
    },
    watch: {
        user: {
            handler() {
                this.getPlan(this.user.ammount)
            },
            deep: true
        }
    },
    methods: {
        getPlan: function (ammount) {
            this.selectedPlan = {
                name: 0
            }
            
            if(ammount >= parseFloat(this.plans[0].name))
            {
                for (let i = 0; i < this.plans.length; i++) {
                    const nextVal = this.plans[i + 1] != undefined ? parseFloat(this.plans[i + 1].name) : Infinity
    
                    if (ammount >= parseFloat(this.plans[i].name) && ammount < nextVal) {
                        this.selectedPlan = this.plans[i]
                    }
                }
            } else {
                this.selectedPlan = this.plans[0]
            }

        },
        updatePlan: function () {
            this.UserSupport.updatePlan({ user_login_id: this.user.user_login_id, catalog_plan_id: this.selectedPlan.catalog_plan_id, additional_profit: this.user.additional_profit, ammount: this.user.ammount, sponsor_profit: this.user.sponsor_profit }, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = 'Actualizado con éxito'
                }
            })
        },
        getUserProfile: function (user_login_id) {
            this.UserSupport.getUserProfile({ user_login_id: user_login_id }, (response) => {
                if (response.s == 1) {
                    response.user.user_plan = {
                        catalog_plan_id: response.user.catalog_plan_id
                    }

                    Object.assign(this.user, response.user)
                }
            })
        },
        getPlans: function () {
            return new Promise((resolve) => {
                this.UserSupport.getPlans({}, (response) => {
                    if (response.s == 1) {
                        this.plans = response.plans
                    }

                    resolve()
                })
            })
        },
    },
    mounted() {
        this.UserSupport = new UserSupport

        if (getParam('ulid')) {
            this.getPlans().then(() => {
                this.getUserProfile(getParam('ulid'))
            })
        }
    },
}).mount('#app')