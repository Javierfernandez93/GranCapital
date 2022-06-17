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
            if(sendEmail($data['email'],$data['names']))
            {
                $data['email_sent'] = true;
            }

            if($UserLogin->login($data['email'],sha1($data['password'])))
            {
                $data['s'] = 1;
                $data['r'] = 'LOGGED_OK';
            } else {
                $data['s'] = 0;
                $data['r'] = 'NOT_LOGGED';
            }
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

function sendEmail(string $email = null,string $names = null) : bool
{
    if(isset($email,$names) === true)
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
			"names" => $names
		]);

	  	$data = [
	  		"subject" => "Bienvenido a bordo",
	  		'mail_from' => 'admin@grancapital.found',
	  		'name_from' => 'Gran Capital',
			'name_to' => $names,
			'mail_to' => $email,
			'body' => $Layout->getHtml()
		];

		return $Mailer->_sendMail($data,$Email,$SendGrid);
    }

    return false;
}

echo json_encode($data);