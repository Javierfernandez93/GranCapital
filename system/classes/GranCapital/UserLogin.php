<?php

namespace FSA;

use HCStudio\Orm;

class UserLogin extends Orm {
  protected $tblName  = 'user_login';
  public static $DEFAULT_PASSWORD = 123;
  public static $DELETED = -1;

  public static $ALL = 2;
  public static $VERIFIED = 1;
  public static $PENDING = 0;
  public static $REJECTED = -1;
  public function __construct() {
    parent::__construct();
  }

  public function getSingupDate(int $user_login_id = null) 
  {
    if (isset($user_login_id) === true) 
    {
      $sql = "SELECT 
                {$this->tblName}.signup_date
              FROM 
                {$this->tblName}
              WHERE 
                {$this->tblName}.user_login_id = '{$user_login_id}'
              ";

      return $this->connection()->field($sql);
    }

    return false;
  }

  public function getDefaultPassword() {
    return sha1(self::$DEFAULT_PASSWORD);
  }
}