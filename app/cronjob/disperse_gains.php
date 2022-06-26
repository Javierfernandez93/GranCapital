<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

GranCapital\NotificationPerUser::push(1,"Cron job testing ".date("Y-m-d H:i:s"),GranCapital\CatalogNotification::GAINS,"");

// checking if actual day is btwn week
if(date('N') < 6)
{
    if(date('H') == '09')
    {
        echo "starting... <br>";

        $UserPlan = new GranCapital\UserPlan;
        
        
        // if($active_plans = $UserPlan->getActivePlans())
        if(false)
        {
            $UserReferral = new GranCapital\UserReferral;
            $ProfitPerUser = new GranCapital\ProfitPerUser;

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
                        GranCapital\NotificationPerUser::push($active_plan['user_login_id'],"Hemos enviado $ {$gain} USD a tu cuenta por tus rendimientos",GranCapital\CatalogNotification::GAINS,"");
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
    } else {
        echo "Only works at 9:00 AM";
    }
} else {
    echo "Weekend not working script";
}
