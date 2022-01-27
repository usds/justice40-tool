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

      <Grid row>
        <Grid col={7}>
          <div className={styles.mapCaptionTextLink}>
            {EXPLORE_COPY.DOWNLOAD_DRAFT.PARAGRAPH_1}
          </div>
        </Grid>
      </Grid>

      <Grid row>
        <Grid col={7}>
          <h2>{EXPLORE_COPY.NOTE_ON_TERRITORIES.INTRO}</h2>
          <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_1}</p>
          <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_2}</p>
          <p>{EXPLORE_COPY.NOTE_ON_TERRITORIES.PARA_3}</p>
        </Grid>
      </Grid>
    </>
  );
};


export default MapWrapper;
