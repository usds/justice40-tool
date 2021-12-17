import {defineMessages} from 'react-intl';

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

export const CONTACT_VIA_EMAIL = {
  ID: 'contact.general',
  DESCRIPTION: 'Contact page body text',
  DEFAULT_MESSAGE: `For general feedback, email {general_email_address}.`,
};

export const FEEDBACK_EMAIL = 'Screeningtool-Support@omb.eop.gov';
