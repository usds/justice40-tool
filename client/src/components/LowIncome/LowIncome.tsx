import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './LowIncome.module.scss';

const LowIncome = () => {
  const intl = useIntl();

  return (
    <div className={styles.lowIncomeContainer}>
      <p className={styles.lowIncomeTitle}>
        <sup>*</sup>
        {' '}
        {intl.formatMessage(METHODOLOGY_COPY.LOW_INCOME.HEADING)}
      </p>

      <p className={styles.lowIncomeText}>
        {intl.formatMessage(METHODOLOGY_COPY.LOW_INCOME.INFO)}
      </p>

    </div>
  );
};

export default LowIncome;
