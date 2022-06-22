<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

$user_support_id = HCStudio\Util::getVarFromPGS('usid');

if($user_support_id && $UserSupport->hasPermission('list_clients_per_seller') === false) 
{
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

if($UserSupport->hasPermission('list_client') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$route = JFStudio\Router::AdminBrokers;
$Layout = JFStudio\Layout::getInstance();
$Layout->init(JFStudio\Router::getName($route),"index","admin","",TO_ROOT."/");


$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'adminBrokers.vue.js'
]);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();