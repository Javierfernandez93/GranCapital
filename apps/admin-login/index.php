<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$Layout = JFStudio\Layout::getInstance();
$Layout->init(" » Ingresar","index","admin-login","",TO_ROOT."/");

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === true) {
	HCStudio\Util::redirectTo('../../apps/admin/');
}

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript(['admin-login.*']);

$Layout->setVar("UserSupport",$UserSupport);
$Layout();