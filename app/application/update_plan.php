<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true)
{
    if(updatePlan($data['user_login_id'],$data['catalog_plan_id'],$data['additional_profit']))
    {
        $data["s"] = 1;
        $data["r"] = "DATA_OK";
    } else {
        $data['r'] = "DATA_ERROR";
        $data['s'] = 0;
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function updatePlan(int $user_login_id,int $catalog_plan_id,$additional_profit = null) : bool
{
    $UserPlan = new GranCapital\UserPlan;
    
    if(!$UserPlan->cargarDonde("user_login_id = ?",$user_login_id))
    {
        $UserPlan->user_login_id = $user_login_id;
        $UserPlan->create_date = time();
    }
    $UserPlan->catalog_plan_id = $catalog_plan_id;
    $UserPlan->additional_profit = $additional_profit ? $additional_profit : 0;
    
    return $UserPlan->save();
}

echo json_encode($data);