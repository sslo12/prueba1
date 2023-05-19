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

# Mostrar el resultado de la primera aplicación
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
