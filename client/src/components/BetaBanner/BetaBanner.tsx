import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as COMMON_COPY from '../../data/copy/common';
import * as styles from './BetaBanner.module.scss';

const BetaBanner = () => {
  const intl = useIntl();

  return (
    <div className={styles.betaBannerContainer}>
      <div className={styles.betaBanner}>
        <div className={styles.betaPillIcon}></div>
        <div>
          <span className={styles.betaHeading}>
            {intl.formatMessage(COMMON_COPY.BETA_BANNER.TITLE)}{' '}
          </span>
          <span>
            {intl.formatMessage(COMMON_COPY.BETA_BANNER.INFO)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetaBanner;
