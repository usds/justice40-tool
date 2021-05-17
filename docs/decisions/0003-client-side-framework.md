# 3. Client-side Framework

- Status: draft 
- Deciders: Shelby Switzer, Nat Hillard, Lucas Brown
- Date: 2021-05-12 
- Tags: front-end, client

Technical Story: https://github.com/usds/justice40-tool/issues/44 

## Context and Problem Statement

We need to decide what framework to use for our front end client. 

## Decision Drivers <!-- optional -->

- Default to open
- Team skills and capacity
- Ease of implementation 
- Can support following features:
    - USWDS integration
    - Content management by nontechnical team member, such as with Markdown files or integration with a headless CMS
    - Solid accessibility support
    - Offline access / low bandwidth support
    - Can generate static site
    - Ease of use with Open Layers
    - Localization support

## Considered Options

- Jekyll
- Gatsby
- Next.js
- Gridsome
- Eleventy
- Static HTML + JS site
- Create-react-app

## Decision Outcome

Chosen option: "[option 1]", because [justification. e.g., only option, which meets k.o. criterion decision driver | which resolves force force | … | comes out best (see below)].

### Positive Consequences <!-- optional -->

- [e.g., improvement of quality attribute satisfaction, follow-up decisions required, …]
- …

### Negative Consequences <!-- optional -->

- [e.g., compromising quality attribute, follow-up decisions required, …]
- …

## Pros and Cons of the Options 

### Jekyll

Pros:
- Easy to use
- Solid community support
- Team is familiar with it
- Can be hosted easily as static site on Github Pages or other platform

Cons:
- Limited in terms of support for more advanced interactive features / JS components: based on team's experience, we will run up to the limitations pretty quickly
- Not scalable past a static site option if we need that

### Gatsby

Pros:

Cons:


### Next

Pros:

Cons:


### Gridsome

Pros:

Cons:


### Eleventy

Pros:
- Used elsewhere in USDS (PRIME ReportStream)
- Simple and straightforward
- Seems to be like Jekyll but for JavaScript

Cons:
- Static-site only: Would be difficult to build out a more fully featured app later from this base
- Doesn't appear to offer us much in terms of speeding up the build

### Static HTML + JS site

Pros:
- Simple: We wouldn't have to deal with idiosyncracies/conventions of a particular framework or work through dependency conflicts/issues

Cons:
- We would have to build a lot more ourselves, including support for non-technical content management
- Not easily scalable past a static site (would have to do a lot of work to add a framework or functionality later)

### Create-react-app

Pros:
- Standard app for getting started in React (and we are leaning towards React as a team)
- Like with the static site, there's less out of the box but more customization possible and potentially less to get in our way

Cons:
- We'd have to figure out things like static site generation and CMS integration on our own
- Along those lines, doesn't appear to offer us much in terms of speeding up the build


## Links <!-- optional -->

- [Link type](link to adr) <!-- example: Refined by [xxx](yyyymmdd-xxx.md) -->
- … <!-- numbers of links can vary -->


