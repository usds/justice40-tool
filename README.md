# Justice40 Tool
[![CC0 License](https://img.shields.io/badge/license-CCO--1.0-brightgreen)](https://github.com/usds/justice40-tool/blob/main/LICENSE)

*[¡Lea esto en español!](README-es.md)*

Welcome to the Justice40 Open Source Community! This repo contains the code, processes, and documentation for the data and tech powering the Justice40 Climate and Economic Justice Screening Tool (CEJST).

## Background
The Justice40 initiative and screening tool were announced in an [Executive Order](https://www.whitehouse.gov/briefing-room/presidential-actions/2021/01/27/executive-order-on-tackling-the-climate-crisis-at-home-and-abroad/) in January 2021, with the goal to launch an MVP of the tool by July 27, 2021. This tool will include interactive maps and an initial draft scorecard which federal agencies can use to prioritize historically overburdened and underserved communities for benefits in their programs.

## Core team
The core Justice40 team building this tool is a small group of designers, developers, and product managers from the US Digital Service in partnership with the Council on Environmental Quality (CEQ). 

An up-to-date list of core team members can be found in [MAINTAINERS.md](MAINTAINERS.md). The engineering members of the core team who maintain the code in this repo are listed in [.github/CODEOWNERS](.github/CODEOWNERS).

## Community
The Justice40 team is taking a community-first and open source approach to the product development of this tool. We believe government software should be made in the open and be built and licensed such that anyone can take the code, run it themselves without paying money to third parties or using proprietary software, and use it as they will. 

We know that we can learn from a wide variety of communities, including those who will use or will be impacted by the tool, who are experts in data science or technology, or who have experience in climate, economic,or environmental justice work. We are dedicated to creating forums for continuous conversation and feedback to help shape the design and development of the tool. 

We also recognize capacity building as a key part of involving a diverse open source community. We are doing our best to use accessible language, provide technical and process documents in multiple languages, and offer support to our community members of a wide variety of background and skillsets, directly or in the form of group chats and training. If you have ideas for how we can improve or add to our capacity building efforts and methods for welcoming folks into our community, please let use know in the [Google Group](https://groups.google.com/u/4/g/justice40-open-source) or email us at justice40open@usds.gov.

### Community Guidelines
Principles and guidelines for participating in our open source community are available [here](COMMUNITY_GUIDELINES.md). Please read them before joining or starting a conversation in this repo or one of the channels listed below. 

### Community Chats
We host open source community chats every two weeks on Monday at 5-6pm ET. You can find information about the agenda and how to participate in our [Google Group](https://groups.google.com/u/4/g/justice40-open-source).

Community members are welcome to share updates or propose topics for discussion in community chats. Please do so in the Google Group.

### Google Group
Our [Google Group](https://groups.google.com/u/4/g/justice40-open-source) is open to anyone to join and share their knowledge or experiences, as well as to ask questions of the core Justice40 team or the wider community. 

The core team uses the group to post updates on the program and tech/data issues, and to share the agenda and call for community participation in the community chat.

Curious about whether to ask a question here as a Github issue or in the Google Group? The general rule of thumb is that issues are for actionable topics related to the tool or data itself (e.g. questions about a specific data set in use, or suggestion for a new tool feature), and the Google Group is for more general topics or questions. If you can't decide, use the google group and we'll discuss there before moving to Github if appropriate! 

## Contributing

Contributions are always welcome! We encourage contributions in the form of discussion on issues in this repo and pull requests of documentation and code. 

See [CONTRIBUTING.md](CONTRIBUTING.md) for ways to get started.

## Installation (macOS)

#### Get dev tools
1. Open the terminal and type `git` and hit RETURN.
2. If dev tools are not installed a window will prompt you to install dev tools. 
3. Open the terminal and type `git --version` and hit RETURN.
4. Validate that a version number is returned. If so, git is properly installed.

#### Install Homebrew
1. Open the terminal and copy / paste this command and hit RETURN.

`/bin/bash -c “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`

2. Validate installation by typing `brew -v` in the terminal and ensure a version number is shown.

#### Install Node
1. Open the terminal and type `brew install node` and hit RETURN. 
    1. If this returns an error, you can download Node directly from it's [website](https://nodejs.org/en/).

#### Install Yarn and Gatsby CLI
Note that while this app uses npm as the package manager, yarn is required to build the [uswds](https://github.com/uswds/uswds) library.

1.  Open the terminal and type `sudo npm install -global yarn` and hit RETURN.
    1. Type `yarn -v` and hit RETURN
    2. Verify a version number is shown
2. Open the terminal and type `sudo npm install -global gatsby-cli` and hit RETURN.
    1. Type `gatsby-cli -v` and hit RETURN
    2. Verify a version number is shown

#### IDE set up
While any IDE can be used, we're outlining how to set up VS Code

1. Open the terminal and type `brew install --cask visual-studio-code` and hit RETURN.
    1. If this doesn't work, you can download VS Code from the [website](https://code.visualstudio.com/).
2. After [forking this repo](https://github.com/usds/justice40-tool/blob/main/CONTRIBUTING.md#code-contributions), you can clone your forked repo into VS Code
3. Open the terminal and navigate to `client` directory
4. Type `npm install` to load dependencies
5. Type `gatsby develop` to spin up the app
6. Navigate to `localhost:8000` to view the app

## Glossary

Confused about a term? Heard an acronym and have no idea what it stands for? Check out [our glossary](docs/glossary.md)!

## Feedback

If you have any feedback or questions, please reach out to us at justice40open@usds.gov.
