FROM ubuntu:20.04

# Install packages
RUN apt-get update && apt-get install -y \
    build-essential \
    make \
    gcc \
    git \
    unzip \
    wget \
    python3-dev \
    python3-pip

# tippeanoe
ENV TZ=America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y software-properties-common libsqlite3-dev zlib1g-dev
RUN apt-add-repository -y ppa:git-core/ppa
RUN mkdir -p /tmp/tippecanoe-src && git clone https://github.com/mapbox/tippecanoe.git /tmp/tippecanoe-src
WORKDIR /tmp/tippecanoe-src
RUN /bin/sh -c make && make install

## gdal
RUN add-apt-repository ppa:ubuntugis/ppa
RUN apt-get -y install gdal-bin

# Python package installation using poetry. See:
# https://stackoverflow.com/questions/53835198/integrating-python-poetry-with-docker
ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  POETRY_VERSION=1.1.12

WORKDIR /data-pipeline
COPY poetry.lock pyproject.toml /data-pipeline/

RUN pip install "poetry==$POETRY_VERSION"
RUN poetry config virtualenvs.create false \
  && poetry config virtualenvs.in-project false \
  && poetry install --no-dev --no-interaction --no-ansi

# Copy all project files into the container
COPY . /data-pipeline

CMD python3 -m data_pipeline.application data-full-run --check -s aws
