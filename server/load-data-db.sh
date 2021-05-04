#!/usr/bin/env bash
set -euo pipefail

# echo "[SQL INIT SCRIPT] Creating extension..."
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "gis" <<-EOSQL
#     CREATE EXTENSION IF NOT EXISTS postgis;
# EOSQL

# Load Maryland geojson
echo "[SQL INIT SCRIPT] Loading data from geojson..."
ogr2ogr -progress -f PostgreSQL PG:"host=localhost dbname=map_dev user=map_dev_user password=map_pwd" /work/maryland.geojson -nln maryland
echo "Data load complete"
