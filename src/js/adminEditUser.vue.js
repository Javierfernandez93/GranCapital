import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components: {
    },
    data() {
        return {
            userComplete: false,
            UserSupport: null,
            user: {
                names: null,
                password: null,
                email: null,
                phone: null,
            },
        }
    },
    watch: {
        user:
        {
            handler() {
                
                this.brokerComplete = this.user.names != null && this.user.email != null
            },
            deep: true
        }
    },
    methods: {
        updateUser: function () {
            this.UserSupport.updateUser({user:this.user}, (response) => {
                if (response.s == 1) {
                    this.$refs.button.innerText = "Actualizado"
                }
            })
        },
        getUser: function (user_login_id) {
            this.UserSupport.getUser({ user_login_id: user_login_id }, (response) => {
                if (response.s == 1) {
                    console.log(response)
                    Object.assign(this.user, response.user)
                }
            })
        },
    },
    mounted() {
        this.UserSupport = new UserSupport

        $(this.$refs.phone).mask('(00) 0000-0000');

        if (getParam('ulid')) {
            this.getUser(getParam('ulid'))
        }
    },
}).mount('#app')