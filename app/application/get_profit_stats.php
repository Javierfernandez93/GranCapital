<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === true)
{
    $UserWallet = new GranCapital\UserWallet;
    
    if($UserWallet->getSafeWallet($UserLogin->company_id))
    {
        // d($UserWallet->getBalance(" AND transaction_per_wallet.transaction_id = '".GranCapital\Transaction::REFERRAL_INVESTMENT."'"));

        $data["gainStats"] = [
            'investment' =>  [
                'total' => $UserWallet->getBalance(" AND transaction_per_wallet.transaction_id = '".GranCapital\Transaction::INVESTMENT."'"),
                'percentaje' =>  0
            ],
            'referral' =>  [
                'total' =>  $UserWallet->getBalance(" AND transaction_per_wallet.transaction_id = '".GranCapital\Transaction::REFERRAL_INVESTMENT."'"),
                'percentaje' => 0
            ],
            // 'newReferral' =>  $UserLogin->getReferralCount(),
            'totalReferral' =>  $UserLogin->getReferralCount(),
            'balance' =>  $UserWallet->getBalance(),
        ];

        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_WALLET";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);