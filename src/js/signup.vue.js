import { User } from '../../src/js/user.module.js'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            user: {
                email: null,
                phone: null,
                names: null,
                password: null,
            },
            User : null,
            feedback : false,
            isValidMail : false,
            fieldPasswordType : 'password',
            userComplete : false,
        }
    },
    watch : {
        user : {
            handler() {
                this.checkFields()
                this.checkEmail()
            },
            deep: true
        },
    },
    methods: {
        toggleFieldPasswordType : function() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        doSignup : function() {
            this.feedback = false
            
            this.User.doSignup(this.user,(response)=>{
                if(response.s == 1)
                {
                    window.location.href = '../../apps/backoffice'
                } else if(response.r == "MAIL_ALREADY_EXISTS") {
                    this.feedback = 'El correo proporcionado ya existe'
                }
            })
        },
        checkEmail : function() {
            this.isValidMail = isValidMail(this.user.email)
        },
        checkFields : function() {
            this.userComplete = this.user.email && this.user.password
        }
    },
    mounted() 
    {
        this.User = new User

        $(this.$refs.phone).mask('00 0000-0000');

    },
}).mount('#app')