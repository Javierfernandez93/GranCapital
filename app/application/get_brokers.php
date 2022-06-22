<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;
// $UserLogin = new GranCapital\UserLogin;

if($UserSupport->_loaded === true)
{
    $Broker = new GranCapital\Broker;

    if($brokers = $Broker->getAll())
    {
        $data["brokers"] = $brokers;
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

echo json_encode($data);