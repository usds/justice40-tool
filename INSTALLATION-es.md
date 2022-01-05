# Instalación de la herramienta Justice40

*[Read this in English](INSTALLATION.md)*

## Software requerido
- git, node, and an IDE

### Instalar Git

#### MacOS
1. Abra la terminal, escriba `git` y presione RETORNO.
2. Si las herramientas de desarrollo no están instaladas, una ventana le pedirá que instale las herramientas de desarrollo.
3. Abrieron la terminal y escribieron `git --version` y presionaron RETORNO.
4. Valide que se devuelva un número de versión. Si es así, git está instalado correctamente.

#### Win10
Descargar desde [sitio web](https://git-scm.com/download/win)


### Instalar Homebrew (MacOS only)
1. Abra la terminal y copie / pegue este comando y presione RETORNO.

`/bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Valide la instalación escribiendo `brew -v` en la terminal y asegúrese de que se muestre un número de versión.

### Instalar Node usando NVM
<!-- markdown-link-check-disable-next-line -->
Esto funcionará tanto para MacOS como para Win10. Siga las instrucciones de este [enlace](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8)

### Configuración de IDE
Si bien se puede usar cualquier IDE, describimos cómo configurar VS Code

1. Abra la terminal y escriba `brew install --cask visual-studio-code` y presione RETORNO.
    1. Si esto no funciona o para Win10, puede descargar VS Code desde el [sitio web](https://code.visualstudio.com/).
2. Después de [bifurcar este repositorio](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING-es.md#colaboraciones-con-c%C3%B3digo), puede clonar su repositorio bifurcado en VS Code
3. VS Code con el mensaje de "clonar un repositorio"
4. Abra la terminal y navegue al directorio `cliente`
5. Escriba `npm install` para cargar las dependencias
6. Escribe "gatsby development" para activar la aplicación.
7. Navegue a `localhost: 8000` para ver la aplicación

#### Extensiones de VS Code recomendadas

1. [Browser Preview](https://github.com/auchenberg/vscode-browser-preview)
2. [Live Server](https://github.com/ritwickdey/vscode-live-server)
3. [Live Share](https://github.com/MicrosoftDocs/live-share)
4. [Live Share Audio](https://github.com/MicrosoftDocs/live-share)
5. [Live Share Extention Pack](https://github.com/MicrosoftDocs/live-share)

## Ejecuta el código

1. Bifurcar este repositorio y crear un clon local. [Más información](https://docs.github.com/es/github/getting-started-with-github/quickstart/fork-a-repo)
1. Si está usando una Mac y Homebrew, abra la terminal y escriba `brew update` y `brew doctor`.

Para el desarrollo de front-end, lea el [Client README](client/README.md).

Para el desorrollo de back-end, lea el [Data Pipeline README](data/data-pipeline/README.md).
