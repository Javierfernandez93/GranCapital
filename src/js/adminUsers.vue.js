import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            users : {},
        }
    },
    watch : {
    },
    methods: {
        getUsers : function() {
            this.UserSupport.getUsers({},(response)=>{
                if(response.s == 1)
                {
                    Object.assign(this.users,response.users);
                }
            })
        },
    },
    mounted() 
    {
        this.UserSupport = new UserSupport
        this.getUsers()
    },
}).mount('#app')