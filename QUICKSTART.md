# Local Quickstart

Install [`git`](https://git-scm.com/). See [Install Git](INSTALLATION.md#install-git).

Open a terminal, clone this repository, and change directory to the repository root:

```sh
$ git clone https://github.com/usds/justice40-tool
Cloning into 'justice40-tool'...
$ cd justice40-tool
```

Install [`docker`](https://docs.docker.com/get-docker/). See [Install Docker](INSTALLATION.md#install-docker).

> _Important_: To be able to run the entire application, you may need to increase the memory allocated for docker to at least 8096 MB. See [this post](https://stackoverflow.com/a/44533437) for more details.

Use `docker-compose` to run the application:

```sh
$ docker-compose build
$ docker-compose up
```

> Note: This may take a while – possibly even an hour or two – since it has to build the containers and then download and process all the data.

After it initializes, you should be able to open the application in your browser at [http://localhost:8000](http://localhost:8000).

Mac Note: if you are seeing issues with port 5000 already in use, you may need to turn off AirPlay settings: https://nono.ma/port-5000-used-by-control-center-in-macos-controlce#:~:text=The%20process%20running%20on%20this,Receiver%20to%20release%20port%205000%20.
