<?php define("TO_ROOT", "../..");require_once TO_ROOT . "/system/core.php";$Layout = JFStudio\Layout::getInstance();$Layout->init(" » Administración","index","admin","",TO_ROOT."/");$UserSupport = new FSA\UserSupport;if($UserSupport->_loaded === false) {	HCStudio\Util::redirectTo('../../apps/admin-login/');}if($UserSupport->hasPermission('list_admin_stats') === true) {	HCStudio\Util::redirectTo('../../apps/admin-stats/');} else {	HCStudio\Util::redirectTo('../../apps/admin-client/');}$Layout->setScriptPath(TO_ROOT . '/src/');$Layout->setScript(['']);$Layout->setVar([	'UserSupport' => $UserSupport]);$Layout();