<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";
// require_once TO_ROOT .'/vendor2/autoload.php';

// $public_key = 'cebe7cb0a97ae5dde4ea7ae4f263cce8440d1c4a5278d7112e1348e04313bd18';
// $private_key = '3f5bA70eF5E0B25eb1cd039571C0D58F90c3d11a97A65DF0C3a788cc0f8E2029';

// // Create a new API wrapper instance and call to the get basic account information command.
// try {
// 	$cps_api = new CoinpaymentsAPI($private_key, $public_key, 'json');
// 	// $information = $cps_api->GetBasicInfo();
	
// 	$req = 'CPGG13BAZT5QCEVGB2E08FOIMH';
// 	$result = $cps_api->GetTxInfoSingle($req);
	
// 	if ($result['error'] == 'ok') {
// 		echo "<pre>";
// 		print_r($result);die;
// 		$le = php_sapi_name() == 'cli' ? "\n" : '<br />';
// 		print 'Transaction created with ID: '.$result['result']['txn_id'].$le;
// 		print 'Buyer should send '.sprintf('%.08f', $result['result']['amount']).' BTC'.$le;
// 		print 'Status URL: '.$result['result']['status_url'].$le;
// 	} else {
// 		print 'Error: '.$result['error']."\n";
// 	}
// } catch (Exception $e) {
// 	echo 'Error: ' . $e->getMessage();
// 	exit();
// }

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

$UserLogin->checkRedirection();

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::AddFunds;
$Layout->init(JFStudio\Router::getName($route),'addFunds',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'addFunds.vue.js'
]);

$Layout->setVar([
	'route' =>  $route,
	'UserLogin' => $UserLogin
]);
$Layout();