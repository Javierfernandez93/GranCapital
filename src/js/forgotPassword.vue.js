import { User } from '../../src/js/user.module.js'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            email: null,
            User : null,
            feedback : false,
            isValidMail : false
        }
    },
    watch : {
        email : {
            handler() {
                this.checkEmail()
            },
            deep: true
        },
    },
    methods: {
        recoverPassword : function() {
            if(this.isValidMail)
            {
                this.feedback = false

                // dinamicLoader.showLoader($("#button"))
                
                this.User.recoverPassword({email:this.email},(response)=>{
                    if(response.s == 1)
                    {
                        
                    } else if(response.r == "INVALID_PASSWORD") {
                        this.feedback = "Las contraseña indicada no es correcta. Intente nuevamente"
                    } else if(response.r == "INVALID_CREDENTIALS") {
                        this.feedback = "Las credenciales proporcionadas no son correctas, intente nuevamente"
                    }
                })
            }
        },
        checkEmail : function() {
            this.isValidMail = isValidMail(this.email)
        },
    },
    mounted() 
    {
        this.User = new User
    },
}).mount('#app')