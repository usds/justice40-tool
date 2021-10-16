import {defineMessages} from 'react-intl';

// Beta Banner
export const BETA_BANNER = defineMessages({
  TITLE: {
    id: 'banner.beta.title',
    defaultMessage: 'This is a Beta site.',
    description: 'the main title of the beta banner',
  },
  INFO: {
    id: 'banner.beta.info',
    defaultMessage: `It is an early, in-progress version of the tool with limited data 
    sets that will be continuously updated.`,
    description: 'the main title of the beta banner',
  },
});

// Header
export const HEADER = defineMessages({
  TITLE_LINE_1: {
    id: 'header.title.line1',
    defaultMessage: `Climate and Economic Justice`,
    description: 'Title in nav header line 1 of 2',
  },
  TITLE_LINE_2: {
    id: 'header.title.line2',
    defaultMessage: `Screening Tool`,
    description: 'Title in nav header line 2 of 2',
  },
  ABOUT: {
    id: 'header.about',
    defaultMessage: 'About',
    description: 'Header navigate item to the about page',
  },
  EXPLORE: {
    id: 'header.explore',
    defaultMessage: 'Explore the tool',
    description: 'Header navigate item to the Explore the tool page',
  },
  METHODOLOGY: {
    id: 'header.methodology',
    defaultMessage: 'Data & methodology',
    description: 'Header navigate item to the Methodology page',
  },
  CONTACT: {
    id: 'header.contact',
    defaultMessage: 'Contact',
    description: 'Header navigate item to the Contact page',
  },
});

// Footer
export const FOOTER = defineMessages({
  ARIA_LABEL: {
    id: 'footer.arialabel',
    defaultMessage: 'Footer navigation',
    description: 'aria-label text for whole footer',
  },
  TITLE: {
    id: 'footer.logo.title',
    defaultMessage: 'Council on Environmental Quality',
    description: 'Footer under logo',
  },
  MORE_INFO: {
    id: 'footer.moreinfoheader',
    defaultMessage: 'More information',
    description: 'Footer column header',
  },
  WHITEHOUSE: {
    id: 'footer.whitehouselink',
    defaultMessage: 'Whitehouse.gov',
    description: 'Footer Whitehouse.gov link text',
  },
  FOIA: {
    id: 'footer.foialink',
    defaultMessage: 'Freedom of Information Act (FOIA)',
    description: 'Footer FOIA link text',
  },
  PRIVACY: {
    id: 'footer.privacylink',
    defaultMessage: 'Privacy Policy',
    description: 'Footer privacy policy link text',
  },
  LOGO_ALT: {
    id: 'footer.whitehouselogoalt',
    defaultMessage: 'Whitehouse logo',
    description: 'Footer Whitehouse logo alt text',
  },
  QUESTIONS: {
    id: 'footer.questionsheader',
    defaultMessage: 'Have a question about government services?',
    description: 'Footer column header',
  },
  CONTACT_LINK: {
    id: 'footer.findcontactlink',
    defaultMessage: 'Find a contact at USA.gov',
    description: 'Footer find contact link text',
  },
  CONTACT: {
    id: 'footer.contactheader',
    defaultMessage: 'Contact',
    description: 'Footer column header',
  },
});

export const FOOTER_CEQ_ADDRESS = {
  NAME: 'Council on Environmental Quality',
  STREET: '730 Jackson Pl NW',
  CITY_STATE: 'Washington, D.C. 20506',
  PHONE: '(202) 395-5750',
}
;


