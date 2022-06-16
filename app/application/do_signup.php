<?php define('TO_ROOT', '../../');

require_once TO_ROOT. '/system/core.php';

$data = HCStudio\Util::getHeadersForWebService();

if($data['email'])
{
    $UserLogin = new GranCapital\UserLogin;

    if($UserLogin->isUniqueMail($data['email']))
    {
        if($UserLogin->doSignup($data))
        {
            $data['s'] = 1;
            $data['r'] = 'SIGNUP_OK';
        } else {
            $data['s'] = 0;
            $data['r'] = 'ERROR_ON_SIGNUP';
        }
    } else {
        $data['s'] = 0;
        $data['r'] = 'MAIL_ALREADY_EXISTS';
    }
} else {
	$data['s'] = 0;
	$data['r'] = 'NOT_FIELD_SESSION_DATA';
}

echo json_encode($data);