import { Http } from '../../src/js/http.module.js';

class UserSupport extends Http {
    constructor() {
        super();
    }
    getUsers(data, callback) {
        return this.call('../../app/application/get_users.php', data, callback);
    }
    getAdministrators(data, callback) {
        return this.call('../../app/application/get_administrators.php', data, callback);
    }
    getAdministrator(data, callback) {
        return this.call('../../app/application/get_administrator.php', data, callback);
    }
    deleteUser(data, callback) {
        return this.call('../../app/application/delete_user.php', data, callback);
    }
    updatePlan(data, callback) {
        return this.call('../../app/application/update_plan.php', data, callback);
    }
    addCapitalToBroker(data, callback) {
        return this.call('../../app/application/add_capital_to_broker.php', data, callback);
    }
    addGainPerBroker(data, callback) {
        return this.call('../../app/application/add_gain_per_broker.php', data, callback);
    }
    saveBroker(data, callback) {
        return this.call('../../app/application/save_broker.php', data, callback);
    }
    getBrokerCapitals(data, callback) {
        return this.call('../../app/application/get_broker_capitals.php', data, callback);
    }
    deleteCapital(data, callback) {
        return this.call('../../app/application/delete_capital.php', data, callback);
    }
    updateBroker(data, callback) {
        return this.call('../../app/application/update_broker.php', data, callback);
    }
    saveUser(data, callback) {
        return this.call('../../app/application/save_user.php', data, callback);
    }
    getAdministratorPermissions(data, callback) {
        return this.call('../../app/application/get_administrator_permissions.php', data, callback);
    }
    saveAdministrator(data, callback) {
        return this.call('../../app/application/save_administrator.php', data, callback);
    }
    editAdministrator(data, callback) {
        return this.call('../../app/application/edit_administrator.php', data, callback);
    }
    getReferral(data, callback) {
        return this.call('../../app/application/get_referral.php', data, callback);
    }
    getCountries(data, callback) {
        return this.call('../../app/application/get_countries.php', data, callback);
    }
    inactiveBroker(data, callback) {
        return this.call('../../app/application/inactive_broker.php', data, callback);
    }
    deleteBroker(data, callback) {
        return this.call('../../app/application/delete_broker.php', data, callback);
    }
    activeBroker(data, callback) {
        return this.call('../../app/application/active_broker.php', data, callback);
    }
    getBrokers(data, callback) {
        return this.call('../../app/application/get_brokers.php', data, callback);
    }
    getBroker(data, callback) {
        return this.call('../../app/application/get_broker.php', data, callback);
    }
    getUser(data, callback) {
        return this.call('../../app/application/get_user.php', data, callback);
    }
    updateUser(data, callback) {
        return this.call('../../app/application/update_user.php', data, callback);
    }
    getUserProfile(data, callback) {
        return this.call('../../app/application/get_user_profile.php', data, callback);
    }
    getPlans(data, callback) {
        return this.call('../../app/application/get_plans.php', data, callback);
    }
    deleteSupportUser(data, callback) {
        return this.call('../../app/application/delete_support_user.php', data, callback);
    }
    doLoginSupport(data, callback) {
        return this.call('../../app/application/do_login_support.php', data, callback);
    }
    // callfile
    uploadImageProfile(data, progress, callback) {
        return this.callFile('../../app/application/upload_image_profile.php', data, callback, progress);
    }
}

export { UserSupport }