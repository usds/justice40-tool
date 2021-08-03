import * as React from 'react';
import J40Alert from '../J40Alert';
import J40Map from '../J40Map';
import * as styles from './mapWrapper.module.scss';

interface IMapWrapperProps {
  location: Location
}

const MapWrapper = ({location}: IMapWrapperProps) => {
  return (
    <>
      <J40Alert/>
      <J40Map location={location}/>
      <p className={styles.mapCaptionText}>
        <div className={styles.mapCaptionTextLink}>
          <a href={'https://justice40-data.s3.amazonaws.com/Score/usa.zip'}>
          Download the draft list of prioritized communities (pre-decisional) and datasets used.
          </a>
        </div>
        <div>ZIP file will contain one .xlsx, one .csv and one .pdf (30 MB).</div>
      </p>
    </>
  );
};


export default MapWrapper;
