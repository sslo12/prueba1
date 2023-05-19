# smart_kitchen

Esta es una aplicacion web basada en microservicios, que consta de 5 microservicios, la cual permite generar alertas para evitar inciendos por medio de mediciones de temperatura en la cocina.

### Requisitos previos
***
Lista de tecnologias usadas en el proyecto:
* Azure virtual machines
* Docker swarm
* Apache Spark

### Desarrollo
#### Crear el cluster Docker-swarm
Crear un cluster de Docker Swarm con un nodo corriendo en la maquina de azure vm2.
```
$ swarm init --advertise-addr 10.2.0.5
$ sudo docker node ls
```
***
#### Ejecute en el servidor
Clonar el repositorio que contiene la aplicacion. 
```
$ git clone https://github.com/sslo12/smart_kitchen1.git
```
#### Crear las imagenes 
Crear las imagenes de cada servicio en la ruta donde este el Dockerfile.
/
azureusert@vm2:~/smart_kitchen/microweb1$
```
$ sudo docker build -t microweb1 .
```
Imagen microautenticacion. 
```
azureuser@vm2:~/smart_kitchen/$ cd microautenticacion
$ sudo docker build -t microautenticacion .
```
Imagen microusuarios. 
```
azureuser@vm2:~/smart_kitchen/$ cd microusuarios
$ sudo docker build -t microusuarios .
```
Imagen micropaquetes. 
```
azureuser@vm2:~/smart_kitchen/$ cd micropaquetes
$ sudo docker build -t micropaquetes .
```
Imagen microdatos. 
```
azureuser@vm2:~/smart_kitchen/$ cd microdatos
$ sudo docker build -t microdatos .
```
Imagen micronotificaciones. 
```
azureuser@vm2:~/smart_kitchen/$ cd micronotificaciones
$ sudo docker build -t micronotificaciones .
```
***
Ejecutar el Docker Swarm. 
```
azureuser@vm2:~/smart_kitchen/$
$sudo docker stack deploy -c docker-swarm.yml stack1
```
Verificar las imagenes creadas. 
```
$sudo docker ps
```
Verificar los servicios. 
```
$sudo docker stack ls
$sudo docker service ls
```
Escalar los servicios. 
```
$sudo docker service scale stack1_db=5
$sudo docker service scale stack1_microautenticacion=2
$sudo docker service scale stack1_microdatos=3
$sudo docker service scale stack1_micronotificaciones=2
$sudo docker service scale stack1_microweb1=4
```
Verificar los servicios replicados. 
```
$sudo docker service ls
```
***
#### Comprobar el funcionamiento en el navegador

```
http://172.190.52.193:1080/microweb/
```

