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
});

export const CONTACT_VIA_EMAIL = {
  ID: 'contact.general',
  DESCRIPTION: 'Contact page body text',
  DEFAULT_MESSAGE: `For general feedback, email {general_email_address}`,
};

export const MESSAGE_TYPES = defineMessages({
  FORM_SELECTION_PROMPT: {
    id: 'contact.page.message.type.prompt',
    defaultMessage: 'What would you like to inform us about?',
    description: 'prompt to select the message type',
  },
  BUG_REPORT: {
    id: 'contact.page.message.type.bug',
    defaultMessage: 'Report a bug',
    description: 'selecting a type of message, a bug',
  },
  COMMUNITY_FEEDBACK: {
    id: 'contact.page.message.type.community.feedback',
    defaultMessage: 'Community feedback',
    description: 'selecting a type of message, community feedback',
  },
  DATASET_FEEDBACK: {
    id: 'contact.page.message.type.dataset.feedback',
    defaultMessage: 'Dataset feedback',
    description: 'selecting a type of message, dataset feedback',
  },
});

export const FEEDBACK_EMAIL = 'screeningtool.feedback@usds.gov';
