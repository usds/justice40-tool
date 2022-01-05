# Client-side Framework

- Status: draft
- Deciders: Justice40 team
- Date: 2021-05-19
- Tags: front-end, client

Technical Story: https://github.com/usds/justice40-tool/issues/44 

## Context and Problem Statement

We need to decide what framework to use for our front end client.

## Decision Drivers <!-- optional -->

- **Default to open** - Choose open source technology in our stack.
- **Team skills and capacity** - Most of the team has React experience.
- **Ease of implementation** - We're looking for significant community support and a shallow learning curve.
- **Skills of our community** - Our open source community as well as potential collaborators in federal government are likely to have experience with Python and JavaScript, so we're not strongly considering options outside of these ecosystems.
- **Can support following features:**
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

Chosen option: Gatsby, because it seems to hit the balance between being simple and static-site focused and having capabilities for scaling up features and eventually evolving to a full stack application should we need it. 

### Positive Consequences <!-- optional -->

- Very large plugin [ecosystem](https://www.gatsbyjs.com/plugins)
- Batteries included philosophy helps in rendering static pages, routing, styling, markdown rendering
- Easy CMS support
- Straightforward to learn / pick up
- Fairly good [documentation](https://www.gatsbyjs.com/docs)

### Negative Consequences <!-- optional -->

- Test development environment ran out of memory. We debugged this further and could not replicate the problem on a new machine, but the original experience was annoying to work around and this [article](https://support.gatsbyjs.com/hc/en-us/articles/360053096273-Why-did-I-hit-Out-of-Memory-errors-) suggests it could be a more widespread problem.
- Local builds and refreshes feel slow compared to other frameworks on this list
- Seems a little more geared toward the blog usecase

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
- We might need non-static solution in the future / dynamic pages - how

### Next

Pros:

- By far the most commonly framework in this list - 1.4MM total downloads as of May 2, 2021 . Gatsby, the second most-downloaded, has ~470,000
- Used by a number of well-known [companies and brands](https://nextjs.org/showcase)
- Flexible
- Mature tooling like `create-next-app`
- Straightforward, file-based routing
- Image optimization

Cons:

- A bit awkward to have to opt out of SSR, navigate distinctions between static generation (with and without data), server-side rendering, and to know when to pre-render
- Compared to other frameworks here, fewer batteries included -- this is almost a pro but it means we'd have to reimplement things like markdown rendering
- Not having / wanting a server to work with, we're missing out on some of Next.js's functionality to start with
- A steeper learning curve than others on this list

### Gridsome

Pros:

- Overall seems to share many of the benefits of Gatsby
  - CMS integration
  - GraphQL + data source integration very similar to Gatsby's
  - Good [documentation](https://gridsome.org/docs/)
  - Large [plugin](https://gridsome.org/plugins/) library
- Straightforward, file-structure-based routing
- Asset optimization, progressive image loading

Cons:

- Vue support is limited to v2, no support yet for v3 (released Sept 2020) (though notably a lot of libraries don't support Vue3)
- Relatively unknown compared to other Vue-based frameworks: 7200 stars, compared to VuePress 18200, Nuxt.js's 33000
- There is a (really cool!) USWDS wrapper [library](https://github.com/usds/uswds-vue) -- and it's even supported by Mike Pritchard at USDS! -- providing Vue support, but it's still relatively new (Sep 2020)

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
