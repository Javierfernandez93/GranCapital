<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

// GranCapital\NotificationPerUser::push(1,"Cron job testing ".date("Y-m-d H:i:s"),GranCapital\CatalogNotification::GAINS,"");

$data = HCStudio\Util::getHeadersForWebService();
$data['unix_time'] = $data['day'] ? strtotime($data['day']) : time();

// checking if actual day is btwn week
if(date('N',$data['unix_time']) < 6)
{
    if(date('H',$data['unix_time']) == '10')
    {
        $day = strtotime($data['day']);

        $data['start_execution_time'] = microtime(true); 
        $data['filter'] = $data['user_login_id'] ? " AND user_plan.user_login_id = '{$data['user_login_id']}'" : '';

        $UserPlan = new GranCapital\UserPlan;
        
        // $data['active_plans'] = $UserPlan->getActivePlans();
        // $data['active_plans'] = $UserPlan->getActivePlans($data['filter']);

        if($active_plans = $UserPlan->getActivePlans($data['filter']))
        {
            $UserReferral = new GranCapital\UserReferral;
            $ProfitPerUser = new GranCapital\ProfitPerUser;

            $data['report'][0]['title'] = 'INVERSEMENT GAINS';
            
            /* inversement gains */
            foreach ($active_plans as $active_plan)
            {
                // if doesnt have profit then we add it 
                if($ProfitPerUser->hasProfitToday($active_plan['user_plan_id'],GranCapital\Transaction::INVESTMENT,$data['day']) == false)
                {
                    $total_profit = $active_plan['profit']+$active_plan['additional_profit'];
                    
                    if($gain = $ProfitPerUser->calculateProfit($total_profit,$active_plan['ammount']))
                    {
                        $data['report'][0]['profits'][] = [
                            'user_login_id' => $active_plan['user_login_id'],
                            'total_profit' => $total_profit,
                            'plan' => [
                                'active_plan' => $active_plan['name'],
                                'ammount' => $active_plan['ammount'],
                            ],
                            'gain' => $gain
                        ];
    
                        if($ProfitPerUser->insertGain($active_plan['user_plan_id'],GranCapital\Transaction::INVESTMENT,$gain,$day))
                        {
                            GranCapital\NotificationPerUser::push($active_plan['user_login_id'],"Hemos enviado $ {$gain} USD a tu cuenta por tus rendimientos",GranCapital\CatalogNotification::GAINS,"");
                        }
                    }

                }
            }

            $data['report'][1]['title'] = 'Referral GAINS';

            /* referral gains */
            foreach ($active_plans as $active_plan)
            {
                // if doesnt have profit then we add it 
                if($referral = $UserReferral->getReferral(($active_plan['user_plan_id'])))
                {
                    if($user_plan_id = $UserPlan->getUserPlanId($referral['user_login_id']))
                    {
                        if($ProfitPerUser->hasProfitToday($user_plan_id,GranCapital\Transaction::REFERRAL_INVESTMENT,$data['day']) == false)
                        {
                            $total_profit = $active_plan['sponsor_profit'];
                            
                            if($gain = $ProfitPerUser->calculateProfit($total_profit,$active_plan['ammount']))
                            {
                                $data['report'][1]['profits'][] = [
                                    'referral_id' => $active_plan['user_login_id'],
                                    'user_login_id' => $referral['user_login_id'],
                                    'total_profit' => $total_profit,
                                    'plan' => [
                                        'active_plan' => $active_plan['name'],
                                        'ammount' => $active_plan['ammount'],
                                    ],
                                    'gain' => $gain
                                ];
                                
                                if($ProfitPerUser->insertGain($user_plan_id,GranCapital\Transaction::REFERRAL_INVESTMENT,$gain,$day))
                                {
                                    GranCapital\NotificationPerUser::push($referral['user_login_id'],"Hemos enviado $ {$gain} USD a tu cuenta por tus rendimientos de tus invitados",GranCapital\CatalogNotification::GAINS,"");
                                }
                            }
                        }
                    }
                }
            }
        }

        $data['end_execution_time'] = microtime(true); 
        $data['total_execution_time'] = $data['end_execution_time'] - $data['start_execution_time']; 
    } else {
        $data['m'] = "Only works at 9:00 AM";
    }
} else {
    $data['m'] = "Weekend not working script";
}

echo json_encode($data);