import React from 'react';
import {GovBanner} from '@trussworks/react-uswds';
import Language from '../Language';

import * as styles from './GovernmentBanner.module.scss';

const GovernmentBanner = () => {
  return (
    <div className={styles.fullScreenContainer}>
      <div className={styles.bannerContainer}>
        <GovBanner/>
        <Language />
      </div>
    </div>
  );
};

export default GovernmentBanner;
