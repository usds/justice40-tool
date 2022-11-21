import React from 'react';
import {Button} from '@trussworks/react-uswds';

import * as styles from './DownloadButton.module.scss';
// @ts-ignore
import fileDownloadIcon from '/node_modules/uswds/dist/img/usa-icons/file_download.svg';

export interface IDownloadButtonProps {
  downloadLink: string,
  buttonText: string
  imageAltTagText: string,
  color : 'gray' | 'yellow' | 'default'
}

const DownloadButton = ({downloadLink, buttonText, imageAltTagText, color}: IDownloadButtonProps) => {
  return (
    <a className={styles.downloadButtonLink} href={downloadLink} download>
      <Button
        type="button"
        className={
          color === 'yellow' ? styles.buttonComponentYellow :
          color === 'gray' ? styles.buttonComponentGray :
          styles.buttonComponent
        }>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonText}>
            {buttonText}
          </div>
          <img
            className={
              color === 'yellow' ? styles.buttonImageYellow :
              color === 'gray' ? styles.buttonImageGray :
              styles.buttonImageBlue}
            src={fileDownloadIcon}
            alt={imageAltTagText}
          />
        </div>
      </Button>
    </a>
  );
};

export default DownloadButton;
