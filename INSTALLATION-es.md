# Instalación de la herramienta Justice40

*[Read this in English](INSTALLATION.md)*

## Software requerido
- git, node, yarn, gatsby-cli, and an IDE

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

Esto funcionará tanto para MacOS como para Win10. Siga las instrucciones de este [enlace](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8)

### Instalar Yarn y Gatsby CLI
- Esto es para MacOS y Win10
- Tenga en cuenta que si bien esta aplicación usa npm como administrador de paquetes, se requiere hilo para construir el [uswds](https://github.com/uswds/uswds) library.

1. Abra la terminal y escriba `sudo npm install -global yarn` y presione RETORNO.
    1. Escribe "yarn -v" y pulsa RETORNO.
    2. Verifique que se muestre un número de versión
2. Abra la terminal y escriba `sudo npm install -global gatsby-cli` y presione RETORNO.
    1. Escribe `gatsby-cli -v` y presiona RETORNO
    2. Verifique que se muestre un número de versión

### Configuración de IDE
Si bien se puede usar cualquier IDE, describimos cómo configurar VS Code

1. Abra la terminal y escriba `brew install --cask visual-studio-code` y presione RETORNO.
    1. Si esto no funciona o para Win10, puede descargar VS Code desde el [sitio web](https://code.visualstudio.com/).
2. Después de [bifurcar este repositorio](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING.md#code-contributions), puede clonar su repositorio bifurcado en VS Code
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
