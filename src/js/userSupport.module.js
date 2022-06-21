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
    getAdministrators(data,callback)
    {
        return this.call('../../app/application/get_administrators.php',data,callback);
    } 
    deleteUser(data,callback)
    {
        return this.call('../../app/application/delete_user.php',data,callback);
    } 
    deleteSupportUser(data,callback)
    {
        return this.call('../../app/application/delete_support_user.php',data,callback);
    } 
    doLoginSupport(data,callback)
    {
        return this.call('../../app/application/do_login_support.php',data,callback);
    }       
    // callfile
    uploadImageProfile(data,progress,callback)
    {
        return this.callFile('../../app/application/upload_image_profile.php',data,callback,progress);
    }    
}

export { UserSupport }