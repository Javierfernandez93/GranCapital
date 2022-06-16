<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === true) {
    HCStudio\Util::redirectTo(TO_ROOT."/apps/backoffice/");
}

$Layout = JFStudio\Layout::getInstance();

$Layout->init('Recuperar contraseña','forgotPassword',"two_columns",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
    'login.css',
    'forgotPassword.vue.js'
]);

$Layout->setVar([
	'UserLogin' => $UserLogin,
]);
$Layout();