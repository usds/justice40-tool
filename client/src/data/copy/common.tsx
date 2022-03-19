/* eslint-disable react/display-name */
import React from 'react';
import {defineMessages} from 'react-intl';
import LinkTypeWrapper from '../../components/LinkTypeWrapper';

/*
 * i18n curried functions from react-intl (aka format.js)
 * using ver3 of the docs as this is what gatsby-plugin-intl uses:
 * https://formatjs.io/docs/react-intl/upgrade-guide-3x#enhanced-formattedmessage--formatmessage-rich-text-formatting
 *
 * */
export const italicFn = (str:string) => <i>{str}</i>;
export const boldFn = (str:string) => <strong>{str}</strong>;
export const downloadLink = (href:string) => (str:string) => <a href={href}>{str}</a>;
// eslint-disable-next-line max-len
export const linkFn = (to:string, isInternal:boolean, isOpenNewTab:boolean) => (str:string) => <LinkTypeWrapper linkText={str} internal={isInternal} url={to} openUrlNewTab={isOpenNewTab}/>;

// Beta Banner
export const BETA_BANNER = defineMessages({
  TITLE: {
    id: 'banner.beta.title',
    defaultMessage: 'This is a beta site.',
    description: 'the main title of the beta banner',
  },
  INFO: {
    id: 'banner.beta.info',
    defaultMessage: `It is an early, in-progress version of the tool with limited datasets that will 
    be regularly updated.`,
    description: 'the main info of the beta banner',
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
    defaultMessage: 'Methodology & data',
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
    id: 'footer.whitehouse.text',
    defaultMessage: 'Whitehouse.gov',
    description: 'Footer Whitehouse.gov link text',
  },
  WHITEHOUSE_LINK: {
    id: 'footer.whitehouse.link',
    defaultMessage: 'https://www.whitehouse.gov/',
    description: 'Footer Whitehouse.gov link text',
  },
  FOIA: {
    id: 'footer.foia.text',
    defaultMessage: 'Freedom of Information Act (FOIA)',
    description: 'Footer FOIA link text',
  },
  PRIVACY: {
    id: 'footer.privacy.text',
    defaultMessage: 'Privacy Policy',
    description: 'Footer privacy policy link text',
  },
  PRIVACY_LINK: {
    id: 'footer.privacy.link',
    defaultMessage: 'https://www.whitehouse.gov/privacy/',
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
  FIND_CONTACT: {
    id: 'footer.findcontact',
    defaultMessage: 'Find a contact at USA.gov',
    description: 'Footer find contact link text',
  },
  FIND_CONTACT_LINK: {
    id: 'footer.findcontact.link',
    defaultMessage: 'https://www.usa.gov/',
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

export const CONSOLE_ERROR = defineMessages({
  STAGE_URL: {
    id: 'console.error.stage.url',
    defaultMessage: `
      Please check stage_hash value. It must be a 4 digit decimal value / 40 digit hexadecimal value`,
    description: 'console error staging URL',
  },
});
