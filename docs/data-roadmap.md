# Data roadmap proposal

This document describes how we setup a "data roadmap", which serves several purposes.

The goals of the data roadmap are as follows:

* Tracking data sets being considered for inclusion in the Climate and Economic Justice Screening Tool (CEJST), either as a data set that is included in the cumulative impacts score or a reference data set that is not included in the score

* Prioritizing data sets, so that it's obvious to developers working on the CEJST which data sets to incorporate next into the tool

* Gathering important details about each data set, such as its geographic resolution and the year it was last updated, so that the CEJST team can make informed decisions about what data to prioritize

* Tracking the problem areas that each data set relates to (e.g., a certain data set may relate to the problem of pesticide exposure amongst migrant farm workers)

* Enabling members of the public to submit ideas for problem areas or data sets to be considered for inclusion in the CEJST, with easy-to-use and accessible tools

* Enabling members of the public to submit revisions to the information about each problem area or data set, with easy-to-use and accessible tools

* Enabling the CEJST development team to review suggestions before incorporating them officially into the data roadmap, to filter out potential noise and spam, or consider how requests may lead to changes in software features and documentation

# User stories

These goals can map onto several user stories for the data roadmap, such as:

* As a community member, I want to suggest a new idea for a dataset.
* As a community member, I want to understand what happened with my suggestion for a new dataset.
* As a community member, I want to edit the details of a dataset proposal to add more information.
* As a WHEJAC board member, I want to vote on what data sources should be prioritized next.
* As a product manager, I want to filter based on characteristics of the data.
* As a developer, I want to know what to work on next.

# Data set descriptions

There are lots of details that are important to track for each data set.

For instance, here is an incomplete list of information it would be helpful to know about any given data set:

| Characteristic | Answer type | Why is this important? |
| --- | --- | --- |
| Name | Text |  |
| Source | Text / URL |  |
| Sponsor | Text | It can be helpful to name if there's a federal agency or non-governmental agency that is working to provide and maintain this data |
| Public status | Not Released / Freely Public / Public for certain audiences / Other | It can be helpful to know whether a dataset has already gone through public release process (like ACS data) or may need a lengthy review process (like Medicaid data). |
| Subjective rating of data quality | Low/Medium/High | Sometimes we don't have statistics on data quality, but we know it is likely to be accurate or not. |
| Estimated margin of error | Numeric | Estimated margin of error on measurement, if known. Often more narrow geographic measures have a higher margin of error due to a smaller sample for each measurement. |
| Known data quality issues | Description | It can be helpful to write out known problems. |
| Geographic coverage: percent | Estimated % of American population / surface area covered by the data | We want to think about data that is comprehensive across America. |
| Geographic coverage: Description | Description of American population / surface area covered by the data |  |
| Relevance to environmental justice | Text | It's useful to spell out why this data is relevant. |
| Importance to identifying EJ communities | Text | It's useful to spell out if this is an important indicator. |
| How this data could be used outside of Justice40 | Text | Are there any other benefits to making this data available outside the tool? |
| Ready to use? | Yes/No/Other | In our subjective assessment, do we think a current draft of the data would be ready for publication in the tool as a data source still undergoing review and assessment (e.g., as a "beta" data source). Data does not require additional collection or cleaning of the data, although it may require some minor transformations. |
| Estimated timeline for getting to first draft | # of weeks of a full-time, individual data scientist | In our subjective assessment, how long do we think it would take one Justice40 data scientist working full-time to clean and publish this data as a first draft? |
| Data formats | Text / Array | Developers need to know what formats the data is available in |
| Spatial resolution | Text | Dev team needs to know if the resolution is granular enough to be useful |
| Level of Confidence | Text | How much has it been vetted by an agency; is this the de facto data set for the topic? |
| Last updated at | Date | When was the data last updated / refreshed? We need a way to capture recency if not able to get a date |
| Frequency of updates | Text | How often is this data updated? Is it updated on a reliable cadence? |
| Peer review | Text | Overview or links out to peer review done on this dataset |
| Where/how is data available | Text | Is it available on Geoplatform.gov? Is it available from multiple sources? Do we need to SFTP into a server to get it? (Maybe this should be two separate columns) |
| Category / taxonomy keywords | Array | Since the taxonomy for these indicators and datasets isn't an exact science and different audiences may use different ways to refer to the data set categories, let's use a list of keywords instead of a single word |
| Accreditation | Text | Is this source accredited? |
| Can data go in cloud? | Yes/No | Some datasets can not legally go in the cloud |
| Documentation | Text / URL | Link to docs. Also, is the documentation good enough? Can we get the info we need? |
| Legal weasels | Text | Legal disclaimers, assumption of risk, proprietary? |
| Risk assessment of the data | Text or High/Medium/Low | E.g. a vendor-processed version of the dataset might not be open or good enough |

Other ideas for consideration:

* Transparency
* Reproducibility
* A way to capture the owner vs host of the data
* How likely are the data owner/host is to be able to update the data at proposed frequency

# Tooling proposal and milestones

There is no single tool that supports all the goals and user stories above. Therefore we've proposed combining a number of tools in a way that can support them all.

We've also proposed various "milestones" that will allow us to iteratively and sequentially build the data roadmap in a way that supports the entire vision but starts with small and achievable steps. These milestones are proposed in order.

## Milestone: YAML files for data sets and linter

To start, we'll create a folder in the appropriate repository [is this `justice40-tool`?] that can house YAML files, one per data set. Each file will describe the characteristics of the data.

The benefit of using a YAML file for this is that it's easy to subject changes to these files to peer review through the pull request process. This allows external collaborators from the open source community to submit suggested changes, which can be reviewed by the core CEJST team.

We'll use a Python-based script to load all the files in the directory, and then run a schema validator to ensure all the files have valid entries.

For schema validation, we propose using [Yamale](https://github.com/23andMe/Yamale). This provides a lightweight schema and validator, and [integrates nicely with GitHub actions](https://github.com/nrkno/yaml-schema-validator-github-action).

If there's an improper format in any of the files, the schema validator will throw an error.

As part of this milestone, we will also set this up to run automatically with each commit to any branch as part of CI/CD.

## Milestone: Google forms integration

To make it easy for non-engineer members of the public and advisory bodies such as the WHEJAC to submit suggestions for data sets, we will configure a Google Form that maps to the schema of the data set files.

This will enable members of the public to fill out a simple form suggesting data without needing to understand Github or other engineering concepts.

At first, these responses can just go into a resulting Google Sheet and be manually copied and converted into data set description files. Later, we can write a script that converts new entries in the Google Sheet automatically into data set files. This can be setup to run as a trigger on the addition of new rows to the Google Sheet.

## Milestone: Post data in tabular format

Add a script that runs the schema validator on all files and, if successful, posts the results in a tabular format. There are straightforward packages to post a Python dictionary / `pandas` dataframe to Google Sheets and/or Airtable. As part of this milestone, we will also set this up to run automatically with each commit to `main` as part of CI/CD.

This will make it easier to filter the data to answer questions like, "which data sources are available at the census block group level".

## Milestone: Tickets created for incorporating data sets

For each data set that is being considered for inclusion soon in the tool, the project management team will create a ticket for "Incorporating ___ data set into the database", with a link to the data set detail document. This ticket will be created in the ticket tracking system used by the open source repository, which is ZenHub. This project management system will be public.

At the initial launch, we are not planning for members of the open source community to be able to create tickets, but we would like to consider a process for members of the open source community creating tickets that can go through review by the CEJST team.

This will help developers know what to work on next, and open source community members can also pick up tickets and work to integrate the data sets.

## Milestone: Add problem areas

We'll need to somehow track "problem areas" that describe problems in climate, environmental, and economic justice, even without specific proposals of data sets. For instance, a problem area may be "food insecurity", and a number of data sets can have this as their problem area.

We can change the linter to validate that every data set description maps to one or more known problem areas.

The benefit of this is that some non-data-focused members of the public or the WHEJAC advisory body may want to suggest we prioritize certain problem areas, with or without ideas for specific data sets that may best address that problem area.

It is not clear at this time the best path forward for implementing these problem area descriptions. One option is to create a folder for descriptions of problem areas, which contains YAML files that get validated according to a schema. Another option would be simply to add these as an array in the description of data sets, or add labels to the tickets once data sets are tracked in GitHub tickets. 

## Milestone: Add prioritzation voting for WHEJAC and members of the public

This milestone is currently the least well-defined. It's important that members of advisory bodies like the WHEJAC and members of the public be able to "upvote" certain data sets for inclusion in the tool.

One potential for this is to use the [Stanford Participatory Budgeting Platform](https://pbstanford.org/). Here's an [example of voting on proposals within a limited budget](https://pbstanford.org/nyc8/knapsack).

For instance, going into a quarterly planning cycle, the CEJST development team could estimate the amount of time (in developer-weeks) that it would take to clean, analyze, and incorporate each potential data set. For instance, incorporating some already-cleaned census data may take 1 week of a developer's time, while incorporating new asthma data from CMS that's never been publicly released could take 5 weeks. Given a "budget" of the number of developer weeks available (e.g., 2 developers for 13 weeks, or 26 developer-weeks), advisors can vote on their top priorities for inclusion in the tool within the available "budget".
