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
        return this.call('../../app/application/recover_password.php',data,callback);
    }    
}

export { User }