import React from 'react';

import * as COMMON_COPY from '../../data/copy/common';
import * as styles from './BetaBanner.module.scss';

const BetaBanner = () => {
  return (
    <div className={styles.betaBannerContainer}>
      <div className={styles.betaBanner}>
        {COMMON_COPY.BETA_BANNER_CONTENT}
      </div>
    </div>
  );
};

export default BetaBanner;
