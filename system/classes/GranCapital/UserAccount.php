<?php

namespace FSA;

use HCStudio\Orm;

class UserAccount extends Orm {
  protected $tblName  = 'user_account';

  public function __construct() {
    parent::__construct();
  }
}