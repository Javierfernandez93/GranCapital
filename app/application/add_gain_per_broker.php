<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    if($data['gain'] > -1)
    {
        if($data['broker_id'])
        {
            $GainPerBroker = new GranCapital\GainPerBroker;
            
            if($gain_per_broker_id = $GainPerBroker->getGainPerDayId($data['broker_id']))
            {
                $GainPerBroker->cargarDonde("gain_per_broker_id = ?",$gain_per_broker_id);
            } else {
                $GainPerBroker->broker_id = $data['broker_id'];
                $GainPerBroker->create_date = time();
            }

            $GainPerBroker->gain = $data['gain'];

            if($GainPerBroker->save())
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