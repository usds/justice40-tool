#!/bin/bash

# Script to run liccheck using poetry, because we use poetry but liccheck uses
# requirements.txt.

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail

if ! command -v which; then
	echo "You must have poetry installed to run this script."
fi

poetry export --without-hashes --output requirements.txt
liccheck
rm -f requirements.txt
