import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components: {
    },
    data() {
        return {
            UserSupport: null,
            users: {},
            usersAux: {},
            query: null,
            columns: { // 0 DESC , 1 ASC 
                company_id: {
                    name: 'company_id',
                    desc: false,
                },
                signup_date: {
                    name: 'signup_date',
                    desc: false,
                },
                names: {
                    name: 'names',
                    desc: false,
                    alphabetically: true,
                },
                plan_name: {
                    name: 'plan_name',
                    desc: false,
                },
                ammount: {
                    name: 'ammount',
                    desc: false,
                },
            }
        }
    },
    watch: {
        query:
        {
            handler() {
                this.filterData()
            },
            deep: true
        }
    },
    methods: {
        sortData: function (column) {
            this.users.sort((a, b) => {
                const _a = column.desc ? a : b
                const _b = column.desc ? b : a

                if (column.alphabetically) {
                    return _a[column.name].localeCompare(_b[column.name])
                } else {
                    return _a[column.name] - _b[column.name]
                }
            });

            column.desc = !column.desc
        },
        filterData: function () {
            this.users = this.usersAux

            this.users = this.users.filter((user) => {
                return user.names.toLowerCase().includes(this.query.toLowerCase()) || user.email.toLowerCase().includes(this.query.toLowerCase()) || user.company_id.toString().includes(this.query.toLowerCase())
            })
        },
        addOldComissions: function (company_id) {
            window.location.href = '../../apps/admin-users/addOldComissions?ulid=' + company_id
        },
        viewDeposits: function (company_id) {
            window.location.href = '../../apps/admin-users/deposits?ulid=' + company_id
        },
        getInBackoffice: function (company_id) {
            this.UserSupport.getInBackoffice({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    window.location.href = '../../apps/backoffice'
                }
            })
            console.log(company_id)
        },
        deleteUser: function (company_id) {
            this.UserSupport.deleteUser({ company_id: company_id }, (response) => {
                if (response.s == 1) {
                    this.getUsers()
                }
            })
        },
        goToActivatePlan: function (company_id) {
            window.location.href = '../../apps/admin-users/activate?ulid=' + company_id
        },
        goToEdit: function (company_id) {
            window.location.href = '../../apps/admin-users/edit?ulid=' + company_id
        },
        getUsers: function () {
            this.UserSupport.getUsers({}, (response) => {
                if (response.s == 1) {
                    this.usersAux = response.users
                    this.users = this.usersAux
                }
            })
        },
    },
    mounted() {
        this.UserSupport = new UserSupport
        this.getUsers()
    },
}).mount('#app')