#!/usr/bin/env bash
set -euo pipefail

# Load Maryland geojson
echo "Loading data..."
docker-compose exec tileserv_db sh -c 'ogr2ogr -progress -f PostgreSQL PG:"dbname=tileserv user=tileserv" /work/maryland.geojson'
echo "Data load complete"
