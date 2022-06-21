<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserSupport = new GranCapital\UserSupport;

if($UserSupport->_loaded === false) {
	HCStudio\Util::redirectTo('../../apps/admin-login/');
}

if($UserSupport->hasPermission('list_admin_stats') === false) {
	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');
}

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AdminUsers;
$Layout->init(JFStudio\Router::getName($route),"index","admin","",TO_ROOT."/");

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'adminUsers.vue.js',
	'userSupport.module.js'
]);

$Layout->setVar([
	'route' => $route,
	'UserSupport' => $UserSupport
]);
$Layout();