# Installing the Justice40 Tool

*[¡Lea esto en español!](INSTALLATION-es.md)*

## Required Software
You'll need the following set up in your environment before continuing to run the Justice40 Tool code.

- git, node, and an IDE

### Install Git

#### MacOS
1. Open the terminal and type `git` and hit RETURN.
2. If dev tools are not installed a window will prompt you to install dev tools. 
3. Open the terminal and type `git --version` and hit RETURN.
4. Validate that a version number is returned. If so, git is properly installed.

#### Win10
Download from [website](https://git-scm.com/download/win)


### Install Homebrew (MacOS only)
Homebrew is an easy way to manage software downloads on MacOS. You don't *have* to use it, but we recommend it. 

1. First, open your terminal and run `brew -v` to determine whether you have Homebrew installed. If you get a resopnse that looks something like `Homebrew 3.1.9`, you've already got it! If you get nothing back, or an error, continue.
2. Open the terminal and copy / paste this command and hit RETURN. Go through the prompts (you will need to grant `sudo` access).

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Validate installation by typing `brew -v` in the terminal and ensure a version number is shown.

### Install Node using NVM 

This will work for both MacOS and Win10. Follow instructions on this [link](https://medium.com/@nodesource/installing-node-js-tutorial-using-nvm-5c6ff5925dd8). Be sure to read through the whole doc to find the sections within each step relevant to you (e.g. if you're using Homebrew, when you get to Step 2 look for the section, "Install NVM with Homebrew").

If you install NVM using Homebrew, make sure to read the output in terminal after you run `brew install nvm`. You will need to add a few lines to your ~/.bash_profile and perhaps complete a couple other tasks.

Once you install NVM, don't forget to install Node! This is included in the linked tutorial above.

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


## Running the code

Once you have the required software installed and ready on your computer, you're ready to begin installing and running the Justice40 Tool code.

1. Fork this repository and create a clone locally. In your terminal/CLI, in the directory you wish to put this project, run `git clone` plus the URL of your fork. 
1. If you're using a Mac and Homebrew, go ahead and run `brew update` and `brew doctor`. It's always good to run these regularly to make sure your packages are up to date and in good condition. 

Now, check out the next section on the organization of this repository to determine where to go next.

### Repo organization
Our repo is organized into multiple directories (folders) to make it easier to work on and run different parts of the system independently. 

The top level of the repo contains these directories, as well as project-wide documentation such as this INSTALLATION file, the README, LICENSE, CODE OF CONDUCT, etc. 

There is also a docker-compose file that will eventually include everything you need to run every part of the application in one docker command; however, at the moment, this file only spins up the score creation part of our data pipeline. 

**Running the client**
If you wish to check out our client-side code (i.e. the GatsbyJS statically generated website with the map), check out the `client` directory and its [README](client/README.md).

**Running the backend**
If you want to run the data pipeline with ETL and score generation, check out the `score` directory and its [README](score/README.md).

**Deployment**
For core team contributors working on deployment, check out the `infrastructure` directory and its [README](infrastructure/README.md) for information on deploying the backend to AWS.
