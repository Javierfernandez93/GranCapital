<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";


echo "starting... <br>";

$UserPlan = new GranCapital\UserPlan;
$ProfitPerUser = new GranCapital\ProfitPerUser;
// d($ProfitPerUser->calculateProfit(10,50000));
// die;
$active_plans = $UserPlan->getActivePlans();

foreach ($active_plans as $active_plan)
{
    // if doesnt have profit then we add it 
    if($ProfitPerUser->hasProfitToday($active_plan['user_plan_id']) == false)
    {
        $total_profit = $active_plan['profit']+$active_plan['additional_profit'];
        
        $gain = $ProfitPerUser->calculateProfit($total_profit,$active_plan['name']);

        echo "Profit {$total_profit} % Ganancia {$gain} - PLAN {$active_plan['name']} <br>";

        if($ProfitPerUser->insertGain($active_plan['user_plan_id'],GranCapital\CatalogProfit::INVESTMENT,$gain))
        {
            GranCapital\NotificationPerUser::push($active_plan['user_plan_id'],"Hemos enviado $ {$gain} USD, a tu cuenta, por tus rendimientos",GranCapital\CatalogNotification::GAINS,"");
        }
    }
}

echo "end";