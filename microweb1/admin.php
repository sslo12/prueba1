<?php
     session_start();
     $us=$_SESSION["usuario"];
     if ($us==""){
        header("Location: index.html");}
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
    <link rel="stylesheet" href="style.css">
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
            <li class="nav-item"> 
            <a class="nav-link" href="crearUser.php">CREAR USUARIO</a> 
            </li> 
            <li class="nav-item"> 
            <a class="nav-link" href="borrar_usuario.php">BORRAR USUARIO</a> 
            </li>
            <li class="nav-item"> 
            <a class="nav-link" href="admin_Nodo.php">ACTUALIZAR NODO</a> 
            </li>
            <li class="nav-item"> 
            <a class="nav-link" href="crear_nodo.php">CREAR NODO</a> 
            </li>
            <li class="nav-item"> 
            <a class="nav-link" href="borrar_Nodo.php">BORRAR NODO</a> 
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
        <th scope="col">id</th> 
        <th scope="col">tipo_usuario</th> 
        <th scope="col">usuario</th>
        <th scope="col">contrasena</th> 
        <th scope="col">correo</th> 
        <th scope="col">telefono1</th>
        <th scope="col">telefono2</th> 
        </tr> 
    </thead> 
    <tbody> 
    <?php 
       $servurl="http://172.190.52.193:3001/usuario";
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
       $id=$dec ->id;
       $tipo_usuario=$dec ->tipo_usuario;
       $usuario=$dec->usuario;
       $contrasena=$dec->contrasena;
       $correo=$dec->correo;
       $telefono1=$dec->telefono1;
       $telefono2=$dec->telefono2;
       ?>
       <tr>
       <td><?php echo $id; ?></td>
       <td><?php echo $tipo_usuario; ?></td>
       <td><?php echo $usuario; ?></td>
       <td><?php echo $contrasena; ?></td>
       <td><?php echo $correo; ?></td>
       <td><?php echo $telefono1; ?></td>
       <td><?php echo $telefono2; ?></td>
       
       </tr>
       <?php
        } 
    ?> 
    </tbody> 
    </table> 
    
    
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2"> 
        MODIFICAR USUARIO 
    </button> 
    <div class="modal" id="exampleModal2" tabindex="-1"> 
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable"> 
            <div class="modal-content"> 
                <div class="modal-header"> 
                <h5 class="modal-title">MODIFICAR USUARIO</h5> 
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
                </div> 
                <div class="modal-body"> 
                <form action="modificar_usuario.php" method="post"> 
                    <div class="mb-3"> 
                        <label for="exampleInputPassword1" class="form-label">id</label> 
                        <input type="text" name="id" class="form-control" id="exampleInputPassword1"> 
                    </div> 
                    <div class="mb-3"> 
                        <label for="exampleInputPassword1" class="form-label">Correo</label> 
                        <input type="correo" name="correom" class="form-control" id="exampleInputPassword1"> 
                    </div> 
                    <div class="mb-3"> 
                        <label for="exampleInputPassword1" class="form-label">Telefono1</label> 
                        <input type="text" name="telefono1m" class="form-control" id="exampleInputPassword1"> 
                    </div> 
                    <div class="mb-3"> 
                        <label for="exampleInputPassword1" class="form-label">Telefono2</label> 
                        <input type="text" name="telefono2m" class="form-control" id="exampleInputPassword1"> 
                    </div> 
                    <div class="modal-footer"> 
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button> 
                        <button type="submit" class="btn btn-primary">Modificar</button> 
                    </div> 
                </div>
            </div> 
        </div> 
    </div> 

    
    

        
        
</body>
