<?php
$id = $_POST["id"];

$url = "http://192.168.100.2:3002/nodo/$id";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
if ($response === false) {
  header("Location:index.html");
}
curl_close($ch);

header("Location:borrar_Nodo.php");
?>
