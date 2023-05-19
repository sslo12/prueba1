# Despliegue de la aplicaión smart_kitchen

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
# Análisis de datos distribuidos con Apache Spark

Este es un código en Python que utiliza Apache Spark para realizar análisis y agrupación de datos a partir de un conjunto de datos en formato CSV. El código realiza tres análisis diferentes y guarda los resultados en archivos CSV.

### Requisitos
Apache Spark instalado en el entorno de ejecución.
Un archivo de datos en formato CSV llamado "dataset-proyecto.csv" en el directorio actual.

### Pasos del Código
Crear una sesión de Spark: Se crea una sesión de Spark con el nombre "Análisis de datos".

Cargar el dataset en un DataFrame: Se carga el archivo CSV en un DataFrame de Spark.

Análisis 1: Análisis y agrupación de datos: Se realiza un análisis y agrupación de datos basado en el campo "id_nodo". Se calcula la cantidad de registros con cada tipo de valor ("verde", "amarilla" y "roja") y se ordena el resultado por el número de registros con valor "roja" de forma descendente.

Mostrar el resultado del Análisis 1: Se muestra el resultado obtenido en el primer análisis.

Convertir la columna "tiempo" a tipo fecha: Se convierte la columna "tiempo" del DataFrame a tipo de dato fecha (timestamp).

Filtrar los datos para "tipo" igual a "roja": Se filtran los datos del DataFrame original para quedarse solo con los registros que tienen el valor "roja" en el campo "tipo".

Análisis 2: Contar incendios "roja" por mes: Se agrupan los registros por mes y se cuenta la cantidad de incendios "roja" para cada mes. Los resultados se ordenan por mes en orden ascendente.

Mostrar el resultado del Análisis 2: Se muestra el resultado obtenido en el segundo Análisis.

Análisis 3: Obtener promedio de temperatura y gas por nodo: Se calcula el promedio de temperatura y gas por cada nodo. Los resultados se ordenan por el campo "id_nodo".

Mostrar el resultado del Análisis 3: Se muestra el resultado obtenido en el tercer Análisis.

Guardar los resultados en archivos CSV: Los resultados de cada aplicación se guardan en archivos CSV con nombres personalizados: "resultado_analisis1.csv", "resultado_analisis2.csv" y "resultado_analisis3.csv".

///////////////////
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, avg, count, month

#### Crear una sesión de Spark
spark = SparkSession.builder.appName("Análisis de datos").getOrCreate()

#### Cargar el dataset en un DataFrame
df = spark.read.csv("dataset-proyecto.csv", header=True)

#### Realizar el análisis y agrupación de datos para la primera aplicación
result1 = df.groupBy("id_nodo").agg(
    sum((col("tipo") == "verde").cast("int")).alias("tipo_verde"),
    sum((col("tipo") == "amarilla").cast("int")).alias("tipo_amarilla"),
    sum((col("tipo") == "roja").cast("int")).alias("tipo_roja")
).orderBy(col("tipo_roja").desc())

#### Mostrar el resultado de la primera aplicación
result1.show()

#### Convertir la columna "tiempo" a tipo fecha
df = df.withColumn("tiempo", col("tiempo").cast("timestamp"))

#### Filtrar los datos solo para "tipo" igual a "roja"
df_roja = df.filter(col("tipo") == "roja")

#### Obtener los meses y contar los incendios "roja" para cada mes (segunda aplicación)
result2 = df_roja.groupBy(month("tiempo").alias("mes")).agg(count("*").alias("incendios"))

#### Ordenar los resultados por el mes
result2 = result2.orderBy("mes")

#### Mostrar el resultado de la segunda aplicación
result2.show()

#### Obtener el promedio de temperatura y gas por nodo (tercera aplicación)
df = df.withColumn("temperatura", col("temperatura").cast("double"))
df = df.withColumn("gas", col("gas").cast("double"))
result3 = df.groupBy("id_nodo").agg(
    avg("temperatura").alias("promedio_temperatura"),
    avg("gas").alias("promedio_gas")
).orderBy("id_nodo")

#### Mostrar el resultado de la tercera aplicación
result3.show()

#### Guardar los resultados en archivos CSV con nombres personalizados
result1.write.mode("overwrite").csv("resultado_analisis1.csv", header=True)
result2.write.mode("overwrite").csv("resultado_analisis2.csv", header=True)
result3.write.mode("overwrite").csv("resultado_analisis3.csv", header=True)
////////////////////////////////

### Paso a Paso para conectar la pagina web al dashboard desde la Api de Power BI
Link: https://youtu.be/FZjQmvwBAdU
