import { Http } from '../../src/js/http.module.js';

class UserSupport extends Http 
{
    constructor()
    {
        super();
    }
    getUsers(data,callback)
    {
        return this.call('../../app/application/get_users.php',data,callback);
    }     
    // callfile
    uploadImageProfile(data,progress,callback)
    {
        return this.callFile('../../app/application/upload_image_profile.php',data,callback,progress);
    }    
}

export { UserSupport }