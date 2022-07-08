<?php

namespace GranCapital;

use HCStudio\Orm;

class GainPerBroker extends Orm {
	protected $tblName = 'gain_per_broker';
	public function __construct() {
		parent::__construct();
	}

	public function getGainPerDay(int $broker_id = null,string $day = null)
	{
        if(isset($broker_id) === true)
        {
            $begin_of_day = strtotime(date("Y-m-d 00:00:00",strtotime($day)));
            $end_of_day = strtotime(date("Y-m-d 23:59:59",strtotime($day)));
            
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

    public function getGainsPerDay(string $day = null)
    {
        $result = 0;

        if($gains_per_day = $this->_getGainsPerDay($day))
        {
            $result = array_reduce($gains_per_day, function($carry,$item){
                $carry += $item['fee'] > 0 ? $item['gain'] * $item['fee'] : $item['gain']; 

                return $carry;
            });
        }

        return $result;
    }

    public function _getGainsPerDay(string $day = null)
	{
        if(isset($day) === true)
        {
            $begin_of_day = strtotime(date("Y-m-d 00:00:00",strtotime($day)));
            $end_of_day = strtotime(date("Y-m-d 23:59:59",strtotime($day)));
            
            $sql = "SELECT
                        {$this->tblName}.broker_id, 
                        SUM({$this->tblName}.gain) as gain,
                        broker.fee
                    FROM 
                        {$this->tblName}
                    LEFT JOIN
                        broker 
                    ON 
                        broker.broker_id = {$this->tblName}.broker_id
                    WHERE 
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.create_date
                    BETWEEN 
                        {$begin_of_day}
                    AND 
                        {$end_of_day}
                    GROUP BY 
                        {$this->tblName}.broker_id
                    ";
                    
            if($gains = $this->connection()->rows($sql))
            {
                return $gains;
            }
        }

        return false;
	}
    
    public function getAllGains()
	{
        $result = 0;

        if($gains_per_day = $this->_getAllGains())
        {
            $result = array_reduce($gains_per_day, function($carry,$gain){
                $carry += $gain['fee'] > 0 ? $gain['gain'] * $gain['fee'] : $gain['gain']; 

                return $carry;
            });
        }

        return $result;
	}
    
    public function _getAllGains()
	{
        $sql = "SELECT 
                    SUM({$this->tblName}.gain) as gain,
                    broker.broker_id,
                    broker.fee
                FROM 
                    {$this->tblName}
                LEFT JOIN   
                    broker 
                ON 
                    broker.broker_id = {$this->tblName}.broker_id
                WHERE 
                    {$this->tblName}.status = '1'
                GROUP BY 
                    {$this->tblName}.broker_id
                ";
                
        return $this->connection()->rows($sql);
	}
	
    public static function addGain(int $broker_id = null,float $gain = null,string $day = null) : bool
    {
        $GainPerBroker = new GainPerBroker;
            
        if($gain_per_broker_id = $GainPerBroker->getGainPerDayId($broker_id,$day))
        {
            $GainPerBroker->cargarDonde("gain_per_broker_id = ?",$gain_per_broker_id);
        } else {
            $GainPerBroker->broker_id = $broker_id;
            $GainPerBroker->create_date = strtotime(date("Y-m-d 23:59:59",strtotime($day)));
        }

        $GainPerBroker->gain = $gain;

        return $GainPerBroker->save();
    }

    public function getGainPerDayId(int $broker_id = null,string $day = null)
	{
        if(isset($broker_id) === true)
        {
            $begin_of_day = strtotime(date("Y-m-d 00:00:00",strtotime($day)));
            $end_of_day = strtotime(date("Y-m-d 23:59:59",strtotime($day)));
        
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
    
    public function getAllGainsPerBroker(int $broker_id = null)
	{
        if(isset($broker_id) === true)
        {
            $sql = "SELECT 
                        {$this->tblName}.gain
                    FROM 
                        {$this->tblName}
                    WHERE 
                        {$this->tblName}.status = '1'
                    AND 
                        {$this->tblName}.broker_id = '{$broker_id}'
                    ";
            
            return $this->connection()->column($sql);
        }

        return false;
	}
}