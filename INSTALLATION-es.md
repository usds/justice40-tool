# Instalación de la herramienta Justice40

*[Read this in English](INSTALLATION.md)*

Esta página documenta los pasos de instalación de algunos de los programas necesarios para trabajar con este proyecto.

> **NOTA: Si todo lo que quiere hacer es ejecutar rápidamente todo localmente para probar la aplicación, vaya directamente a [`QUICKSTART.md`](QUICKSTART.md).**

Después de los pasos de instalación genéricos de esta página,continúe con uno de los siguientes, según lo que intente hacer:

- Si está trabajando con la interfaz, consulte [`client/README-es.md`](client/README-es.md).
- Si está trabajando con la canalización de datos, consulte [`data/data-pipeline/README-es.md`](data/data-pipeline/README-es.md).
- Si desea comprender el proceso de implementación actual,consulte [`.github/workflows/README-es.md`](.github/workflows/README-es.md).

### Instalar Git

#### MacOS
1. Abra la terminal, escriba `git` y presione RETORNO.
2. Si las herramientas de desarrollo no están instaladas, una ventana le pedirá que instale las herramientas de desarrollo.
3. Abrieron la terminal y escribieron `git --version` y presionaron RETORNO.
4. Valide que se devuelva un número de versión. Si es así, git está instalado correctamente.

#### Win10
Descargar desde [sitio web](https://git-scm.com/download/win)


### Instalar Homebrew (MacOS only)

Homebrew es una manera fácil de administrar las descargas de software en MacOS. No *tienes* que usarlo, pero lo recomendamos.

1. Primero, abra su terminal y ejecute `brew -v` para determinar si tiene Homebrew instalado. Si obtiene una respuesta que se parece a `Homebrew 3.1.9`, ¡ya la tiene! Si no obtiene nada de vuelta, o un error, continúe.
2. Abra la terminal y copie / pegue este comando y presione RETORNO. Siga las indicaciones (deberá otorgar acceso a `sudo`).

`/bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Valide la instalación escribiendo `brew -v` en la terminal y asegúrese de que se muestre un número de versión.

Deberías ejecutar regularmente `brew update` y `brew doctor` para asegurarte de que tus paquetes estén actualizados y en buenas condiciones.

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

## Instalar ventana acoplable

Siga la [instalación de Docker
instrucciones](https://docs.docker.com/get-docker/) para su plataforma.