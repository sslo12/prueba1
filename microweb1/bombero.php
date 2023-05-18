<?php
     session_start();
     $us=$_SESSION["usuario"];
     if ($us==""){
         header("Location: index.html"); }
?>
<!DOCTYPE html> 
<html lang="en"> 
<head> 
     <meta charset="UTF-8"> 
     <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
     <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"> 
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> 
    <title>Document</title> 
</head>
<body>  
    <nav class="navbar navbar-expand-lg navbar-light bg-light"> 
    <div class="container-fluid"> 
        <a class="navbar-brand" href="index.html">KITCHEN</a> 
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation"> 
        <span class="navbar-toggler-icon"></span> 
        </button> 
        <div class="collapse navbar-collapse" id="navbarText"> 
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"> 
            <li class="nav-item"> 
            <a class="nav-link active" aria-current="page" href="admin.php">Usuarios</a> 
            </li> 
        </ul> 
        <span class="navbar-text"> 
            <?php echo $us; ?> 
        </span> 
        </div> 
    </div> 
    </nav> 
    <table class="table"> 
    <thead> 
        <tr> 
        <th scope="col">usuario</th> 
        <th scope="col">telefono1</th> 
        <th scope="col">telefono2</th>
        <th scope="col">direccion</th> 
        <th scope="col">id Alerta</th> 
        <th scope="col">tiempo</th> 
        <th scope="col">estado</th>
        <th scope="col">tipo</th> 
        </tr> 
    </thead> 
    <tbody> 
    <?php 
       $servurl="http://192.168.100.2:3003/alertas/bombero";
       $curl=curl_init($servurl);
       
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
       $response=curl_exec($curl);
       if ($response===false){
       curl_close($curl);
       die("Error en la conexion");
       }
       curl_close($curl);
       $resp=json_decode($response);
       $long=count($resp);
       for ($i=0; $i<$long; $i++){
       $dec=$resp[$i];
       
       $usuario=$dec ->usuario;
       $telefono1=$dec->telefono1;
       $telefono2=$dec->telefono2;
       $direccion=$dec->direccion;
       $id=$dec ->id;
       $id_nodo=$dec->id_nodo;
       $tiempo=$dec->tiempo;
       $estado=$dec->estado;
       $tipo=$dec->tipo;

       ?>
       <tr>
       <td><?php echo $usuario; ?></td>
       <td><?php echo $telefono1; ?></td>
       <td><?php echo $telefono2; ?></td>
       <td><?php echo $direccion; ?></td>
       <td><?php echo $id; ?></td>
       <td><?php echo $tiempo; ?></td>
       <td><?php echo $estado; ?></td>
       <td><?php echo $tipo; ?></td>
       </tr>
       <?php
        } 
    ?> 
    </tbody> 
    </table> 
    
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> 
        ACTUALIZAR ALERTAS
    </button> 
    <div class="modal" id="exampleModal" tabindex="-1"> 
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
        <div class="modal-content"> 
        <div class="modal-header"> 
            <h5 class="modal-title">ACTUALIZAR ESTADO DE ALERTAS</h5> 
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
        </div> 
        <div class="modal-body"> 
            <form action="modificar_alertas.php" method="post"> 
            <div class="mb-3"> 
                <label for="exampleInputEmail1" class="form-label">ID</label> 
                <input type="text" name="id" class="form-control" id="exampleInputEmail1"> 
            </div> 
            <div class="mb-3"> 
                <label class="form-label">ESTADO</label> 
                <select name="estado" id="estado" class="form-control"> 
                    <option>activo</option>
                    <option>inactivo</option>
                </select>
            </div> 
            <div class="modal-footer"> 
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button> 
                <button type="submit" class="btn btn-primary">ACTUALIZAR</button> 
            </div> 
            </div> 
        </div> 
        </div> 

        
        
</body>
