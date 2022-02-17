import React from 'react';
import {defineMessages} from 'react-intl';
import {FormattedMessage, Link} from 'gatsby-plugin-intl';
import LinkTypeWrapper from '../../components/LinkTypeWrapper';

export const PAGE_INTRO = defineMessages({
  PAGE_TILE: {
    id: 'contact.page.title.text',
    defaultMessage: 'Contact',
    description: 'contact page title text',
  },
  PAGE_HEADING: {
    id: 'contact.page.header.text',
    defaultMessage: 'Contact',
    description: 'contact page header text',
  },
  PAGE_SUB_HEADING: {
    id: 'contact.page.sub.header.text',
    defaultMessage: 'Email us',
    description: 'contact page sub header text',
  },
  PAGE_DESCRIPTION: {
    id: 'contact.page.sub.header.text',
    defaultMessage: 'Email us',
    description: 'contact page sub header text',
  },
  SURVEY_TEXT: {
    id: 'fab.survey.text',
    defaultMessage: `Help improve the site & data`,
    description: 'text for floating action button',
  },
});

export const CENSUS_TRACK_FEEDBACK = {
  TITLE: <FormattedMessage
    id={'contact.page.census.track.feedback.title'}
    defaultMessage={`Census track feedback`}
    description={'census track feedback section'}
  />,
  PARAGRAPH1: <FormattedMessage
    id={'contact.page.census.track.feedback.para1'}
    defaultMessage={`
      To provide feedback about a specific census tract, either select the send feedback button after 
      finding a tract on the {exploreLink} page or use the email address provided above. Please 
      include the census tract ID, county, and state or territory information, in addition to your feedback.
    `}
    description={'census track feedback section'}
    values={{
      exploreLink: <Link to={'/cejst'}>Explore the tool</Link>,
    }}
  />,
  PARAGRAPH2: <FormattedMessage
    id={'contact.page.census.track.feedback.para2'}
    defaultMessage={`
      If there are specific data indicators that could be improved or changed, please include that
      information in the body of the email.
    `}
    description={'census track feedback section'}
  />,
  PARAGRAPH3: <FormattedMessage
    id={'contact.page.census.track.feedback.para1'}
    defaultMessage={`
      In addition, you can provide feedback on the tool via this {improvementSurvey}.
    `}
    description={'census track feedback section'}
    values={{
      improvementSurvey: <LinkTypeWrapper
        linkText={'survey'}
        internal={false}
        url={`https://www.surveymonkey.com/r/cejst-survey`}
        openUrlNewTab={true}
      />,
    }}
  />,
};

export const CONTACT_VIA_EMAIL = {
  ID: 'contact.general',
  DESCRIPTION: 'Contact page body text',
  DEFAULT_MESSAGE: `For general feedback, email {general_email_address}.`,
};

export const FEEDBACK_EMAIL = 'Screeningtool-Support@omb.eop.gov';
