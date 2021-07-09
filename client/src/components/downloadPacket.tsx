import React from 'react';
import {Button} from '@trussworks/react-uswds';
import * as styles from './downloadPacket.module.scss';
// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

const DownloadPacket = () => {
  const cbgFileURL = 'https://usds-geoplatform-justice40-website.s3.amazonaws.com/data/score/csv/usa.csv';
  return (
    <div className={styles.downloadBoxContainer}>
      <div className={styles.downloadBox}>
        <div className={styles.downloadBoxTextBox}>
          <div className={styles.downloadBoxTitle}>Just Progress Packet</div>
          <div className={styles.downloadBoxText}>This downloadable packet includes the list of Just Progress
          prioritized communities (30,021 census block groups) and 18 datasets.
          </div>
          <div className={styles.downloadBoxButtonContainer}>
            <a id={'download-link'} href={cbgFileURL}>
              <Button className={styles.downloadBoxButton} type="button">
                <div><img src={downloadIcon} /> </div>
                <div className={styles.downloadPacketText}>Download packet</div>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPacket;
