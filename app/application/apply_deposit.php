<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getVarFromPGS();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    if($data['transaction_requirement_per_user_id'])
    {
        $TransactionRequirementPerUser = new GranCapital\TransactionRequirementPerUser;
        
        if($TransactionRequirementPerUser->isPending($data['transaction_requirement_per_user_id']))
        {
            if($TransactionRequirementPerUser->cargarDonde('transaction_requirement_per_user_id = ?',$data['transaction_requirement_per_user_id']))
            {
                $TransactionPerWallet = new GranCapital\TransactionPerWallet;

                $UserWallet = new GranCapital\UserWallet;
                
                if($UserWallet->getSafeWallet(($TransactionRequirementPerUser->user_login_id)))
                {
                    if($UserWallet->doTransaction($TransactionRequirementPerUser->ammount,GranCapital\Transaction::DEPOSIT,null,null,false))
                    {
                        if($ammount = $TransactionPerWallet->getSumDepositsByUser($UserWallet->getId()))
                        {
                            $CatalogPlan = new GranCapital\CatalogPlan;

                            if($catalog_plan_id = $CatalogPlan->getCatalogPlanIdBetween($ammount))
                            {
                                if(updatePlan($TransactionRequirementPerUser->user_login_id,$catalog_plan_id,$ammount))
                                {
                                    if(updateTransaction($data['transaction_requirement_per_user_id']))
                                    {
                                        $data["s"] = 1;
                                        $data["r"] = "DATA_OK";
                                    } else {
                                        $data["s"] = 0;
                                        $data["r"] = "TRANSACTION_NOT_UPDATED";
                                    }
                                } else {
                                    $data["s"] = 0;
                                    $data["r"] = "NOT_UPDATE_PLAN";
                                }
                            } else {
                                $data["s"] = 0;
                                $data["r"] = "NOT_CATALOG_PLAN_ID";
                            }
                        } else {
                            $data["s"] = 0;
                            $data["r"] = "NOT_AMMOUNT";
                        }
                    } else {
                        $data['r'] = "NOT_WALLET";
                        $data['s'] = 0;
                    }
                } else {
                    $data['r'] = "DATA_ERROR";
                    $data['s'] = 0;
                }
            } else {
                $data['r'] = "NOT_TRANSACTION_REQUIREMENT_PER_USER";
                $data['s'] = 0;
            }
        } else {
            $data['r'] = "IS_NOT_PENDING";
            $data['s'] = 0;
        }
    } else {
        $data['r'] = "NOT_TRANSACTION_REQUIREMENT_PER_USER_ID";
        $data['s'] = 0;
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

function updateTransaction(int $transaction_requirement_per_user_id = null) : bool
{
    if(isset($transaction_requirement_per_user_id) === true)
    {
        $TransactionRequirementPerUser = new GranCapital\TransactionRequirementPerUser;
        
        if($TransactionRequirementPerUser->isPending($transaction_requirement_per_user_id))
        {   
            if($TransactionRequirementPerUser->cargarDonde("transaction_requirement_per_user_id = ?",$transaction_requirement_per_user_id))
            {
                $TransactionRequirementPerUser->status = GranCapital\TransactionRequirementPerUser::VALIDATED;
                $TransactionRequirementPerUser->validate_date = time();
                $TransactionRequirementPerUser->validation_method = GranCapital\TransactionRequirementPerUser::ADMIN;

                return $TransactionRequirementPerUser->save();
            }
        }
    }

    return false;
}

echo json_encode($data);