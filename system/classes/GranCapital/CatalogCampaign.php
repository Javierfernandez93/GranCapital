<?php

namespace GranCapital;

use HCStudio\Orm;

class CatalogCampaign extends Orm {
	protected $tblName = 'catalog_campaing';
	public function __construct() {
		parent::__construct();
	}

	public function getCatalogCampaing(string $utm = null)
	{
		if(isset($utm) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.utm = '{$utm}'
					AND 
						{$this->tblName}.status = '1'
					";
			
			return $this->connection()->field($sql);
		}

		return false;
	}
}