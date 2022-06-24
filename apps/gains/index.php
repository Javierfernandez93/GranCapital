<?php define("TO_ROOT", "../..");

require_once TO_ROOT . "/system/core.php";

$UserLogin = new GranCapital\UserLogin;

if($UserLogin->_loaded === false) {
	HCStudio\Util::redirectTo(TO_ROOT."/apps/login/");
}

$UserLogin->checkRedirection();

// $ProfitPerUser = new GranCapital\ProfitPerUser;
// for($i = 0; $i < 24; $i++)
// {
// 	$transaction_id = rand(1,2);
// 	$ammount = rand(40,90);
// 	$ProfitPerUser->insertGain(1,$transaction_id,$ammount);
// }

// $ProfitPerUser->insertGain(1,GranCapital\Transaction::INVESTMENT,25);
// $ProfitPerUser->insertGain(1,GranCapital\Transaction::REFERRAL_INVESTMENT,45);
// $UserWallet = new GranCapital\UserWallet;
// $UserWallet->cargarDonde("user_login_id = ?",1);
// d($UserWallet->getBalance());
// var_dump($UserWallet->doTransaction(150,GranCapital\Transaction::WITHDRAW));

$Layout = JFStudio\Layout::getInstance();

$route = JFStudio\Router::Gains;
$Layout->init(JFStudio\Router::getName($route),'index',"backoffice",'',TO_ROOT.'/');

$Layout->setScriptPath(TO_ROOT . '/src/');
$Layout->setScript([
	'user.module.js',
	'gains.vue.js'
]);

$Layout->setVar([
	'route' =>  $route,
	'UserLogin' => $UserLogin
]);
$Layout();