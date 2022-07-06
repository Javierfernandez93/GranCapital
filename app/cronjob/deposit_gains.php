<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

$UserSupport = new GranCapital\UserSupport;

if(($data['user'] == HCStudio\Util::$username && $data['password'] == HCStudio\Util::$password) || $UserSupport->_loaded === true)
{
    // st-1 tomar las ganancias 
    // st-2 eliminar las ganancias (withdraw forzado)
    // st-3 depositar las ganancias como fondeo
    $TransactionPerWallet = new GranCapital\TransactionPerWallet;
    $CatalogPlan = new GranCapital\CatalogPlan;
    
    $filter = " AND user_wallet.user_login_id = '9'";
    $filter = "";

    // st-1
    if($transactions = $TransactionPerWallet->getAllGains($filter))
    {
        foreach($transactions as $key => $transaction)
        {
            if($transactions_for_translate = $TransactionPerWallet->getAllGainsList($transaction['user_wallet_id']))
            {
                $transactions[$key]['total_withdraws'] = $TransactionPerWallet->getTotalWithdraws($transaction['user_wallet_id']);
                $transactions[$key]['total_to_deposit'] = $transaction['total_ammount'] + $transactions[$key]['total_withdraws'];
                
                $UserWallet = new GranCapital\UserWallet;

                if($UserWallet->getSafeWallet($transaction['user_login_id']))
                {
                    if($UserWallet->depositGains($transactions[$key]['total_ammount']))
                    {
                        if($TransactionPerWallet->setTransactionsAsTranslated($transactions_for_translate))
                        {
                            if($ammount = $TransactionPerWallet->getSumDepositsByUserWithWitdraws($transaction['user_wallet_id']))
                            {
                                if($catalog_plan_id = $CatalogPlan->getCatalogPlanIdBetween($ammount))
                                {
                                    if(updatePlan($transaction['user_login_id'],$catalog_plan_id,$ammount))
                                    {
                                        $transactions[$key]['status'] = 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
} else {
    $data['s'] = 0;
    $data['r'] = "INVALID_CREDENTIALS";
}

function updatePlan(int $user_login_id,int $catalog_plan_id,float $ammount) : bool
{
    $UserPlan = new GranCapital\UserPlan;
    
    if(!$UserPlan->cargarDonde("user_login_id = ?",$user_login_id))
    {
        $UserPlan->user_login_id = $user_login_id;
        $UserPlan->create_date = time();
    }

    $UserPlan->ammount = $ammount;
    $UserPlan->catalog_plan_id = $catalog_plan_id;
    
    return $UserPlan->save();
}

d($transactions);
echo json_encode($transactions);