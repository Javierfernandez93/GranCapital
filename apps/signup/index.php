<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === true) {
	HCStudio\Util::redirectTo(TO_ROOT . "/apps/backoffice/");
}

$Session = new HCStudio\Session('sponsor');
 
$Layout = JFStudio\Layout::getInstance();
$Layout->init("Regístrate","index","two_columns","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'jquery.mask.js',
	'signup.vue.js',
	'signup.css'
]);

$sponsor_id = $Session->get('sponsor_id');

if(!empty(HCStudio\Util::getVarFromPGS('sponsor_id'))) {
	$sponsor_id = HCStudio\Util::getVarFromPGS('sponsor_id');
}

$Layout->setVar([
	"nav"=>'plan',
	"black_theme"=>true,
	'UserLogin' => $UserLogin,
	'sponsor_id' => $sponsor_id,
	'Country' => (new World\Country)
]);

$Layout();