<?php

namespace GranCapital;

use HCStudio\Orm;

class TradingPerformance extends Orm
{
    protected $tblName = 'trading_performance';
    public function __construct()
    {
        parent::__construct();
    }

    public static function addPerformance(float $performance = null, string $day = null): bool
    {
        $TradingPerformance = new TradingPerformance;

        if ($trading_performance_id = $TradingPerformance->getPerformancePerDay($day)) {
            $TradingPerformance->cargarDonde("trading_performance_id = ?", $trading_performance_id);
        } else {
            $TradingPerformance->create_date = strtotime(date("Y-m-d 23:59:59", strtotime($day)));
        }

        $TradingPerformance->performance = $performance;

        return $TradingPerformance->save();
    }

    public function getPerformancePerDay(string $day = null)
    {
        if (isset($day) === true) {
            $begin_of_day = strtotime(date("Y-m-d 00:00:00", strtotime($day)));
            $end_of_day = strtotime(date("Y-m-d 23:59:59", strtotime($day)));

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
                    ";

            return $this->connection()->field($sql);
        }

        return false;
    }

    public function getAllPerformancesByDays()
    {
        $sql = "SELECT 
                    {$this->tblName}.{$this->tblName}_id,
                    {$this->tblName}.performance,
                    {$this->tblName}.create_date
                FROM 
                    {$this->tblName}
                WHERE 
                    {$this->tblName}.status = '1'
                GROUP BY 
                    {$this->tblName}.create_date
                ORDER BY 
                    {$this->tblName}.create_date
                ASC 
                ";

        return $this->connection()->rows($sql);
    }

    public function getAll()
    {
        $sql = "SELECT 
					{$this->tblName}.{$this->tblName}_id,
					{$this->tblName}.name,
					{$this->tblName}.profit
				FROM 
					{$this->tblName}
				WHERE 
					{$this->tblName}.status = '1'
				";

        return $this->connection()->rows($sql);
    }
}
