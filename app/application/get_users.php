<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    $filter = "AND user_login.catalog_campaing_id IN(".$UserSupport->campaing.")";

    if($users = $UserSupport->getUsers($filter))
    {
        $data["users"] = format($users);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "DATA_ERROR";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function format($users)
{
    $ProfitPerUser = new GranCapital\ProfitPerUser;
    $UserPlan = new GranCapital\UserPlan;
    
    foreach($users as $key => $user)
    {
        $users[$key]['profit_today'] = $ProfitPerUser->getProfitToday($UserPlan->getUserPlanId($user['user_login_id']),GranCapital\Transaction::INVESTMENT);
        $users[$key]['profit_sponsor_today'] = $ProfitPerUser->getProfitToday($UserPlan->getUserPlanId($user['user_login_id']),GranCapital\Transaction::REFERRAL_INVESTMENT);
    }

    return $users;
}

echo json_encode($data);