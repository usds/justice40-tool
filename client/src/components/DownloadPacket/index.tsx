import React from 'react';
import {Button, Grid} from '@trussworks/react-uswds';
import {useIntl} from 'gatsby-plugin-intl';

import * as styles from './downloadPacket.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

const DownloadPacket = () => {
  const intl = useIntl();

  return (
    <Grid>
      <div className={styles.downloadBoxContainer}>
        <div className={styles.downloadBox}>
          <div className={styles.downloadBoxTextBox}>
            <div className={styles.downloadBoxTitle}>
              {intl.formatMessage(METHODOLOGY_COPY.DOWNLOAD_PACKAGE.TITLE)}
            </div>
            <div className={styles.downloadBoxText}>
              {intl.formatMessage(METHODOLOGY_COPY.DOWNLOAD_PACKAGE.DESCRIPTION)}
              {' '}
              <span>
                {intl.formatMessage(METHODOLOGY_COPY.DOWNLOAD_PACKAGE.LAST_UPDATED)}
              </span>
            </div>
            <div className={styles.downloadBoxButtonContainer}>
              <a data-cy={'download-link'} href={METHODOLOGY_COPY.DOWNLOAD_ZIP_URL}>
                <Button className={styles.downloadBoxButton} type="button">
                  <div><img src={downloadIcon} /> </div>
                  <div className={styles.downloadPacketText}>
                    {intl.formatMessage(METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT)}
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
