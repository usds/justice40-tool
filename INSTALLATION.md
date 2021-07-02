# Installing the Justice40 Tool

*[¡Lea esto en español!](INSTALLATION-es.md)*

## Required Software
- git, node, yarn, gatsby-cli, and an IDE

### Install Git

#### MacOS
1. Open the terminal and type `git` and hit RETURN.
2. If dev tools are not installed a window will prompt you to install dev tools. 
3. Open the terminal and type `git --version` and hit RETURN.
4. Validate that a version number is returned. If so, git is properly installed.

#### Win10
Download from [website](https://git-scm.com/download/win)


### Install Homebrew (MacOS only)
1. Open the terminal and copy / paste this command and hit RETURN.

`/bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Validate installation by typing `brew -v` in the terminal and ensure a version number is shown.

### Install Node using NVM 

This will work for both MacOS and Win10. Follow instructions on this [link](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8)


### Install Yarn and Gatsby CLI
- This is for both MacOS and Win10
- Note that while this app uses npm as the package manager, yarn is required to build the [uswds](https://github.com/uswds/uswds) library.

1.  Open the terminal and type `sudo npm install -global yarn` and hit RETURN.
    1. Type `yarn -v` and hit RETURN
    2. Verify a version number is shown
2. Open the terminal and type `sudo npm install -global gatsby-cli` and hit RETURN.
    1. Type `gatsby-cli -v` and hit RETURN
    2. Verify a version number is shown

### IDE set up
While any IDE can be used, we're outlining how to set up VS Code

1. Open the terminal and type `brew install --cask visual-studio-code` and hit RETURN.
    1. If this doesn't work or for Win10, you can download VS Code from the [website](https://code.visualstudio.com/).
2. After [forking this repo](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING.md#code-contributions), you can clone your forked repo into VS Code
3. VS Code with prompt you to "clone a repo"
4. Open the terminal and navigate to `client` directory
5. Type `npm install` to load dependencies
6. Type `gatsby develop` to spin up the app
7. Navigate to `localhost:8000` to view the app

#### Recommended VS Code Extensions

1. [Browser Preview](https://github.com/auchenberg/vscode-browser-preview)
2. [Live Server](https://github.com/ritwickdey/vscode-live-server)
3. [Live Share](https://github.com/MicrosoftDocs/live-share)
4. [Live Share Audio](https://github.com/MicrosoftDocs/live-share)
5. [Live Share Extention Pack](https://github.com/MicrosoftDocs/live-share)
