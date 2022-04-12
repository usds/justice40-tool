/* eslint-disable max-len */
/* eslint-disable react/display-name */
import React from 'react';
import {FormattedDate, FormattedMessage} from 'gatsby-plugin-intl';
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
export const simpleLink = (href:string) => (str:string) => <a href={href}>{str}</a>;
// eslint-disable-next-line max-len
export const linkFn = (to:string, isInternal:boolean, isOpenNewTab:boolean) => (str:string) => <LinkTypeWrapper linkText={str} internal={isInternal} url={to} openUrlNewTab={isOpenNewTab}/>;

export const FEEDBACK_EMAIL = 'Screeningtool-Support@omb.eop.gov';

// Beta Banner
export const BETA_BANNER = defineMessages({
  TITLE: {
    id: 'common.pages.banner.beta.title',
    defaultMessage: 'This is a beta site.',
    description: 'Navigate to the about page. This is the main title of the beta banner',
  },
  INFO: {
    id: 'common.pages.banner.beta.info',
    defaultMessage: `It is an early, in-progress version of the tool with limited datasets that will 
    be regularly updated.`,
    description: 'Navigate to the about page. This is the main info of the beta banner',
  },
});


// Alerts
// Expiration month is zero-based: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
const ALERT_1_EXPIRATION_DATE= new Date(2022, 4, 25); // May 25
export const ALERTS = {
  ALERT_1_TITLE: defineMessages({
    TITLE: {
      id: 'common.pages.alerts.public_comment_period.title',
      defaultMessage: 'Public comment period extended',
      description: 'Alert title that appears on landing page.',
    },
  }),
  EXPIRATION_DATE: ALERT_1_EXPIRATION_DATE,
  ALERT_1_DESCRIPTION: <FormattedMessage
    id={'common.pages.alerts.public_comment_period.description'}
    defaultMessage={`The public comment period for <link1>sending feedback</link1> has been extended to {expDate1}.`}
    description={`Alert body that appears on landing page.`}
    values={{
      link1: linkFn('https://www.federalregister.gov/documents/2022/04/25/2022-08774/climate-and-economic-justice-screening-tool-beta-version', false, true),
      expDate1: <FormattedDate
        value={ALERT_1_EXPIRATION_DATE}
        year="numeric"
        month="short"
        day="numeric"
      />,
    }}
  />,

  ALERT_2_TITLE: defineMessages({
    TITLE: {
      id: 'common.pages.alerts.census.tract.title',
      defaultMessage: 'Improvements to the tool on the Explore the map page',
      description: 'Navigate to any page. This the title of the alert that informs the user that new census tract information is available',
    },
  }),
  ALERT_2_DESCRIPTION: <FormattedMessage
    id={'common.pages.alerts.additional_docs_available.description'}
    defaultMessage={`Download new technical support and other documentation and <link2>send feedback</link2>.`}
    description={`Alert title that appears at the top of pages.`}
    values={{
      link2: linkFn(`mailto:${FEEDBACK_EMAIL}`, false, true),
    }}
  />,
};

// Header
export const HEADER = defineMessages({
  TITLE_LINE_1: {
    id: 'common.pages.header.title.line1',
    defaultMessage: `Climate and Economic Justice`,
    description: 'Navigate to the about page. This is Title in nav header line 1 of 2',
  },
  TITLE_LINE_2: {
    id: 'common.pages.header.title.line2',
    defaultMessage: `Screening Tool`,
    description: 'Navigate to the about page. This is Title in nav header line 2 of 2',
  },
  ABOUT: {
    id: 'common.pages.header.about',
    defaultMessage: 'About',
    description: 'Navigate to the about page. This is Header navigate item to the about page',
  },
  EXPLORE: {
    id: 'common.pages.header.explore',
    defaultMessage: 'Explore the map',
    description: 'Navigate to the about page. This is Header navigate item to the Explore the map page',
  },
  METHODOLOGY: {
    id: 'common.pages.header.methodology',
    defaultMessage: 'Methodology & data',
    description: 'Navigate to the about page. This is Header navigate item to the Methodology page',
  },
  CONTACT: {
    id: 'common.pages.header.contact',
    defaultMessage: 'Contact',
    description: 'Navigate to the about page. This is Header navigate item to the Contact page',
  },
  DOWNLOADS: {
    id: 'common.pages.header.downloads',
    defaultMessage: 'Downloads',
    description: 'Navigate to the about page. This is Header navigate item to the downloads page',
  },
  FAQs: {
    id: 'common.pages.header.faqs',
    defaultMessage: 'Frequently asked questions',
    description: 'Navigate to the about page. This is Header navigate item to the faqs page',
  },
  PUBLIC_ENG: {
    id: 'common.pages.header.public.eng',
    defaultMessage: 'Engagement calendar',
    description: 'Navigate to the about page. This is Header navigate item to the public eng page',
  },
  TSD: {
    id: 'common.pages.header.tsd',
    defaultMessage: 'Technical Support Document',
    description: 'Navigate to the about page. This is Header navigate item to the technical support document page',
  },
});

// Footer
export const FOOTER = defineMessages({
  ARIA_LABEL: {
    id: 'common.pages.footer.arialabel',
    defaultMessage: 'Footer navigation',
    description: 'Navigate to the about page. This is aria-label text for whole footer',
  },
  TITLE: {
    id: 'common.pages.footer.logo.title',
    defaultMessage: 'Council on Environmental Quality',
    description: 'Navigate to the about page. This is Footer under logo',
  },
  MORE_INFO: {
    id: 'common.pages.footer.moreinfoheader',
    defaultMessage: 'More information',
    description: 'Navigate to the about page. This is Footer column header',
  },
  ENG_CAL: {
    id: 'common.pages.footer.eng.cal.text',
    defaultMessage: 'Engagement calender',
    description: 'Navigate to the about page. This is Footer eng.cal.gov link text',
  },
  RFI: {
    id: 'common.pages.footer.rfi.text',
    defaultMessage: 'Request for Infomation',
    description: 'Navigate to the about page. This is Footer rfi link text',
  },
  RFI_LINK: {
    id: 'common.pages.footer.rfi.link',
    defaultMessage: 'https://www.federalregister.gov/d/2022-03920',
    description: 'Navigate to the about page. This is Footer rfi link',
  },
  WHITEHOUSE: {
    id: 'common.pages.footer.whitehouse.text',
    defaultMessage: 'Whitehouse.gov',
    description: 'Navigate to the about page. This is Footer Whitehouse.gov link text',
  },
  WHITEHOUSE_LINK: {
    id: 'common.pages.footer.whitehouse.link',
    defaultMessage: 'https://www.whitehouse.gov/',
    description: 'Navigate to the about page. This is Footer Whitehouse.gov link text',
  },
  FOIA: {
    id: 'common.pages.footer.foia.text',
    defaultMessage: 'Freedom of Information Act (FOIA)',
    description: 'Navigate to the about page. This is Footer FOIA link text',
  },
  PRIVACY: {
    id: 'common.pages.footer.privacy.text',
    defaultMessage: 'Privacy Policy',
    description: 'Navigate to the about page. This is Footer privacy policy link text',
  },
  PRIVACY_LINK: {
    id: 'common.pages.footer.privacy.link',
    defaultMessage: 'https://www.whitehouse.gov/privacy/',
    description: 'Navigate to the about page. This is Footer privacy policy link text',
  },
  LOGO_ALT: {
    id: 'common.pages.footer.whitehouselogoalt',
    defaultMessage: 'Whitehouse logo',
    description: 'Navigate to the about page. This is Footer Whitehouse logo alt text',
  },
  FIND_CONTACT: {
    id: 'common.pages.footer.findcontact',
    defaultMessage: 'Find a contact at USA.gov',
    description: 'Navigate to the about page. This is Footer find contact link text',
  },
  FIND_CONTACT_LINK: {
    id: 'common.pages.footer.findcontact.link',
    defaultMessage: 'https://www.usa.gov/',
    description: 'Navigate to the about page. This is Footer find contact link text',
  },
  CONTRIBUTE: {
    id: 'common.pages.footer.contribute.header',
    defaultMessage: 'Want to contribute?',
    description: 'Navigate to the about page. This is third Footer column header',
  },
  GITHUB_LINK_TEXT: {
    id: 'common.pages.footer.github.link.text',
    defaultMessage: 'Check out the code on GitHub',
    description: 'Navigate to the about page. This is Footer github link text',
  },
  GITHUB_LINK: {
    id: 'common.pages.footer.gatsby.link',
    defaultMessage: 'https://github.com/usds/justice40-tool',
    description: 'Navigate to the about page. This is Footer find contact link text',
  },
  CONTACT: {
    id: 'common.pages.footer.contactheader',
    defaultMessage: 'Contact',
    description: 'Navigate to the about page. This is Footer column header',
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
    id: 'common.pages.console.error.stage.url',
    defaultMessage: `
      Please check stage_hash value. It must be a 4 digit decimal value / 40 digit hexadecimal value`,
    description: 'Navigate to the about page. This is console error staging URL',
  },
});
