<?php

namespace GranCapital;
    
use HCStudio\Orm;

use GranCapital\Transaction;

class TransactionPerWallet extends Orm {
    protected $tblName = 'transaction_per_wallet';

    public function __construct() {
       parent::__construct();
    }

    public function doTransaction(int $user_wallet_id = null,float $ammount = null,int $transaction_id = null, $profit_per_user_id = null,bool $load_previus = false) 
    {
        if(isset($user_wallet_id,$ammount,$transaction_id) === true)
        {
            $TransactionPerWallet = new TransactionPerWallet;

            if($load_previus)
            {
                $TransactionPerWallet->cargarDonde("user_wallet_id = ? AND transaction_id = ?",[$user_wallet_id,$transaction_id]);
            }
            
            $TransactionPerWallet->user_wallet_id = $user_wallet_id;
            $TransactionPerWallet->ammount = $ammount;
            $TransactionPerWallet->transaction_id = $transaction_id;
            $TransactionPerWallet->profit_per_user_id = $profit_per_user_id ? $profit_per_user_id : 0;
            $TransactionPerWallet->create_date = time();

            if($TransactionPerWallet->save())
            {
                return $TransactionPerWallet->getId();
            }
        }

        return false;
    }
   
    public function getBalance(int $user_wallet_id = null,string $filter = '') : float
    {
        if(isset($user_wallet_id) === true)
        {
            $sql = "SELECT 
                        SUM({$this->tblName}.ammount) as balance
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.user_wallet_id = '{$user_wallet_id}'
                    AND 
                    {$this->tblName}.status IN ('".WithdrawPerUser::DEPOSITED."','".WithdrawPerUser::WAITING_FOR_DEPOSIT."')
                        {$filter}
                    ";
                    
            if($ammount = $this->connection()->field($sql))
            { 
                return $ammount;
            }
        }

        return 0;
    }
    
    public function getWithdraws(int $user_wallet_id = null, string $filter = null)
    {
        if(isset($user_wallet_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.ammount,
                        {$this->tblName}.create_date,
                        withdraw_per_user.status
                    FROM 
                        {$this->tblName}
                    LEFT JOIN
                        withdraw_per_user
                    ON 
                        withdraw_per_user.transaction_per_wallet_id = {$this->tblName}.transaction_per_wallet_id
                    WHERE 
                        {$this->tblName}.user_wallet_id = '{$user_wallet_id}'
                    AND 
                        {$this->tblName}.transaction_id = '".Transaction::WITHDRAW."'
                    AND 
                        {$this->tblName}.status IN ('".WithdrawPerUser::DEPOSITED."','".WithdrawPerUser::WAITING_FOR_DEPOSIT."')
                        {$filter}
                    ";

            return $this->connection()->rows($sql);
        }

        return false;
    }
    
    public function getSum(string $filter = '')
    {
        $sql = "SELECT 
                SUM({$this->tblName}.ammount) as a
            FROM 
                {$this->tblName}
                {$filter}
            AND 
                {$this->tblName}.status IN ('1')
            ";

        if($total = $this->connection()->field($sql))
        {
            return $total;
        }

        return 0;
    }

    public function getAllDeposits()
    {
        return $this->getSum("WHERE {$this->tblName}.transaction_id = '".Transaction::DEPOSIT."'");
    }

    public function getAllWithdraws()
    {
        return $this->getSum("WHERE {$this->tblName}.transaction_id = '".Transaction::WITHDRAW."'");
    }

    public function getAllProfits()
    {
        return $this->getSum("WHERE {$this->tblName}.transaction_id IN ('".Transaction::INVESTMENT."','".Transaction::REFERRAL_INVESTMENT."')");
    }
}