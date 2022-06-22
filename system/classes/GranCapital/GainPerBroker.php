<?php

namespace GranCapital;

use HCStudio\Orm;

class GainPerBroker extends Orm {
	protected $tblName = 'gain_per_broker';
	public function __construct() {
		parent::__construct();
	}

	public function getGainPerDay(int $broker_id = null)
	{
        if(isset($broker_id) === true)
        {
            $begin_of_day = strtotime("today");
            $end_of_day = strtotime("tomorrow") - 1;
        
            $sql = "SELECT 
                        {$this->tblName}.gain
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.create_date
                    BETWEEN 
                        {$begin_of_day}
                    AND 
                        {$end_of_day}

                    AND 
                        {$this->tblName}.broker_id = '{$broker_id}'
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
	}
	
    public function getGainPerDayId(int $broker_id = null)
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
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.create_date
                    BETWEEN 
                        {$begin_of_day}
                    AND 
                        {$end_of_day}

                    AND 
                        {$this->tblName}.broker_id = '{$broker_id}'
                    ";
            
            return $this->connection()->field($sql);
        }

        return false;
	}
}