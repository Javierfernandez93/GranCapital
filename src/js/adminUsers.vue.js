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
        filterData: function () {
            this.users = this.usersAux

            this.users = this.users.filter((user) => {
                return user.names.toLowerCase().includes(this.query.toLowerCase()) || user.email.toLowerCase().includes(this.query.toLowerCase())
            })
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