<?php
$user=$_POST["usuario"];
$pass=$_POST["password"];
$servurl="http://192.168.100.2:3000/usuarios/$user/$pass";
$curl=curl_init($servurl);

curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response=curl_exec($curl);
curl_close($curl);
if ($response===false){
header("Location:index.html");
}
$resp = json_decode($response);
$result = $resp[0];
$tipo_usuario = $result -> tipo_usuario;

                
if (count($resp) != 0){
session_start();
$_SESSION["usuario"]=$user;
if ($tipo_usuario == "admin"){ 
header("Location:admin.php");
} 
elseif ($tipo_usuario == "bombero") {
header("Location:bombero.php");

}
else { 
header("Location:usuario.php");
} 
}
else {
header("Location:index.html"); 
}
?>
