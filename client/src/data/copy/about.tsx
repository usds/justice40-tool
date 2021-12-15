import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';

export const EXEC_ORDER_LINK = 'https://www.federalregister.gov/documents/2021/02/01/2021-02177/tackling-the-climate-crisis-at-home-and-abroad#:~:text=Sec.%20223.%20Justice40,40-percent%20goal.';

export const PAGE = defineMessages({
  TILE: {
    id: 'about.page.title.text',
    defaultMessage: 'About',
    description: 'about page title text',
  },
  HEADING: {
    id: 'index.heading.about.us',
    defaultMessage: 'About us',
    description: 'main heading for about page',
  },
  HEADING_1: {
    id: 'index.heading.screentool',
    defaultMessage: 'Screening tool',
    description: 'heading for about screening tool',
  },
  HEADING1_DESCRIPTION1: {
    id: 'about.page.sub.header.1.text.1',
    defaultMessage: 'In Executive Order 14008 on Tackling the Climate Crisis at Home and Abroad'+
    ' Environmental Quality (CEQ) to create a climate and economic'+
    ' justice screening tool. The purpose of the tool is to help'+
    ' Federal agencies identify disadvantaged communities and provide'+
    ' socioeconomic, environmental, and climate information and data'+
    ' to inform decisions that may affect these communities. The tool'+
    ' identifies disadvantaged communities as communities of focus'+
    ' through publicly available, nationally consistent, high-quality'+
    ' data.',
    description: 'about page sub header text',
  },
  HEADING1_DESCRIPTION2: {
    id: 'about.page.sub.header.1.text.2',
    defaultMessage: 'The current version of the tool is in a public beta form and'+
    ' will be updated based on feedback and research.',
    description: 'about page sub header text',
  },
  HEADING_2: {
    id: 'index.heading.justice40',
    defaultMessage: 'Justice40 Initiative',
    description: 'heading for about justice 40',
  },
  HEADING2_DESCRIPTION1: {
    id: 'about.page.sub.header.2.text.1',
    defaultMessage: 'The tool will provide important information for the Justice40'+
    ' Initiative. The goal of the Justice40 Initiative is to provide'+
    ' 40-percent of the overall benefits of certain federal'+
    ' programs in seven key areas to disadvantaged communities.'+
    ' These seven key areas are: climate change, clean energy and'+
    ' energy efficiency, clean transit, affordable and sustainable'+
    ' housing, training and workforce development, the remediation'+
    ' and reduction of legacy pollution, and the development of'+
    ' critical clean water infrastructure.',
    description: 'about page sub header text',
  },
});

export const HEADING_1 = {
  DESCRIPTION_1:
  <FormattedMessage
    id={'about.page.sub.header.1.text.1'}
    description={'about page sub header text'}
    defaultMessage={`
    In {eoLink} on Tackling the Climate Crisis at Home and Abroad,
    President Biden directed the Council on 
    Environmental Quality (CEQ) to create a Climate and Economic
    Justice Screening Tool. The purpose of the tool is to help
    Federal agencies identify disadvantaged communities 
    that have been historically marginalized, underserved, and 
    overburdened by pollution. The tool provides
    socioeconomic, environmental, and climate information
    to inform decisions that may affect these communities. The tool
    identifies disadvantaged communities
    through publicly available, nationally consistent, high-quality
    data.
    `}
    values={{
      eoLink:
      <a href={EXEC_ORDER_LINK}>
        Executive Order 14008
      </a>,
    }}
  />,
};

export const HEADING_2 = {
  DESCRIPTION_2:
  <FormattedMessage
    id={'about.page.sub.header.2.text.2'}
    description={'about page sub header text'}
    defaultMessage={`
    Read more about the Justice40 Initiative in President Biden’s
    {eoLink} on Tackling the Climate Crisis at Home and Abroad.
    `}
    values={{
      eoLink:
      <a href={EXEC_ORDER_LINK}>
        Executive Order 14008
      </a>,
    }}
  />,
};


export const GITHUB_LINK = 'https://github.com/usds/justice40-tool';

export const HOW_TO_GET_STARTED = defineMessages({
  TITLE: {
    id: 'howToGetStarted.title',
    defaultMessage: 'How to get started',
    description: 'sub heading of page',
  },
  FEDERAL_PM_HEADING: {
    id: 'federal.pm.heading',
    defaultMessage: 'Federal program managers',
    description: 'sub heading of page',
  },
  FEDERAL_PM_INFO: {
    id: 'federal.pm.info',
    defaultMessage: `
      Download the tool’s current list of communities, explore data that may be useful to your 
      program, and provide feedback on the tool.
    `,
    description: 'sub heading of page',
  },
  FEDERAL_PM_LINK_TEXT: {
    id: 'federal.pm.link',
    defaultMessage: 'Methodology & data',
    description: 'link text to go to methodology page',
  },
  COMMUNITY_MEMBERS_HEADING: {
    id: 'community.members.heading',
    defaultMessage: 'Community members',
    description: 'sub heading of page',
  },
  COMMUNITY_MEMBERS_INFO: {
    id: 'community.members.info',
    defaultMessage: `
    Explore data about communities in your area and provide feedback on the tool.
    `,
    description: 'sub heading of page',
  },
  COMMUNITY_MEMBERS_LINK_TEXT: {
    id: 'community.members.link',
    defaultMessage: 'Explore the tool',
    description: 'link to explore the tool page',
  },
});

export const GET_INVOLVED = defineMessages({
  TITLE: {
    id: 'getInvolved.title',
    defaultMessage: 'Get involved',
    description: 'sub heading of page',
  },
  SEND_FEEDBACK_HEADING: {
    id: 'send.feedback.heading',
    defaultMessage: 'Send feedback',
    description: 'sending feedback heading',
  },
  SEND_FEEDBACK_INFO: {
    id: 'send.feedback.info',
    defaultMessage: 'Have ideas about how this tool can be improved to better reflect'+
    ' the on-the-ground experiences of your community?',
    description: 'sending feedback information',
  },
  JOIN_OSC_HEADING: {
    id: 'join.opensource.heading',
    defaultMessage: 'Join the open source community',
    description: 'join the community heading',
  },
  JOIN_OSC_INFO: {
    id: 'join.open.source.info',
    defaultMessage: 'The screening tool’s code is open source, which means it is '+
    ' available for the public to view and contribute to. Anyone can view and contribute on GitHub.',
    description: 'info on joining open source community',
  },
  JOIN_OSC_LINK_TEXT: {
    id: 'join.open.source.link',
    defaultMessage: 'Check it out on GitHub',
    description: 'link to github repository',
  },
});


