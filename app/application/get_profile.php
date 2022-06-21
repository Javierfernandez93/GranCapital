<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === true)
{
    $data["user"] = [
        'email' => $UserLogin->email,
        'phone' => $UserLogin->_data['user_contact']['phone'],
        'names' => $UserLogin->_data['user_data']['names'],
        'plan' => $UserLogin->getPlan(),
        'has_card' => $UserLogin->hasCard(),
        'image' => $UserLogin->_data['user_account']['image'],
        'country_id' => $UserLogin->_data['user_address']['country_id'],
        'referral_notification' => $UserLogin->_data['user_account']['referral_notification'] ? true : false,
        'referral_email' => $UserLogin->_data['user_account']['referral_email'] ? true : false,
        'info_email' => $UserLogin->_data['user_account']['info_email'] ? true : false,
    ];

    $Country = new World\Country;
    $data["countries"] = $Country->getAllByWeb();
    $data["s"] = 1;
    $data["r"] = "LOGGED_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);