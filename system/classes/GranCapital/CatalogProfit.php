<?php

namespace GranCapital;

use HCStudio\Orm;

class CatalogProfit extends Orm {
    const INVESTMENT = 1;
    const REFERRAL_INVESTMENT = 2;
	protected $tblName = 'catalog_profit';
	public function __construct() {
		parent::__construct();
	}
}