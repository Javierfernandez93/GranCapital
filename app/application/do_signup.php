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

            if(sendEmailSponsor($data['email'],$data['names']))
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
        require_once TO_ROOT . '/vendor/autoload.php';
        
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("","welcome","mail",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $Layout->setVar([
                "email" => $email,
                "names" => $names
            ]);

            //Server settings
            // $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;                      //Enable verbose debug output
            $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;                      //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            $mail->SMTPSecure = 'tls';
            $mail->Host = 'smtp.dreamhost.com'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'noreply@zuum.link';
            $mail->Password = 'vIX8gB5kQZtSVncR';
            // $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
            $mail->Port = 465; // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('grancapitalfound@gmail.com', 'GranCapital');
            $mail->addAddress($email, $names);     //Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->CharSet = 'UTF-8';
            $mail->Subject = "Bienvenido a Gran Capital";
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

function sendEmailSponsor(string $email = null,string $names = null) : bool
{
    if(isset($email,$names) === true)
    {
        require_once TO_ROOT . '/vendor/autoload.php';
        
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("","welcome","mail",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $Layout->setVar([
                "email" => $email,
                "names" => $names
            ]);

            //Server settings
            // $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;                      //Enable verbose debug output
            $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            $mail->SMTPSecure = 'tls';
            $mail->Host = 'smtp-relay.sendinblue.com'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'javier.fernandez.pa93@gmail.com';
            $mail->Password = 'YvCZ5jQSdGKWB98z';
            // $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
            $mail->Port = 587; // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('grancapitalfound@gmail.com', 'GranCapital');
            $mail->addAddress($email, $names);     //Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->CharSet = 'UTF-8';
            $mail->Subject = "Bienvenido a Gran Capital";
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

echo json_encode($data);