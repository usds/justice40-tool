import React from 'react';
import {Button, Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';
import {defineMessages} from 'react-intl';

import * as styles from './downloadPacket.module.scss';
import * as constants from '../../data/constants';
// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

const DownloadPacket = () => {
  const intl = useIntl();
  const messages = defineMessages({
    downloadPacketHeader: {
      id: 'downloadPacket.header.text',
      defaultMessage: `Draft communities list v${constants.VERSION_NUMBER} (${constants.DOWNLOAD_FILE_SIZE})`,
      description: 'download packet header text',
    },
    downloadPacketInfo: {
      id: 'downloadPacket.info.text',
      defaultMessage: `The package includes draft v${constants.VERSION_NUMBER} `+
      ` of the list of communities of focus (.csv and .xlsx) ` +
      ` and information about how to use the list (.pdf).`,
      description: 'download packet info text',
    },
    downloadPacketLastUpdated: {
      id: 'downloadPacket.info.last.updated',
      defaultMessage: `Last updated: ${constants.DOWNLOAD_LAST_UPDATED} `,
      description: 'download packet info last updated',
    },
    downloadPacketButtonText: {
      id: 'downloadPacket.button.text',
      defaultMessage: 'Download package',
      description: 'download packet button text',
    },
  });

  return (
    <Grid>
      <div className={styles.downloadBoxContainer}>
        <div className={styles.downloadBox}>
          <div className={styles.downloadBoxTextBox}>
            <div className={styles.downloadBoxTitle}>{intl.formatMessage(messages.downloadPacketHeader)}</div>
            <div className={styles.downloadBoxText}>
              {intl.formatMessage(messages.downloadPacketInfo)}
              {' '}
              <span>
                {intl.formatMessage(messages.downloadPacketLastUpdated)}
              </span>
            </div>
            <div className={styles.downloadBoxButtonContainer}>
              <a data-cy={'download-link'} href={constants.DOWNLOAD_ZIP_URL}>
                <Button className={styles.downloadBoxButton} type="button">
                  <div><img src={downloadIcon} /> </div>
                  <div className={styles.downloadPacketText}>
                    {intl.formatMessage(messages.downloadPacketButtonText)}
                  </div>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default DownloadPacket;
