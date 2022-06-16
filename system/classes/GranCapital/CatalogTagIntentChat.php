<?php

namespace FSA;

use HCStudio\Orm;

class CatalogTagIntentChat extends Orm {
    protected $tblName  = 'catalog_tag_intent_chat';
    public function __construct() {
        parent::__construct();
    }
}