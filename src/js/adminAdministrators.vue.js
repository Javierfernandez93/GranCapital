import { UserSupport } from '../../src/js/userSupport.module.js'

/* vue */

Vue.createApp({
    components : { 
    },
    data() {
        return {
            UserSupport : null,
            administrators : {},
        }
    },
    watch : {
    },
    methods: {
        deleteAdministrator : function(user_support_id) {
            this.UserSupport.deleteSupportUser({user_support_id:user_support_id},(response)=>{
                if(response.s == 1)
                {
                    this.getAdministrators()
                }
            })
        },
        goToEdit : function(company_id) {
            window.location.href = '../../apps/admin-administrators/edit?usid='+company_id
        },
        getAdministrators : function() {
            this.UserSupport.getAdministrators({},(response)=>{
                if(response.s == 1)
                {
                    this.administrators = response.administrators.map((administrator)=>{
                        administrator['create_date'] = new Date(administrator['create_date']*1000).toLocaleDateString()
                        return administrator
                    })
                }
            })
        },
    },
    mounted() 
    {
        this.UserSupport = new UserSupport
        this.getAdministrators()
    },
}).mount('#app')