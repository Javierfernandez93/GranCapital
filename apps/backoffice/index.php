<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

// $UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$Layout->init('Oficina virtual','index',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['notifications.css','backoffice.js']);

$Layout->setVar([
	'black_theme'=>true,
	'nav'=>'backoffice',
	'SettingServerPerUser' => $SettingServerPerUser,
	'UserLogin' => $UserLogin,
	'init' => true,
	'user_login' => $UserLogin->getId()
]);
$Layout();