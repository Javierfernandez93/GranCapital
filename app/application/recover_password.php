<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data["email"])
{
    $UserLogin = new GranCapital\UserLogin;

    if($UserLogin->isValidMail($data['email']))
    {
        // @TODO SEND EMAIL
        $data["s"] = 1;
        $data["r"] = "LOGGED_OK";
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_FOUND_MAIL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

echo json_encode($data);