import * as React from 'react';
import * as styles from './zoomWarning.module.scss';

// @ts-ignore
import zoomIcon from '/node_modules/uswds/dist/img/usa-icons/zoom_in.svg';

interface IZoomWarningProps {
    zoomLevel: number
}

const ZoomWarning = ({zoomLevel}: IZoomWarningProps) => {
  return (
    <>
      {zoomLevel <= 5 ? (
        <div className={styles.zoomWarning}>
          <img src={zoomIcon} alt={'zoom icon'}/>
          Zoom in to the state or regional level to see prioritized communities on the map.
        </div>
        ) :
        ''
      }
    </>
  );
};

export default ZoomWarning;
