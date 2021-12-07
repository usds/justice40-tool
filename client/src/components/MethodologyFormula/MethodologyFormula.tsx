import React from 'react';
import {useIntl} from 'gatsby-plugin-intl';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './MethodologyFormula.module.scss';

const MethodologyFormula = () => {
  const intl = useIntl();

  return (
    <section className={styles.formulaContainer}>
      <p>
        {intl.formatMessage(METHODOLOGY_COPY.PAGE.FORMULA_INTRO)}
      </p>

      <p>
        {METHODOLOGY_COPY.FORMULA.IF}
      </p>

      <p>
        {METHODOLOGY_COPY.FORMULA.AND}
      </p>

      <p>
        {METHODOLOGY_COPY.FORMULA.THEN}
      </p>
    </section>
  );
};

export default MethodologyFormula;
