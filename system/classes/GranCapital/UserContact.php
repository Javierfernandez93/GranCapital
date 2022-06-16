<?php

namespace FSA;

use HCStudio\Orm;

class UserContact extends Orm {
  protected $tblName  = 'user_contact';

  public function __construct() {
    parent::__construct();
  }
}