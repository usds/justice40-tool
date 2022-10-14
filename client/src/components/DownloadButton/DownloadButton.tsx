import React from 'react';
import {Button} from '@trussworks/react-uswds';

import * as styles from './DownloadButton.module.scss';
// @ts-ignore
import fileDownloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

export interface IDownloadButtonProps {
  downloadLink: string,
  buttonText: string
  imageAltTagText: string,
  isYellow?: boolean
}

const DownloadButton = ({downloadLink, buttonText, imageAltTagText, isYellow = false}: IDownloadButtonProps) => {
  return (
    <a className={styles.downloadButtonLink} href={downloadLink} download>
      <Button type="button" className={isYellow ? styles.buttonComponentYellow : styles.buttonComponent}>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonText}>
            {buttonText}
          </div>
          <img
            className={isYellow ? styles.buttonImageYellow : styles.buttonImageBlue}
            src={fileDownloadIcon}
            alt={imageAltTagText}
          />
        </div>
      </Button>
    </a>
  );
};

export default DownloadButton;
