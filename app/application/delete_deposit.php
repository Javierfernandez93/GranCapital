<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    $CatalogPlan = new GranCapital\CatalogPlan;

    if($data['transaction_per_wallet_id'])
    {
        $TransactionPerWallet = new GranCapital\TransactionPerWallet;
        
        if($TransactionPerWallet->cargarDonde('transaction_per_wallet_id = ?',$data['transaction_per_wallet_id']))
        {
            $TransactionPerWallet->status = GranCapital\TransactionPerWallet::DELETED;

            if($TransactionPerWallet->save())
            {
                $UserWallet = new GranCapital\UserWallet;
                
                if($user_login_id = $UserWallet->getCompanyId(($TransactionPerWallet->user_wallet_id)))
                {
                    if($UserWallet->getSafeWallet(($user_login_id)))
                    {
                        if($ammount = $TransactionPerWallet->getSumDepositsByUser($TransactionPerWallet->user_wallet_id))
                        {
                            $CatalogPlan = new GranCapital\CatalogPlan;

                            if($catalog_plan_id = $CatalogPlan->getCatalogPlanIdBetween($ammount))
                            {
                                if(updatePlan($user_login_id,$catalog_plan_id,$ammount))
                                {
                                    $data["user_login_id"] = $user_login_id;
                                    $data["s"] = 1;
                                    $data["r"] = "DATA_OK";
                                } else {
                                    $data['r'] = "NOT_TRANSACTION_MADE";
                                    $data['s'] = 0;    
                                }
                            } else {
                                $data['r'] = "NOT_CATALOG_PLAN";
                                $data['s'] = 0;    
                            }
                        } else {
                            $data['r'] = "NOT_AMMOUNT";
                            $data['s'] = 0;    
                        }
                    } else {
                        $data['r'] = "NOT_WALLET";
                        $data['s'] = 0;
                    }
                } else {
                    $data['r'] = "NOT_COMPANY_ID";
                    $data['s'] = 0;
                }
            } else {
                $data['r'] = "NOT_UPDATE_TRANSACTION_PER_WALLET";
                $data['s'] = 0;
            }
        } else {
            $data['r'] = "DATA_ERROR";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_TRANSACTION_PER_WALLET_ID";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
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

echo json_encode($data);