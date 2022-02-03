import React from 'react';

import * as METHODOLOGY_COPY from '../../data/copy/methodology';
import * as styles from './MethodologyFormula.module.scss';

// The site shows the formula used in the methodology. The constants seen
// below aim to capture the 3 part of that formula.  These are not
// reserved words.

const MethodologyFormula = () => {
  return (
    <section className={styles.formulaContainer}>
      <p>
        {METHODOLOGY_COPY.FORMULA.INTRO}
      </p>

      <p>
        {METHODOLOGY_COPY.FORMULA.IF}
      </p>

      <p>
        {METHODOLOGY_COPY.FORMULA.AND}
      </p>

      {/* <p>
        {METHODOLOGY_COPY.FORMULA.THEN}
      </p> */}
    </section>
  );
};

export default MethodologyFormula;
