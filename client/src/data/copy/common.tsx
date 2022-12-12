/* eslint-disable max-len */
/* eslint-disable react/display-name */
import React from 'react';
import {FormattedDate, FormattedMessage} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';
import LinkTypeWrapper from '../../components/LinkTypeWrapper';
import DownloadLink from '../../components/DownloadLink';

export interface IDefineMessage {
  id: string,
  defaultMessage: string,
  description: string,
};

/*
 * i18n curried functions from react-intl (aka format.js)
 * using ver3 of the docs as this is what gatsby-plugin-intl uses:
 * https://formatjs.io/docs/react-intl/upgrade-guide-3x#enhanced-formattedmessage--formatmessage-rich-text-formatting
 *
 * */
export const italicFn = (str:string) => <i>{str}</i>;
export const boldFn = (str:string) => <strong>{str}</strong>;
export const simpleLink = (href:string) => (str:string) => <a className={'usa-link'} href={href}>{str}</a>;
// export const downloadLink = (href:string) => (str:string) => <a href={href} download>{str}</a>;
export const downloadLink = (href:string) => (str:string) => <DownloadLink href={href} linkText={str} />;
// eslint-disable-next-line max-len
export const linkFn = (to:string | IDefineMessage, isInternal:boolean, isOpenNewTab:boolean) => (str:string) => <LinkTypeWrapper linkText={str} internal={isInternal} url={to} openUrlNewTab={isOpenNewTab}/>;

export const FEEDBACK_EMAIL = 'Screeningtool-Support@omb.eop.gov';

export const METH_1_0_RELEASE_DATE = new Date(2022, 10, 22, 11, 59, 59); // Nov 22 2022
export const METH_BETA_RELEASE_DATE = new Date(2022, 1, 18, 11, 59, 59); // Feb 18 2022


// Beta Banner
export const BETA_BANNER_CONTENT = <FormattedMessage
  id={'common.pages.alerts.banner.beta.content'}
  defaultMessage={`<bold1>This tool has been updated.</bold1> The 1.0 version of the tool was released on {relDate}.`}
  description={`Alert body that appears on landing page.`}
  values={{
    bold1: boldFn,
    relDate: <FormattedDate
      value={METH_1_0_RELEASE_DATE}
      year="numeric"
      month="short"
      day="numeric"
    />,
  }}
/>;

export const TSD = defineMessages({
  URL: {
    id: 'common.pages.tsd.url',
    defaultMessage: `https://static-data-screeningtool.geoplatform.gov/data-pipeline/data/score/downloadable/cejst_technical_support_document.pdf`,
    description: 'Navigate to the Alerts on any page. This will be the link to the techinical support document.',
  },
});

// Alerts
// Expiration month is zero-based: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
export const RFI_EXPIRATION_DATE= new Date(2022, 4, 25, 11, 59, 59); // May 25
export const ALERTS = {
  ALERT_1_TITLE: defineMessages({
    TITLE: {
      id: 'common.pages.alerts.version.1.release..title',
      defaultMessage: 'Version 1.0 of the tool is now available',
      description: 'Alert title that appears on landing page.',
    },
  }),
  EXPIRATION_DATE: RFI_EXPIRATION_DATE,
  ALERT_1_DESCRIPTION: <FormattedMessage
    id={'common.pages.alerts.public_comment_period.description'}
    defaultMessage={`The Council on Environmental Quality (CEQ) made the version 1.0 of the tool available on {ver1RelDate}. For more information about the improvements to the tool, read CEQ's <link1>press release</link1>.`}
    description={`Alert body that appears on landing page.`}
    values={{
      link1: linkFn('https://www.whitehouse.gov/ceq/news-updates/2022/11/22/biden-harris-administration-launches-version-1-0-of-climate-and-economic-justice-screening-tool-key-step-in-implementing-president-bidens-justice40-initiative/', false, true),
      ver1RelDate: <FormattedDate
        value={METH_1_0_RELEASE_DATE}
        year="numeric"
        month="numeric"
        day="numeric"
      />,
    }}
  />,

  ALERT_2_TITLE: defineMessages({
    TITLE: {
      id: 'common.pages.alerts.census.tract.title',
      defaultMessage: 'Additional documentation now available',
      description: 'Navigate to any page. This the title of the alert that informs the user that new census tract information is available',
    },
  }),
  ALERT_2_DESCRIPTION: <FormattedMessage
    id={'common.pages.alerts.additional_docs_available.description'}
    defaultMessage={`Download new <link1>technical support</link1> and other documentation and <link2>send feedback</link2>.`}
    description={`Alert title that appears at the top of pages.`}
    values={{
      link1: linkFn(TSD.URL, false, true),
      link2: linkFn(`mailto:${FEEDBACK_EMAIL}`, false, true),
    }}
  />,
};

// Header
export const HEADER = defineMessages({
  TITLE_LINE_1: {
    id: 'common.pages.header.title.line1',
    defaultMessage: `Climate and Economic Justice Screening Tool`,
    description: 'Navigate to the about page. This is Title in nav header',
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
  FAQS: {
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
  PREVIOUS_VERSIONS: {
    id: 'common.pages.header.previous_versions',
    defaultMessage: 'Previous versions',
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
  SIGN_UP: {
    id: 'common.pages.footer.sign.up',
    defaultMessage: 'Sign up for updates',
    description: 'Navigate to the about page. This is Footer under Sign-up for updates',
  },
  SIGN_UP_LINK: {
    id: 'common.pages.footer.sign.up.link',
    defaultMessage: 'https://lp.constantcontactpages.com/su/Vm8pCFj/spring',
    description: 'Navigate to the about page. This is Footer link under Sign-up for updates',
  },
  MORE_INFO: {
    id: 'common.pages.footer.moreinfoheader',
    defaultMessage: 'More information',
    description: 'Navigate to the about page. This is Footer column header',
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
  // SIGN_UP: <FormattedMessage
  //   id={'common.pages.footer.sign.up.updates'}
  //   defaultMessage={`<link1>Sign-up</link1> for updates`}
  //   description={`Alert title that appears at the top of pages.`}
  //   values={{
  //     link1: linkFn('https://lp.constantcontactpages.com/su/Vm8pCFj/spring', false, true),
  //   }}
  // />,
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


