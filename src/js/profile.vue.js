import { User } from '../../src/js/user.module.js'

Vue.createApp({
    components : { 
        
    },
    data() {
        return {
            user: {
                email: null,
                names: null,
                image: null,
                plan: false,
                has_card: false,
                referral_notification: true,
                referral_email: true,
                info_email: true,
            },
            lastReferrals : {},
        }
    },
    watch : {
        user : {
            handler() {
                this.editProfile()
            },
            deep: true
        },
    },
    methods: {
        getProfile : function() {
            this.User.getProfile({},(response)=>{
                if(response.s == 1)
                {
                    Object.assign(this.user, response.user)
                    
                    console.log(this.user)
                }
            })
        },
        editProfile : function() {
            this.User.editProfile(this.user,(response)=>{
                if(response.s == 1)
                {
                    
                }
            })
        },
        getLastReferrals : function() {
            this.User.getLastReferrals({},(response)=>{
                if(response.s == 1)
                {
                    this.lastReferrals = response.lastReferrals.map((referral)=>{
                        referral.signup_date = new Date(referral.signup_date*1000).toLocaleDateString()
                        return referral
                    })
                }
            })
        },
        checkFields : function() {
        },
        openFileManager: function () 
        {
            this.$refs.file.click()
        },
        uploadFile: function () 
        {
            $(".progress").removeClass("d-none")

            let files = $(this.$refs.file).prop('files');
            var form_data = new FormData();
          
            form_data.append("file", files[0]);
          
            this.User.uploadImageProfile(form_data,$(".progress-chat").find(".progress-bar"),(response)=>{
              if(response.s == 1)
              {
                  this.user.image = response.target_path
              }
            });
        },
    },
    mounted() 
    {
        this.User = new User
        
        this.getProfile()
        this.getLastReferrals()

        $(this.$refs.phone).mask('(00) 0000-0000');
    },
}).mount('#app')