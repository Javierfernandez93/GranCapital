<?php

namespace GranCapital;

use HCStudio\Orm;

use GranCapital\TransactionPerWallet;
use GranCapital\WithdrawPerUser;

class UserWallet extends Orm
{
  protected $tblName  = 'user_wallet';

  public function __construct()
  {
    parent::__construct();
  }

  public function getSafeWallet(int $company_id = null): bool
  {
    if (!$this->cargarDonde("user_login_id = ?", $company_id)) {
      $this->user_login_id = $company_id;
      $this->create_date = time();
      return $this->save();
    }

    return true;
  }

  public function doTransaction(float $ammount, int $transaction_id = null, int $profit_per_user_id = null,int $withdraw_method_id = null)
  {
    if ($this->getId()) {
      $TransacionPerWallet = new TransactionPerWallet;

      switch ($transaction_id) {
        case Transaction::DEPOSIT:
          return $TransacionPerWallet->doTransaction($this->getId(), $ammount, $transaction_id, $profit_per_user_id, true);
        case Transaction::INVESTMENT:
          return $TransacionPerWallet->doTransaction($this->getId(), $ammount, $transaction_id, $profit_per_user_id);
        case Transaction::REFERRAL_INVESTMENT:
          return $TransacionPerWallet->doTransaction($this->getId(), $ammount, $transaction_id, $profit_per_user_id);
        case Transaction::WITHDRAW:
          if($transaction_per_wallet_id = $TransacionPerWallet->doTransaction($this->getId(), -$ammount, $transaction_id, $profit_per_user_id))
          {
            return (new WithdrawPerUser)->doWithdraw($transaction_per_wallet_id,$withdraw_method_id);
          }
        default:
          return false;
      }
    }

    return false;
  }

  public function getWithdraws(string $filter = null)
  {
    if ($this->getId()) {
      return (new TransactionPerWallet)->getWithdraws($this->getId(), $filter);
    }

    return false;
  }

  public function getBalance(string $filter = ''): float
  {
    if ($this->getId()) {
      return (new TransactionPerWallet)->getBalance($this->getId(), $filter);
    }

    return false;
  }
}
