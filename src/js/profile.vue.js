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
                active: false,
                has_card: false,
            },
            lastReferrals : {},
        }
    },
    watch : {
        user : {
            handler() {
                
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
    },
}).mount('#app')