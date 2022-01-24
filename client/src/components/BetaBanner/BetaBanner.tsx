import React from 'react';

import * as styles from './BetaBanner.module.scss';

interface IBetaBanner {
  title: string,
  info: string,
};

const BetaBanner = ({title, info}:IBetaBanner) => {
  return (
    <div className={styles.betaBannerContainer}>
      <div className={styles.betaBanner}>
        <div className={styles.betaPillIcon}></div>
        <div>
          <span className={styles.betaHeading}>
            {title}{' '}
          </span>
          <span>
            {info}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BetaBanner;
