<?php

namespace GranCapital;

use HCStudio\Orm;

class UserPlan extends Orm {
  protected $tblName  = 'user_plan';

  public function __construct() {
    parent::__construct();
  }

  public function hasPlan($user_login_id = null) : bool
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->field($sql) ? true : false;
    }

    return false;
  }

  public function getPlan($user_login_id = null) 
  {
    if(isset($user_login_id) === true)
    {
      $sql = "SELECT
                {$this->tblName}.{$this->tblName}_id,
                catalog_plan.name
              FROM 
                {$this->tblName}
              LEFT JOIN 
                catalog_plan 
              ON 
                catalog_plan.catalog_plan_id = {$this->tblName}.catalog_plan_id
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              AND 
                {$this->tblName}.status = '1'
              ";

      return $this->connection()->row($sql);
    }

    return false;
  }
}