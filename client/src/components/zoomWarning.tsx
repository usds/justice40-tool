import React from 'react';
import {useIntl} from 'react-intl';

// @ts-ignore
import zoomIcon from '/node_modules/uswds/dist/img/usa-icons/zoom_in.svg';
import * as styles from './zoomWarning.module.scss';
import * as EXPLORE_COPY from '../data/copy/explore';

interface IZoomWarningProps {
    zoomLevel: number
}

// Update this file to trigger build
const ZoomWarning = ({zoomLevel}: IZoomWarningProps) => {
  const intl = useIntl();

  return (
    <>
      {zoomLevel <= 5 ? (
        <div className={styles.zoomWarning}>
          <img src={zoomIcon} alt={'zoom icon'}/>
          {intl.formatMessage(EXPLORE_COPY.MAP.ZOOM_WARNING)}
        </div>
        ) :
        ''
      }
    </>
  );
};

export default ZoomWarning;
