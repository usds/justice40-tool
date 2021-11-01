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

# Prepare python packages
WORKDIR /data-pipeline
RUN pip3 install --upgrade pip setuptools wheel
COPY . .

COPY requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip3 install .

CMD python3 -m data_pipeline.application data-full-run --check -s aws
