# Hosting

- Status: Proposed
- Deciders: Justice40 Team
- Date: 2021-05-18
- Tags: Hosting, Server, Geoplatform

Technical Story: https://github.com/usds/justice40-tool/issues/18 + https://github.com/usds/justice40-tool/issues/36 

## Context and Problem Statement
We need a host for our data pipeline and front end website/app.

## Decision Drivers

- **Speed of launch** - We have a mandate to launch an initial version of our tool by July 27, and we want to get an informational site up much sooner.
- **Support for continuous integration and delivery** - We need our hosting provider to support a modern software development lifecycle that includes continuous integration and delivery, such as integration with our Github repository and CI/CD tool such as Github Actions.
- **Ease of implementation** - Ideally we can choose a platform that some of the team has experience with, that doesn't have a steep learning curve, and/or that has good support.
- **Commitment to open source and process** - Any code used for servers, data processing, or front end hosting must be able to be open source, so there cannot be limitations with regard to where/how code is hosted and shared.  


## Considered Options

- Geoplatform
- Cloud.gov

## Decision Outcome

We will use Geoplatform.gov for hosting our data pipeline, tile server, and front end client. They have a set of shared service offerings that will enable us to have an open data pipeline from data source to tile API, enabling contributions to data processing at any point as well as enabling data access for users at any point (e.g. whether a user wants to access raw data or GeoJSON or tile format). The diagram below illustrates the proposed system architecture and hosting: 

![diagram](https://raw.githubusercontent.com/usds/justice40-tool/main/docs/architecture/architecture-mmd.svg)

### Positive Consequences

- No need to stand up our own servers for data processing or vending tiles
- No need to find separate static site hosting for our front end
- Help advance shared geo services for government
- Code for data transformations can live on an open Github repo and be collaborated on by the community 

### Negative Consequences

- Possible delays or additional work: Some features and offerings we may want to use are still a work in progress on Geoplatform's side, so we may have to help build these out or wait for their release. 

## Pros and Cons of Other Options

### Cloud.gov

Pros:
- Control over software development lifecycle including open source code and CI/CD setup
- Supports CI/CD
- Supports a shared service in government
- The team has experience with Cloud.gov

Cons:
- We would not be able to launch our website or backend on our expected timeline
- Would require a lot more build on our part for the data pipeline and tile server
- Would not have the flexibility to easily run serverless functions if we needed to

## Links <!-- optional -->

