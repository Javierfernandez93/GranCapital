<?php

namespace GranCapital;

use HCStudio\Orm;
use HCStudio\Util;

use GranCapital\UserPlan;
use GranCapital\UserWallet;

class ProfitPerUser extends Orm {
  protected $tblName  = 'profit_per_user';

  public function __construct() {
    parent::__construct();
  }

  public function getProfits($user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                {$this->tblName}.create_date,
                {$this->tblName}.profit,
                catalog_profit.name
              FROM 
                {$this->tblName}
              LEFT JOIN
                user_plan 
              ON 
                user_plan.user_plan_id = {$this->tblName}.user_plan_id
              LEFT JOIN
                catalog_profit 
              ON 
                catalog_profit.catalog_profit_id = {$this->tblName}.catalog_profit_id
              WHERE 
                user_plan.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->rows($sql);
    }

    return false;
  }
  
  public function calculateProfit(float $profit = null,float $ammount = null) 
  {
    $days_in_month = 20;
    $day_profit = $profit/$days_in_month;

    return Util::getPercentaje($ammount,$day_profit);
  }

  public function insertGain(int $user_plan_id = null,int $catalog_profit_id = null,float $profit = null) : bool
  {
    $ProfitPerUser = new ProfitPerUser;
    $ProfitPerUser->user_plan_id = $user_plan_id;
    $ProfitPerUser->catalog_profit_id = $catalog_profit_id;
    $ProfitPerUser->profit = $profit;
    $ProfitPerUser->create_date = time();

    if($ProfitPerUser->save())
    {
      $UserPlan = new UserPlan;

      if($user_login_id = $UserPlan->getUserId($user_plan_id))
      {
        $UserWallet = new UserWallet;

        if($UserWallet->getSafeWallet($user_login_id))
        {
          return $UserWallet->doTransaction($profit,$catalog_profit_id,$ProfitPerUser->getId());
        }
      }
    }

    return false;
  }

  public function hasProfitToday(int $user_plan_id = null,int $catalog_profit_id = null) 
  {
    if(isset($user_plan_id,$catalog_profit_id) === true)
    {
      $begin_of_day = strtotime("today");
      $end_of_day = strtotime("tomorrow") - 1;

      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_plan_id = '{$user_plan_id}'
              AND 
                {$this->tblName}.catalog_profit_id = '{$catalog_profit_id}'
              AND 
                {$this->tblName}.create_date
              BETWEEN 
                {$begin_of_day}
              AND 
                {$end_of_day}
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }
}