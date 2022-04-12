/* eslint-disable max-len */
import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage} from 'gatsby-plugin-intl';
import {italicFn, linkFn} from './common';

export const EXEC_ORDER_LINK = 'https://www.federalregister.gov/documents/2021/02/01/2021-02177/tackling-the-climate-crisis-at-home-and-abroad#:~:text=Sec.%20223.%20Justice40,40-percent%20goal.';
export const FAQS_LINK = 'https://www.whitehouse.gov/wp-content/uploads/2022/02/CEQ-CEJST-QandA.pdf';

export const PAGE = defineMessages({
  TILE: {
    id: 'about.page.title.text',
    defaultMessage: 'About',
    description: 'Navigate to the About page. This is the about page title text',
  },
  HEADING: {
    id: 'about.page.heading.text',
    defaultMessage: 'About',
    description: 'Navigate to the About page. This is the first heading',
  },
  HEADING_1: {
    id: 'about.page.heading.1.text',
    defaultMessage: 'Screening tool',
    description: 'Navigate to the About page. This is the second heading',
  },
  HEADING1_DESCRIPTION2: {
    id: 'about.page.sub.header.1.text.2',
    defaultMessage: 'The current version of the tool is in a public beta form and'+
    ' will be updated based on feedback and research.',
    description: 'Navigate to the About page. This is first heading description',
  },
  HEADING_2: {
    id: 'about.page.sub.header.2.text',
    defaultMessage: 'The Justice40 Initiative',
    description: 'Navigate to the About page. This is the third heading',
  },
  HEADING2_DESCRIPTION1: {
    id: 'about.page.sub.header.2.text.1',
    defaultMessage: `
      The tool will provide important information for the Justice40 Initiative. The goal of the 
      Justice40 Initiative is to provide 40 percent of the overall benefits of certain Federal
      investments in seven key areas to disadvantaged communities. These seven key areas are: climate 
      change, clean energy and energy efficiency, clean transit, affordable and sustainable
      housing, training and workforce development, the remediation and reduction of legacy pollution, 
      and the development of critical clean water infrastructure.
    `,
    description: 'Navigate to the About page. This is the third heading description',
  },
  HEADING_3: {
    id: 'about.page.sub.header.3.text',
    defaultMessage: 'Still have questions?',
    description: 'Navigate to the About page. This is the fourth heading',
  },

});

export const HEADING_1 = {
  DESCRIPTION_1:
  <FormattedMessage
    id={'about.page.sub.header.1.text.1'}
    description={'Navigate to the About page. This is the second heading description'}
    defaultMessage={`
    In <link1>Executive Order 14008</link1> on <italictag>Tackling the Climate Crisis at Home and Abroad</italictag>, President Biden directed the Council on Environmental Quality (CEQ) 
    to create a Climate and Economic Justice Screening Tool. The purpose of the tool is to help
    Federal agencies identify disadvantaged communities that are marginalized, underserved, and 
    overburdened by pollution. The current version of the tool provides socioeconomic, environmental, 
    and climate information to inform decisions that may affect these communities. The 
    tool identifies disadvantaged communities through publicly-available, nationally-consistent datasets.
    `}
    values={{
      link1: linkFn(EXEC_ORDER_LINK, false, true),
      italictag: italicFn,
    }}
  />,
};
export const HEADING_3 = {
  DESCRIPTION_1:
  <FormattedMessage
    id={'about.page.sub.header.3.text.1'}
    defaultMessage={`Find answers on the Climate and Economic Justice Screening Tool's <link1>Frequently Asked Questions</link1>.
    `}
    description={'Navigate to the About page. This is the second heading description'}
    values={{
      link1: linkFn(FAQS_LINK, false, true),
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
    <link1>Executive Order 14008</link1> on <italictag>Tackling the Climate Crisis at Home and Abroad</italictag>.
    `}
    values={{
      link1: linkFn(EXEC_ORDER_LINK, false, true),
      italictag: italicFn,
    }}
  />,
};


export const GITHUB_LINK = 'https://github.com/usds/justice40-tool';

export const HOW_TO_GET_STARTED = defineMessages({
  TITLE: {
    id: 'about.page.howToGetStarted.title',
    defaultMessage: 'How to get started',
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  FEDERAL_PM_HEADING: {
    id: 'about.page.federal.pm.heading',
    defaultMessage: 'Federal program managers',
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  FEDERAL_PM_INFO: {
    id: 'about.page.federal.pm.info',
    defaultMessage: `
      Download the tool’s current list of communities, explore data that may be useful to your 
      program, and provide feedback on the tool.
    `,
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  FEDERAL_PM_LINK_TEXT: {
    id: 'about.page.federal.pm.link',
    defaultMessage: 'Methodology & data',
    description: 'link text to Navigate to the About page. This is the go to methodology page',
  },
  COMMUNITY_MEMBERS_HEADING: {
    id: 'about.page.community.members.heading',
    defaultMessage: 'Community members',
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  COMMUNITY_MEMBERS_INFO: {
    id: 'about.page.community.members.info',
    defaultMessage: `
      Explore data about communities across the U.S., including your own, and provide feedback on the tool.
    `,
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  COMMUNITY_MEMBERS_LINK_TEXT: {
    id: 'about.page.community.members.link',
    defaultMessage: 'Explore the map',
    description: 'link to Navigate to the About page. This is the explore the map page',
  },
});

export const GET_INVOLVED = defineMessages({
  TITLE: {
    id: 'about.page.getInvolved.title',
    defaultMessage: 'Get involved',
    description: 'Navigate to the About page. This is the sub heading of page',
  },
  SEND_FEEDBACK_HEADING: {
    id: 'about.page.send.feedback.heading',
    defaultMessage: 'Send feedback',
    description: 'Navigate to the About page. This is the sending feedback heading',
  },
  SEND_FEEDBACK_INFO: {
    id: 'about.page.send.feedback.info',
    defaultMessage: `
      Have ideas about data and information that reflect the experiences and conditions of your community?
    `,
    description: 'Navigate to the About page. This is the sending feedback information',
  },
  JOIN_OSC_HEADING: {
    id: 'about.page.join.opensource.heading',
    defaultMessage: 'Join the open source community',
    description: 'Navigate to the About page. This is the join the community heading',
  },
  JOIN_OSC_INFO: {
    id: 'about.page.join.open.source.info',
    defaultMessage: `
      The tool’s code is open source, which means it is available for the public to view and contribute to it.
    `,
    description: 'info on Navigate to the About page. This is the joining open source community',
  },
  JOIN_OSC_LINK_TEXT: {
    id: 'about.page.join.open.source.link',
    defaultMessage: 'Check it out on GitHub',
    description: 'Navigate to the About page. This is the link to github repository',
  },
});


