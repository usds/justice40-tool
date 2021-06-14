# Installation Prerequisites

1. [Install the latest docker](https://docs.docker.com/get-docker/) and you may want to install [docker desktop - latest](https://docs.docker.com/desktop/)
2. [Install python 3.9.5 (latest) and](https://www.python.org/downloads/) [configure your environment](https://docs.python.org/3/tutorial/venv.html) to get data-platform source environment ready.
3. Install Visual Studio Code (python packages & typescript) <TODO: add .vscode>
4. [Installing nvm](https://github.com/nvm-sh/nvm#installing-and-updating) and then do:
```sh
nvm install 14.17.0

nvm use 14.17.0
```
and now when you do:
```sh
node -v
```
you should see:
```sh
v14.17.0
```
6. Install [node.js](https://nodejs.org/en/download/) and install all dependencies by `cd`ing into the `/client` directory and running:

```sh
npm install
```
* Note: `npm install` will check the `package-lock.json` fill and restore all transitive dependencies that are in the lock.

# Build

<TODO: .vscode/task.json file with build commands for each backend>

# PR Process & Git Flow

[See Contributing.md](../CONTRIBUTING.md)

# Documentation

Here you'll find all Justice40 project documentation.

In particular:

- [Decisions](decisions) - Documentation of significant project decisions
- [Data Roadmap](data-roadmap.md) - a description of our process for adding new datasets to our backlog
