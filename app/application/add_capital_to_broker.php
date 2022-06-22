<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    if($data['capital'])
    {
        if($data['broker_id'])
        {
            $CapitalPerBroker = new GranCapital\CapitalPerBroker;
            
            if($capital_per_broker_id = $CapitalPerBroker->getTodayCapital($data['broker_id']))
            {
                $CapitalPerBroker->cargarDonde("capital_per_broker_id = ?",$capital_per_broker_id);
            } else {
                $CapitalPerBroker->broker_id = $data['broker_id'];
                $CapitalPerBroker->create_date = time();
            }

            $CapitalPerBroker->capital = $data['capital'];

            if($CapitalPerBroker->save())
            {
                $data["s"] = 1;
                $data["r"] = "DATA_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_USER_LOGIN_ID";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_BROKER_ID";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_CAPITAL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);