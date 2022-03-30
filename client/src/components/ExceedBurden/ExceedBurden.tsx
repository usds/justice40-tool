import React from 'react';

import * as styles from './ExceedBurden.module.scss';
import * as EXPLORE_COPY from '../../data/copy/explore';

interface IExceedBurden {
    text: React.ReactElement;
    isBurdened: boolean;
}
const ExceedBurden = ({text, isBurdened}:IExceedBurden) => {
  return (
    <div className={styles.exceedBurdenContainer}>
      <div className={styles.burdenQuestion}>
        {text}
      </div>
      <div className={styles.burdenValue}>
        {isBurdened ? EXPLORE_COPY.SIDE_PANEL_SPACERS.YES : EXPLORE_COPY.SIDE_PANEL_SPACERS.NO}
      </div>
    </div>
  );
};

export default ExceedBurden;
