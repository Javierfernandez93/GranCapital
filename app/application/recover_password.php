<?php define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$data = HCStudio\Util::getHeadersForWebService();

if($data["email"])
{
    $UserLogin = new GranCapital\UserLogin;

    if($UserLogin->isUniqueMail($data['email']) === false)
    {
        if($token = getToken($data['email']))
        {
            if(sendEmail($data['email'],$token))
            {
                $data["s"] = 1;
                $data["r"] = "SEND_OK";
            } else {
                $data["s"] = 0;
                $data["r"] = "NOT_SENT";
            }
        } else {
            $data["s"] = 0;
            $data["r"] = "NOT_TOKEN";
        }
    } else {
        $data["s"] = 0;
        $data["r"] = "NOT_FOUND_MAIL";
    }
} else {
	$data["s"] = 0;
	$data["r"] = "NOT_FIELD_SESSION_DATA";
}

function getToken(string $email = null) : string 
{
    $Token = new HCStudio\Token;
    $token = $Token->getToken([
        'time' => time(),
        'email' => $email
    ]);

    return "{$token['token']}[{$token['key']}]";
}

function sendEmail(string $email = null,string $token = null) : bool
{
    if(isset($email) === true)
    {
        require_once TO_ROOT . '/system/SendGrid/vendor/autoload.php';
        
        $Mailer = new JFStudio\MailerSendGrid;
		
		$SendGrid = new \SendGrid("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");
		$Email = new \SendGrid\Mail\Mail; 

		$Layout = JFStudio\Layout::getInstance();

		$Layout->init("","recoverPassword","mail",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

		$Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
		$Layout->setScript(['']);

		$Layout->setVar([
			"email" => $email,
			"token" => $token
		]);

	  	$data = [
	  		"subject" => "Recuperar contraseña",
	  		'mail_from' => 'admin@grancapital.found',
	  		'name_from' => 'Gran Capital',
			'name_to' => 'User',
			'mail_to' => $email,
			'body' => $Layout->getHtml()
		];

		return $Mailer->_sendMail($data,$Email,$SendGrid);
    }

    return false;
}

echo json_encode($data);