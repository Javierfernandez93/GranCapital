<?php

namespace GranCapital;

use HCStudio\Orm;
use HCStudio\Util;

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
    // $rest_days = date("t") - date("d");
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

    return $ProfitPerUser->save();
  }

  public function hasProfitToday($user_plan_id = null) 
  {
    if(isset($user_plan_id) === true)
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