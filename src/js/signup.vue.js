import { User } from '../../src/js/user.module.js?t=1'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            user: {
                email: null,
                phone: null,
                names: null,
                country_id: 159, // loads by default México
                password: null,
                referral: {
                    user_login_id: 0,
                    names: '',
                    image : ''
                },
                utm: false,
            },
            countries : {},
            loading : false,
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
                this.checkEmail()
                this.checkFields()
            },
            deep: true
        },
    },
    methods: {
        getReferral : function(user_login_id) {
            this.feedback = false

            this.User.getReferral({user_login_id:user_login_id,utm:this.user.utm},(response)=>{
                if(response.s == 1)
                {
                   Object.assign(this.user.referral,response.referral)
                } else if(response.r == "NOT_DATA") {
                    this.feedback = "No encontramos información del link de referido proporcionado"
                }
            })
        },
        toggleFieldPasswordType : function() {
            this.fieldPasswordType = this.fieldPasswordType == 'password' ? 'text' : 'password'
        },
        doSignup : function() {
            this.loading = true
            this.feedback = false
            
            this.User.doSignup(this.user,(response)=>{
                this.loading = false

                if(response.s == 1)
                {
                    window.location.href = '../../apps/backoffice'
                } else if(response.r == "MAIL_ALREADY_EXISTS") {
                    this.feedback = 'El correo proporcionado ya existe'
                }
            })
        },
        getCountries : function() {
            this.User.getCountries(this.user,(response)=>{
                if(response.s == 1)
                {
                    this.countries = response.countries
                }
            })
        },
        checkEmail : function() {
            this.isValidMail = isValidMail(this.user.email)
        },
        getUtm : function() {
            if(window.location.pathname.split('/').inArray('join') != -1) {
                this.user.utm = 'join'
            }
        },
        checkFields : function() {
            this.userComplete = this.isValidMail && this.user.password && this.user.phone && this.user.names
        }
    },
    mounted() 
    {
        this.User = new User

        $(this.$refs.phone).mask('(00) 0000-0000');

        this.getCountries()
        this.getUtm() // getting campaign

        if(getParam('uid'))
        {
            this.getReferral(getParam('uid'))
        }

    },
}).mount('#app')