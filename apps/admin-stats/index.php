<?php define("TO_ROOT", "../..");require_once TO_ROOT . "/system/core.php";$Layout = JFStudio\Layout::getInstance();$Layout->init(" » Estadísticas","index","admin","",TO_ROOT."/");$UserSupport = new FSA\UserSupport;if($UserSupport->_loaded === false) {	HCStudio\Util::redirectTo('../../apps/admin-login/');}if($UserSupport->hasPermission('list_admin_stats') === false) {	HCStudio\Util::redirectTo('../../apps/admin/invalid_permission');}$Layout->setScriptPath(TO_ROOT . '/src/');$Layout->setScript(['admin-stats.js']);$Layout->setVar([	'UserSupport' => $UserSupport]);$Layout();