<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

// $UserSupport = new GranCapital\UserSupport;
// $UserLogin = new GranCapital\UserLogin;

if(true)
{
    $CatalogPlan = new GranCapital\CatalogPlan;

    if($plans = $CatalogPlan->getAll())
    {
        $data["plans"] = $plans;
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_PLANS";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);