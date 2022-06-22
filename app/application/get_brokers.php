<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    $data['day'] = $data['day'] ? $data['day'] : date("Y/m/d");

    $Broker = new GranCapital\Broker;

    if($brokers = $Broker->getAll($data['day']))
    {
        $data["data"] = filterData($brokers);
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_USER_LOGIN_ID";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function filterData($brokers = null)
{
    $CapitalPerBroker = new GranCapital\CapitalPerBroker;
    $GainPerBroker = new GranCapital\GainPerBroker;

    foreach ($brokers as $key => $broker)
    {
        $capitals = $CapitalPerBroker->getAll($broker['broker_id']);

        $brokers[$key]['capital'] = $capitals ? array_sum(array_column($capitals,"capital")) : 0;
    }

    $brokers_data['totals']['capital'] = array_sum(array_column($brokers,'capital'));

    // getting % portfolio
    foreach($brokers as $key => $broker)
    {
        $gain = $GainPerBroker->getGainPerDay($broker['broker_id']);

        // calculating portfolio
        $brokers[$key]['portfolio'] = number_format(($broker['capital']/$brokers_data['totals']['capital'])*100,2);
        
        // getting gain 
        $brokers[$key]['gain'] = $gain ? $gain : 0;
        
        // getting gain witout fee
        $brokers[$key]['real_gain'] = HCStudio\Util::getPercentaje($brokers[$key]['gain'],$broker['fee']*100);

        // getting gain percentaje
        $brokers[$key]['percentaje_gain'] = number_format(($brokers[$key]['real_gain'] / $broker['capital']) * 100,2);

        // new capital
        $brokers[$key]['new_capital'] = $broker['capital'] + $brokers[$key]['real_gain'];
    }


    $brokers_data['brokers'] = $brokers;

    return $brokers_data;
}

echo json_encode($data);