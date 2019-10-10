<?php

$data = file_get_contents('data-1.json');
$data= json_decode($data,true);

$ciudad=$_GET["ciudad"];
$tipo=$_GET["tipo"];
$precioI=(float)$_GET["precioI"];
$precioF=(float)$_GET["precioF"];


$enviar =[];
$actual = '';

if($ciudad !="todos"){

    $actual = "ciudad";

    if ( $tipo != "todos") {
        
        $actual = "ciudad y tipo";

    }

}else if ($tipo != "todos") {
 
         
        $actual = "tipo";
    
}else {
    $actual = "todos";
}


switch ($actual) {
    case "ciudad":
    
    

    foreach ($data as $key  => $value) {
        $num= substr ( $value["Precio"] , 1  );
        $num=str_replace( ",","",$num);
        if($ciudad==$value["Ciudad"] && $num>$precioI && $num<$precioF ){
            
            array_push($enviar,$value);
    }
}
        break;
    
    case "ciudad y tipo":
    
    foreach ($data as $key  => $value) {
        $num= substr ( $value["Precio"] , 1  );
        $num=str_replace( ",","",$num);
        
        if ($ciudad==$value["Ciudad"] && $tipo==$value["Tipo"] && $num>$precioI && $num<$precioF) {

            array_push($enviar,$value);
 
        }
    }
        break;
   
    case "tipo":

    foreach ($data as $key  => $value) {
        $num= substr ( $value["Precio"] , 1  );
        $num=str_replace( ",","",$num);
        if($ciudad==$value["Tipo"] && $num>$precioI && $num<$precioF){
            echo implode(",",$enviar);
            echo implode(",",$value);
            $enviar=array_push($enviar,$value);
        }
    }
        break;
    case "todos":
        $enviar=$data;

        break;
    default:
        

        break;
}

/*
$num= substr ( $data[0]["Precio"] , 1  );
echo str_replace( ",","",$num);*/
echo json_encode($enviar);



?>