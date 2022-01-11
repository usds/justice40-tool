[![Staging](https://github.com/usds/justice40-tool/actions/workflows/deploy_staging.yml/badge.svg)](https://github.com/usds/justice40-tool/actions/workflows/deploy_staging.yml)
[![Production](https://github.com/usds/justice40-tool/actions/workflows/deploy_main.yml/badge.svg)](https://github.com/usds/justice40-tool/actions/workflows/deploy_main.yml)

# Cliente de Justice40

Este LÉAME contiene el siguiente contenido:

- [Installing and running the client site](#installing-and-running-the-client-site)
- [Linting and Formatting](#linting-and-formatting)
- [Testing](#testing)
- [Localization](#localization)
- [Feature toggling](#feature-toggling)
- [Environment variables](#environment-variables)
- [Debugging](#debugging)

## Instalar y ejecutar el sitio del cliente

### Vía npm

#### Instalar nodo usando NVM

<!-- markdown-link-check-disable-next-line -->
Esto funcionará tanto para MacOS como para Win10. Siga las instrucciones en este [enlace](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8). Asegúrese de leer todo el documento para encontrar las secciones dentro de cada paso que sean relevantes para usted (por ejemplo, si está usando Homebrew, cuando llegue al paso 2, busque la sección "Instalar NVM con Homebrew").

Si instala NVM usando Homebrew, asegúrese de leer la salida en la terminal después de ejecutar `brew install nvm`. Deberá agregar algunas líneas a su ~/.bash_profile y tal vez completar un par de tareas más.

Una vez que instale NVM, ¡no olvide instalar Node! Esto se incluye en el tutorial vinculado anterior. Esto también instalará `npm` que necesita para los pasos a continuación.

#### Instalar hilo

Instala hilo si aún no lo tienes. Abra su terminal y ejecute `sudo npm install -global yarn`. Esto funciona en MacOS y Win10. Para confirmar que está instalado, ejecute `yarn -v`. Se debe devolver un número de versión.

#### Ejecutar la aplicación

1. Navegue hasta el directorio base de este repositorio y vaya al directorio `cliente` (`cd client`).
1. Ejecute el comando `npm install` para instalar las dependencias.
1. Ejecute `npm start` para iniciar la aplicación cliente.
1. Abra su navegador y vaya a http://localhost:8000

_Tenga en cuenta que si bien esta aplicación usa npm como administrador de paquetes, se requiere yarn para compilar la biblioteca [uswds](https://github.com/uswds/uswds)._

### A través de la ventana acoplable
- Inicie el código VS en el directorio de nivel superior (arriba del cliente)
- Instale la extensión de código Microsoft docker VS
- asegúrese de estar en el directorio principal del repositorio
- Escribe `docker-compose up`
- Ejecutar esto en MacBook Pro con un i7 de 6 núcleos a 2,6 GHz con 16 GB de memoria puede tardar hasta 20 minutos en completarse.
- Esto creará tres imágenes, j4_website, j40_score_server y j40_data_pipeline. Tomará ~ 30 a 35 GB de espacio en disco de imagen

Al navegar a la carpeta del cliente, Dockerfile ejecuta `npm start`. Esto creará una versión de desarrollo de la aplicación.

#### Reconstruyendo j4_website
Si ha realizado cambios en el archivo docker-compose y desea reconstruir j40_website:

`docker-compose build --no-cache j40_website`

Esto no usará el caché y reconstruirá la imagen. Entonces hazlo

`docker-compoe up`

#### la ventana acoplable se cuelga
- Asegúrese de que haya suficiente espacio de imagen de disco en la ventana acoplable. La aplicación Docker Desktop mostrará la imagen de disco total utilizada (engranaje -> Recursos -> Tamaño de imagen de disco). Esta aplicación requerirá ~ 30 - 35 GB. La asignación de 50-60 GB debería ser suficiente. Si la cantidad utilizada es significativamente superior a 35 GB, es posible que deba eliminar las imágenes de la ventana acoplable:

`sistema de imagen acoplable`

Esto debería reducir el espacio total utilizado.

#### Cambiar la fuente de la capa de mosaico/mapa
Si no desea utilizar la ubicación de canalización de datos local para obtener las capas de mosaico/mapa, puede cambiar el
Variable de entorno DATA_SOURCE en docker-compose.yml. Consulte [environment variables](#environment-variables) para obtener más información.

#### Solución de problemas de la ventana acoplable

<!-- markdown-link-check-disable-next-line -->
- Si aparece un error sobre [running out of space](https://medium.com/@wlarch/no-space-left-on-device-when-using-docker-compose-why-c4a2c783c6f6) en el dispositivo, consulte esto para formas de recuperar espacio.


### Visualización de datos en el mapa

Consulte [VIEW_MAP_DATA.md](./VIEW_MAP_DATA.md) para obtener más detalles al respecto.

## Linting y formateo

Este proyecto usa [ESLint](https://eslint.org/) para desforrar código y [Prettier](https://prettier.io/) para formatear. Se integran a través de [gatsby-plugin-prettier-eslint](https://www.gatsbyjs.com/plugins/gatsby-plugin-prettier-eslint/).

Linting es una verificación requerida antes de que puedan ocurrir las fusiones, por favor, borre su código, ¡por el bien de la coherencia!

Usar:

1. Durante el desarrollo:

   1. `npx gatsby Develop` se ejecutará automáticamente de forma más bonita y eslint durante el desarrollo a medida que cambien los archivos, busque actualizaciones en la consola.
   2. Alternativamente, si está usando VSCode:
      1. Instale [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) y [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode -eslint) complementos
      2. Habilite `editor.formatOnSave`, y opcionalmente `"editor.codeActionsOnSave": {"source.fixAll": true},` para aplicar la configuración al guardar

2. Antes de un PR: `npm run lint:fix` se puede ejecutar localmente para aplicar correcciones automáticas a problemas que se pueden solucionar
3. Antes de la fusión (automático): `npm run lint` se ejecuta contra todos los PR mediante una acción de github.

El conjunto de reglas es simplemente el conjunto de reglas básico + [Google](https://github.com/google/eslint-config-google).

## Pruebas

Este proyecto usa [broma](https://jestjs.io/) para pruebas unitarias, usando `react-test-renderer` para generar archivos de instantáneas basados ​​en texto.

Para ejecutar pruebas: `npm test`
Para reconstruir instantáneas cuando sabe que un componente ha cambiado: `npm run test:update`

La aplicación tiene pruebas de extremo a extremo que utilizan ciprés que se pueden iniciar mediante:

`npm ejecutar cy: abierto`

Esto abrirá el corredor de prueba. ¡Elija cualquier prueba para ejecutar!

## Localización

### Acerca de

Este proyecto utiliza [Gatsby Plugin Intl](https://www.gatsbyjs.com/plugins/gatsby-plugin-intl/?=intl) para administrar la internacionalización y la localización.

Hay una serie de componentes para esto, pero para fines de localización, utiliza el popular paquete `react-intl` de [FormatJS] (https://github.com/formatjs/formatjs).

Esto funciona dirigiendo a los usuarios a una versión apropiada de la página que desean visitar en función de la configuración de su navegador, que se completa automáticamente en el momento de la compilación con el contenido de los archivos `json` en el directorio `src/intl`.

### Escribiendo

Para que esta biblioteca funcione de manera óptima, se deben obedecer los siguientes principios (consulte [here](https://formatjs.io/docs/getting-started/message-extraction) para obtener más detalles):

- Todas las cadenas visibles para el usuario deben envolverse con la función `intl.formatMessage` o la etiqueta `<FormattedMessage>`, con un conjunto `description` y `defaultMessage`. Todavía no configure la etiqueta "id", se generará para usted. Para generar archivos para la localización, ejecute `npm run intl:extract` para actualizar el archivo en `src/intl/en.json` con el contenido extraído de todos los componentes de `FormattedMessage`.
- Tome nota del `id` en este archivo y vuelva a agregarlo como un parámetro de su función/accesorio para su componente (esto se hace para evitar colisiones de nombres como se detalla [aquí](https://formatjs.io/docs /primeros pasos/extracción-de-mensajes))
- Todos los componentes `Link` deben importarse desde `gatsby-plugin-intl` para obtener el enlace apropiado para la configuración regional.
- Todas las páginas deben importar y usar `useIntl` de `gatsby-plugin-intl`

Más adelante agregaremos la integración con Github Actions para asegurarnos de que todos los mensajes hayan sido formateados como una condición/comprobación del código confirmado.

### Traduciendo

Desde allí, envíe `src/intl/en.json` a los traductores. (Dependiendo del TMS (Sistema de gestión de traducción) en uso, es posible que necesitemos un formato diferente, por lo que podemos modificar la configuración en `package.json` si es necesario). Cuando regresan con el archivo de otro idioma, p. `es.json`, colóquelo en `src/intl/` como hermano de `en.json`.

### Consumo

`React-Intl` funciona de acuerdo con las [mejores prácticas] de Google SEO (https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites#use-diferentes-urls-para-diferentes -language-versions) mediante la creación de direcciones URL específicas de la configuración regional.

Para acceder a una versión traducida de una página, p. `pages/index.js`, agregue la configuración regional como una parte de la ruta de la URL, de la siguiente manera:

- Inglés: `localhost:8000/en/`, o `localhost:8000/` (el respaldo predeterminado es inglés)

## Variables de entorno

Hay 3 variables de entorno que se pueden configurar:

1. DATA_SOURCE (obligatorio) = se puede establecer en 'cdn' o 'local'. Esto se usa para cambiar el origen de los mosaicos. Se usa en el archivo [constants](https://github.com/usds/justice40-tool/blob/main/client/src/data/constants.tsx) para determinar qué TILE_BASE_URL usar.
2. SITE_URL = configure esto para cambiar la URL base de la carpeta html pública del sitio web. Si no se proporciona ninguno, se utiliza localhost:8000. Esto se usa para el archivo site_map.xml y el archivo robots.txt. Esto solo se usa durante la compilación de producción, también conocida como `npm build`.
3. PATH_PREFIX = configure esto para agregar una(s) ruta(s) adicional(es) a SITE_URL. Si no se proporciona ninguna, no se agregarán rutas adicionales a SITE_URL. Esto solo se usa durante la compilación de producción, también conocida como `npm build`.

Tenga en cuenta que al establecer variables de entorno en docker-compose, DATA_SOURCE es el único que se aplica.

## Cambio de funciones

Hemos implementado un marcado de funciones muy simple para esta aplicación, accesible a través de parámetros de URL.

Hay muchos beneficios en el uso de alternancias de funciones: consulte [Martin Fowler](https://martinfowler.com/articles/feature-toggles.html) para obtener una justificación más larga, pero en resumen, permiten enviar el trabajo en curso. a producción sin habilitar características particulares para todos los usuarios.

### Funciones de visualización

Para ver las funciones, agregue el parámetro `flags` a la URL y establezca el valor en una lista delimitada por comas de funciones para habilitar, p. `localhost:8000?flags=1,2,3` habilitará las funciones 1, 2 y 3.

En el futuro, podemos agregar otros medios de segmentación por audiencia, pero por ahora compartiremos enlaces con banderas habilitadas como un medio para compartir la funcionalidad en desarrollo.

### Uso de banderas

Al desarrollar, para usar una bandera:

1. Pase la variable `ubicación` proporcionada por Gatsby a su componente. Aquí tienes varias opciones:
   1. Si su página usa el `Layout` [componente](src/components/layout.tsx), obtendrá automáticamente `URLFlagProvider` (consulte [FlagContext](src/contexts/FlagContext.tsx) para obtener más información).
   2. Si su página no usa `Layout`, necesita rodear su componente con un componente `URLFlagProvider` y pasar `ubicación`. Puede obtener la `ubicación` de los accesorios predeterminados de la página (más [aquí](https://www.gatsbyjs.com/docs/location-data-from-props/)). Consulte [Index.tsx](src/pages/index.tsx) para ver un ejemplo.
2. Use el gancho `useFlags()` para obtener acceso a una matriz de banderas y verifique en esta matriz la presencia del identificador de función correcto. Consulte [J40Header](src/components/J40Header/J40Header.tsx) para ver un ejemplo.

#### Cuándo usar banderas:

1. La característica es un cambio experimental
2. La característica es el resultado de un pico en el que el trabajo directo no se priorizó en el sprint actual; sin embargo, existe el deseo de ayudar a diseñar para verlo/usarlo, por ejemplo. pantalla completa / geolocalización (propósitos de sprint futuros)
3. La característica es algo con múltiples implementaciones posibles que queremos darle a nuestro equipo la experiencia de probar por separado con fines de comparación, por ejemplo. mapbox vs. openlayers, diferentes capas de mosaico bajas para zoom bajo

## Depuración

1. Asegúrese de que el código VS esté abierto en la carpeta del cliente
2. Ejecute la aplicación con `npm start` en la terminal
3. Haga clic en el depurador (MAYÚS+CMD+D en mac)
4. Ejecute la configuración _Debug Chrome_ presionando el botón verde de reproducción
5. Instale la [extensión CORS Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en) en el navegador que inicia el depurador.
6. ¡Establezca puntos de interrupción en el código VS!