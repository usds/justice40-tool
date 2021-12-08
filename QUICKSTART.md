# Local Quickstart

Install [`git`](https://git-scm.com/). See [Install Git](INSTALLATION.md#install-git).

Open a terminal, clone this repository, and change directory to the repository root:

```sh
$ git clone https://github.com/usds/justice40-tool
Cloning into 'justice40-tool'...
$ cd justice40-tool
```

Install [`docker`](https://www.docker.com/). See [Install Docker](INSTALLATION.md#install-docker).

> *Important*: To be able to run the entire application, you may need to increase the memory allocated for docker to at least 8096 MB. See [this post](https://stackoverflow.com/a/44533437) for more details.

Use `docker-compose` to run the application:

```sh
$ docker-compose up
```

After it initializes, you should be able to open the application in your browser at [http://localhost:8000](http://localhost:8000).
