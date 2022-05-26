import React from 'react';
import {defineMessages, useIntl} from 'gatsby-plugin-intl';

import {IDefineMessage} from '../../data/copy/common';

// @ts-ignore
import fileDownloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';
import * as styles from './DownloadLink.module.scss';

export const DOWNLOAD_ICON = defineMessages({
  ALT_TAG: {
    id: 'downloads.page.download.icon.alt.tag',
    defaultMessage: 'The icon used to indicate that the file is downloadable',
    description: 'Navigate to the Downloads page, this is the icon used to indicate that the file is downloadable',
  },
});

interface IDownloadLink {
    href: string | IDefineMessage,
    linkText: string | JSX.Element,
}
const DownloadLink = ({href, linkText}:IDownloadLink) => {
  const intl = useIntl();

  if (href && typeof href !== `string`) {
    href = intl.formatMessage(href);
  }
  return (
    <>
      <a href={href} download>{linkText}</a>
      <img
        className={styles.downloadIcon}
        src={fileDownloadIcon}
        alt={intl.formatMessage(DOWNLOAD_ICON.ALT_TAG)}
      />
    </>
  );
};

export default DownloadLink;
