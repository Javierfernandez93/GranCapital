<?php

use Firebase\JWT\JWT;

 define("TO_ROOT", "../../");

require_once TO_ROOT. "/system/core.php";

$start_date = strtotime('2022-06-13');
$diff_days = round((time() - $start_date) / (60 * 60 * 24));

if($diff_days > 0)
{
    for($i = 0; $i < $diff_days; $i++)
    {
        // echo "day {$i} {$day} <br>";
        $day = date("Y-m-d 09:00:00",strtotime("+{$i} days",$start_date));

        $Curl = new JFStudio\Curl;
        $Curl->get('http://localhost:8888/grancapital/app/cronjob/disperse_gains.php',[
            'day' => $day,
            'user_login_id' => 32
        ]);
        
        $responses[] = [
            'day' => $day,
            'response' => $Curl->getResponse(true)
        ];
    }

    d($responses);
}
