<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === true)
{
    $data["gainStats"] = [
        'investment' =>  [
            'total' => 0,
            'percentaje' =>  0
        ],
        'referral' =>  [
            'total' =>  $UserLogin->getReferralCount(),
            'percentaje' => 0
        ],
        'newReferral' =>  0,
        'totalReferral' =>  $UserLogin->getReferralCount(),
    ];
    $data["s"] = 1;
    $data["r"] = "LOGGED_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);