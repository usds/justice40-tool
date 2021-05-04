# Tile Server

## What is it?

A simple tile server using [pg_tileserv](https://github.com/CrunchyData/pg_tileserv), based on pg_tileserv [docker example](https://github.com/CrunchyData/pg_tileserv/tree/master/examples/docker).

## How to use it?

1. Edit variables in `docker-compose.yml` if necessary to customize username/pw
2. Run `docker-compose up` to start running the server. It will likely stall in enabling extensions (TODO: figure this out))
3. Restart the server with ctrl-c. It should load the data from the `data/` directory exactly one time.

## Using

- Point your visualization library to the following URL, and select `vector` tiles: `http://localhost:7800/public.maryland/{z}/{x}/{y}.mvt`
