<?php

namespace GranCapital;

use HCStudio\Orm;

class CatalogCurrency extends Orm {
	protected $tblName = 'catalog_currency';
	public function __construct() {
		parent::__construct();
	}

	public function getAll()
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.currency,
					{$this->tblName}.code
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";
		
		return $this->connection()->rows($sql);
	}
}