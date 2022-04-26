import React, {FC} from 'react';
import {Button, Grid, Tag} from '@trussworks/react-uswds';

import * as styles from './downloadPacket.module.scss';
import * as METHODOLOGY_COPY from '../../data/copy/methodology';

// @ts-ignore
import downloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

const DownloadPacket = () => {
  // inline components to make build layout below more readable
  const UpdateTag = () => <div className={styles.tagContainer}><Tag
    className={styles.updateTag}>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.UPDATED_TAG}</Tag></div>;

  const NewTag = () => <div className={styles.tagContainer}>
    <Tag className={styles.newTag}>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.NEW_TAG}</Tag></div>;

  const DownloadButton: FC = ({children}) =>
    <Button className={styles.downloadBoxButton} type="button">
      <span className={styles.downloadButtonIconSpan}>
        <img src={downloadIcon} className={styles.downloadButtonIcon}
          alt={'download icon for download package'} />
      </span>
      <span className={styles.downloadButtonText} >
        {children}
      </span>
    </Button>;

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
            <div className={styles.downloadSourceText}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.DESCRIPTION1}
            </div>

            {/* Download box button 1 */}
            <div className={styles.downloadButtonContainer}>
              <UpdateTag/>
              <a data-cy={'download-link'}
                download
                href={METHODOLOGY_COPY.DOWNLOAD_ZIP_URL}>
                <DownloadButton>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT1}</DownloadButton>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.ZIP_LAST_UPDATED}
            </div>


            {/* Download box button 2 */}
            <div className={styles.downloadButtonContainer}>
              <UpdateTag/>
              <a data-cy={'shapefile-link'}
                download
                href={METHODOLOGY_COPY.DOWNLOAD_SHAPEFILE_URL}>
                <DownloadButton>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT2}</DownloadButton>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.SHAPE_LAST_UPDATED}
            </div>

            {/* Download box button 3 */}
            <div className={styles.downloadButtonContainer}>
              <NewTag/>
              {/* target and rel required since PDFs open in browser and don't download */}
              <a data-cy={'tsd-link'}
                download
                target={'_blank'}
                rel={'noreferrer'}
                href={METHODOLOGY_COPY.DOWNLOAD_TSD_URL}>
                <DownloadButton>{METHODOLOGY_COPY.DOWNLOAD_PACKAGE.BUTTON_TEXT3}</DownloadButton>
              </a>
            </div>
            <div className={styles.lastUpdated}>
              {METHODOLOGY_COPY.DOWNLOAD_PACKAGE.TSD_LAST_UPDATED}
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default DownloadPacket;
