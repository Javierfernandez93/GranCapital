import { Http } from '../../src/js/http.module.js';

class User extends Http 
{
    constructor()
    {
        super();
    }
    doLogin(data,callback)
    {
        return this.call('../../app/application/do_login.php',data,callback);
    }    
    changePassword(data,callback)
    {
        return this.call('../../app/application/change_password.php',data,callback);
    }    
    recoverPassword(data,callback)
    {
        return this.call('../../app/application/recover_password.php',data,callback);
    }    
    getAuthToChangePassword(data,callback)
    {
        return this.call('../../app/application/get_auth_to_change_password.php',data,callback);
    }    
    doSignup(data,callback)
    {
        return this.call('../../app/application/do_signup.php',data,callback);
    }    
    getProfile(data,callback)
    {
        return this.call('../../app/application/get_profile.php',data,callback);
    }    
    getLastReferrals(data,callback)
    {
        return this.call('../../app/application/get_last_referrals.php',data,callback);
    }
    getReferrals(data,callback)
    {
        return this.call('../../app/application/get_referrals.php',data,callback);
    }
    getReferral(data,callback)
    {
        return this.call('../../app/application/get_referral.php',data,callback);
    }
    getProfits(data,callback)
    {
        return this.call('../../app/application/get_profits.php',data,callback);
    }    
    getProfitStats(data,callback)
    {
        return this.call('../../app/application/get_profit_stats.php',data,callback);
    }    
    // callfile
    uploadImageProfile(data,progress,callback)
    {
        return this.callFile('../../app/application/upload_image_profile.php',data,callback,progress);
    }    
}

export { User }