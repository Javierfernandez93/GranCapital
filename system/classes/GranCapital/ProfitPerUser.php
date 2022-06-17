<?php

namespace GranCapital;

use HCStudio\Orm;

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
}