# Justice40 Tool Installation

*[¡Lea esto en español!](INSTALLATION-es.md)*

This page documents the installation steps for some of the software needed to work with this project. After following the steps on this page, continue on to one of the following, depending on what you are trying to do:

- If you want to quickly run everything locally, see [`QUICKSTART.md`](QUICKSTART.md).
- If you are working with the frontend, see [`client/README.md`](client/README.md) for installation steps specific to that part of the project.
- If you are working with the data pipeline, see [`data/data-pipeline/README.md`](data/data-pipeline/README.md) for installation steps specific to that part of the project.
- If you want to understand the current deployment process, see [`.github/workflows/README.md`](.github/workflows/README.md).

## Install Homebrew (MacOS only)

Homebrew is an easy way to manage software downloads on MacOS. You don't *have* to use it, but we recommend it.

1. First, open your terminal and run `brew -v` to determine whether you have Homebrew installed. If you get a resopnse that looks something like `Homebrew 3.1.9`, you've already got it! If you get nothing back, or an error, continue.
2. Open the terminal and copy / paste this command and hit RETURN. Go through the prompts (you will need to grant `sudo` access).

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Validate installation by typing `brew -v` in the terminal and ensure a version number is shown.

You should regularly run `brew update` and `brew doctor` to make sure your packages are up to date and in good condition.

## IDE set up (Optional)
While any IDE can be used, we're outlining how to set up VS Code

1. Open the terminal and type `brew install --cask visual-studio-code` and hit RETURN.
    1. If this doesn't work or for Win10, you can download VS Code from the [website](https://code.visualstudio.com/).
2. After [forking this repo](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING.md#code-contributions), you can clone your forked repo into VS Code
3. VS Code with prompt you to "clone a repo"
4. Open the terminal and navigate to `client` directory
5. Type `npm install` to load dependencies
6. Type `gatsby develop` to spin up the app
7. Navigate to `localhost:8000` to view the app

### Recommended VS Code Extensions

1. [Browser Preview](https://github.com/auchenberg/vscode-browser-preview)
2. [Live Server](https://github.com/ritwickdey/vscode-live-server)
3. [Live Share](https://github.com/MicrosoftDocs/live-share)
4. [Live Share Audio](https://github.com/MicrosoftDocs/live-share)
5. [Live Share Extention Pack](https://github.com/MicrosoftDocs/live-share)

## Install Git

#### MacOS
1. Open the terminal and type `git` and hit RETURN.
2. If dev tools are not installed a window will prompt you to install dev tools. 
3. Open the terminal and type `git --version` and hit RETURN.
4. Validate that a version number is returned. If so, git is properly installed.

#### Win10
Download from [website](https://git-scm.com/download/win)

## Install Docker

Follow the [Docker installation
instructions](https://docs.docker.com/get-docker/) for your platform.
