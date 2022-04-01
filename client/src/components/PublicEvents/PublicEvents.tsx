import React from 'react';
import {Collection} from '@trussworks/react-uswds';
import PublicEvent from '../PublicEvent';

import * as PUBLIC_ENG_COPY from '../../data/copy/publicEngage';
import * as styles from './PublicEvents.module.scss';

const PublicEvents = () => {
  return (
    <Collection className={styles.collectionContainer}>
      {PUBLIC_ENG_COPY.EVENTS.map((event, index) => <PublicEvent key={index} event={event} />)}
    </Collection>
  );
};

export default PublicEvents;
