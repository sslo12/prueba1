# Despliegue de la aplicación smart_kitchen

Esta es una aplicacion web basada en microservicios, que consta de 5 microservicios, la cual permite generar alertas para evitar incendios por medio de mediciones de temperatura en la cocina.

## Requisitos previos
***
Lista de tecnologias usadas en el proyecto:
* Azure virtual machines
* Docker swarm
* Apache Spark

## Desarrollo

### 1. Crear una instancia en AZURE
Se crea dos instancias en azure ubuntu (tutorial: https://youtu.be/LBGnmm0YX14).

Una instancia **vm1** (10.2.0.4)

Una instancia **vm2** (10.2.0.5)
***
Se descarga la clave en nuestro caso es **vm2_key.pem**

Le otorgamos los permisos al archivo para poder usarlo

Ingresamos al servidor atraves de ssh.
```
ssh -i vm2_key.pem azureuser@vm2gustavo12.eastus.cloudapp.azure.com
```

Desinstalar versiones anteriores de Docker
```
sudo apt-get remove docker docker-engine docker.io containerd runc 
```
Configurar el repositorio

Actualizar el paquete apt, e instale paquetes para permitir que apt use un repositorio a través de HTTPS
```
$ sudo apt-get update
```
```
$ sudo apt-get install \
 apt-transport-https \
 ca-certificates \
 curl \
 gnupg-agent \
 software-properties-common
```
Agregue la clave GPG* oficial de Docker
```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```
```
sudo apt-key fingerprint 0EBFCD88
```
Agregar un repositorio stable
```
sudo add-apt-repository \
 "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) \
 stable"
```
Actualice el paquete apt e instale la última versión de Docker Engine.
```
sudo apt-get update
```
```
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
***
### 2. Crear el cluster Docker-swarm
Crear un cluster de Docker Swarm con un nodo corriendo en la maquina de azure vm2 como master y otro nodo corriendo en la maquina vm1 como worker.

El maquina vm2
```
$ swarm init --advertise-addr 10.2.0.5
$ sudo docker node ls
```
En la maquina vm1

Instale docker en la maquina vm1, ejecute y coloque su token resultante cuando se creo el cluster en la maquina vm2 
```
$ sudo docker swarm join --token SWMTKN-1-4qt4bp8o1jeakj6xtgfsa62esrgb8mq6fyip25444653jv1c2b-cqdk5hl7yf17xi1a943ntw3zo 10.2.0.5:2377
```
***
### Ejecute en vm2
Clonar el repositorio que contiene la aplicacion. 
```
$ git clone https://github.com/sslo12/smart_kitchen1.git
```
### Crear las imagenes 
Crear las imagenes de cada servicio en la ruta donde este el Dockerfile.

azureusert@vm2:~/smart_kitchen1/microweb1$
```
$ sudo docker build -t microweb1 .
```
Imagen microautenticacion. 

azureuser@vm2:~/smart_kitchen1/$ cd microautenticacion
```
$ sudo docker build -t microautenticacion .
```
Imagen microusuarios. 

azureuser@vm2:~/smart_kitchen1/$ cd microusuarios
```
$ sudo docker build -t microusuarios .
```
Imagen micropaquetes. 

azureuser@vm2:~/smart_kitchen1/$ cd micropaquetes
```
$ sudo docker build -t micropaquetes .
```
Imagen microdatos. 

azureuser@vm2:~/smart_kitchen1/$ cd microdatos
```
$ sudo docker build -t microdatos .
```
Imagen micronotificaciones. 

azureuser@vm2:~/smart_kitchen1/$ cd micronotificaciones
```
$ sudo docker build -t micronotificaciones .
```
***
Ejecutar el Docker Swarm. 

azureuser@vm2:~/smart_kitchen1/$
```
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
### Comprobar el funcionamiento en el navegador
```
http://172.190.52.193:1080/microweb/
```

# Análisis de datos distribuidos con Apache Spark

Este es un código en Python que utiliza Apache Spark para realizar análisis y agrupación de datos a partir de un conjunto de datos en formato CSV. El código realiza tres análisis diferentes y guarda los resultados en archivos CSV.

## Requisitos
Apache Spark instalado en el entorno de ejecución.
Un archivo de datos en formato CSV llamado "dataset-proyecto.csv" en el directorio actual.
Debemos de tener java instalado.

Primero, para poder correr la aplicación, debemos configurar un cluster de spark en modo standalone, con el master y worker
corriendo en nuestra misma máquina.

Para ello, vamos al directorio de configuración de Spark.
azureuser@vm2:~/labSpark$ cd spark-3.3.1-bin-hadoop3/conf/

Copiamos el archivo de configuracion de variables de entorno de Spark.

```
cp spark-env.sh.template spark-env.sh
```
Editamos este archivo para agregar las IPs de nuestro entorno.

```
vim spark-env.sh
```

Agregamos:

```
SPARK_LOCAL_IP=10.2.0.5
SPARK_MASTER_HOST=10.2.0.5
```

Vamos al directorio sbin e iniciamos el master.
azureuser@vm2:~/labSpark/spark-3.3.1-bin-hadoop3/sbin$

```
./start-master.sh 
```

También iniciamos el worker.

```
./start-worker.sh spark://10.2.0.5:7077 
```

Ahora debemos de crear un diretorio para nuestra aplicación de analisis de datos distribuidos. 
azureuser@vm2:~

```
$mkdir app_analisis
```

Accedemos a ella.

```
$cd app_analisis
```
azureuser@vm2:~/app_analisis
Creamos nuestro archivo python donde se ejecutará nuestra aplicación.

```
$touch app.py
```

La editamos y agregamos el codigo de la aplicación.

```
$vim app.py
```

## Código de la aplicación en Spark
app.py
```
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, count, month

# Crear una sesión de Spark
spark = SparkSession.builder.appName("Análisis de datos").getOrCreate()

# Cargar el dataset en un DataFrame
df = spark.read.csv("dataset-proyecto.csv", header=True)

# Realizar el análisis y agrupación de datos para la primera aplicación
result1 = df.groupBy("id_nodo").agg(
    sum((col("tipo") == "verde").cast("int")).alias("tipo_verde"),
    sum((col("tipo") == "amarilla").cast("int")).alias("tipo_amarilla"),
    sum((col("tipo") == "roja").cast("int")).alias("tipo_roja")
).orderBy(col("tipo_roja").desc())

#Mostrar el resultado de la primera aplicación
result1.show()

# Convertir la columna "tiempo" a tipo fecha
df = df.withColumn("tiempo", col("tiempo").cast("timestamp"))

# Filtrar los datos solo para "tipo" igual a "roja"
df_roja = df.filter(col("tipo") == "roja")

# Obtener los meses y contar los incendios "roja" para cada mes (segunda aplicación)
result2 = df_roja.groupBy(month("tiempo").alias("mes")).agg(count("*").alias("incendios"))

# Ordenar los resultados por el mes
result2 = result2.orderBy("mes")

# Mostrar el resultado de la segunda aplicación
result2.show()

# Obtener el promedio de temperatura y gas por nodo (tercera aplicación)
df = df.withColumn("temperatura", col("temperatura").cast("double"))
df = df.withColumn("gas", col("gas").cast("double"))
result3 = df.groupBy("id_nodo").agg(
    avg("temperatura").alias("promedio_temperatura"),
    avg("gas").alias("promedio_gas")
).orderBy("id_nodo")

# Mostrar el resultado de la tercera aplicación
result3.show()

# Guardar los resultados en archivos CSV con nombres personalizados
result1.write.mode("overwrite").csv("resultado_analisis1.csv", header=True)
result2.write.mode("overwrite").csv("resultado_analisis2.csv", header=True)
result3.write.mode("overwrite").csv("resultado_analisis3.csv", header=True)
```

Ahora ejecutamos el siguiente comando, para ejecutar la aplicación.
azureuser@vm2:~/app_analisis

```
$spark-submit --master spark://10.2.0.5 app.py
```

Nos mostrará los resultados de los 3 analisis de datos en pantalla y además de eso, nos generará 3 carpetas, con los 3 dataframes que hemos obtenido de nuestros analisis.

***
##  Paso a Paso para conectar la pagina web al dashboard desde la Api de Power BI

Link: https://youtu.be/FZjQmvwBAdU

Para ver los dashboard hay que abrir una ventana en incognito en la página web y se debe iniciar sesión con este usuario y contraseña
Usuario: shirley@kitchensm.onmicrosoft.com
Contraseña: 3147144287Sl
***
###  Informe final: 
https://docs.google.com/document/d/1GPu64phOQBBfllwoBGo87Dbkw335Z0Kr/edit?usp=sharing&ouid=108519585901992583321&rtpof=true&sd=true
***
###  Diapositivas: 
https://www.canva.com/design/DAFjSDxUFRk/rsqEQptPoF01SF3I1gTuOQ/edit?utm_content=DAFjSDxUFRk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
***
###  Diagramas:
https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&layers=1&nav=1&page-id=uA6sPsXweEkxtlOyvErE&title=Diagramas.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1Ds-zXQcgYz24vo-ONobUPdkugcAeVOVd%26export%3Ddownload

