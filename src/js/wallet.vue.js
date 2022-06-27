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
            all_withdraw_methods: {},
            withdraw_methods: {},
            withdraws: {},
            balance: 0,
            withdraw: {
                catalog_withdraw_method_id: 0,
                ammount: null,
            }
        }
    },
    watch: {
        withdraw: {
            handler() {
                this.withdrawComplete = this.withdraw.catalog_withdraw_method_id != null && (this.withdraw.ammount > 0 && this.withdraw.ammount <= this.balance)
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
        editWithdrawMethod: function (all_withdraw_method) {
            this.User.editWithdrawMethod(all_withdraw_method, (response) => {
                if (response.s == 1) {
                    this.toggleEditing(all_withdraw_method)
                    
                    this.getBalance().then(() => {
                        this.getProfile()
                        this.getWithdraws()
                    })
                }
            })
        },
        toggleEditing: function (all_withdraw_method) {
            all_withdraw_method.editing = !all_withdraw_method.editing
        },
        getProfile: function () {
            this.User.getProfile({ include_witdraw_methods: true }, (response) => {
                if (response.s == 1) {
                    Object.assign(this.user, response.user)
                    this.all_withdraw_methods = response.withdraw_methods
                    this.withdraw_methods = this.all_withdraw_methods.filter((withdraw_method) => {
                        return withdraw_method.account
                    })
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