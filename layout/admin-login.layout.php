<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Financiera San Andrés | Tu mejor opción" name="description" />
    <meta name="author" content="<?php echo HCStudio\Connection::$proyect_name;?> all rights reserved 2022">
    <meta name="HandheldFriendly" content="True" />
    <meta name="theme-color" content="#2D2250">   
    
    %metadata%
    <title>%title%</title>
    <!-- Bootstrap core CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    
    <link rel="shortcut icon" type="image/png" href="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/img/favicon.png"/>

    <!-- Custom styles for this template -->
    <script src="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/js/jquery-3.1.1.js" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/js/alertCtrl.js" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/js/general.js" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/js/boxloader.js" type="text/javascript"></script>
    <script src="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/js/http.js" type="text/javascript"></script>
    
    %js_scripts%
    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    
    <!-- css styles -->
    <link href="<?php echo HCStudio\Connection::$protocol;?>://<?php echo HCStudio\Connection::$proyect_url;?>/src/css/loader.css" rel="stylesheet">
    %css_scripts%
  </head>

  <body class="h-100">
    %content% 
    
    <footer class="text-center py-4 small">
      Todos los Derechos Reservados <?php echo date("Y");?> by <?php echo HCStudio\Connection::$proyect_name;?>®
    </footer>
  </body>
</html>
