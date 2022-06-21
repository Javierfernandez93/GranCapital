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
        require_once TO_ROOT . '/vendor/autoload.php';
        
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);

        try {
            $Layout = JFStudio\Layout::getInstance();
            $Layout->init("","recoverPassword","mail",TO_ROOT.'/apps/applications/',TO_ROOT.'/');

            $Layout->setScriptPath(TO_ROOT . '/apps/admin/src/');
    		$Layout->setScript(['']);

            $Layout->setVar([
                "email" => $email,
                "token" => $token
            ]);

           //Server settings
            $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_OFF;                      //Enable verbose debug output
            // $mail->SMTPDebug = PHPMailer\PHPMailer\SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP(); //Send using SMTP
            // $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            $mail->Host = 'smtp.gmail.com'; //Set the SMTP server to send through
            $mail->SMTPAuth = true; //Enable SMTP authentication
            $mail->Username = 'grancapitalfound@gmail.com';
            $mail->Password = 'thntkfhgfpmxwxzx            ';
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS; // Enable implicit TLS encryption
            $mail->Port = 587; // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //Recipients
            $mail->setFrom('grancapitalfound@gmail.com', 'GranCapital');
            $mail->addAddress($email, 'Joe PHPMailer\PHPMailer\PHPMailerUser');     //Add a recipient

            //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->CharSet = 'UTF-8';
            $mail->Subject = "Recuperar contraseña";
            $mail->Body = $Layout->getHtml();
            $mail->AltBody = strip_tags($Layout->getHtml());

            return $mail->send();
        } catch (Exception $e) {
            
        }
    }

    return false;
}

echo json_encode($data);