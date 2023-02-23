# Justice40 Tool Installation

_[¡Lea esto en español!](INSTALLATION-es.md)_

This page documents the installation steps for some of the prerequisite software needed to work with this project. It covers steps for macOS and Win10. If you are not on either of those platforms, install the software using steps appropriate for your operating system and device.

> **NOTE**
> If all you want to do is run everything locally to try out the application, go straight to [`QUICKSTART.md`](QUICKSTART.md).

## Prerequisites

### 1. Install Git

Our project is hosted on Github, and can be forked using Git. You can use Git via the command line or any number of first or third party visual clients (the scope of which is beyond these instructions).

#### macOS

To install Git on macOS,

1. Open the terminal, type `git`, press return
2. If dev tools are not installed, a window will prompt you to install dev tools. Follow those instructions to complete the installation
3. Open the terminal, type `git --version`, and press return
4. Validate that a version number is returned (e.g. `git version 2.37.1`). If a version number is returned, git is properly installed

#### Win10

On Win10, download and install Git following the instructions on [git-scm.com](https://git-scm.com/download/win).

### 2. Install Homebrew (macOS only)

Homebrew is an easy way to manage software packages on macOS. Homebrew is _not_ a requirement, but we recommend it and further instructions will use Homebrew.

1. Open your terminal and run `brew -v` to determine whether you have Homebrew installed. If you get a response that looks something like `Homebrew 3.1.9`, you've already got it! If you get nothing back, or an error, continue with these instructions.
2. Follow [the instructions on the Homebrew home page](https://brew.sh) to install Homebrew on your machine.
3. Validate installation by typing `brew -v` in the terminal; ensure a version number – like in step 1 – is shown.

Don't forget to regularly run `brew update` and `brew doctor` to make sure your packages are up to date and in good condition.

### 3. Install Node

Node version manager (nvm) allows you to install, manage, and use different Node.js versions on your machine. It's our preferred method to install Node.js.

Follow [these instructions](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8) to install nvm. Be sure to read through all of the instructions to find the sections within each step relevant to you (e.g. if you're using Homebrew, when you get to Step 2 look for the section titled _Install NVM with Homebrew_).

> **NOTE**
> If you install nvm using Homebrew, make sure to read the terminal output. There are additional installation instructions you must follow (such as adding lines to your bash or zsh profile).

Once you've completed the nvm installation, use nvm to install Node.js version 14.

`nvm install 14`

You should then be able to switch to that version of node through the command:

`nvm use 14`

To validate you are using node 14, type:

`node -v`

This should return something like _Now using node 14.x.x (npm v6.x.x)_.

### 4. Set Up Your IDE (Optional)

While any IDE can be used to contribute to this project, many of our developers use Visual Studio Code (VS Code). Because of this, we've included a few VS Code configurations to make it easier to develop the data pipeline.

1. On macOS, open the terminal and type `brew install --cask visual-studio-code` and press return. If this doesn't work – or you're using Win10 – you can [download VS Code](https://code.visualstudio.com/).
2. After [forking this repo](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING.md#code-contributions), you can clone your forked repo into VS Code.

<!-- TODO: this belongs in the client readme -->

To use the client in VS Code,

1. Open the terminal and navigate to `client` directory
2. Type `npm install` to load dependencies
3. Type `gatsby develop` to spin up the app
4. Navigate to `localhost:8000` to view the app

We recommend the following VS Code Extensions:

<!-- markdown-link-check-disable -->

1. [Browser Preview](https://github.com/auchenberg/vscode-browser-preview)
<!-- markdown-link-check-enable -->
2. [Live Server](https://github.com/ritwickdey/vscode-live-server)
3. [Live Share](https://github.com/MicrosoftDocs/live-share)
4. [Live Share Audio](https://github.com/MicrosoftDocs/live-share)
5. [Live Share Extention Pack](https://github.com/MicrosoftDocs/live-share)

### 5. Install Docker (Optional)

Using Docker is optional; the data pipeline and client can be run without Docker. If you wish to install Docker, follow the [Docker installation
instructions](https://docs.docker.com/get-docker/) for your platform.

## Next Steps

After you've completed the prerequisites, you can continue on to specific installation steps for the part of the platform you're interested in using.

| Platform           | Instructions                                               |
| ------------------ | ---------------------------------------------------------- |
| Frontend Client    | [Frontend Client Instructions](client/README.md)           |
| Data Pipeline      | [Data Pipeline Instructions](data/data-pipeline/README.md) |
| Deployment Process | [Github Workflows README](.github/workflows/README.md)     |
