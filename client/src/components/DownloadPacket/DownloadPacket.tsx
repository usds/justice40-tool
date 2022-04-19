import React from 'react';
import {Button, Grid, Tag} from '@trussworks/react-uswds';

import * as styles from './downloadPacket.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

const DownloadPacket = () => {
  return (
    <Grid>
      <div className={styles.downloadBoxContainer}>
        <div className={styles.downloadBox}>
          <div className={styles.downloadBoxTextBox}>

            {/* Download box title */}
            <div className={styles.downloadBoxTitle}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.TITLE}
            </div>

            {/* Download box description 1 */}
            <div className={styles.dataSourceText}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.DESCRIPTION1}
            </div>

            {/* Download box button 1 */}
            <div className={styles.dataSourceButtonContainer}>
              <a data-cy={'download-link'} download href={METHODOLOGY_COPY.DOWNLOAD_ZIP_URL}>
                <Button className={styles.downloadBoxButton} type="button">
                  <div>
                    <img src={downloadIcon} alt={'download icon for download package'}/>
                  </div>
                  <div className={styles.dataSourceButtonText}>
                    {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT1}
                  </div>
                </Button>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.LAST_UPDATED}
            </div>


            {/* Download box button 2 */}
            <div className={styles.shapefileButtonContainer}>
              <div className={styles.newTagContainer}>
                <Tag className={styles.newtag}>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.NEW_TAG}</Tag>
              </div>
              <a data-cy={'shapefile-link'} download href={METHODOLOGY_COPY.DOWNLOAD_SHAPEFILE_URL}>
                <Button className={styles.downloadBoxButton} type="button">
                  <div>
                    <img src={downloadIcon} alt={'download icon for download package'}/>
                  </div>
                  <div className={styles.shapeFileButtonText}>
                    {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT2}
                  </div>
                </Button>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.LAST_UPDATED}
            </div>

            {/* Download box button 3 */}
            <div className={styles.shapefileButtonContainer}>
              <div className={styles.newTagContainer}>
                <Tag className={styles.newtag}>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.NEW_TAG}</Tag>
              </div>
              <a data-cy={'shapefile-link'} download href={METHODOLOGY_COPY.DOWNLOAD_TSD_URL}>
                <Button className={styles.downloadBoxButton} type="button">
                  <div>
                    <img src={downloadIcon} alt={'download icon for download package'}/>
                  </div>
                  <div className={styles.shapeFileButtonText}>
                    {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT3}
                  </div>
                </Button>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.LAST_UPDATED}
            </div>

          </div>
        </div>
      </div>
    </Grid>
  );
};

export default DownloadPacket;
