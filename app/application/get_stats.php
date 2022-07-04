<?php

use GranCapital\CapitalPerBroker;
use GranCapital\GainPerBroker;

 define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    $CapitalPerBroker = new GranCapital\CapitalPerBroker;
    
    getBrokersChartData($data,$CapitalPerBroker);
    
    $TransactionPerWallet = new GranCapital\TransactionPerWallet;
    $WithdrawPerUser = new GranCapital\WithdrawPerUser;

    $data["stats"] = [
        'totalCapital' => $CapitalPerBroker->getTotalCapital(),
        'totalDeposit' => $TransactionPerWallet->getAllDeposits(),
        'totalWithdraws' => $TransactionPerWallet->getAllWithdraws(),
        'totalProfits' => $TransactionPerWallet->getAllProfits(),
        'pendingWithdraws' => $WithdrawPerUser->getCountPending(),
        'totalUsers' => $UserSupport->getCountUsers()
    ];

    // d($data);
    $data["s"] = 1;
    $data["r"] = "DATA_OK";
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function getBrokersChartData(array &$data = null,CapitalPerBroker $CapitalPerBroker = null)
{
    $Broker = new GranCapital\Broker;
    $GainPerBroker = new GranCapital\GainPerBroker;
    
    if($data['brokers'] = $Broker->getActive())
    {
        $days = 5;
        $first_day = strtotime("-{$days} days");

        for($i = 0; $i < $days; $i++)
        {
            $start_date = strtotime(($i+1)." days",$first_day);
            $end_date = strtotime(($i+2)." days",$first_day)-1;

            $data['labels'][] = HCStudio\Util::getDateSimples($start_date);

            foreach ($data['brokers'] as $key => $broker)
            {
                $data['brokers'][$key]['data'][] = $CapitalPerBroker->getLastCapitals($broker['broker_id'],$start_date,$end_date);
            }
        }

        foreach ($data['brokers'] as $key => $broker)
        {
            $capitals = $CapitalPerBroker->getAllPerBroker($broker['broker_id']);
            $gains = $GainPerBroker->getAllGainsPerBroker($broker['broker_id']);

            $total_capital = $capitals ? array_sum($capitals) : 0;
            $total_gain = $gains ? array_sum($gains) : 0;

            $data['brokers'][$key]['averange']['capital'] = $total_capital / sizeof($capitals);
            $data['brokers'][$key]['averange']['gain'] = $total_gain / sizeof($gains);
            $data['pie']['data'][$key] = $total_capital;
        }

        $data['pie']['brokersNames'] = array_column($data['brokers'], 'name');
        $data['pie']['brokersColors'] = array_column($data['brokers'], 'color');
    }
}

echo json_encode($data);