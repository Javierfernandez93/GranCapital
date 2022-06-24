<?php

namespace GranCapital;

use HCStudio\Orm;

class WithdrawPerUser extends Orm
{
    const WAITING_FOR_DEPOSIT = 1;
    const DEPOSITED = 2;
    protected $tblName  = 'withdraw_per_user';

    public function __construct()
    {
        parent::__construct();
    }

    public function doWithdraw(int $transaction_per_wallet_id = null,int $withdraw_method_id = null) : bool
    {
        if(isset($transaction_per_wallet_id,$withdraw_method_id) === true)
        {
            $WithdrawPerUser = new WithdrawPerUser;
            $WithdrawPerUser->transaction_per_wallet_id = $transaction_per_wallet_id;
            $WithdrawPerUser->withdraw_method_id = $withdraw_method_id;
            $WithdrawPerUser->status = self::WAITING_FOR_DEPOSIT;
            $WithdrawPerUser->create_date = time();

            return $WithdrawPerUser->save();
        }

        return false;
    }
}
