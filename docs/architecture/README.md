# Architecture

The below is a general architecture of our proposed system:

```mermaid
graph LR
    subgraph c["Community"]
        input["Community Input"]
    end

    subgraph ds["Data Selection (vision)"]
        input --> Intake
        input --> Evolution
        input --> Voting
        Intake --> Evolution --> Voting
    end
    
    subgraph s["Hosted by Geoplatform.gov"]
        subgraph dp["Data Pipeline (Justice40 Repo)"]
            Voting --> a["Approved Datasets"]
            a -- ETL --> ncsv["Normalized CSVs"]
            ncsv--"Score Generation"--> ScoreCSV["Full CSV with Data and Score"]
            ScoreCSV-->GeoJSON
            GeoJSON-->MVT["Uncompressed MVT Tiles"]
        end
        subgraph j40["Justice40 Client"]
            MVT --"API (S3 Access)"--> vl["Justice40 Visualization Library (MapLibre)"]
            vl --> fe["Justice40 Static Site Frontend (Gatsby)"]
        end
    end

    subgraph oc["Other Clients"]
        ScoreCSV --"API (S3 Access)" --> DS["Data Scientists"]
        GeoJSON -- "API (S3 Access)" --> 3["Third Party Apps"]
        MVT -- "API (S3 Access)" --> 3["Third Party Apps"]
    end
```

The following is a more detailed diagram of the data pipeline architecture utilizing S3 buckets for file/data hosting on Geoplatform.gov.

```mermaid
graph TD
    Dataset1["Dataset 1"]-->ETL1
    Dataset2["Dataset 2"]-->ETL2
    subgraph "ETL and Score Generation"
        ETL1["ETL for Dataset 1"]-->ncsv1("Normalized CSV (S3)")
        ETL2["ETL for Dataset 2"]-->ncsv2("Normalized CSV (S3)")
        ncsv1-->Score
        ncsv2-->Score
        Score-->DL("Downloadable zip")
        Score["Generate Score (score-run)"]-->CSV
    end
    DL-->Client

    Census["Census TIGER Data Shapefiles (hosted by Census)"]-->CGTiger
    subgraph "Census Data ETL"
        CGTiger["Create GeoJSON from Shapefile with ogr2ogr"]-->TS3
        TS3("TIGER GeoJSON State Files(S3)")-->CombineCensus["Combine Census State Files with Geopandas"]
        CombineCensus-->NCS3("National Census GeoJSON (S3)")
    end
    
    CSV("Full CSV (S3)")-->CGJ
    NCS3-->CGJ
    CGJ["Combine with ogr2ogr + Create GeoJSON (score-geo)"]-->GeoJSON
    GeoJSON("GeoJSON files (high and low zoom) (S3)")-->Tip
    Tip["Create and Send Tiles using Tippecanoe"]-->Uncompressed
    Tip-->Compressed
    subgraph production
        Uncompressed("Uncompressed MVT high and low directories (S3)")
    end
    subgraph development
        Local("Locally stored tiles")--"Option 1"-->TS
        Compressed("Compressed high and low .mbtile files (S3)")--"Option 2"-->TS[/Tileserver-GL/]
    end
    
    TS--"XYZ URL"-->Client
    Uncompressed--"XYZ URL"-->Client["Gatsby+MapLibre"]
```

## Updating the Diagram

In the event that you are interested in updating the architecture of our system, please go through the Architecture Decision Record Process (see [here](https://github.com/usds/justice40-tool/tree/main/docs/decisions) for more detail on this process).

Provided you have already done this, however, and/or would like to make small changes to the diagram itself, please read on!

To update, consult Mermaid syntax [here](https://mermaid-js.github.io/mermaid/#/flowchart) and update the above mermaid syntax.

To preview your changes, see Use Cases and Integrations [here](https://mermaid-js.github.io/mermaid/#/integrations) in order to setup editor integration.

Once you are satisfied with your change, create a pull request. Github will automatically detect the mermaid tag and compile the diagram in-line.
