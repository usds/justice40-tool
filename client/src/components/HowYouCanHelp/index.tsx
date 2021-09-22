import React from 'react';
import {Link} from 'gatsby-plugin-intl';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

import * as styles from './howYouCanHelp.module.scss';

const HowYouCanHelp = () => {
  const intl = useIntl();
  const messages = defineMessages({
    youCanHelpHeader: {
      id: 'howYouCanHelp.header.text',
      defaultMessage: 'How you can help improve the tool',
      description: 'the header of the how you can help section',
    },
    youCanHelpInfoText: {
      id: 'youCanHelpInfoText.list.element.prefix',
      defaultMessage: 'If you have helpful information, we would love to',
      description: 'you can help info text ',
    },
    youCanHelpInfoLinkText: {
      id: 'youCanHelpInfoLink.link.text',
      defaultMessage: 'recieve an email from you',
      description: 'you can help info text ',
    },
    youCanHelpDataMethPrefixText: {
      id: 'youCanHelpDataMethPrefixText.link.prefix.text',
      defaultMessage: 'View our',
      description: 'view our',
    },
    youCanHelpDataMethLinkText: {
      id: 'youCanHelpDataMethLinkText.link.text',
      defaultMessage: 'Data and methodology',
      description: 'Data & methodology link',
    },
    youCanHelpDataMethSuffixText: {
      id: 'youCanHelpDataMethSuffixText.link.suffix.text',
      defaultMessage: 'page and send us feedback.',
      description: 'send us feedbackv via email',
    },
    youCanHelpSharingPrefixText: {
      id: 'youCanHelpSharingPrefixText.link.prefix.text',
      defaultMessage: 'Find your community of interest and',
      description: 'find your community',
    },
    youCanHelpSharingLinkText: {
      id: 'youCanHelpSharingLinkText.link.text',
      defaultMessage: 'share your feedback',
      description: 'sharing link to email',
    },
  });

  return (
    <div className={styles.howYouCanHelpContainer}>
      <h2>
        {intl.formatMessage(messages.youCanHelpHeader)}
      </h2>
      <ul className={styles.howYouCanHelpListWrapper}>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>
            {intl.formatMessage(messages.youCanHelpInfoText)}
            {` `}
            <a href={'mailto:screeningtool.feedback@usds.gov'}>
              {intl.formatMessage(messages.youCanHelpInfoLinkText)}
            </a>.
          </div>
        </li>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>
            {intl.formatMessage(messages.youCanHelpDataMethPrefixText)}
            {` `}
            <Link to={'/methodology'}>
              {intl.formatMessage(messages.youCanHelpDataMethLinkText)}
            </Link>
            {` `}
            {intl.formatMessage(messages.youCanHelpDataMethSuffixText)}
          </div>
        </li>
        <li className={styles.howYouCanHelpList}>
          <div className={styles.howYouCanHelpText}>
            {intl.formatMessage(messages.youCanHelpSharingPrefixText)}
            {` `}
            <a href={'mailto:screeningtool.feedback@usds.gov'}>
              {intl.formatMessage(messages.youCanHelpSharingLinkText)}
            </a>.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HowYouCanHelp;
