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
	
    public function getTodayCapital(int $broker_id = null)
	{
        if(isset($broker_id) === true)
        {
            $begin_of_day = strtotime("today");
            $end_of_day = strtotime("tomorrow") - 1;

            $sql = "SELECT 
                        {$this->tblName}.{$this->tblName}_id
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.broker_id = '{$broker_id}'
                    AND 
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.create_date
                    BETWEEN 
                        {$begin_of_day}
                    AND 
                        {$end_of_day}
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
	}
}