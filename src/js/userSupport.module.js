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
    updatePlan(data,callback)
    {
        return this.call('../../app/application/update_plan.php',data,callback);
    } 
    addCapitalToBroker(data,callback)
    {
        return this.call('../../app/application/add_capital_to_broker.php',data,callback);
    }
    addGainPerBroker(data,callback)
    {
        return this.call('../../app/application/add_gain_per_broker.php',data,callback);
    }
    getBrokers(data,callback)
    {
        return this.call('../../app/application/get_brokers.php',data,callback);
    } 
    getUserProfile(data,callback)
    {
        return this.call('../../app/application/get_user_profile.php',data,callback);
    } 
    getPlans(data,callback)
    {
        return this.call('../../app/application/get_plans.php',data,callback);
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