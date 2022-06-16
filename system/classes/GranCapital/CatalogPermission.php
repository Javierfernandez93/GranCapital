<?php

namespace GranCapital;

use HCStudio\Orm;
use HCStudio\Util;

class CatalogPermission extends Orm {
	protected $tblName = 'catalog_permission';
	public function __construct() {
		parent::__construct();
	}

	public function getCatalogPermissionId($permission = null)
	{
		if(isset($permission) === true)
		{
			$sql = "SELECT 
						{$this->tblName}.{$this->tblName}_id
					FROM 
						{$this->tblName}
					WHERE 
						{$this->tblName}.permission = '{$permission}'
					";
			
			return $this->connection()->field($sql);
		}

		return false;
	}

	public function getAll()
	{
		$sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.permission,
					{$this->tblName}.description
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";
		
		return $this->connection()->rows($sql);
	}
}