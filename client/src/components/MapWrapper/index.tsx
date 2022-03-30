import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';

import J40Map from '../J40Map';

import * as styles from './mapWrapper.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IMapWrapperProps {
  location: Location
}

const MapWrapper = ({location}: IMapWrapperProps) => {
  return (
    <>
      <Grid row>
        <J40Map location={location}/>
      </Grid>

      <Grid desktop={{col: 7}} tablet={{col: 10}} col={12}>
        <div className={styles.mapCaptionTextLink}>
          {EXPLORE_COPY.DOWNLOAD_DRAFT.PARAGRAPH_1}
        </div>
      </Grid>
    </>
  );
};


export default MapWrapper;
