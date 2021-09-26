import * as React from 'react';
import {Grid} from '@trussworks/react-uswds';

import AlertWrapper from '../AlertWrapper';
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
        <Grid col={12}>
          <AlertWrapper showBetaAlert={false} showLimitedDataAlert={true}/>
        </Grid>
      </Grid>

      <Grid row>
        <J40Map location={location}/>
      </Grid>

      <Grid row>
        <Grid col={7}>
          <div className={styles.mapCaptionTextLink}>
            {EXPLORE_COPY.DOWNLOAD_DRAFT.PARAGRAPH_1}
          </div>
          <div>
            {EXPLORE_COPY.DOWNLOAD_DRAFT.PARAGRAPH_2}
          </div>
        </Grid>
      </Grid>
    </>
  );
};


export default MapWrapper;
