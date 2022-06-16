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
    recoverPassword(data,callback)
    {
        return this.call('../../app/application/recover_password.php',data,callback);
    }    
    doSignup(data,callback)
    {
        return this.call('../../app/application/do_signup.php',data,callback);
    }    
    getProfile(data,callback)
    {
        return this.call('../../app/application/get_profile.php',data,callback);
    }    
    uploadImageProfile(data,progress,callback)
    {
        return this.callFile('../../app/application/upload_image_profile.php',data,callback,progress);
    }    
}

export { User }