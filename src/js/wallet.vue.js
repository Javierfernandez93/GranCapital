import { User } from '../../src/js/user.module.js'

Vue.createApp({
    components: {

    },
    data() {
        return {
            User: null,
            withdrawComplete: false,
            user: {
                names: null,
            },
            withdraw_methods: {},
            withdraws: {},
            balance: 0,
            withdraw: {
                withdraw_method_id: null,
                ammount: null,
            }
        }
    },
    watch: {
        withdraw: {
            handler() {
                this.withdrawComplete = this.withdraw.withdraw_method_id != null && (this.withdraw.ammount > 0 && this.withdraw.ammount <= this.balance)
            },
            deep: true,
        },
        user: {
            handler() {

            },
            deep: true
        },
    },
    methods: {
        doWithdraw: function () {
            this.User.doWithdraw(this.withdraw, (response) => {
                if (response.s == 1) {
                    this.getBalance().then(() => { 
                        this.getWithdraws()
                    })
                }
            })
        },
        getWithdraws: function () {
            this.User.getWithdraws({}, (response) => {
                if (response.s == 1) {
                    this.withdraws = response.withdraws
                }
            })
        },
        getProfile: function () {
            this.User.getProfile({ include_witdraw_methods: true }, (response) => {
                if (response.s == 1) {
                    Object.assign(this.user, response.user)
                    this.withdraw_methods = response.withdraw_methods
                }
            })
        },
        getBalance: function () {
            return new Promise((resolve) => {
                this.User.getBalance({}, (response) => {
                    if (response.s == 1) {
                        this.balance = response.balance
                    }

                    resolve()
                })
            })
        },
    },
    mounted() {
        this.User = new User

        this.getBalance().then(() => {
            this.getProfile()
            this.getWithdraws()
        })
    },
}).mount('#app')