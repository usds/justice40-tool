
# Aplicación Justice 40 Score

<detalles abrir="abrir">
<summary>Índice</summary>

<!-- TOC -->

- [Aplicación Justice 40 Score](#justice-40-score-application)
  - [Acerca de esta aplicación](#acerca-de-esta-aplicación)
    - [Usando los datos](#usando-los-datos)
      - [1. Datos fuente](#1-fuente-datos)
      - [2. Extraer-Transformar-Cargar (ETL) los datos](#2-extraer-transformar-cargar-etl-los-datos)
      - [3. Conjunto de datos combinado](#3-conjunto-de-datos-combinados)
      - [4. Conjunto de fichas](Conjunto de fichas n.º 4)
    - [Flujo de trabajo de generación y comparación de puntajes](#flujo de trabajo de generación y comparación de puntajes)
      - [Diagrama de flujo de trabajo](#workflow-diagram)
      - [Paso 0: Configure su entorno](#paso-0-configure-su-entorno)
      - [Paso 1: Ejecute el script para descargar los datos del censo o descárguelos desde la URL de Justice40 S3](#step-1-run-the-script-to-download-census-data-or-download-from-the-justice40- s3-url)
      - [Paso 2: Ejecute el script ETL para cada fuente de datos](#paso-2-ejecute-el-script-etl-para-cada-fuente-de-datos)
      - [Paso 3: Calcular los experimentos de puntuación de Justice40](#step-3-calculate-the-justice40-score-experiments)
      - [Paso 4: Comparar los experimentos de puntuación de Justice40 con otros índices](#step-4-compare-the-justice40-score-experiments-to-other-indices)
    - [Fuentes de datos](#fuentes-de-datos)
  - [Ejecutando usando Docker](#running-using-docker)
  - [Desarrollo local](#desarrollo-local)
    - [VSCode](#vscode)
    - [Mac OS](#macos)
    - [Usuarios de Windows](#usuarios-de-windows)
    - [Configurando Poesía](#estableciendo-poesía)
    - [Descargando Census Block Groups GeoJSON y generando CBG CSV](#downloading-census-block-groups-geojson-and-generating-cbg-csvs)
    - [Generando mosaicos de mapa](#generating-map-tiles)
    - [Servir el mapa localmente](#servir-el-mapa-localmente)
    - [Ejecución de cuadernos Jupyter](#running-jupyter-notebooks)
    - [Activando Markdown habilitado para variables para notebooks Jupyter](#activating-variable-enabled-markdown-for-jupyter-notebooks)
  - [Varios](#varios)
  - [Prueba](#prueba)
    - [Fondo](#fondo)
    - [Configuración / Accesorios](#configuration--fixtures)
      - [Actualizando Pickles](#updating-pickles)
      - [Futuras mejoras](#futuras-mejoras)
    - [Pruebas unitarias ETL](#etl-unit-tests)
      - [Extraer pruebas](#extraer-pruebas)
      - [Pruebas de transformación](#pruebas-de-transformación)
      - [Pruebas de carga](#load-tests)

<!-- /TOC -->

</detalles>

## Acerca de esta aplicación

Esta aplicación se utiliza para comparar versiones experimentales de la puntuación Justice40 con índices de justicia ambiental establecidos, como EJSCREEN, CalEnviroScreen, etc.

_**NOTA:** Estos puntajes **no** representan versiones finales de los puntajes de Justice40 y solo se utilizan con fines comparativos. Como resultado, es probable que las columnas de entrada específicas y las fórmulas utilizadas para calcularlas cambien con el tiempo._

### Usando los datos

Uno de nuestros principios principales de desarrollo es que toda la canalización de datos debe ser abierta y replicable de extremo a extremo. Como parte de esto, además de que todo el código sea abierto, también nos esforzamos por hacer que los datos estén visibles y disponibles para su uso en cada etapa de nuestra canalización. Puede seguir las instrucciones a continuación en este LÉAME para poner en marcha la canalización de datos usted mismo en su propio entorno; también puede acceder a los datos que ya hemos procesado en nuestro depósito S3.

En las subsecciones a continuación, describimos cómo se ve cada etapa de la procedencia de los datos y dónde puede encontrar la salida de datos de esa etapa. Si realmente desea realizar cada paso en su propio entorno, salte a [Flujo de trabajo de generación y comparación de puntajes] (#flujo de trabajo de generación y comparación de puntajes).

#### 1. Datos de origen

Si desea encontrar y utilizar los datos de origen sin procesar, puede encontrar las URL de origen en los archivos `etl.py` ubicados dentro de cada directorio en `data/data-pipeline/etl/sources`.

#### 2. Extraer-Transformar-Cargar (ETL) los datos

El primer paso del procesamiento que realizamos es un proceso ETL simple para cada uno de los conjuntos de datos de origen. El código está disponible en `data/data-pipeline/etl/sources`, y el resultado de este proceso es una serie de CSV disponibles en las siguientes ubicaciones:

- EJScreen: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/ejscreen_2019/usa.csv>
- Censo ACS 2019: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/census_acs_2019/usa.csv>
- Índice de Vivienda y Transporte: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/housing_and_transportation_index/usa.csv>
- Vivienda HUD: <https://justice40-data.s3.amazonaws.com/data-pipeline/data/dataset/hud_housing/usa.csv>

Cada CSV puede tener un nombre de columna diferente para el tramo censal o identificador de grupo de bloque censal. Puede encontrar cuál es el nombre en el código ETL. Tenga en cuenta que cuando vea estos archivos, debe asegurarse de que su editor de texto o software de hoja de cálculo no elimine el `0` inicial de este campo de identificador (muchos ID comienzan con `0`).

#### 3. Conjunto de datos combinado
El CSV con los datos combinados de todas estas fuentes [se puede acceder aquí](https://justice40-data.s3.amazonaws.com/data-pipeline/data/score/csv/full/usa.csv).

#### 4. Juego de fichas
Una vez que tenemos todos los datos de las etapas anteriores, los convertimos en mosaicos para que sean utilizables en un mapa. Representamos el mapa en el lado del cliente que se puede ver usando `docker-compose up`.

### Generación de puntuaciones y flujo de trabajo de comparación

Las descripciones a continuación brindan un resumen más detallado de lo que sucede en cada paso del flujo de trabajo de cálculo de puntuación y ETL.

#### Diagrama de flujo de trabajo

TODO agregar diagrama de sirena

#### Paso 0: Configure su entorno

1. Elija si desea ejecutar esta aplicación mediante Docker o si desea instalar las dependencias localmente para poder contribuir al proyecto.
   - **Con Docker:** Siga estas [instrucciones de instalación](https://docs.docker.com/get-docker/) y pase a la [sección Ejecución con Docker](#ejecutar-con-docker) para más información
   - **Para desarrollo local:** Pase a la [sección de desarrollo local](#desarrollo-local) para obtener instrucciones de instalación más detalladas

#### Paso 1: Ejecute el script para descargar los datos del censo o descárguelos desde la URL de Justice40 S3

1. Llame al comando `census_data_download` utilizando el administrador de aplicaciones `application.py` **NOTA:** Esto puede tardar varios minutos en ejecutarse.
   - Con Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application censo-data-download`
   - Con Poetry: `poetry run download_census` (Instalar GDAL como se describe [abajo](#desarrollo-local))
2. Si tiene una conexión a Internet de alta velocidad y no desea generar los datos del censo o instalar `GDAL` localmente, puede descargar una versión zip del archivo del Censo [aquí] (https://justice40-data.s3.amazonaws.com/data-sources/census.zip). Luego descomprima y mueva el contenido dentro de la carpeta `data/data-pipeline/data_pipeline/data/census/`/

#### Paso 2: Ejecute el script ETL para cada fuente de datos

1. Llame al comando `etl-run` usando el administrador de aplicaciones `application.py` **NOTA:** Esto puede tardar varios minutos en ejecutarse.
   - Con Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application etl-run`
   - Con poesía: `poetry run python3 data_pipeline/application.py etl-run`
2. Este comando ejecutará el script ETL correspondiente para cada fuente de datos en `data_pipeline/etl/sources/`. Por ejemplo, `data_pipeline/etl/sources/ejscreen/etl.py` es el script ETL para datos EJSCREEN.
3. Cada secuencia de comandos ETL extraerá los datos de su fuente original, luego formateará los datos en archivos `.csv` que se almacenarán en la carpeta correspondiente en `data_pipeline/data/dataset/`. Por ejemplo, los datos de HUD Housing se almacenan en `data_pipeline/data/dataset/hud_housing/usa.csv`

_**NOTA:** Tiene la opción de pasar el nombre de una fuente de datos específica al comando `etl-run` usando el indicador `-d`, que limitará la ejecución del proceso ETL a esa fuente de datos específica ._
_Por ejemplo: `poetry run python3 data_pipeline/application.py etl-run -d ejscreen` solo ejecutaría el proceso ETL para datos EJSCREEN._

#### Paso 3: Calcular los experimentos de puntuación de Justice40

1. Llame al comando `score-run` usando el administrador de aplicaciones `application.py` **NOTA:** Esto puede tardar varios minutos en ejecutarse.
   - Con Docker: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-run`
   - Con poesía: `poetry run python3 data_pipeline/application.py score-run`
1. El comando `score-run` ejecutará el script `etl/score/etl.py` que carga los datos de cada uno de los archivos fuente agregados al directorio `data/dataset/` por los scripts ETL en el Paso 1.
1. Estos conjuntos de datos se fusionan en un solo marco de datos utilizando su GEOID de grupo de bloques censales como clave común, y los datos en cada una de las columnas se estandarizan de dos maneras:
   - Se calcula su [rango de percentil](https://en.wikipedia.org/wiki/Percentile_rank), que nos dice qué porcentaje de otros grupos de bloques censales tienen un valor más bajo para esa columna en particular.
   - Se normalizan usando [normalización min-max](https://en.wikipedia.org/wiki/Feature_scaling), que ajusta la escala de los datos para que el Grupo de bloques censales con el valor más alto para esa columna se establezca en 1, el Grupo de bloques censales con el valor más bajo se establece en 0, y todos los demás valores se ajustan para encajar dentro de ese rango en función de qué tan cerca estaban del valor más alto o más bajo.
1. Luego, las columnas estandarizadas se utilizan para calcular cada uno de los experimentos de puntuación de Justice40 que se describen con mayor detalle a continuación, y los resultados se exportan a un archivo `.csv` en [`data_pipeline/data/score/csv`](data_pipeline/data /puntuación/csv)

#### Paso 4: Compare los experimentos de puntuación de Justice40 con otros índices

Estamos creando una herramienta de comparación para permitir una comparación fácil (o al menos directa) de la puntuación de Justice40 con otros índices existentes. El objetivo de tener esto es que, a medida que experimentamos e iteramos con una metodología de puntuación, podamos entender cómo nuestra puntuación se superpone o difiere de otros índices que las comunidades, las organizaciones sin fines de lucro y los gobiernos usan para informar la toma de decisiones.

En este momento, nuestra herramienta de comparación existe simplemente como un cuaderno de Python en `data/data-pipeline/data_pipeline/ipython/scoring_comparison.ipynb`.

Para ejecutar esta herramienta de comparación:

1. Asegúrese de haber realizado los pasos anteriores para ejecutar el ETL de datos y la generación de puntajes.
1. Desde el directorio del paquete (`data/data-pipeline/data_pipeline/`), navegue hasta el directorio `ipython`: `cd ipython`.
1. Asegúrese de tener `pandoc` instalado en su computadora. Si está en una Mac, ejecute `brew install pandoc`; para otros sistemas operativos, consulte la [guía de instalación] de pandoc (https://pandoc.org/installing.html).
1. Inicie los cuadernos: `jupyter notebook`
1. En su navegador, navegue a una de las URL devueltas por el comando anterior.
1. Seleccione `scoring_comparison.ipynb` de las opciones de su navegador.
1. Ejecute los pasos en el cuaderno. Puede recorrerlos uno por uno haciendo clic en el botón "Ejecutar" para cada celda, o abrir el menú "Celda" y hacer clic en "Ejecutar todo" para ejecutarlos todos a la vez.
1. Los informes y hojas de cálculo generados por la herramienta de comparación estarán disponibles en `data/data-pipeline/data_pipeline/data/comparison_outputs`.

_NOTA:_ Esto puede demorar varios minutos o más de una hora para ejecutar y generar los informes por completo.

### Fuentes de datos

- **[EJSCREEN](data_pipeline/etl/sources/ejscreen):** TODO Agregar descripción de la fuente de datos
- **[Census](data_pipeline/etl/sources/census):** TODO Agregar descripción de la fuente de datos
- **[Encuesta sobre las comunidades estadounidenses](data_pipeline/etl/sources/census_acs):** TODO Agregar descripción de la fuente de datos
- **[Vivienda y transporte](data_pipeline/etl/sources/housing_and_transportation):** TODO Agregar descripción de la fuente de datos
- **[HUD Housing](data_pipeline/etl/sources/hud_housing):** TODO Agregar descripción de la fuente de datos
- **[Resumen de HUD](data_pipeline/etl/sources/hud_recap):** TODO Agregar descripción de la fuente de datos
- **[CalEnviroScreen](data_pipeline/etl/sources/calenviroscreen):** TODO Agregar descripción de la fuente de datos

## Ejecutando usando Docker

Usamos Docker para instalar las bibliotecas necesarias en un contenedor que se puede ejecutar en cualquier sistema operativo.

*Importante*: para poder ejecutar los contenedores Docker de datos, debe aumentar el recurso de memoria de su contenedor a al menos 8096 MB.

Para compilar el contenedor docker por primera vez, asegúrese de estar en el directorio raíz del repositorio y ejecute `docker-compose build --no-cache`.

Una vez completado, ejecute `docker-compose up`. Docker activará 3 contenedores: el contenedor del cliente, el contenedor del servidor estático y el contenedor de datos. Una vez que se generan todos los datos, puede ver la aplicación usando un navegador y navegando a `http://localhost:8000`.

Si desea ejecutar tareas de datos específicas, puede abrir una ventana de terminal, navegar a la carpeta raíz de este repositorio y luego ejecutar cualquier comando para la aplicación usando este formato:


`docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application [comando]`

Aquí hay una lista de comandos:

- Obtener ayuda: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application --help`
- Generar datos del censo: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application censo-data-download`
- Ejecute todo ETL y genere puntaje: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-full-run`
- Limpie los directorios de datos: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application data-cleanup`
- Ejecute todos los procesos de ETL: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application etl-run`
- Generar puntaje: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application score-run`
- Combine Score con Geojson y genere conjuntos de mosaicos de mapas con zoom alto y bajo: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline. puntuación geográfica de la aplicación`
- Generar mosaicos de mapas: `docker run --rm -it -v ${PWD}/data/data-pipeline/data_pipeline/data:/data_pipeline/data j40_data_pipeline python3 -m data_pipeline.application generate-map-tiles`

## Desarrollo local

Puede ejecutar el código de Python localmente sin Docker para desarrollar, usando Poetry. Sin embargo, para generar los datos del censo necesitará la [biblioteca GDAL](https://github.com/OSGeo/gdal) instalada localmente. Además, para generar teselas para un mapa local, necesitará [Mapbox tippecanoe](https://github.com/mapbox/tippecanoe). Consulte los repositorios para obtener instrucciones específicas para su sistema operativo.

### código VSC

Si está utilizando VSCode, puede utilizar la carpeta `.vscode` registrada en `data/data-pipeline/.vscode`. Para hacer esto, abre este directorio con `code data/data-pipeline`.

Esto es lo que incluye:

1. `launch.json`: ejecuta comandos que permiten depurar varios comandos en `application.py`. Tenga en cuenta que debido a que estamos usando [Click CLI] (https://click.palletsprojects.com/en/8.0.x/), y Click a su vez usa `console_scripts` para analizar y ejecutar las opciones de la línea de comandos, es necesario ejecutar el equivalente de `python -m data_pipeline.application [command]` dentro de `launch.json` para poder establecer y alcanzar puntos de interrupción (esto es lo que está implementado actualmente. De lo contrario, es posible que el script se agote después de 5 segundos Más sobre esto [aquí] (https://stackoverflow.com/questions/64556874/how-can-i-debug-python-console-script-command-line-apps-with-the-vscode-debugger) .

2. `settings.json`: garantizan que está utilizando el linter (`pylint`), el formateador (`flake8`) y la biblioteca de prueba (`pytest`) predeterminados que utiliza el equipo.

3. `tasks.json`: le permiten usar `Terminal->Ejecutar tarea` para ejecutar nuestros formateadores y linters preferidos dentro de su proyecto.

Se indica a los usuarios que solo agreguen configuraciones a este archivo que deben compartirse con todo el equipo, y que no agreguen configuraciones aquí que solo se aplican a entornos de desarrollo locales (en particular, rutas absolutas completas que pueden diferir entre configuraciones). Si desea agregar algo a este archivo, comuníquese con el resto del equipo para asegurarse de que se comparta la configuración propuesta.

### Mac OS

Para instalar los ejecutables mencionados anteriormente:

- gdal: `preparar instalar gdal`
- Tippecanoe: `preparar instalar tippecanoe`

### Usuarios de Windows

Si desea ejecutar la generación de mosaicos, instale TippeCanoe [siguiendo estas instrucciones] (https://github.com/GISupportICRC/ArcGIS2Mapbox#installing-tippecanoe-on-windows). También necesita algunos requisitos previos para Geopandas como se especifica en los requisitos de poesía. Siga [estas instrucciones](https://stackoverflow.com/questions/56958421/pip-install-geopandas-on-windows) para instalar la dependencia de Geopandas localmente. Definitivamente es más fácil si tiene acceso a WSL (Windows Subsystem Linux) e instala estos paquetes usando comandos similares a nuestro [Dockerfile] (https://github.com/usds/justice40-tool/blob/main/data/datacanalización/Dockerfile).

### Configuración de la poesía

- Iniciar una terminal
- Cambiar a este directorio (`/data/data-pipeline/`)
- Asegúrese de tener al menos Python 3.7 instalado: `python -V` o `python3 -V`
- Usamos [Poetry](https://python-poetry.org/) para administrar las dependencias y crear la aplicación. Siga las instrucciones en su sitio para descargar.
- Instale los requisitos de Poetry con `poetry install`

### El punto de entrada de la aplicación

Después de instalar las dependencias de poesía, puede ver una lista de comandos con los siguientes pasos:
- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Luego ejecute `poetry run python3 data_pipeline/application.py --help`

### Descarga de GeoJSON de grupos de bloques censales y generación de CSV de CBG (normalmente no se requiere)

- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Si desea borrar todos los datos y mosaicos de todos los directorios, puede ejecutar: `poetry run python3 data_pipeline/application.py data-cleanup`.
- Luego ejecute `poetry run python3 data_pipeline/application.py censo-data-download`
  Nota: Los archivos del censo están alojados en Justice40 S3 y puede omitir este paso pasando el indicador `-s aws` o `--data-source aws` en las secuencias de comandos a continuación

### Ejecute todos los procesos de generación de ETL, puntajes y mapas
- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Luego ejecute `poetry run python3 data_pipeline/application.py data-full-run -s aws`
- Nota: El indicador `-s` es opcional si ha generado/descargado los datos del censo


### Ejecute procesos de generación de puntajes y ETL
- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Luego ejecuta `poetry run python3 data_pipeline/application.py score-full-run`


### Ejecutar todos los procesos ETL
- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Luego ejecute `poetry run python3 data_pipeline/application.py etl-run`


### Generación de teselas de mapas

- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Luego ejecute `poetry run python3 data_pipeline/application.py generate-map-tiles -s aws`
- Si tiene claves S3, puede sincronizar con el repositorio de desarrollo haciendo `aws s3 sync ./data_pipeline/data/score/tiles/ s3://justice40-data/data-pipeline/data/score/tiles --acl lectura pública --delete`
- Nota: el indicador `-s` es opcional si ha generado/descargado los datos de la puntuación

### Sirve el mapa localmente

- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Para zoom alto de EE. UU.: `docker run --rm -it -v ${PWD}/data/score/tiles/high:/data -p 8080:80 maptiler/tileserver-gl`

### Ejecución de cuadernos Jupyter

- Iniciar una terminal
- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Ejecute `poetry run jupyter notebook`. Su navegador debe abrirse con una pestaña de Jupyter Notebook

### Activación de Markdown habilitado para variables para portátiles Jupyter

- Cambiar al directorio del paquete (es decir, `cd data/data-pipeline/data_pipeline`)
- Activar un Poetry Shell (ver arriba)
- Ejecute `jupyter contrib nbextension install --user`
- Ejecute `jupyter nbextension enable python-markdown/main`
- Asegúrese de haber cargado el cuaderno Jupyter Notebook en un estado "Confiable". (Vea el botón cerca de la parte superior derecha de la pantalla de la computadora portátil).

Para obtener más información, consulte [documentos de nbextensions] (https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/install.html) y
consulte [documentos de python-markdown] (https://github.com/ipython-contrib/jupyter_contrib_nbextensions/tree/master/src/jupyter_contrib_nbextensions/nbextensions/python-markdown).

## Varios

- Para exportar paquetes de Poetry a `requirements.txt` ejecute `poetry export --without-hashes > requirements.txt`

## Pruebas

### Fondo

Para este proyecto, utilizamos [pytest](https://docs.pytest.org/en/latest/) con fines de prueba. Para ejecutar pruebas, simplemente ejecute `poetry run pytest` en este directorio (es decir, `justice40-tool/data/data-pipeline`).

### Configuración / Accesorios

Los datos de prueba se configuran a través de [accesorios] (https://docs.pytest.org/en/latest/explanation/fixtures.html).

Estos accesorios utilizan [archivos pickle] (https://docs.python.org/3/library/pickle.html) para almacenar marcos de datos en el disco. En última instancia, esto se debe a que si afirma la igualdad en dos marcos de datos, incluso si los valores de columna tienen el mismo valor "visible", si sus tipos no coinciden, se contarán como no iguales.

Con un poco más de detalle:

1. Los marcos de datos de Pandas se escriben y, de forma predeterminada, los tipos se infieren cuando crea uno desde cero. Si crea un marco de datos utilizando `DataFrame` [constructores] (https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html#pandas.DataFrame), no hay garantía de que los tipos sean correctos , sin anotaciones `dtype` explícitas. Las anotaciones `dtype` explícitas son posibles, pero esto nos lleva al punto #2:

2. Nuestras transformaciones/marcos de datos en el código fuente bajo prueba no siempre requieren tipos específicos, y a menudo es suficiente en el código en sí solo confiar en el tipo `objeto`. Intenté agregar tipeo explícito basado en el tipo "lógico" de las columnas dadas, pero en la práctica resultó en marcos de datos que no coincidían y que _en realidad_ tenían el mismo valor; en particular, era muy común tener una columna de marco de datos de tipo `cadena` y otro de tipo `objeto` que llevaba los mismos valores. Entonces, es decir, incluso si creamos un marco de datos escrito "correctamente" (de acuerdo con nuestras suposiciones lógicas sobre qué tipos deberían ser), todavía se contaron como no coincidentes con los marcos de datos que realmente se usan en nuestro programa. Para arreglar esto "de la manera correcta", es necesario anotar explícitamente los tipos en el punto de la llamada `read_csv`, lo que definitivamente tiene otros posibles efectos secundarios no deseados y debería hacerse con cuidado.

3. Para marcos de datos más grandes (algunos de estos tienen más de 150 valores), inicialmente se consideró demasiado difícil/requería mucho tiempo anotar manualmente todos los tipos y, además, modificar esas anotaciones de tipo en función de lo que se esperaba en el código fuente bajo prueba.

#### Actualización de pepinillos

Si actualiza la puntuación de alguna manera, es necesario crear nuevos pickles para que los datos se validen correctamente.

Comienza con `data_pipeline/etl/score/tests/sample_data/score_data_initial.csv`, que son las dos primeras filas de `score/full/usa.csv`.

Para actualizar este archivo, ejecute una generación de partitura completa, luego abra un shell de Python desde el directorio `data-pipeline` (por ejemplo, `poetry run python3`), y luego actualice el archivo con los siguientes comandos:
```
encurtido de importación
desde ruta de importación pathlib
importar pandas como pd
ruta_datos = Ruta.cwd()

# datos de puntuación esperados
score_csv_path = data_path / "data_pipeline" / "data" / "score" / "csv" / "full" / "usa.csv"
score_initial_df = pd.read_csv(score_csv_path, dtype={"GEOID10_TRACT": "string"}, low_memory=False)[:2]
score_initial_df.to_csv(data_path / "data_pipeline" / "etl" / "score" / "tests" / "sample_data" /"score_data_initial.csv", index=False)
```

Ahora puede pasar a actualizar los encurtidos individuales para las pruebas. Tenga en cuenta que es útil hacerlo en este orden:

Tenemos cuatro archivos pickle que corresponden a los archivos esperados:
- `score_data_expected.pkl`: Puntuación inicial sin condados
- `score_transformed_expected.pkl`: Puntuación intermedia con `etl._extract_score` y `etl. _transform_score` aplicado. No hay ningún archivo para este proceso intermedio, por lo que debemos capturar la mitad del proceso.
- `tile_data_expected.pkl`: Puntuación con columnas para hornear en mosaicos
- `downloadable_data_expected.pk1`: CSV descargable

Para actualizar los pepinillos, vamos uno a uno:

Para `score_transformed_expected.pkl`, pero un punto de interrupción en [esta línea](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post.py#L58), antes de `pdt.assert_frame_equal` y ejecute:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_transform_score`

Una vez en el punto de interrupción, capture el df en un pickle de la siguiente manera:

```
encurtido de importación
desde ruta de importación pathlib
ruta_datos = Ruta.cwd()
score_transformed_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "score_transformed_expected.pkl", protocol=4)
```

Luego elimine el punto de interrupción y vuelva a ejecutar la prueba: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_transform_score`

Para `score_data_expected.pkl`, pero un punto de interrupción en [esta línea](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post .py#L78), antes de `pdt.assert_frame_equal` y ejecute:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_score_data`

Una vez en el punto de interrupción, capture el df en un pickle de la siguiente manera:

```
encurtido de importación
desde ruta de importación pathlib
ruta_datos = Ruta.cwd()
score_data_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "score_data_expected.pkl", protocol=4)
```

Luego elimine el punto de interrupción y vuelva a ejecutar la prueba: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_score_data`

Para `tile_data_expected.pkl`, pero un punto de interrupción en [esta línea](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post .py#L86), antes de `pdt.assert_frame_equal` y ejecute:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_tile_data`

Una vez en el punto de interrupción, capture el df en un pickle de la siguiente manera:

```
encurtido de importación
desde ruta de importación pathlib
ruta_datos = Ruta.cwd()
output_tiles_df_actual.to_pickle(data_path / "data_pipeline" / "etl" / "puntuación" / "pruebas" / "instantáneas" / "tile_data_expected.pkl", protocolo=4)
```

Luego elimine el punto de interrupción y vuelva a ejecutar la prueba: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_tile_data`

Para `downloadable_data_expected.pk1`, pero un punto de interrupción en [esta línea](https://github.com/usds/justice40-tool/blob/main/data/data-pipeline/data_pipeline/etl/score/tests/test_score_post .py#L98), antes de `pdt.assert_frame_equal` y ejecute:
`pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_downloadable_data`

Una vez en el punto de interrupción, capture el df en un pickle de la siguiente manera:

```
encurtido de importación
desde ruta de importación pathlib
ruta_datos = Ruta.cwd()
output_downloadable_df_actual.to_pickle(data_path / "data_pipeline" / "etl" / "score" / "tests" / "snapshots" / "downloadable_data_expected.pkl", protocol=4)
```

Luego elimine el punto de interrupción y vuelva a ejecutar la prueba: `pytest data_pipeline/etl/score/tests/test_score_post.py::test_create_downloadable_data`

#### Mejoras futuras

Los encurtidos tienen varias desventajas para las que deberíamos considerar alternativas:

1. Son opacos: es necesario abrir un intérprete de python (como se escribió anteriormente) para confirmar su contenido
2. Son un poco más difíciles de asimilar para los recién llegados a Python.
3. Potencialmente, codifican suposiciones de escritura defectuosas (ver arriba) que se preparan para futuras ejecuciones de prueba.

En el futuro, podríamos adoptar cualquiera de las siguientes estrategias para evitar esto:

1. Podríamos usar [pytest-snapshot](https://pypi.org/project/pytest-snapshot/) para almacenar automáticamente el resultado de cada prueba a medida que cambian los datos. Esto lo haría para evitar tener que generar un pickle para cada método; en su lugar, solo necesitaría llamar a `generar` una vez, y solo cuando el marco de datos haya cambiado.

Además, podría usar una anotación de esquema de tipo pandas como [pandera](https://pandera.readthedocs.io/en/stable/schema_models.html?highlight=inputschema#basic-usage) para anotar esquemas de entrada/salida para determinados funciones, y sus pruebas unitarias podrían usarlas para validar explícitamente. Esto podría ser de gran valor para anotar las expectativas.

Alternativamente, o en conjunto, podría avanzar hacia el uso de un formato de contenedor de tipos más estrictos para lectura/escritura, como SQL/SQLite, y usar algo como [SQLModel](https://github.com/tiangolo/sqlmodel) para manejar garantías de tipo más explícitas.

### Pruebas unitarias ETL

Las pruebas unitarias de ETL generalmente se organizan en tres grupos:

- Extraer Pruebas
- Pruebas de transformación, y
- Pruebas de carga

Estos se prueban utilizando diferentes estrategias que se explican a continuación.

#### Extraer pruebas

Las pruebas de extracción se basan en las transformaciones de datos limitadas que se producen cuando los datos se cargan desde los archivos de origen.

En las pruebas, usamos CSV limitados y falsos leídos a través de `StringIO`, tomados de las primeras filas de los archivos de interés, y nos aseguramos de que los tipos de datos sean correctos.

Más adelante, podríamos usar una herramienta como [Pandera](https://pandera.readthedocs.io/) para hacer cumplir los esquemas, tanto para las pruebas como para las clases mismas.

#### Pruebas de transformación

Las pruebas de transformación son el corazón de las pruebas unitarias de ETL y comparan marcos de datos ideales con sus contrapartes reales.

Consulte la sección anterior [Accesorios](#configuration--fixtures) para obtener información sobre el origen de los datos.

#### Pruebas de carga

Estos hacen uso de [tmp_path_factory](https://docs.pytest.org/en/latest/how-to/tmp_path.html) para crear un sistema de archivos ubicado en `temp_dir` y validar si se escribieron los archivos correctos. a las ubicaciones correctas.

Otras modificaciones futuras podrían incluir el uso de Pandera y/u otras herramientas de validación de esquemas, o una prueba más explícita de que los datos escritos en el archivo se pueden volver a leer y producir el mismo marco de datos.
