<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";
echo "starting... <br>";

$UserReferral = new GranCapital\UserReferral;
$UserPlan = new GranCapital\UserPlan;
$ProfitPerUser = new GranCapital\ProfitPerUser;

if($active_plans = $UserPlan->getActivePlans())
{
    echo '----- inversement gains<br>';
    /* inversement gains */
    foreach ($active_plans as $active_plan)
    {
        // if doesnt have profit then we add it 
        if($ProfitPerUser->hasProfitToday($active_plan['user_plan_id'],GranCapital\Transaction::INVESTMENT) == false)
        {
            $total_profit = $active_plan['profit']+$active_plan['additional_profit'];
            
            $gain = $ProfitPerUser->calculateProfit($total_profit,$active_plan['ammount']);

            echo "-- ID {$active_plan['user_login_id']} <br>";
            echo "   Profit {$total_profit} % - PLAN {$active_plan['name']} [Monto {$active_plan['ammount']} * $total_profit] = $ {$gain} Ganancia <br><br>";

            if($ProfitPerUser->insertGain($active_plan['user_plan_id'],GranCapital\Transaction::INVESTMENT,$gain))
            {
                GranCapital\NotificationPerUser::push($active_plan['user_plan_id'],"Hemos enviado $ {$gain} USD a tu cuenta por tus rendimientos",GranCapital\CatalogNotification::GAINS,"");
            }
        }
    }

    echo '----- Referral gains<br>';
    /* referral gains */
    foreach ($active_plans as $active_plan)
    {
        // if doesnt have profit then we add it 
        if($referral = $UserReferral->getReferral(($active_plan['user_plan_id'])))
        {
            if($user_plan_id = $UserPlan->getUserPlanId($referral['user_login_id']))
            {
                if($ProfitPerUser->hasProfitToday($user_plan_id,GranCapital\Transaction::REFERRAL_INVESTMENT) == false)
                {
                    $total_profit = $active_plan['sponsor_profit'];
                    
                    $gain = $ProfitPerUser->calculateProfit($total_profit,$active_plan['ammount']);
                    
                    echo "-- ID {$active_plan['user_login_id']} para el ID {$referral['user_login_id']} <br>";
                    echo "   Profit {$total_profit} % - PLAN {$active_plan['name']} [Monto {$active_plan['ammount']} * $total_profit] = $ {$gain} Ganancia <br><br>";

                    if($ProfitPerUser->insertGain($user_plan_id,GranCapital\Transaction::REFERRAL_INVESTMENT,$gain))
                    {
                        GranCapital\NotificationPerUser::push($referral['user_login_id'],"Hemos enviado $ {$gain} USD a tu cuenta por tus rendimientos de tus invitados",GranCapital\CatalogNotification::GAINS,"");
                    }
                }
            }
        }
    }
}

echo "end";