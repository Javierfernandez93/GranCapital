<?php

namespace GranCapital;

use HCStudio\Orm;

class CapitalPerBroker extends Orm {
	protected $tblName = 'capital_per_broker';
	public function __construct() {
		parent::__construct();
	}

	public function getAll(int $broker_id = null)
	{
        if(isset($broker_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id,
                        {$this->tblName}.capital,
                        {$this->tblName}.create_date
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.broker_id = '{$broker_id}'
                    ";
            
            return $this->connection()->rows($sql);
        }

        return false;
	}
}