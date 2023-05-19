<?php
$id = $_POST["id"];

$url = "http://172.190.52.193:3001/usuario/$id";

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

header("Location:borrar_usuario.php");
?>
